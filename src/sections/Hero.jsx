import { motion } from 'framer-motion';
import { ArrowDown, Cloud, Database, Shield, Globe, Cpu } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import Button from '../components/ui/Button';

const FloatingIcon = ({ icon: Icon, delay, x, y, color }) => (
    <motion.div
        className={`absolute p-4 rounded-2xl bg-slate-900/80 border border-slate-700 backdrop-blur-sm shadow-xl ${color}`}
        initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
        animate={{
            opacity: 1,
            scale: 1,
            x: [x, x + 10, x - 10, x],
            y: [y, y - 10, y + 10, y]
        }}
        transition={{
            opacity: { duration: 0.5, delay },
            scale: { duration: 0.5, delay },
            x: { duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay },
            y: { duration: 7, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay }
        }}
    >
        <Icon size={32} />
    </motion.div>
);

const Hero = () => {
    return (
        <SectionWrapper id="home" className="min-h-screen flex items-center justify-center pt-32 relative overflow-hidden">
            {/* Background Grid & Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[100px] opacity-30 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] opacity-30 animate-pulse delay-700" />

            <div className="grid lg:grid-cols-2 gap-12 items-center w-full z-10 relative">
                {/* Text Content */}
                <motion.div
                    className="space-y-8 text-center lg:text-left"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.15 }
                        }
                    }}
                >
                    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-sky-400 text-sm font-medium mb-4">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                            </span>
                            Available for hire
                        </div>
                        <h2 className="text-slate-300 font-medium tracking-wide text-lg mb-2">
                            Hello, I'm a
                        </h2>
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                            Cloud <span className="gradient-text">Engineer</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed"
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    >
                        Designing scalable infrastructure, automating deployments, and securing the cloud. Focused on <span className="text-white font-medium">AWS</span>, <span className="text-white font-medium">Kubernetes</span>, and  <span className="text-white font-medium">DevOps</span>.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    >
                        <Button
                            variant="primary"
                            href="#projects"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            View Projects
                        </Button>
                        <Button variant="outline" href="/resume.pdf" target="_blank">
                            Download Resume
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Animated Graphic */}
                <div className="relative hidden lg:flex items-center justify-center h-[500px]">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative w-full h-full flex items-center justify-center"
                    >
                        {/* Central Hub */}
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="z-20 relative bg-slate-900 border border-slate-700 p-8 rounded-3xl shadow-2xl shadow-sky-500/20"
                        >
                            <Cloud size={64} className="text-sky-400" />
                        </motion.div>

                        {/* Orbiting Icons */}
                        <FloatingIcon icon={Cpu} delay={0.2} x={-150} y={-100} color="text-indigo-400" />
                        <FloatingIcon icon={Database} delay={0.4} x={150} y={-100} color="text-emerald-400" />
                        <FloatingIcon icon={Shield} delay={0.6} x={-150} y={100} color="text-rose-400" />
                        <FloatingIcon icon={Globe} delay={0.8} x={150} y={100} color="text-amber-400" />

                        {/* Decorative Background Circles */}
                        <div className="absolute inset-0 m-auto w-[400px] h-[400px] border border-slate-800 rounded-full opacity-50 animate-spin-slow" />
                        <div className="absolute inset-0 m-auto w-[250px] h-[250px] border border-dashed border-slate-700/50 rounded-full opacity-50 animate-reverse-spin" />
                    </motion.div>
                </div>
            </div>

            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 cursor-pointer hover:text-sky-400 transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
            >
                <ArrowDown size={32} />
            </motion.div>
        </SectionWrapper>
    );
};

export default Hero;
