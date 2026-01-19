import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import problemSolverIcon from '../assets/problem_solver.png';
import designFocusedIcon from '../assets/design_focused.png';
import fastLearnerIcon from '../assets/fast_learner.png';
import teamPlayerIcon from '../assets/team_player.png';
import cvImage from '../assets/cv.png';
import cvPdf from '../CV.pdf';
import PullToScan from './PullToScan';

const experiences = [
    { role: 'Full Stack Web Developer', company: 'Various Clients', period: '2023 - Present', description: 'Building responsive web applications and managing end-to-end development projects.' },
    { role: 'UI/UX Designer', company: 'Figma Projects', period: '2023 - Present', description: 'Creating modern, user-centered designs and prototypes using Figma.' },
    { role: 'Web Application Developer', company: 'Various Clients', period: '2023 - Present', description: 'Developing custom web applications with React, databases, and modern tech stack.' },
];

const AboutMe = () => {
    const [showCV, setShowCV] = useState(false);

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
                        <p className="text-lg text-zinc-400 leading-relaxed">I'm a passionate full stack developer with over 2 years of experience building web applications. My journey started with curiosity about how websites work, and evolved into a passion for creating seamless user experiences.</p>
                        <p className="text-lg text-zinc-400 leading-relaxed">I specialize in React, modern JavaScript frameworks, and building intuitive user interfaces. I love tackling complex problems and turning them into simple, beautiful solutions.</p>



                        <div className="pt-2">
                            <h3 className="text-xl font-semibold mb-4">Experience</h3>
                            <div className="space-y-4">
                                {experiences.map((exp, i) => (
                                    <div key={i} className="group relative pl-6 border-l-2 border-zinc-800 hover:border-rose-500 transition-colors">
                                        <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-zinc-800 border-2 border-zinc-700 group-hover:border-rose-500 group-hover:bg-rose-500 transition-colors"></div>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-1"><span className="font-semibold text-zinc-100">{exp.role}</span><span className="text-sm text-rose-400">@ {exp.company}</span></div>
                                        <span className="text-sm text-zinc-500">{exp.period}</span>
                                        <p className="text-zinc-400 mt-2">{exp.description}</p>
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
                                { icon: problemSolverIcon, title: 'Problem Solver', desc: 'Breaking down complex challenges' },
                                { icon: designFocusedIcon, title: 'Design Focused', desc: 'Creating beautiful interfaces' },
                                { icon: fastLearnerIcon, title: 'Fast Learner', desc: 'Always exploring new tech' },
                                { icon: teamPlayerIcon, title: 'Team Player', desc: 'Effective collaboration' }
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className={`relative overflow-hidden p-6 rounded-2xl border border-zinc-700/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-rose-500/50 group cursor-pointer ${i % 2 === 1 ? 'sm:mt-8' : ''}`}
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(39,39,42,0.8) 0%, rgba(24,24,27,0.9) 100%)'
                                    }}
                                >
                                    {/* Subtle glow effect on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-rose-500/0 to-red-500/0 group-hover:from-rose-500/5 group-hover:to-red-500/5 transition-all duration-300"></div>

                                    {/* Icon with glow */}
                                    <div className="relative mb-4">
                                        <div className="absolute inset-0 bg-rose-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                                        <img src={item.icon} alt={item.title} className="relative w-12 h-12 object-contain" />
                                    </div>

                                    {/* Content */}
                                    <h4 className="relative font-bold text-base text-zinc-100 mb-2 group-hover:text-white transition-colors">{item.title}</h4>
                                    <p className="relative text-sm text-zinc-400 leading-relaxed">{item.desc}</p>

                                    {/* Corner accent */}
                                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-rose-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            ))}
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