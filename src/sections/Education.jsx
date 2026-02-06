import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { MapPin, Calendar, CheckCircle2, Sparkles, BookOpen } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';

const Card3D = ({ children }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full max-w-4xl mx-auto perspective-1000"
        >
            <div style={{ transform: "translateZ(50px)" }} className="relative">
                {children}
            </div>
        </motion.div>
    );
};

const Education = () => {
    return (
        <SectionWrapper id="education" className="min-h-[70vh] flex flex-col items-center justify-center overflow-hidden">

            {/* Standard Header */}
            <div className="text-center mb-20">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold mb-6 tracking-tight"
                >
                    Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Background</span>
                </motion.h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                    Laying the foundation for a career in cloud engineering and software development.
                </p>
            </div>

            <Card3D>
                {/* 
                   Transparent Depth Card 
                   - bg-slate-900/40: Semi-transparent
                   - backdrop-blur-2xl: Heavy blur for glass effect
                   - border-white/10: Subtle edge
                   - shadow-[...]: Complex shadow for "depth" (inner glow + outer drop shadow)
                */}
                <div className="relative p-8 md:p-14 rounded-[2.5rem] overflow-hidden 
                    bg-slate-900/40 backdrop-blur-2xl 
                    border border-white/10 
                    shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.05),inset_0_0_20px_rgba(14,165,233,0.1)]">

                    {/* Glossy Reflection Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                    {/* Floating Decorative Elements (More subtle inside glass) */}
                    <div className="absolute -top-20 -right-20 w-60 h-60 bg-sky-500/30 rounded-full blur-[80px] animate-pulse opacity-50" />
                    <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-500/30 rounded-full blur-[80px] animate-pulse delay-1000 opacity-50" />

                    {/* Grid Pattern Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">

                        {/* Left Side: Icon & Degree */}
                        <div className="flex-1 text-center md:text-left space-y-6">
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                className="inline-flex p-4 rounded-2xl bg-white/5 border border-white/10 shadow-lg shadow-sky-500/20 mb-2 backdrop-blur-sm group hover:scale-105 transition-transform duration-300"
                            >
                                <img
                                    src="/Reva University.png"
                                    alt="Reva University Logo"
                                    className="w-16 h-16 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                                />
                            </motion.div>

                            <div>
                                <h3 className="text-sky-400 font-bold tracking-widest text-xs uppercase mb-2 flex items-center gap-2 justify-center md:justify-start">
                                    <Sparkles size={12} />
                                    Master's Degree
                                </h3>
                                <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-md">
                                    Master of Computer <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-200 to-sky-400 animate-gradient-x bg-[length:200%_auto]">
                                        Applications
                                    </span>
                                </h2>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start pt-4">
                                <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm hover:bg-white/10 transition-colors cursor-default">
                                    <BookOpen size={16} className="text-indigo-400" />
                                    Reva University
                                </span>
                            </div>
                        </div>

                        {/* Divider Line */}
                        <div className="hidden md:block w-px h-64 bg-gradient-to-b from-transparent via-slate-600/50 to-transparent" />

                        {/* Right Side: Details */}
                        <div className="flex-1 w-full space-y-8">
                            <div className="space-y-6">
                                {/* Timeline Item */}
                                <motion.div
                                    className="group flex items-center gap-4 bg-slate-950/20 p-4 rounded-2xl border border-white/5 hover:border-sky-500/30 transition-all hover:bg-slate-900/40 hover:shadow-lg hover:shadow-sky-500/10"
                                    whileHover={{ x: 10 }}
                                >
                                    <div className="p-3 rounded-xl bg-slate-800/80 text-sky-400 group-hover:scale-110 transition-transform">
                                        <Calendar size={24} />
                                    </div>
                                    <div>
                                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Timeline</p>
                                        <p className="text-white font-medium text-lg">2024 - 2025</p>
                                    </div>
                                </motion.div>

                                {/* Location Item */}
                                <motion.div
                                    className="group flex items-center gap-4 bg-slate-950/20 p-4 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all hover:bg-slate-900/40 hover:shadow-lg hover:shadow-indigo-500/10"
                                    whileHover={{ x: 10 }}
                                >
                                    <div className="p-3 rounded-xl bg-slate-800/80 text-indigo-400 group-hover:scale-110 transition-transform">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Location</p>
                                        <p className="text-white font-medium text-lg">Bengaluru, Karnataka</p>
                                    </div>
                                </motion.div>

                                {/* Status Item */}
                                <motion.div
                                    className="group flex items-center gap-4 bg-slate-950/20 p-4 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all hover:bg-slate-900/40 hover:shadow-lg hover:shadow-emerald-500/10"
                                    whileHover={{ x: 10 }}
                                >
                                    <div className="p-3 rounded-xl bg-slate-800/80 text-emerald-400 group-hover:scale-110 transition-transform">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <div>
                                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Status</p>
                                        <p className="text-emerald-400 font-bold text-lg flex items-center gap-2">
                                            Completed
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                            </span>
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card3D>

        </SectionWrapper>
    );
};

export default Education;
