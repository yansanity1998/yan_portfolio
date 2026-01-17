
import { useMemo } from 'react';
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

    const maxCount = Math.max(...Array.from(counts.values()));

    const skills: Skill[] = [];

    counts.forEach((count, tag) => {
        const category = tagToCategory[tag] || 'tools';
        const iconImg = tagToIconImg[tag];
        const icon = iconImg ? undefined : tagToIcon[tag] ?? '💻';

        // Normalize count so the most-used tech is near 100% and least-used around 60%
        const normalized = maxCount === 0 ? 1 : count / maxCount;
        const level = Math.round(60 + normalized * 40); // 60–100 range

        skills.push({
            name: tag,
            category,
            level,
            iconImg,
            icon,
        });
    });

    return skills.sort((a, b) => a.name.localeCompare(b.name));
};

const SkillsSection = ({ projects, activeFilter, setActiveFilter }: SkillsSectionProps) => {
    const skills = useMemo(() => buildSkillsFromProjects(projects), [projects]);

    const filteredSkills =
        activeFilter === 'all'
            ? skills
            : skills.filter((skill) => skill.category === activeFilter);

    const orderedSkills = [...filteredSkills].sort((a, b) => b.level - a.level);

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
                    This list is generated from the tech stack I use in my featured projects.
                </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mb-12">
                {['all', 'frontend', 'backend', 'tools'].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                            activeFilter === cat
                                ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg shadow-rose-500/25'
                                : 'bg-zinc-800/50 text-zinc-400 hover:text-zinc-100'
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {orderedSkills.map((skill, index) => (
                    <div
                        key={skill.name}
                        className={`animate-on-scroll group p-5 bg-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-rose-500/50 transition-all hover:shadow-xl hover:shadow-rose-500/10 hover:-translate-y-1 stagger-${
                            (index % 6) + 1
                        }`}
                    >
                        <div className="h-10 mb-3 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                            {renderSkillIcon(skill)}
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-zinc-100 text-sm">
                                {skill.name}
                            </h4>
                            <span className="text-xs text-zinc-400">{skill.level}%</span>
                        </div>
                        <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-rose-500 to-red-500 rounded-full transition-all duration-500"
                                style={{ width: `${skill.level}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default SkillsSection;

