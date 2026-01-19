import { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import Contact from './Contact';
import AboutMe from './AboutMe';
import SkillsSection from './Skills';
import profileImage from '../assets/ian.png';
// Brand logos
import figmaLogo from '../assets/figma.png';
import chatgptLogo from '../assets/chatgpt.png';
import claudeLogo from '../assets/claude.png';
import vscodeLogo from '../assets/vscode.png';
import supabaseLogo from '../assets/supabase.png';
import xamppLogo from '../assets/xampp.png';
// Skill card icons - MOVED TO AboutMe.tsx
// Project images
import anxietyAppImage from '../assets/anxiety-application.png';
import spcRfidImage from '../assets/spc-rfid.png';
import attendEaseImage from '../assets/attendease.png';
import medScanImage from '../assets/medscan.png';
import scannifyImage from '../assets/scannify.png';
import happytoesImage from '../assets/happytoes.png';
import winterImage from '../assets/winter.png';
import sprintxImage from '../assets/sprintx.png';
import mcbyteImage from '../assets/mcbyte.png';
import fruityImage1 from '../assets/fruity1.png';
import fruityImage2 from '../assets/fruity2.png';
import osasMainImage from '../assets/OSAS/OSAS.png';
import osasScreenshot1 from '../assets/OSAS/Screenshot 2026-01-17 151624.png';
import osasScreenshot2 from '../assets/OSAS/Screenshot 2026-01-17 151634.png';
import osasScreenshot3 from '../assets/OSAS/Screenshot 2026-01-17 151647.png';
import osasScreenshot4 from '../assets/OSAS/Screenshot 2026-01-17 151709.png';
import osasScreenshot5 from '../assets/OSAS/Screenshot 2026-01-17 151718.png';
import osasScreenshot6 from '../assets/OSAS/Screenshot 2026-01-17 151725.png';
import osasScreenshot7 from '../assets/OSAS/Screenshot 2026-01-17 151733.png';
import osasScreenshot8 from '../assets/OSAS/Screenshot 2026-01-17 151745.png';
import osasScreenshot9 from '../assets/OSAS/Screenshot 2026-01-17 151752.png';

const PLACEHOLDER_AVATAR = profileImage;

interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    secondaryImage?: string;
    tags: string[];
    category: string;
    liveDemo?: string;
    github?: string;
    screenshots?: string[];
}


// Orbiting icon component - icons circle slowly around the avatar (fully responsive)
const OrbitingIcon = ({
    children,
    duration,
    offsetPercent = 0
}: {
    children: ReactNode,
    duration: number,
    offsetPercent?: number
}) => {
    // Use negative delay to offset starting position in the animation cycle
    const delay = -(duration * offsetPercent / 100);

    return (
        <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none orbit-container"
            style={{
                animation: `orbit ${duration}s linear infinite`,
                animationDelay: `${delay}s`,
            }}
        >
            <div className="p-1 sm:p-1.5 bg-zinc-800/90 backdrop-blur-sm rounded-lg border border-zinc-700/50 shadow-lg pointer-events-auto">
                {children}
            </div>
        </div>
    );
};

const projects: Project[] = [
    {
        id: 1,
        title: 'Anxiety Application',
        description:
            'A student mental health platform featuring CBT modules, anxiety videos, gamification, breathing exercises, appointments, todo lists, mood tracking, and streak pet features.',
        image: anxietyAppImage,
        tags: ['TypeScript', 'Node.js', 'Supabase', 'TailwindCSS'],
        category: 'fullstack',
        liveDemo: 'https://anxiety-application.netlify.app/',
        github: 'https://github.com/yansanity1998/anxiety-application',
    },
    {
        id: 2,
        title: 'SPC-RFID Attendance & Payroll',
        description:
            'A comprehensive RFID-based attendance and payroll management system for SPC workers. This system monitors employee attendance through RFID technology and manages payroll calculations efficiently.',
        image: spcRfidImage,
        tags: ['TypeScript', 'Node.js', 'Supabase', 'TailwindCSS'],
        category: 'fullstack',
        liveDemo: 'https://rfid-payroll.netlify.app/',
        github: 'https://github.com/yansanity1998/spc-rfid_payroll',
    },
    {
        id: 3,
        title: 'DSA-OSAS Student & Sports Management System',
        description:
            'A merged student and sports management platform for the Office of Student Affairs & Services (OSAS). It combines a sports management system and a cabinet management system to track athletes, games, and student records in one admin panel.',
        image: osasMainImage,
        tags: ['PHP', 'JavaScript', 'XAMPP', 'TailwindCSS'],
        category: 'fullstack',
        github: 'https://github.com/markjordanugtongspc/OSAS-SIS',
        screenshots: [
            osasScreenshot1,
            osasScreenshot2,
            osasScreenshot3,
            osasScreenshot4,
            osasScreenshot5,
            osasScreenshot6,
            osasScreenshot7,
            osasScreenshot8,
            osasScreenshot9,
        ],
    },
    {
        id: 4,
        title: 'Scannify',
        description:
            'A QR code scanning application that can read even blurry or worn-out codes, show the destination link, keep a history of scans, and let users revisit links easily.',
        image: scannifyImage,
        tags: ['JSX', 'Node.js', 'Supabase', 'TailwindCSS'],
        category: 'fullstack',
        liveDemo: 'https://qrcodescannify.netlify.app/login',
        github: 'https://github.com/mcjovicduarte/QR-code-scanner-app',
    },
    {
        id: 5,
        title: 'Happytoes',
        description:
            'A responsive e-commerce application for socks with Stripe-powered payments, add-to-cart, and favorites features.',
        image: happytoesImage,
        tags: ['JSX', 'Supabase', 'Node.js', 'TailwindCSS'],
        category: 'fullstack',
        liveDemo: 'https://happytoes.vercel.app/',
        github: 'https://github.com/mcjovicduarte/happytoes',
    },
    {
        id: 6,
        title: 'Winter',
        description:
            'A responsive e-commerce application for jackets with Stripe-powered payments, add-to-cart, and favorites features.',
        image: winterImage,
        tags: ['JSX', 'Supabase', 'Node.js', 'TailwindCSS'],
        category: 'fullstack',
        liveDemo: 'https://winter-app-chi.vercel.app/',
        github: 'https://github.com/AndieCris/winter-app',
    },
    {
        id: 7,
        title: 'SprintX',
        description:
            'A responsive e-commerce application for shoes with Stripe-powered payments, add-to-cart, and favorites features.',
        image: sprintxImage,
        tags: ['JSX', 'Supabase', 'Node.js', 'TailwindCSS'],
        category: 'fullstack',
        liveDemo: 'https://sprintx-nine.vercel.app/',
        github: 'https://github.com/Jehujoshua/sprintx',
    },
    {
        id: 8,
        title: 'mcbyte-cafe',
        description:
            'A responsive coffee e-commerce application with add-to-cart and favorites features, focused on a smooth browsing and ordering experience.',
        image: mcbyteImage,
        tags: ['JSX', 'Supabase', 'Node.js', 'TailwindCSS'],
        category: 'fullstack',
        liveDemo: 'https://mcbyte.netlify.app/login',
        github: 'https://github.com/charddss/mcbyte_cafe',
    },
    {
        id: 9,
        title: 'Fruity',
        description:
            'A responsive e-commerce application for drinks with Stripe-powered payments, add-to-cart, and favorites features.',
        image: fruityImage1,
        secondaryImage: fruityImage2,
        tags: ['JSX', 'Supabase', 'Node.js', 'TailwindCSS'],
        category: 'fullstack',
        liveDemo: 'https://fruityfruit.netlify.app/',
        github: 'https://github.com/Harlyn01127/fruity',
    },
    {
        id: 10,
        title: 'AttendEase',
        description:
            'High-fidelity Figma prototype for an attendance system UI, showcasing clean layouts, component structure, and interaction flows.',
        image: attendEaseImage,
        tags: ['Figma'],
        category: 'frontend',
        liveDemo:
            'https://www.figma.com/proto/RERytDlGWPNU9bvQ0rcpt4/Attendance-System?node-id=2-8&t=T5B1c0RsHwWqxeKJ-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A8&show-proto-sidebar=1',
    },
    {
        id: 11,
        title: 'MedScan',
        description:
            'High-fidelity Figma prototype for a medical scanning application, focused on clean UI and clear patient information flows.',
        image: medScanImage,
        tags: ['Figma'],
        category: 'frontend',
        liveDemo:
            'https://www.figma.com/proto/S69640O0vjuZ9BzXvaIwcY/MEDSCAN-APPLICATION?node-id=1-2&t=xgIiOBjPpWdbekcY-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=390%3A3989&show-proto-sidebar=1',
    },
];



const TiltCard = ({ children, onClick, className }: { children: ReactNode, onClick?: () => void, className?: string }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation based on mouse position
        // Top-left should rotate X positive, Y negative?
        // Let's stick to standard tilt logic:
        // Mouse Top -> Rotate X Positive (tilt back)
        // Mouse Bottom -> Rotate X Negative (tilt front) -> CSS rotateX is clockwise. 
        // Actually, usually:
        // Mouse Top -> rotateX(positive) to tip top away? No, rotateX(positive) tips top towards viewer if using right-hand rule?
        // CSS rotateX(10deg) tips top BACK.

        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg tilt
        const rotateY = ((x - centerX) / centerX) * 10; // Max 10 deg tilt

        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out",
            transformPerspective: 1000,
            transformOrigin: "center"
        });

        // Glow effect
        if (glowRef.current) {
            const glowX = (x / rect.width) * 100;
            const glowY = (y / rect.height) * 100;
            gsap.to(glowRef.current, {
                background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.15), transparent 60%)`,
                duration: 0.2
            });
        }
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;

        gsap.to(cardRef.current, {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
            clearProps: "all" // Clear transforms to avoid conflicts if needed, but keeping style is fine usually
        });

        if (glowRef.current) {
            gsap.to(glowRef.current, {
                background: `transparent`,
                duration: 0.3
            });
        }
    };

    return (
        <div
            ref={cardRef}
            className={`relative preserve-3d will-change-transform ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* Glow Overlay */}
            <div ref={glowRef} className="absolute inset-0 z-20 w-full h-full pointer-events-none rounded-2xl transition-opacity duration-300" />
            {children}
        </div>
    );
};

// Typewriter Effect Component
const Typewriter = ({ text, speed = 100, delay = 2000 }: { text: string[], speed?: number, delay?: number }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentText = text[currentIndex];

        const timer = setTimeout(() => {
            if (!isDeleting) {
                if (displayText.length < currentText.length) {
                    setDisplayText(currentText.slice(0, displayText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), delay);
                }
            } else {
                if (displayText.length > 0) {
                    setDisplayText(currentText.slice(0, displayText.length - 1));
                } else {
                    setIsDeleting(false);
                    setCurrentIndex((prev) => (prev + 1) % text.length);
                }
            }
        }, isDeleting ? speed / 2 : speed);

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, currentIndex, text, speed, delay]);

    return (
        <span className="inline-block min-w-[20px]">
            {displayText}
            <span className="animate-pulse text-rose-500">|</span>
        </span>
    );
};

// 3D Tilt Container Component
const TiltContainer = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const card = containerRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;

        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            duration: 0.3,
            ease: 'power2.out',
            transformPerspective: 1000,
            transformOrigin: 'center',
        });
    };

    const handleMouseLeave = () => {
        if (!containerRef.current) return;
        gsap.to(containerRef.current, {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
            clearProps: 'transform'
        });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`${className} transition-all duration-300`}
            style={{ transformStyle: 'preserve-3d' }}
        >
            {children}
        </div>
    );
};

const Content = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);
    const [zoomedScreenshot, setZoomedScreenshot] = useState<string | null>(null);
    const filteredProjects = activeFilter === 'all' ? projects : projects.filter(p => p.category === activeFilter);

    // ... inside Content component return ...

    {/* Avatar with orbiting icons */ }
    <TiltContainer className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 cursor-pointer">
        {/* Rotating rings - moved deeper in Z space */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-rose-500/20 animate-spin" style={{ animationDuration: '20s', transform: 'translateZ(-20px)' }}></div>
        <div className="absolute inset-4 rounded-full border-2 border-dashed border-red-500/20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse', transform: 'translateZ(-10px)' }}></div>

        {/* Glow */}
        <div className="absolute inset-8 rounded-full bg-gradient-to-br from-rose-500/20 to-red-500/20 blur-2xl" style={{ transform: 'translateZ(0px)' }}></div>

        {/* Avatar - pops out */}
        <div
            className="absolute inset-8 rounded-full overflow-hidden border-4 border-zinc-800 shadow-2xl transition-transform active:scale-95"
            style={{ transform: 'translateZ(30px)' }}
            onClick={(e) => {
                // Click bounce/spin effect
                gsap.fromTo(e.currentTarget,
                    { rotation: 0, scale: 0.95 },
                    { rotation: 360, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
                );
            }}
        >
            <img src={PLACEHOLDER_AVATAR} alt="Yan" className="w-full h-full object-cover" />
        </div>

        {/* Orbiting tech icons - floating in front */}
        <div style={{ transform: 'translateZ(50px)' }} className="absolute inset-0 pointer-events-none">
            <OrbitingIcon duration={25} offsetPercent={0}>
                <img src={chatgptLogo} alt="ChatGPT" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
            </OrbitingIcon>
            <OrbitingIcon duration={25} offsetPercent={16.67}>
                <img src={claudeLogo} alt="Claude" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
            </OrbitingIcon>
            <OrbitingIcon duration={25} offsetPercent={33.33}>
                <img src={figmaLogo} alt="Figma" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
            </OrbitingIcon>
            <OrbitingIcon duration={25} offsetPercent={50}>
                <img src={supabaseLogo} alt="Supabase" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
            </OrbitingIcon>
            <OrbitingIcon duration={25} offsetPercent={66.67}>
                <img src={vscodeLogo} alt="VS Code" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
            </OrbitingIcon>
            <OrbitingIcon duration={25} offsetPercent={83.33}>
                <img src={xamppLogo} alt="XAMPP" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
            </OrbitingIcon>
        </div>
    </TiltContainer>
    // Color coding for technology tags
    const getTagColor = (tag: string): string => {
        const colors: { [key: string]: string } = {
            'TypeScript': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
            'JavaScript': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
            'React': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
            'Next.js': 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30',
            'Node.js': 'bg-green-500/20 text-green-400 border-green-500/30',
            'Supabase': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
            'PostgreSQL': 'bg-blue-600/20 text-blue-300 border-blue-600/30',
            'MongoDB': 'bg-green-600/20 text-green-300 border-green-600/30',
            'TailwindCSS': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
            'Prisma': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
            'Docker': 'bg-sky-500/20 text-sky-400 border-sky-500/30',
            'Express': 'bg-gray-500/20 text-gray-300 border-gray-500/30',
            'Vue.js': 'bg-emerald-400/20 text-emerald-300 border-emerald-400/30',
            'D3.js': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
            'OpenAI API': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
            'Framer Motion': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
            'PHP': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
            'XAMPP': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
        };
        return colors[tag] || 'bg-rose-500/20 text-rose-400 border-rose-500/30';
    };

    // Scroll animation using Intersection Observer - replays on every scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Element is entering viewport - add animation
                        entry.target.classList.add('animate-fadeInUp');
                        entry.target.classList.remove('animate-out');
                    } else {
                        // Element is leaving viewport - remove animation so it can replay
                        entry.target.classList.remove('animate-fadeInUp');
                        entry.target.classList.add('animate-out');
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        // Observe all elements with animate-on-scroll class
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach((el) => observer.observe(el));

        return () => {
            animatedElements.forEach((el) => observer.unobserve(el));
        };
    }, [activeFilter]); // Re-run when filter changes

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
            setCurrentScreenshotIndex(0);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedProject]);

    return (
        <main className="bg-[#0a0a0b] text-zinc-50">
            {/* Hero Section */}
            <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(244,63,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(244,63,94,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

                <div className="max-w-7xl mx-auto w-full relative z-10 pt-20">
                    <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800/50 rounded-full border border-zinc-700/50 mb-6">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                <span className="text-sm text-zinc-400">Available for work</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-400 to-orange-400">Yan</span><br />
                                <span className="block text-2xl sm:text-3xl md:text-4xl font-mono text-zinc-400 mt-2 h-12">
                                    <Typewriter text={['Full Stack Developer', 'UI/UX Designer', 'Software Engineer']} />
                                </span>
                            </h1>
                            <p className="text-lg sm:text-xl text-zinc-400 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                                I craft exceptional digital experiences with clean code and modern technologies.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                                <a href="#projects" className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-red-600 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/25 hover:scale-105">
                                    <span>View My Work</span>
                                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </a>
                                <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-zinc-700 text-zinc-300 font-semibold rounded-2xl hover:border-rose-500 hover:text-rose-400 transition-all">Contact Me</a>
                            </div>
                            <div className="flex items-center justify-center lg:justify-start gap-8 mt-12 pt-8 border-t border-zinc-800/50">
                                <div className="text-center"><div className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-400">2+</div><div className="text-sm text-zinc-500">Years Exp</div></div>
                                <div className="w-px h-12 bg-zinc-800"></div>
                                <div className="text-center"><div className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-400">10+</div><div className="text-sm text-zinc-500">Projects</div></div>
                                <div className="w-px h-12 bg-zinc-800"></div>
                                <div className="text-center"><div className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-400">10+</div><div className="text-sm text-zinc-500">Clients</div></div>
                            </div>
                        </div>
                        {/* Avatar with orbiting icons */}
                        <TiltContainer className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                            {/* Rotating rings - moved deeper in Z space */}
                            <div className="absolute inset-0 rounded-full border-2 border-dashed border-rose-500/20 animate-spin" style={{ animationDuration: '20s', transform: 'translateZ(-20px)' }}></div>
                            <div className="absolute inset-4 rounded-full border-2 border-dashed border-red-500/20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse', transform: 'translateZ(-10px)' }}></div>

                            {/* Glow */}
                            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-rose-500/20 to-red-500/20 blur-2xl" style={{ transform: 'translateZ(0px)' }}></div>

                            {/* Avatar - pops out */}
                            <div
                                className="absolute inset-8 rounded-full overflow-hidden border-4 border-zinc-800 shadow-2xl transition-transform"
                                style={{ transform: 'translateZ(30px)' }}
                            >
                                <img src={PLACEHOLDER_AVATAR} alt="Yan" className="w-full h-full object-cover" />
                            </div>

                            {/* Orbiting tech icons - floating in front */}
                            <div style={{ transform: 'translateZ(50px)' }} className="absolute inset-0 pointer-events-none">
                                <OrbitingIcon duration={25} offsetPercent={0}>
                                    <img src={chatgptLogo} alt="ChatGPT" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
                                </OrbitingIcon>
                                <OrbitingIcon duration={25} offsetPercent={16.67}>
                                    <img src={claudeLogo} alt="Claude" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
                                </OrbitingIcon>
                                <OrbitingIcon duration={25} offsetPercent={33.33}>
                                    <img src={figmaLogo} alt="Figma" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
                                </OrbitingIcon>
                                <OrbitingIcon duration={25} offsetPercent={50}>
                                    <img src={supabaseLogo} alt="Supabase" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
                                </OrbitingIcon>
                                <OrbitingIcon duration={25} offsetPercent={66.67}>
                                    <img src={xamppLogo} alt="XAMPP" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
                                </OrbitingIcon>
                                <OrbitingIcon duration={25} offsetPercent={83.33}>
                                    <img src={vscodeLogo} alt="VS Code" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
                                </OrbitingIcon>
                            </div>
                        </TiltContainer>
                    </div>
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 animate-bounce">
                    <span className="text-xs text-zinc-500 uppercase tracking-widest">Scroll</span>
                    <div className="w-6 h-10 rounded-full border-2 border-zinc-700 flex items-start justify-center p-2"><div className="w-1.5 h-3 bg-rose-500 rounded-full"></div></div>
                </div>
            </section>

            {/* About Section */}
            <AboutMe />

            {/* Skills Section */}
            <section id="skills" className="py-24 sm:py-32 px-4">
                <div className="max-w-7xl mx-auto">
                    <SkillsSection
                        projects={projects}
                        activeFilter={activeFilter}
                        setActiveFilter={setActiveFilter}
                    />
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-24 sm:py-32 px-4 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16 animate-on-scroll">
                        <span className="text-rose-400 font-medium tracking-widest uppercase text-sm">My Projects</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4">Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-400">Work</span></h2>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {['all', 'frontend', 'backend', 'fullstack'].map((filter) => (
                            <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${activeFilter === filter ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg' : 'bg-zinc-800/50 text-zinc-400 hover:text-zinc-100'}`}>
                                {filter.charAt(0).toUpperCase() + filter.slice(1)}
                            </button>
                        ))}
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project, index) => (
                            <div key={project.id} className={`animate-on-scroll stagger-${(index % 3) + 1} h-full`}>
                                <TiltCard
                                    onClick={() => setSelectedProject(project)}
                                    className="group bg-zinc-900/50 rounded-2xl border border-zinc-800 overflow-hidden hover:border-rose-500/50 transition-colors hover:shadow-2xl hover:shadow-rose-500/10 cursor-pointer h-full flex flex-col"
                                >
                                    <div className="relative h-56 sm:h-64 overflow-hidden bg-black/60 shrink-0">
                                        {project.secondaryImage ? (
                                            <div className="flex w-full h-full">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-1/2 h-full object-contain transition-transform duration-700 group-hover:scale-[1.05]"
                                                />
                                                <img
                                                    src={project.secondaryImage}
                                                    alt={`${project.title} secondary`}
                                                    className="w-1/2 h-full object-contain transition-transform duration-700 group-hover:scale-[1.05]"
                                                />
                                            </div>
                                        ) : (
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.05]"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>

                                        {/* Floating Badge */}
                                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                                            <span className="text-xs font-semibold text-white bg-rose-500/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">View Details</span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow relative bg-zinc-900/50 backdrop-blur-sm">
                                        <h3 className="text-xl font-bold text-zinc-100 mb-2 group-hover:text-rose-400 transition-colors">{project.title}</h3>
                                        <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className={`px-3 py-1 text-xs font-medium rounded-full border ${getTagColor(tag)}`}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </TiltCard>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 sm:py-32 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16 animate-on-scroll">
                        <span className="text-rose-400 font-medium tracking-widest uppercase text-sm">Get In Touch</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4">Let's Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-400">Together</span></h2>
                        <p className="text-zinc-400 mt-4">Have a project in mind? Let's discuss how we can collaborate.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            {/* Contact Info Cards */}
                            <div className="grid gap-4">
                                {/* Email Card */}
                                <div className="p-6 bg-zinc-900/30 backdrop-blur-sm rounded-2xl border border-zinc-800 hover:border-rose-500/50 hover:bg-zinc-900/50 transition-all duration-300 group">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 shrink-0 bg-rose-500/10 rounded-xl flex items-center justify-center group-hover:bg-rose-500/20 transition-colors border border-rose-500/20">
                                            <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-zinc-400 mb-1">Email</h4>
                                            <p className="text-zinc-100 font-medium break-all group-hover:text-rose-400 transition-colors">
                                                jesperianbarila.202101066@gmail.com
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Location Card */}
                                <div className="p-6 bg-zinc-900/30 backdrop-blur-sm rounded-2xl border border-zinc-800 hover:border-rose-500/50 hover:bg-zinc-900/50 transition-all duration-300 group">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 shrink-0 bg-rose-500/10 rounded-xl flex items-center justify-center group-hover:bg-rose-500/20 transition-colors border border-rose-500/20">
                                            <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-zinc-400 mb-1">Location</h4>
                                            <p className="text-zinc-100 font-medium group-hover:text-rose-400 transition-colors">
                                                Prk. Jasmin Acmac Iligan City
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Phone Card */}
                                <div className="p-6 bg-zinc-900/30 backdrop-blur-sm rounded-2xl border border-zinc-800 hover:border-rose-500/50 hover:bg-zinc-900/50 transition-all duration-300 group">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 shrink-0 bg-rose-500/10 rounded-xl flex items-center justify-center group-hover:bg-rose-500/20 transition-colors border border-rose-500/20">
                                            <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-zinc-400 mb-1">Phone</h4>
                                            <p className="text-zinc-100 font-medium group-hover:text-rose-400 transition-colors">
                                                09514696308
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {[
                                    { name: 'GitHub', href: 'https://github.com/yansanity1998', icon: 'github', colorClass: 'hover:bg-[#24292e] hover:text-white' },
                                    { name: 'Facebook', href: 'https://www.facebook.com/jesper.ian.villacorte', icon: 'facebook', colorClass: 'hover:bg-[#1877F2] hover:text-white' },
                                    { name: 'Instagram', href: 'https://www.instagram.com/_iantheone_/', icon: 'instagram', colorClass: 'hover:bg-[#E1306C] hover:text-white' },
                                    { name: 'TikTok', href: 'https://www.tiktok.com', icon: 'tiktok', colorClass: 'hover:bg-white hover:text-black' },
                                ].map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-10 h-10 bg-zinc-800/50 rounded-xl flex items-center justify-center text-zinc-400 transition-all duration-300 group ${social.colorClass}`}
                                        aria-label={social.name}
                                    >
                                        {social.icon === 'github' && (
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                        )}
                                        {social.icon === 'facebook' && (
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.148 0-2.797 1.603-2.797 2.898v1.074h3.44l-.62 3.666h-2.82v7.98c-8.107-1.41-8.107-1.41-8.107-1.41z" />
                                            </svg>
                                        )}
                                        {social.icon === 'instagram' && (
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.225-.149-4.771-1.664-4.919-4.919-.058-1.265-.069-1.644-.069-4.849 0-3.204.012-3.584.069-4.849.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                            </svg>
                                        )}
                                        {social.icon === 'tiktok' && (
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                                            </svg>
                                        )}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <Contact />
                    </div>
                </div>
            </section>

            {/* Project Modal */}
            {selectedProject && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    onClick={() => setSelectedProject(null)}
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md"></div>

                    {/* Modal Content */}
                    <div
                        className="relative bg-zinc-900 rounded-3xl border border-zinc-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl thin-scrollbar"
                        style={{ animation: 'modalSlideIn 0.3s ease-out' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedProject(null)}
                            className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-rose-500 transition-all"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Project Image - Full Width */}
                        <div className="relative h-72 sm:h-80 md:h-[26rem] overflow-hidden bg-black">
                            {selectedProject.secondaryImage ? (
                                <div className="flex w-full h-full">
                                    <img
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        className="w-1/2 h-full object-contain"
                                    />
                                    <img
                                        src={selectedProject.secondaryImage}
                                        alt={`${selectedProject.title} secondary`}
                                        className="w-1/2 h-full object-contain"
                                    />
                                </div>
                            ) : (
                                <img
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    className="w-full h-full object-contain"
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent"></div>
                        </div>

                        {/* Project Details */}
                        <div className="p-6 sm:p-8 -mt-20 relative">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                                {selectedProject.title}
                            </h2>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {selectedProject.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className={`px-4 py-1.5 text-sm font-medium rounded-full border ${getTagColor(tag)}`}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Full Description */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-zinc-100 mb-3">About this project</h3>
                                <p className="text-zinc-400 leading-relaxed text-base">
                                    {selectedProject.description}
                                </p>
                                {selectedProject.title === 'DSA-OSAS Student & Sports Management System' && (
                                    <p className="text-zinc-400 leading-relaxed text-base mt-3">
                                        This project is built with PHP, JavaScript, and XAMPP and merges two systems: a
                                        complete sports management system (athletes, events, game results) and a cabinet
                                        management system for student and organization records under OSAS.
                                    </p>
                                )}
                            </div>

                            {/* Feature Screenshots Carousel */}
                            {selectedProject.screenshots && selectedProject.screenshots.length > 0 && (
                                <div className="mb-8">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-lg font-semibold text-zinc-100">Feature Screens</h3>
                                        <span className="text-xs text-zinc-500">
                                            {currentScreenshotIndex + 1} / {selectedProject.screenshots.length}
                                        </span>
                                    </div>
                                    <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/60">
                                        <button
                                            type="button"
                                            className="w-full h-64 group cursor-zoom-in"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const current = selectedProject.screenshots
                                                    ? selectedProject.screenshots[currentScreenshotIndex]
                                                    : null;
                                                if (current) {
                                                    setZoomedScreenshot(current);
                                                }
                                            }}
                                        >
                                            <img
                                                src={selectedProject.screenshots[currentScreenshotIndex]}
                                                alt={`${selectedProject.title} feature ${currentScreenshotIndex + 1}`}
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                            />
                                        </button>
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 left-0 flex items-center px-3 text-sm bg-black/40 hover:bg-black/60 text-zinc-100"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setCurrentScreenshotIndex((prev) =>
                                                    selectedProject.screenshots
                                                        ? (prev - 1 + selectedProject.screenshots.length) %
                                                        selectedProject.screenshots.length
                                                        : prev,
                                                );
                                            }}
                                        >
                                            ‹
                                        </button>
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 flex items-center px-3 text-sm bg-black/40 hover:bg-black/60 text-zinc-100"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setCurrentScreenshotIndex((prev) =>
                                                    selectedProject.screenshots
                                                        ? (prev + 1) % selectedProject.screenshots.length
                                                        : prev,
                                                );
                                            }}
                                        >
                                            ›
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-zinc-800">
                                <span className="px-4 py-2 bg-rose-500/20 text-rose-400 rounded-full text-sm font-medium border border-rose-500/30">
                                    {selectedProject.category.charAt(0).toUpperCase() + selectedProject.category.slice(1)}
                                </span>
                                {selectedProject.github && (
                                    <a
                                        href={selectedProject.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full text-sm font-medium transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        View on GitHub
                                    </a>
                                )}
                                {selectedProject.liveDemo && selectedProject.liveDemo !== '#' && (
                                    <a
                                        href={selectedProject.liveDemo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white rounded-full text-sm font-medium transition-colors"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {zoomedScreenshot && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center p-4"
                    onClick={() => setZoomedScreenshot(null)}
                >
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />
                    <div
                        className="relative max-w-5xl w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-zinc-100 flex items-center justify-center"
                            onClick={() => setZoomedScreenshot(null)}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="relative">
                            <img
                                src={zoomedScreenshot}
                                alt="Zoomed feature screen"
                                className="w-full max-h-[80vh] object-contain rounded-2xl border border-zinc-800 bg-black"
                            />
                            {selectedProject?.screenshots && selectedProject.screenshots.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 hover:bg-black/80 text-zinc-100 w-10 h-10 flex items-center justify-center"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (selectedProject?.screenshots && selectedProject.screenshots.length > 0) {
                                                const len = selectedProject.screenshots.length;
                                                const nextIndex = (currentScreenshotIndex - 1 + len) % len;
                                                setCurrentScreenshotIndex(nextIndex);
                                                setZoomedScreenshot(selectedProject.screenshots[nextIndex]);
                                            }
                                        }}
                                    >
                                        ‹
                                    </button>
                                    <button
                                        type="button"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 hover:bg-black/80 text-zinc-100 w-10 h-10 flex items-center justify-center"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (selectedProject?.screenshots && selectedProject.screenshots.length > 0) {
                                                const len = selectedProject.screenshots.length;
                                                const nextIndex = (currentScreenshotIndex + 1) % len;
                                                setCurrentScreenshotIndex(nextIndex);
                                                setZoomedScreenshot(selectedProject.screenshots[nextIndex]);
                                            }
                                        }}
                                    >
                                        ›
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Content;
