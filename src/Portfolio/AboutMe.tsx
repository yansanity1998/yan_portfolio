import React, { useRef, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import cvImage from '../assets/cv.png';
import cvPdf from '../CV.pdf';
import PullToScan from './PullToScan';

const experiences = [
    { role: 'Full Stack Web Developer', company: 'Various Clients', period: '2023 - Present', description: 'Building responsive web applications and managing end-to-end development projects.' },
    { role: 'UI/UX Designer', company: 'Figma Projects', period: '2023 - Present', description: 'Creating modern, user-centered designs and prototypes using Figma.' },
    { role: 'Web Application Developer', company: 'Various Clients', period: '2023 - Present', description: 'Developing custom web applications with React, databases, and modern tech stack.' },
];

const TiltCard = ({ children, onClick, className, style, isActive }: { children: React.ReactNode | ((isHovered: boolean) => React.ReactNode), onClick?: () => void, className?: string, style?: React.CSSProperties, isActive?: boolean }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const isTouching = useRef(false);
    const touchStartTime = useRef(0);
    const resetTimeout = useRef<number | null>(null);
    const lastTilt = useRef({ x: 0, y: 0 });

    const animateTo = (rotateX: number, rotateY: number, scale: number, duration: number = 0.3) => {
        if (!cardRef.current) return;
        gsap.to(cardRef.current, {
            rotationX: rotateX,
            rotationY: rotateY,
            scale: scale,
            duration: duration,
            ease: "power2.out",
            transformPerspective: 1000,
            transformOrigin: "center",
            force3D: true
        });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || isTouching.current) return;

        if (!isHovered) setIsHovered(true);

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        lastTilt.current = { x: rotateX, y: rotateY };

        animateTo(rotateX, rotateY, 1.05);

        if (glowRef.current) {
            const glowX = (x / rect.width) * 100;
            const glowY = (y / rect.height) * 100;
            gsap.to(glowRef.current, {
                background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.15), transparent 60%)`,
                duration: 0.2
            });
        }
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        if (resetTimeout.current) {
            clearTimeout(resetTimeout.current);
            resetTimeout.current = null;
        }

        isTouching.current = true;
        touchStartTime.current = Date.now();
        setIsHovered(true);

        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        lastTilt.current = { x: rotateX, y: rotateY };

        animateTo(rotateX, rotateY, 1.05, 0.3);

        if (glowRef.current) {
            const glowX = (x / rect.width) * 100;
            const glowY = (y / rect.height) * 100;
            gsap.to(glowRef.current, {
                background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.15), transparent 60%)`,
                duration: 0.2
            });
        }
    };

    const resetAnimation = useCallback(() => {
        if (isActive) return;

        setIsHovered(false);
        if (!cardRef.current) return;
        setTimeout(() => { isTouching.current = false; }, 100);

        gsap.to(cardRef.current, {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.5)",
            overwrite: true
        });
        if (glowRef.current) {
            gsap.to(glowRef.current, {
                background: `transparent`,
                duration: 0.3
            });
        }
    }, [isActive]);

    const handleMouseLeave = () => {
        if (isTouching.current || isActive) return;
        resetAnimation();
    };

    const handleTouchEnd = () => {
        const elapsed = Date.now() - touchStartTime.current;
        const minDuration = 600;
        const remaining = minDuration - elapsed;

        if (resetTimeout.current) {
            clearTimeout(resetTimeout.current);
            resetTimeout.current = null;
        }

        if (remaining > 0) {
            resetTimeout.current = window.setTimeout(resetAnimation, remaining);
        } else {
            resetAnimation();
        }
    };

    return (
        <div
            ref={cardRef}
            className={`relative preserve-3d will-change-transform ${className} ${isHovered ? 'group' : ''}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => !isTouching.current && setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            onClick={onClick}
            style={{ ...style, transformStyle: 'preserve-3d' }}
        >
            <div ref={glowRef} className="absolute inset-0 z-20 w-full h-full pointer-events-none rounded-2xl transition-opacity duration-300" />
            {typeof children === 'function' ? children(isHovered || !!isActive) : children}
        </div>
    );
};

const HoverWords = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const processText = (text: string, isBold: boolean = false) => {
        return text.split(' ').map((word, index, array) => (
            <React.Fragment key={index}>
                <span
                    className={`inline-block transition-transform duration-300 ease-out hover:scale-110 hover:text-white cursor-text ${isBold ? 'font-bold text-white' : ''}`}
                >
                    {word}
                </span>
                {index < array.length - 1 && ' '}
            </React.Fragment>
        ));
    };

    const processChildren = (node: React.ReactNode): React.ReactNode => {
        if (typeof node === 'string') {
            return processText(node);
        }

        if (React.isValidElement(node)) {
            const props = node.props as any;
            if (node.type === 'span' && props.className?.includes('font-bold')) {
                return processText(props.children as string, true);
            }
            return node;
        }

        if (Array.isArray(node)) {
            return node.map((child, index) => (
                <React.Fragment key={index}>{processChildren(child)}</React.Fragment>
            ));
        }

        return node;
    };

    return (
        <p className={className}>
            {processChildren(children)}
        </p>
    );
};

const AboutMe = () => {
    const [showCV, setShowCV] = useState(false);
    const [activeExperience, setActiveExperience] = useState<number | null>(null);

    return (
        <section id="about" className="py-24 sm:py-32 px-4 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-500/5 to-transparent"></div>
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16 animate-on-scroll">
                    <span className="text-rose-400 font-medium tracking-widest uppercase text-sm">About Me</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4">Passionate About <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-400">Technology</span></h2>
                </div>
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6">
                        <HoverWords className="text-sm md:text-lg text-zinc-400 leading-relaxed text-justify">
                            I'm a passionate <span className="font-bold text-white">full stack developer</span> with over <span className="font-bold text-white">2+ years</span> of experience building web applications. My journey started with curiosity about how websites work, and evolved into a passion for creating seamless user experiences.
                        </HoverWords>
                        <HoverWords className="text-sm md:text-lg text-zinc-400 leading-relaxed text-justify">
                            I specialize in <span className="font-bold text-white">React</span>, <span className="font-bold text-white">modern JavaScript frameworks</span>, and building <span className="font-bold text-white">intuitive user interfaces</span>. I love tackling complex problems and turning them into simple, beautiful solutions.
                        </HoverWords>



                        <div className="pt-4">
                            <h3 className="text-2xl font-bold mb-8 text-white">Experience</h3>
                            <div className="space-y-0">
                                {experiences.map((exp, i) => (
                                    <div
                                        key={i}
                                        className={`group relative overflow-hidden cursor-pointer ${activeExperience === i ? 'active' : ''}`}
                                        style={{ animationDelay: `${i * 100}ms` }}
                                        onClick={() => setActiveExperience(activeExperience === i ? null : i)}
                                    >
                                        {/* Animated gradient background with rotation on hover */}
                                        <div className={`absolute inset-0 bg-gradient-to-r from-rose-500/0 via-red-500/0 to-transparent md:group-hover:from-rose-500/10 md:group-hover:via-red-500/5 transition-all duration-500 -z-10 ${activeExperience === i ? 'from-rose-500/10 via-red-500/5' : ''}`}></div>

                                        {/* Glow effect on hover */}
                                        <div className={`absolute inset-0 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 -z-20 ${activeExperience === i ? 'opacity-100' : ''}`}>
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-32 bg-rose-500/10 blur-3xl rounded-full"></div>
                                        </div>

                                        {/* Left accent with animated dot */}
                                        <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-zinc-800/50 md:group-hover:bg-gradient-to-b md:group-hover:from-rose-500 md:group-hover:via-red-500 md:group-hover:to-rose-500/50 transition-all duration-500 md:group-hover:w-[4px] ${activeExperience === i ? 'bg-gradient-to-b from-rose-500 via-red-500 to-rose-500/50 w-[4px]' : ''}`}></div>

                                        {/* Animated dot indicator */}
                                        <div className="absolute left-0 top-8 -translate-x-1/2">
                                            <div className={`w-2 h-2 rounded-full bg-zinc-700 md:group-hover:bg-rose-500 transition-all duration-300 md:group-hover:scale-150 md:group-hover:shadow-lg md:group-hover:shadow-rose-500/50 ${activeExperience === i ? 'bg-rose-500 scale-150 shadow-lg shadow-rose-500/50' : ''}`}>
                                                <div className={`absolute inset-0 rounded-full bg-rose-500 opacity-0 md:group-hover:opacity-75 animate-ping ${activeExperience === i ? 'opacity-75' : ''}`}></div>
                                            </div>
                                        </div>

                                        <div className={`pl-8 py-5 pr-3 transition-all duration-300 md:group-hover:pl-10 ${activeExperience === i ? 'pl-10' : ''}`}>
                                            {/* Role and Period row */}
                                            <div className="flex items-baseline justify-between gap-4 mb-2">
                                                <div className="flex items-baseline gap-3 flex-wrap">
                                                    <h4 className={`font-bold text-white text-base transition-all duration-300 md:group-hover:text-transparent md:group-hover:bg-clip-text md:group-hover:bg-gradient-to-r md:group-hover:from-rose-400 md:group-hover:to-red-400 md:group-hover:scale-105 transform origin-left ${activeExperience === i ? 'text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-400 scale-105' : ''}`}>
                                                        {exp.role}
                                                    </h4>
                                                    <span className={`hidden sm:inline text-zinc-700 md:group-hover:text-rose-500/50 transition-colors duration-300 ${activeExperience === i ? 'text-rose-500/50' : ''}`}>•</span>
                                                    <span className={`text-sm text-rose-400 font-medium md:group-hover:text-rose-300 transition-all duration-300 ${activeExperience === i ? 'text-rose-300' : ''}`}>
                                                        {exp.company}
                                                    </span>
                                                </div>
                                                <span className={`text-xs text-zinc-500 font-mono whitespace-nowrap md:group-hover:text-zinc-400 transition-colors duration-300 bg-zinc-900/50 md:group-hover:bg-zinc-800/50 px-2 py-1 rounded ${activeExperience === i ? 'text-zinc-400 bg-zinc-800/50' : ''}`}>
                                                    {exp.period}
                                                </span>
                                            </div>

                                            {/* Description with enhanced animations */}
                                            <p className={`text-white font-bold text-justify text-sm md:text-base leading-relaxed transform translate-x-0 opacity-90 md:group-hover:translate-x-2 md:group-hover:opacity-100 transition-all duration-500 ease-out ${activeExperience === i ? 'translate-x-2 opacity-100' : ''}`}>
                                                {exp.description}
                                            </p>
                                        </div>

                                        {/* Enhanced bottom border with gradient */}
                                        <div className="relative h-px overflow-hidden">
                                            <div className="absolute inset-0 bg-zinc-800/30"></div>
                                            <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-rose-500/50 to-transparent translate-x-[-100%] md:group-hover:translate-x-[100%] transition-transform duration-700 ease-out ${activeExperience === i ? 'translate-x-[100%]' : ''}`}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="col-span-1">
                                <PullToScan onScan={() => setShowCV(true)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {[
                                {
                                    emoji: '🧩',
                                    title: 'Problem Solver',
                                    desc: 'Breaking down complex challenges into elegant solutions',
                                    gradient: 'from-blue-500 to-cyan-600'
                                },
                                {
                                    emoji: '🎨',
                                    title: 'Design Focused',
                                    desc: 'Crafting interfaces where design meets functionality',
                                    gradient: 'from-purple-500 to-pink-600'
                                },
                                {
                                    emoji: '🚀',
                                    title: 'Fast Learner',
                                    desc: 'Always exploring and mastering new technologies',
                                    gradient: 'from-orange-500 to-red-600'
                                },
                                {
                                    emoji: '🤝',
                                    title: 'Team Player',
                                    desc: 'Building success through effective collaboration',
                                    gradient: 'from-green-500 to-emerald-600'
                                }
                            ].map((item, i) => {
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1, duration: 0.5 }}
                                        className={i % 2 === 1 ? 'sm:mt-8' : ''}
                                    >
                                        <TiltCard
                                            className="relative overflow-hidden p-6 rounded-2xl border backdrop-blur-sm cursor-pointer transform-gpu transition-colors duration-200 border-zinc-800/50 md:hover:border-zinc-600/80"
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(24,24,27,0.95) 0%, rgba(39,39,42,0.85) 100%)',
                                                boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                                            }}
                                        >
                                            {(isHovered) => (
                                                <>
                                                    {/* Animated gradient background */}
                                                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} transition-opacity duration-300 ${isHovered ? 'opacity-10' : 'opacity-0'}`}></div>

                                                    {/* Shimmer effect */}
                                                    <div className={`absolute inset-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                                                        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 ${isHovered ? 'translate-x-full' : '-translate-x-full'}`}></div>
                                                    </div>

                                                    {/* Glow orb */}
                                                    <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${item.gradient} rounded-full blur-3xl transition-opacity duration-300 ${isHovered ? 'opacity-20' : 'opacity-0'}`}></div>

                                                    {/* Emoji icon with 3D effect */}
                                                    <div className={`relative z-30 mb-4 transform transition-all duration-300 ${isHovered ? 'scale-110 rotate-12' : ''}`}>
                                                        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} blur-2xl transition-opacity duration-300 rounded-full ${isHovered ? 'opacity-50' : 'opacity-0'}`}></div>
                                                        <div className={`relative text-5xl transition-all duration-300 ${isHovered ? 'drop-shadow-2xl' : ''}`}>
                                                            {item.emoji}
                                                        </div>
                                                    </div>

                                                    {/* Content */}
                                                    <h4 className={`relative z-30 font-bold text-lg mb-2 transition-all duration-300 ${isHovered ? `text-transparent bg-clip-text bg-gradient-to-r ${item.gradient}` : 'text-zinc-100'}`}>
                                                        {item.title}
                                                    </h4>
                                                    <p className={`relative z-30 text-sm leading-relaxed transition-colors duration-300 ${isHovered ? 'text-zinc-300' : 'text-zinc-400'}`}>
                                                        {item.desc}
                                                    </p>

                                                    {/* Animated border */}
                                                    <div className={`absolute inset-0 rounded-2xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                                                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.gradient} opacity-20 blur-sm`}></div>
                                                    </div>

                                                    {/* Corner particles */}
                                                    <div className={`absolute top-2 right-2 w-2 h-2 bg-white/50 rounded-full transition-opacity duration-300 ${isHovered ? 'opacity-100 animate-pulse' : 'opacity-0'}`}></div>
                                                    <div className={`absolute bottom-2 left-2 w-1.5 h-1.5 bg-white/30 rounded-full transition-opacity duration-300 ${isHovered ? 'opacity-100 animate-pulse' : 'opacity-0'}`} style={{ animationDelay: '150ms' }}></div>
                                                </>
                                            )}
                                        </TiltCard>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* CV Modal */}
            {/* CV Modal */}
            <AnimatePresence>
                {showCV && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4"
                        onClick={() => setShowCV(false)}
                    >
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-xl"></div>
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                            className="relative bg-zinc-900 p-10 rounded-3xl border border-zinc-800 shadow-2xl max-w-lg w-full text-center"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowCV(false)}
                                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                            >
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>

                            <div className="mb-8">
                                <h3 className="text-3xl font-bold text-white mb-2">Scan to View CV</h3>
                                <p className="text-zinc-400 text-base">Use your phone to scan the code below</p>
                            </div>

                            <div className="bg-white p-4 rounded-2xl mx-auto mb-8 relative group w-fit flex justify-center items-center overflow-hidden">
                                <div className="absolute inset-0 bg-rose-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                {/* CV Image / QR */}
                                <img
                                    src={cvImage}
                                    alt="CV Scan Code"
                                    className="w-72 h-72 relative z-10 object-contain transform scale-110 -translate-x-3 translate-y-4"
                                />
                            </div>

                            <div>
                                <a
                                    href={cvPdf}
                                    download="Jesper_Ian_CV.pdf"
                                    className="inline-flex items-center gap-3 text-rose-400 hover:text-rose-300 transition-colors font-semibold text-lg group"
                                >
                                    <svg className="w-6 h-6 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                    <span>Download PDF Version</span>
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default AboutMe;