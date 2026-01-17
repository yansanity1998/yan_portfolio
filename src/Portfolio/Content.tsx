import { useState, useEffect } from 'react';
import Contact from './Contact';
import profileImage from '../assets/ian.png';
// Brand logos
import figmaLogo from '../assets/figma.png';
import chatgptLogo from '../assets/chatgpt.png';
import claudeLogo from '../assets/claude.png';
import vscodeLogo from '../assets/vscode.png';
import supabaseLogo from '../assets/supabase.png';
import xamppLogo from '../assets/xampp.png';
// Skill card icons
import problemSolverIcon from '../assets/problem_solver.png';
import designFocusedIcon from '../assets/design_focused.png';
import fastLearnerIcon from '../assets/fast_learner.png';
import teamPlayerIcon from '../assets/team_player.png';
// Project images
import anxietyAppImage from '../assets/anxiety-application.png';
import spcRfidImage from '../assets/spc-rfid.png';

const PLACEHOLDER_AVATAR = profileImage;

// Skill type definition
interface Skill {
    name: string;
    icon?: string;
    iconImg?: string;
    category: string;
    level: number;
}

// Expanded skills with brand logos
const skills: Skill[] = [
    // Frontend
    { name: 'React', icon: '⚛️', category: 'frontend', level: 90 },
    { name: 'TypeScript', icon: '📘', category: 'frontend', level: 85 },
    { name: 'Next.js', icon: '▲', category: 'frontend', level: 88 },
    { name: 'Tailwind CSS', icon: '🎨', category: 'frontend', level: 95 },
    { name: 'JavaScript', icon: '💛', category: 'frontend', level: 92 },
    { name: 'HTML/CSS', icon: '🌐', category: 'frontend', level: 95 },
    // Backend
    { name: 'Node.js', icon: '💚', category: 'backend', level: 85 },
    { name: 'Express', icon: '🚀', category: 'backend', level: 80 },
    { name: 'PostgreSQL', icon: '🐘', category: 'backend', level: 82 },
    { name: 'MongoDB', icon: '🍃', category: 'backend', level: 78 },
    { name: 'Supabase', iconImg: supabaseLogo, category: 'backend', level: 85 },
    { name: 'MySQL', icon: '🐬', category: 'backend', level: 80 },
    { name: 'PHP', icon: '🐘', category: 'backend', level: 75 },
    // Tools & AI
    { name: 'VS Code', iconImg: vscodeLogo, category: 'tools', level: 95 },
    { name: 'Git', icon: '📦', category: 'tools', level: 90 },
    { name: 'GitHub', icon: '🐙', category: 'tools', level: 90 },
    { name: 'Figma', iconImg: figmaLogo, category: 'tools', level: 85 },
    { name: 'Docker', icon: '🐳', category: 'tools', level: 75 },
    { name: 'XAMPP', iconImg: xamppLogo, category: 'tools', level: 80 },
    { name: 'Postman', icon: '📮', category: 'tools', level: 85 },
    { name: 'ChatGPT', iconImg: chatgptLogo, category: 'tools', level: 90 },
    { name: 'Claude AI', iconImg: claudeLogo, category: 'tools', level: 88 },
    { name: 'Vercel', icon: '▲', category: 'tools', level: 85 },
    { name: 'Netlify', icon: '🌍', category: 'tools', level: 80 },
    { name: 'npm', icon: '📦', category: 'tools', level: 90 },
];

// Orbiting icon component - icons circle slowly around the avatar (fully responsive)
const OrbitingIcon = ({
    children,
    duration,
    offsetPercent = 0
}: {
    children: React.ReactNode,
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

const projects = [
    { id: 1, title: 'Anxiety Application', description: 'A student mental health platform featuring CBT modules, anxiety videos, gamification, breathing exercises, appointments, todo lists, mood tracking, and streak pet features.', image: anxietyAppImage, tags: ['TypeScript', 'Node.js', 'Supabase'], category: 'fullstack', liveDemo: 'https://anxiety-application.netlify.app/', github: 'https://github.com/yansanity1998/anxiety-application' },
    { id: 2, title: 'SPC-RFID Attendance & Payroll', description: 'A comprehensive RFID-based attendance and payroll management system for SPC workers. This system monitors employee attendance through RFID technology and manages payroll calculations efficiently.', image: spcRfidImage, tags: ['TypeScript', 'Node.js', 'Supabase'], category: 'fullstack', liveDemo: 'https://rfid-payroll.netlify.app/', github: 'https://github.com/yansanity1998/spc-rfid_payroll' },
    { id: 3, title: 'AI Chat Interface', description: 'Modern chat application powered by OpenAI.', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop', tags: ['React', 'OpenAI API', 'TailwindCSS'], category: 'frontend', liveDemo: '#', github: '#' },
    { id: 4, title: 'Analytics Dashboard', description: 'Real-time data visualization with interactive charts.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop', tags: ['Vue.js', 'D3.js', 'MongoDB'], category: 'fullstack', liveDemo: '#', github: '#' },
    { id: 5, title: 'REST API Service', description: 'Scalable microservices with authentication.', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop', tags: ['Node.js', 'Express', 'Docker'], category: 'backend', liveDemo: '#', github: '#' },
    { id: 6, title: 'Portfolio Template', description: 'Modern, responsive portfolio with animations.', image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop', tags: ['React', 'Framer Motion'], category: 'frontend', liveDemo: '#', github: '#' },
];

const experiences = [
    { role: 'Full Stack Web Developer', company: 'Various Clients', period: '2023 - Present', description: 'Building responsive web applications and managing end-to-end development projects.' },
    { role: 'UI/UX Designer', company: 'Figma Projects', period: '2023 - Present', description: 'Creating modern, user-centered designs and prototypes using Figma.' },
    { role: 'Web Application Developer', company: 'Various Clients', period: '2023 - Present', description: 'Developing custom web applications with React, databases, and modern tech stack.' },
];

const Content = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
    const filteredProjects = activeFilter === 'all' ? projects : projects.filter(p => p.category === activeFilter);
    const filteredSkills = activeFilter === 'all' ? skills : skills.filter(s => s.category === activeFilter);

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
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedProject]);

    // Render skill icon (either emoji or image)
    const renderSkillIcon = (skill: Skill) => {
        if (skill.iconImg) {
            return (
                <img
                    src={skill.iconImg}
                    alt={skill.name}
                    className="w-8 h-8 object-contain"
                />
            );
        }
        return <span className="text-3xl">{skill.icon}</span>;
    };

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
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800/50 rounded-full border border-zinc-700/50 mb-6">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                <span className="text-sm text-zinc-400">Available for work</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-400 to-orange-400">Yan</span><br />
                                <span className="text-zinc-400">Full Stack Developer</span>
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
                        <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                            {/* Rotating rings */}
                            <div className="absolute inset-0 rounded-full border-2 border-dashed border-rose-500/20 animate-spin" style={{ animationDuration: '20s' }}></div>
                            <div className="absolute inset-4 rounded-full border-2 border-dashed border-red-500/20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
                            {/* Glow */}
                            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-rose-500/20 to-red-500/20 blur-2xl"></div>
                            {/* Avatar */}
                            <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-zinc-800 shadow-2xl">
                                <img src={PLACEHOLDER_AVATAR} alt="Yan" className="w-full h-full object-cover" />
                            </div>
                            {/* Orbiting tech icons - slowly circling */}
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
                    </div>
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 animate-bounce">
                    <span className="text-xs text-zinc-500 uppercase tracking-widest">Scroll</span>
                    <div className="w-6 h-10 rounded-full border-2 border-zinc-700 flex items-start justify-center p-2"><div className="w-1.5 h-3 bg-rose-500 rounded-full"></div></div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 sm:py-32 px-4 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-500/5 to-transparent"></div>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16 animate-on-scroll">
                        <span className="text-rose-400 font-medium tracking-widest uppercase text-sm">About Me</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4">Passionate About <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-400">Technology</span></h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <p className="text-lg text-zinc-400 leading-relaxed">I'm a passionate full stack developer with over 2 years of experience building web applications. My journey started with curiosity about how websites work, and evolved into a passion for creating seamless user experiences.</p>
                            <p className="text-lg text-zinc-400 leading-relaxed">I specialize in React, modern JavaScript frameworks, and building intuitive user interfaces. I love tackling complex problems and turning them into simple, beautiful solutions.</p>
                            <div className="pt-6">
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
                        <div className="grid grid-cols-2 gap-5">
                            {[
                                { icon: problemSolverIcon, title: 'Problem Solver', desc: 'Breaking down complex challenges' },
                                { icon: designFocusedIcon, title: 'Design Focused', desc: 'Creating beautiful interfaces' },
                                { icon: fastLearnerIcon, title: 'Fast Learner', desc: 'Always exploring new tech' },
                                { icon: teamPlayerIcon, title: 'Team Player', desc: 'Effective collaboration' }
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className={`relative overflow-hidden p-6 rounded-2xl border border-zinc-700/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-rose-500/50 group cursor-pointer ${i % 2 === 1 ? 'mt-8' : ''}`}
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
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-24 sm:py-32 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 animate-on-scroll">
                        <span className="text-rose-400 font-medium tracking-widest uppercase text-sm">My Skills</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4">Technologies I <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-400">Work With</span></h2>
                        <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">From development tools to AI assistants, here's my complete tech stack</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {['all', 'frontend', 'backend', 'tools'].map((cat) => (
                            <button key={cat} onClick={() => setActiveFilter(cat)} className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${activeFilter === cat ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg shadow-rose-500/25' : 'bg-zinc-800/50 text-zinc-400 hover:text-zinc-100'}`}>
                                {cat === 'all' ? 'All' : cat === 'frontend' ? 'Frontend' : cat === 'backend' ? 'Backend & DB' : 'Tools & AI'}
                            </button>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {filteredSkills.map((skill, index) => (
                            <div key={skill.name} className={`animate-on-scroll group p-5 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-rose-500/50 transition-all hover:shadow-xl hover:shadow-rose-500/10 hover:-translate-y-1 stagger-${(index % 6) + 1}`}>
                                <div className="h-10 mb-3 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                                    {renderSkillIcon(skill)}
                                </div>
                                <h4 className="font-medium text-zinc-100 text-sm mb-2 text-center">{skill.name}</h4>
                                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-rose-500 to-red-500 rounded-full transition-all duration-500" style={{ width: `${skill.level}%` }}></div></div>
                            </div>
                        ))}
                    </div>
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
                            <div
                                key={project.id}
                                onClick={() => setSelectedProject(project)}
                                className={`animate-on-scroll group bg-zinc-900/50 rounded-2xl border border-zinc-800 overflow-hidden hover:border-rose-500/50 transition-all hover:shadow-2xl hover:shadow-rose-500/10 cursor-pointer stagger-${(index % 3) + 1}`}
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                        <span className="text-xs text-zinc-400 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">Click to view</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-zinc-100 mb-2 group-hover:text-rose-400 transition-colors">{project.title}</h3>
                                    <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                                    <div className="flex flex-wrap gap-2">
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
                            <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-rose-500/50 transition-colors group flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-red-600 rounded-xl flex items-center justify-center"><svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></div>
                                <div><h4 className="font-semibold text-zinc-100 group-hover:text-rose-400 transition-colors">Email</h4><p className="text-zinc-400">jesperianbarila.202101066@gmail.com</p></div>
                            </div>
                            <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-rose-500/50 transition-colors group flex items-center gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-red-600 rounded-xl flex items-center justify-center"><svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg></div>
                                <div><h4 className="font-semibold text-zinc-100 group-hover:text-rose-400 transition-colors">Location</h4><p className="text-zinc-400">Prk. Jasmin Acmac Iligan City</p></div>
                            </div>
                            <div className="flex gap-4">
                                {['github', 'linkedin', 'twitter'].map((s) => (<a key={s} href="#" className="w-12 h-12 bg-zinc-800/50 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white hover:bg-rose-500 transition-all">{s === 'github' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>}{s === 'linkedin' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>}{s === 'twitter' && <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>}</a>))}
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
                        className="relative bg-zinc-900 rounded-3xl border border-zinc-800 max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
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
                        <div className="relative h-72 sm:h-80 md:h-96 overflow-hidden">
                            <img
                                src={selectedProject.image}
                                alt={selectedProject.title}
                                className="w-full h-full object-cover object-top"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent"></div>
                        </div>

                        {/* Project Details - Scrollable */}
                        <div className="p-6 sm:p-8 -mt-20 relative max-h-[50vh] overflow-y-auto">
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
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-4 pt-4 border-t border-zinc-800">
                                <span className="px-4 py-2 bg-rose-500/20 text-rose-400 rounded-full text-sm font-medium border border-rose-500/30">
                                    {selectedProject.category.charAt(0).toUpperCase() + selectedProject.category.slice(1)}
                                </span>
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
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Content;
