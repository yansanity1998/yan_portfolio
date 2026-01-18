import { useMemo, useRef } from 'react';
import gsap from 'gsap';
import figmaLogo from '../assets/figma.png';
import chatgptLogo from '../assets/chatgpt.png';
import claudeLogo from '../assets/claude.png';
import vscodeLogo from '../assets/vscode.png';
import supabaseLogo from '../assets/supabase.png';
import jsLogo from '../assets/skills/js.png';
import nodeLogo from '../assets/skills/nodejs.png';
import phpLogo from '../assets/skills/php.png';
import reactLogo from '../assets/skills/react.png';
import tailwindLogo from '../assets/skills/tailwind.png';
import xamppSkillLogo from '../assets/skills/xampp.jpg';
import typescriptLogo from '../assets/skills/typescript.png';

interface Skill {
    name: string;
    icon?: string;
    iconImg?: string;
    category: 'frontend' | 'backend' | 'tools';
    level: number;
}

interface SkillsSectionProps {
    projects: { tags: string[] }[];
    activeFilter: string;
    setActiveFilter: (filter: string) => void;
}

const tagToColor: { [key: string]: string } = {
    React: '#61DAFB',
    'TypeScript': '#3178C6',
    'JavaScript': '#F7DF1E',
    'TailwindCSS': '#38B2AC',
    'Vue.js': '#4FC08D',
    'Framer Motion': '#E15799',
    'HTML': '#E34F26',
    'CSS': '#1572B6',

    'Node.js': '#339933',
    'Supabase': '#3ECF8E',
    'PostgreSQL': '#336791',
    'MongoDB': '#47A248',
    'PHP': '#777BB4',
    'Express': '#ffffff',
    'D3.js': '#F9A03C',

    Docker: '#2496ED',
    XAMPP: '#FB7A24',
    Figma: '#F24E1E',
    'ChatGPT': '#10A37F',
    'Claude AI': '#D97757',
    'VS Code': '#007ACC',
    Git: '#F05032',
    GitHub: '#ffffff',
    Netlify: '#00C7B7',
    Vercel: '#ffffff',
};

// Helper: Convert hex to rgb string for flexible opacity usage if needed
const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '244, 63, 94'; // default rose
};

const tagToCategory: { [key: string]: Skill['category'] } = {
    React: 'frontend',
    'TypeScript': 'frontend',
    'JavaScript': 'frontend',
    'TailwindCSS': 'frontend',
    'Vue.js': 'frontend',
    'Framer Motion': 'frontend',
    'HTML': 'frontend',
    'CSS': 'frontend',

    'Node.js': 'backend',
    'Supabase': 'backend',
    'PostgreSQL': 'backend',
    'MongoDB': 'backend',
    'PHP': 'backend',
    'Express': 'backend',
    'D3.js': 'backend',

    Docker: 'tools',
    XAMPP: 'tools',
    Figma: 'tools',
    'ChatGPT': 'tools',
    'Claude AI': 'tools',
    'VS Code': 'tools',
    Git: 'tools',
    GitHub: 'tools',
    Netlify: 'tools',
    Vercel: 'tools',
};

const tagToIconImg: { [key: string]: string } = {
    Supabase: supabaseLogo,
    React: reactLogo,
    'TypeScript': typescriptLogo,
    'JavaScript': jsLogo,
    'Node.js': nodeLogo,
    PHP: phpLogo,
    'TailwindCSS': tailwindLogo,
    XAMPP: xamppSkillLogo,
    Figma: figmaLogo,
    'ChatGPT': chatgptLogo,
    'Claude AI': claudeLogo,
    'VS Code': vscodeLogo,
};

const tagToIcon: { [key: string]: string } = {
    React: '⚛️',
    'TypeScript': '📘',
    'JavaScript': '💛',
    'TailwindCSS': '🎨',
    'Vue.js': '🟢',
    'Framer Motion': '🎞️',
    HTML: '🌐',
    CSS: '🎯',
    'Node.js': '💚',
    'Supabase': '🟢',
    'PostgreSQL': '🐘',
    'MongoDB': '🍃',
    PHP: '🐘',
    Express: '🚀',
    'D3.js': '📊',
    Docker: '🐳',
    XAMPP: '🔥',
};

const buildSkillsFromProjects = (projects: { tags: string[] }[]): Skill[] => {
    // Count how many projects use each tag (once per project)
    const counts = new Map<string, number>();

    projects.forEach((project) => {
        const uniqueTags = new Set(project.tags);
        uniqueTags.forEach((tag) => {
            counts.set(tag, (counts.get(tag) ?? 0) + 1);
        });
    });

    if (counts.size === 0) return [];

    const skills: Skill[] = [];

    counts.forEach((_, tag) => {
        const category = tagToCategory[tag] || 'tools';
        const iconImg = tagToIconImg[tag];
        const icon = iconImg ? undefined : tagToIcon[tag] ?? '💻';

        skills.push({
            name: tag,
            category,
            level: 0, // unused
            iconImg,
            icon,
        });
    });

    return skills.sort((a, b) => a.name.localeCompare(b.name));
};

const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    // Get color or default to Rose-500
    const colorHex = tagToColor[skill.name] || '#F43F5E';
    const rgb = hexToRgb(colorHex);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -15; // Max 15deg tilt
        const rotateY = ((x - centerX) / centerX) * 15;

        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            scale: 1.1,
            borderColor: `rgba(${rgb}, 0.5)`, // Animate border color
            boxShadow: `0 8px 30px rgba(0,0,0,0.12), 0 0 20px rgba(${rgb}, 0.1)`, // Colored shadow
            duration: 0.3,
            ease: 'power2.out',
            transformPerspective: 1000,
            transformOrigin: 'center',
        });

        if (glowRef.current) {
            const glowX = (x / rect.width) * 100;
            const glowY = (y / rect.height) * 100;
            gsap.to(glowRef.current, {
                background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(${rgb}, 0.15), transparent 80%)`,
                duration: 0.3,
            });
        }
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;

        gsap.to(cardRef.current, {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            borderColor: 'rgba(39, 39, 42, 0.5)', // zinc-800/50
            boxShadow: 'none',
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
            clearProps: 'transform' // Optional: clear if you strictly want to revert to CSS
        });

        if (glowRef.current) {
            gsap.to(glowRef.current, {
                background: 'transparent',
                duration: 0.3,
            });
        }
    };

    const renderSkillIcon = (skill: Skill) => {
        if (skill.iconImg) {
            return (
                <img
                    src={skill.iconImg}
                    alt={skill.name}
                    className="w-8 h-8 object-contain drop-shadow-md grayscale group-hover:grayscale-0 transition-all duration-300"
                />
            );
        }
        return <span className="text-2xl filter drop-shadow-sm grayscale group-hover:grayscale-0 transition-all duration-300">{skill.icon}</span>;
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`animate-on-scroll group relative flex flex-col items-center gap-4 p-5 bg-zinc-900/40 backdrop-blur-md rounded-2xl border border-zinc-800/50 transition-colors duration-300 ease-out hover:z-10 shadow-lg stagger-${(index % 6) + 1
                }`}
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* Dynamic Glow Overlay */}
            <div
                ref={glowRef}
                className="absolute inset-0 rounded-2xl pointer-events-none z-0 transition-opacity duration-300"
            />

            {/* Icon Container with "Inset" realistic look (translated in Z for depth) */}
            <div
                className="relative z-10 w-14 h-14 flex items-center justify-center bg-zinc-950 rounded-xl shadow-inner border border-zinc-800/50 transition-all duration-300"
                style={{
                    transform: 'translateZ(20px)',
                    // We'll use CSS variables or direct style for the hover border since it's cleaner than GSAP for internal element if possible,
                    // but since we are doing complex mapping, let's keep using group-hover with a style injection OR just inline style the hover color.
                    // Actually, let's just animate this border with the parent or leave it subtle.
                    // Let's use inline style for the 'active' state if we could, but here we'll use a unique glowing background.
                }}
            >
                {/* We can use a style block to inject the hover color into a CSS variable for this specific instance */}
                <style>{`
                    .group:hover .icon-border-${index} {
                        border-color: rgba(${rgb}, 0.3);
                        box-shadow: inset 0 2px 4px rgba(0,0,0,0.6);
                    }
                    .group:hover .icon-glow-${index} {
                        opacity: 1;
                    }
                `}</style>

                {/* Apply the dynamic class */}
                <div className={`absolute inset-0 rounded-xl border border-transparent icon-border-${index} transition-colors duration-300 pointer-events-none`}></div>

                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-xl pointer-events-none"></div>
                {renderSkillIcon(skill)}

                {/* Glow behind icon on hover */}
                <div
                    className={`absolute inset-0 blur-xl rounded-full opacity-0 transition-opacity duration-300 icon-glow-${index}`}
                    style={{ backgroundColor: `rgba(${rgb}, 0.2)` }}
                ></div>
            </div>

            <h4 className="relative z-10 font-medium text-sm text-zinc-400 group-hover:text-zinc-100 text-center transition-colors" style={{ transform: 'translateZ(10px)' }}>
                {skill.name}
            </h4>
        </div>
    );
};

const SkillsSection = ({ projects, activeFilter, setActiveFilter }: SkillsSectionProps) => {
    const skills = useMemo(() => buildSkillsFromProjects(projects), [projects]);

    const filteredSkills =
        activeFilter === 'all'
            ? skills
            : skills.filter((skill) => skill.category === activeFilter);

    // Sort by category first, then name
    const orderedSkills = [...filteredSkills].sort((a, b) => {
        if (a.category !== b.category) return a.category.localeCompare(b.category);
        return a.name.localeCompare(b.name);
    });

    return (
        <>
            <div className="text-center mb-16 animate-on-scroll">
                <span className="text-rose-400 font-medium tracking-widest uppercase text-sm">
                    My Skills
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4">
                    Technologies I{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-red-400">
                        Work With
                    </span>
                </h2>
                <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
                    A curated list of technologies I use to build robust and scalable applications.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-12">
                {['all', 'frontend', 'backend', 'tools'].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${activeFilter === cat
                            ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg shadow-rose-500/25'
                            : 'bg-zinc-800/50 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
                            }`}
                    >
                        {cat === 'all'
                            ? 'All'
                            : cat === 'frontend'
                                ? 'Frontend'
                                : cat === 'backend'
                                    ? 'Backend & DB'
                                    : 'Tools & AI'}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-4 sm:px-0">
                {orderedSkills.map((skill, index) => (
                    <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
            </div>
        </>
    );
};

export default SkillsSection;
