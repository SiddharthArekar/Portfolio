import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp, User, Briefcase, Cpu, Send } from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Work', href: '#projects' },
        { name: 'Tech', href: '#skills' },
        { name: 'Contact', href: '#contact' },
    ];

    // Helper component defined inside to avoid issues
    const ChevronRight = ({ className }) => (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64981 10.6151 7.84212L6.86514 11.8421C6.67627 12.0436 6.35985 12.0538 6.1584 11.8649C5.95694 11.676 5.94673 11.3596 6.1356 11.1581L9.59126 7.5L6.1356 3.84188C5.94673 3.64042 5.95694 3.324 6.1584 3.13508Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
        </svg>
    );

    return (
        <footer className="relative pt-24 pb-12 overflow-hidden bg-transparent">
            {/* No background patterns or blurs - fully transparent to show particles */}

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

                {/* Subtle separator line (optional, kept minimal) */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-16 opacity-50" />

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 pb-16">

                    {/* Brand Column (Span 5) */}
                    <div className="lg:col-span-5 space-y-8 flex flex-col items-center text-center lg:items-start lg:text-left">
                        <div className="flex flex-col items-center lg:items-start gap-2">
                            <motion.div
                                className="w-16 h-16 bg-gradient-to-tr from-sky-500/80 to-indigo-600/80 rounded-xl flex items-center justify-center text-3xl font-black text-white shadow-lg shadow-sky-500/20"
                                whileHover={{ rotate: 180, borderRadius: "50%" }}
                                transition={{ duration: 0.5 }}
                            >
                                SA
                            </motion.div>
                            <h2 className="text-2xl font-bold text-white tracking-tight mt-2">
                                Siddharth Arekar
                            </h2>
                            <p className="text-sky-400 font-mono text-xs uppercase tracking-widest">
                                Cloud Engineer • DevOps • Frontend
                            </p>
                        </div>
                        <p className="text-slate-400 leading-relaxed max-w-md">
                            Building the infrastructure of tomorrow. turning complex problems into scalable, reliable, and secure solutions.
                        </p>
                    </div>

                    {/* Navigation Column (Span 3) */}
                    <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <h3 className="text-white font-bold mb-6 flex items-center justify-center lg:justify-start gap-2">
                            <span className="w-2 h-2 rounded-sm bg-sky-500" />
                            Navigation
                        </h3>
                        <ul className="space-y-4 w-full flex flex-col items-center lg:items-start">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                                    >
                                        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-sky-500 transition-colors" />
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect Column (Span 4) */}
                    <div className="lg:col-span-4 flex flex-col items-center lg:items-end">
                        <div className="flex gap-4 mt-4 lg:mt-0">
                            {[
                                { icon: Github, href: "https://github.com/SiddharthArekar" },
                                { icon: Linkedin, href: "https://www.linkedin.com/in/siddharth-arekar/" },
                                { icon: Mail, href: "mailto:siddhartharekar4@gmail.com" }
                            ].map((item, idx) => (
                                <motion.a
                                    key={idx}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(56,189,248,0.5)" }}
                                    className="p-4 bg-slate-900/40 border border-slate-700/50 rounded-2xl text-slate-300 hover:text-white hover:border-sky-500/50 hover:bg-slate-800/60 transition-all"
                                >
                                    <item.icon size={24} />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-800/30">
                    <div className="text-slate-500 text-sm font-medium">
                        © 2026 Siddharth Arekar.
                    </div>

                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 text-sm text-slate-400 hover:text-sky-400 transition-colors group"
                    >
                        Back to Top
                        <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
                    </button>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
