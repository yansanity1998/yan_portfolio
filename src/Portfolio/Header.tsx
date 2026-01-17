import { useState, useEffect } from 'react';
import profileImage from '../assets/ian.png';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Track active section based on scroll position
    useEffect(() => {
        const sections = ['home', 'about', 'skills', 'projects', 'contact'];

        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px', // Trigger when section is in the upper portion of viewport
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach((sectionId) => {
            const element = document.getElementById(sectionId);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            sections.forEach((sectionId) => {
                const element = document.getElementById(sectionId);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                ? 'bg-[#0a0a0b]/95 backdrop-blur-xl shadow-2xl shadow-rose-500/5'
                : 'bg-transparent'
                }`}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    {/* Logo */}
                    <a
                        href="#home"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollToSection('#home');
                        }}
                        className="group flex items-center gap-2"
                    >
                        <div className="w-10 h-10 rounded-full overflow-hidden transform group-hover:scale-110 transition-transform duration-300">
                            <img src={profileImage} alt="Yan" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-xl font-bold text-zinc-50 hidden sm:block">
                            Yansanity<span className="text-rose-400"></span>
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.replace('#', '');
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection(link.href);
                                    }}
                                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 group ${isActive ? 'text-rose-400' : 'text-zinc-400 hover:text-zinc-50'
                                        }`}
                                >
                                    {link.name}
                                    <span className={`absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-rose-500 to-red-500 transition-all duration-300 ${isActive ? 'w-1/2' : 'w-0 group-hover:w-1/2'
                                        }`}></span>
                                    <span className={`absolute bottom-0 right-1/2 h-0.5 bg-gradient-to-l from-rose-500 to-red-500 transition-all duration-300 ${isActive ? 'w-1/2' : 'w-0 group-hover:w-1/2'
                                        }`}></span>
                                </a>
                            );
                        })}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <a
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection('#contact');
                            }}
                            className="relative inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rose-500 to-red-600 text-white text-sm font-medium rounded-full overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-rose-500/25"
                        >
                            <span className="relative z-10">Let's Talk</span>
                            <svg
                                className="w-4 h-4 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden relative w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-zinc-50 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <div className="flex flex-col items-center justify-center gap-1.5">
                            <span
                                className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                                    }`}
                            ></span>
                            <span
                                className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''
                                    }`}
                            ></span>
                            <span
                                className={`block w-6 h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                                    }`}
                            ></span>
                        </div>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="py-4 space-y-1 border-t border-zinc-800/50">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href.replace('#', '');
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection(link.href);
                                    }}
                                    className={`block px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 ${isActive
                                            ? 'text-rose-400 bg-rose-500/10 border-l-2 border-rose-500'
                                            : 'text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800/50'
                                        }`}
                                >
                                    {link.name}
                                </a>
                            );
                        })}
                        <a
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection('#contact');
                            }}
                            className="block mx-4 mt-4 px-5 py-3 text-center bg-gradient-to-r from-rose-500 to-red-600 text-white font-medium rounded-xl"
                        >
                            Let's Talk
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
