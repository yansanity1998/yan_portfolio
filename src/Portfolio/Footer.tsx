import profileImage from '../assets/ian.png';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        navigation: [
            { name: 'Home', href: '#home' },
            { name: 'About', href: '#about' },
            { name: 'Skills', href: '#skills' },
            { name: 'Projects', href: '#projects' },
            { name: 'Contact', href: '#contact' },
        ],
        social: [
            { name: 'GitHub', href: 'https://github.com/yansanity1998', icon: 'github', colorClass: 'hover:bg-[#24292e] hover:text-white' },
            { name: 'Facebook', href: 'https://www.facebook.com/jesper.ian.villacorte', icon: 'facebook', colorClass: 'hover:bg-[#1877F2] hover:text-white' },
            { name: 'Instagram', href: 'https://www.instagram.com/_iantheone_/', icon: 'instagram', colorClass: 'hover:bg-[#E1306C] hover:text-white' },
            { name: 'TikTok', href: 'https://www.tiktok.com', icon: 'tiktok', colorClass: 'hover:bg-white hover:text-black' },
        ],
    };

    const scrollToSection = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="bg-[#0a0a0b] border-t border-zinc-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-12 sm:py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        {/* Brand Section */}
                        <div className="lg:col-span-2">
                            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }} className="group inline-flex items-center gap-2 mb-4">
                                <div className="w-10 h-10 rounded-full overflow-hidden transform group-hover:scale-110 transition-transform duration-300">
                                    <img src={profileImage} alt="Yan" className="w-full h-full object-cover" />
                                </div>
                                <span className="text-xl font-bold text-zinc-50">Yansanity<span className="text-rose-400"></span></span>
                            </a>
                            <p className="text-zinc-400 max-w-md mb-6 leading-relaxed">
                                Full Stack Developer passionate about creating exceptional digital experiences.
                                Let's build something amazing together.
                            </p>
                            <div className="flex items-center gap-2 text-sm text-zinc-500">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                <span>Available for new opportunities</span>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-zinc-100 font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-3">
                                {footerLinks.navigation.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                                            className="text-zinc-400 hover:text-rose-400 transition-colors duration-300 flex items-center gap-2 group"
                                        >
                                            <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full group-hover:bg-rose-500 transition-colors"></span>
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Connect */}
                        <div>
                            <h3 className="text-zinc-100 font-semibold mb-4">Connect</h3>
                            <div className="flex flex-wrap gap-3">
                                {footerLinks.social.map((social) => (
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

                            {/* Have a Project? */}
                            <div className="mt-6">
                                <h4 className="text-zinc-100 font-semibold mb-3">Have a project?</h4>
                                <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
                                    I'm always open to discussing product design work or partnership opportunities.
                                </p>
                                <button
                                    onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=jesperianbarila.202101066@gmail.com&su=Project%20Inquiry&body=Hi%20Yan,%20I%20would%20like%20to%20discuss%20a%20project%20with%20you.', '_blank')}
                                    className="px-6 py-2.5 bg-gradient-to-r from-rose-500 to-red-600 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-rose-500/25 transition-all hover:-translate-y-0.5"
                                >
                                    Get in Touch
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-6 border-t border-zinc-800/50">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-zinc-500 text-center sm:text-left">
                            © {currentYear} Yan. All rights reserved. Built with{' '}
                            <span className="text-rose-500">❤</span> and React.
                        </p>
                        <div className="flex items-center gap-6 text-sm text-zinc-500">
                            <a href="#" className="hover:text-rose-400 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-rose-400 transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            <button
                onClick={() => scrollToSection('#home')}
                className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-rose-500 to-red-600 text-white rounded-full shadow-lg shadow-rose-500/25 flex items-center justify-center hover:scale-110 transition-transform duration-300 z-50"
                aria-label="Back to top"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </button>
        </footer>
    );
};

export default Footer;
