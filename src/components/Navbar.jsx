import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Cloud, User, Sparkles } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Education', href: '#education' },
        { name: 'Roadmap', href: '#roadmap' },
        { name: 'Learning', href: '#certifications' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-lg' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-4">
                        {/* Lovable 3D Boy Avatar (Clickable) */}
                        <motion.div
                            className="relative w-12 h-12 cursor-pointer group"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsProfileOpen(true)}
                        >
                            {/* Avatar Image */}
                            <img
                                src="/profile.png"
                                alt="Siddharth Avatar"
                                className="w-full h-full rounded-full border-2 border-slate-700 shadow-lg object-cover group-hover:border-sky-400 transition-all duration-300"
                            />

                            {/* Live Status Indicator */}
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full">
                                <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75"></span>
                            </span>
                        </motion.div>

                        <a href="#" className="flex flex-col group">
                            <span className="text-xl font-bold tracking-tight text-slate-100 group-hover:text-sky-400 transition-colors font-sans">
                                Siddharth Arekar
                            </span>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-sky-500/80">
                                Cloud Engineer
                            </span>
                        </a>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-slate-300/80 hover:text-white transition-colors tracking-wide"
                            >
                                {link.name}
                            </a>
                        ))}

                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate-400 hover:text-white"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-16 left-0 w-full md:hidden bg-slate-950 border-b border-slate-800 shadow-2xl"
                    >
                        <div className="flex flex-col px-4 py-6 space-y-2">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="block px-4 py-3 text-base font-medium text-slate-400 hover:text-sky-400 hover:bg-slate-900/50 rounded-xl transition-all"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Profile View Modal */}
            <AnimatePresence>
                {isProfileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4"
                        onClick={() => setIsProfileOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", bounce: 0.3 }}
                            className="relative max-w-sm w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-900 shadow-2xl shadow-sky-900/40 border border-slate-800"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src="/profile.png"
                                alt="Siddharth Profile"
                                className="w-full h-full object-cover"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-90"></div>

                            {/* Text Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 pb-10">
                                <h3 className="text-3xl font-bold text-white mb-1">Siddharth Arekar</h3>
                                <p className="text-sky-400 font-medium text-lg">Cloud Engineer</p>
                            </div>

                            {/* Close Button (Inside Frame, top-right) */}
                            <button
                                onClick={() => setIsProfileOpen(false)}
                                className="absolute top-5 right-5 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md border border-white/10 transition-all hover:scale-105 active:scale-95 group"
                            >
                                <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
