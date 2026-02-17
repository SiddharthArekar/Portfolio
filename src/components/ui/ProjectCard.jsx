import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Code2, ChevronDown, ChevronUp } from 'lucide-react';
import Card from './Card';

const ProjectCard = ({ project, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Card className="flex flex-col h-full group relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 hover:border-sky-500/30 transition-all duration-300">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-[80px] -z-10 group-hover:bg-sky-500/10 transition-colors duration-500" />

            <div className="flex flex-col h-full z-10">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700 text-sky-400">
                            {/* Dynamic Icon based on Project Type (could be added to data properly later) */}
                            <Code2 size={24} />
                        </div>
                        <div className="flex gap-2">
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-slate-700"
                                title="View Code"
                            >
                                <Github size={20} />
                            </a>
                            {project.demo && (
                                <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors border border-transparent hover:border-slate-700"
                                    title="View Demo"
                                >
                                    <ExternalLink size={20} />
                                </a>
                            )}
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-100 mb-2 group-hover:text-sky-400 transition-colors">{project.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, i) => (
                        <span key={i} className="px-2.5 py-1 text-xs font-medium text-slate-300 bg-slate-800/50 border border-slate-700 rounded-md">
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Features List */}
                <div className="mt-auto space-y-3 bg-slate-950/30 p-4 rounded-xl border border-slate-800/50 transition-all duration-300">
                    <div className="space-y-3">
                        <AnimatePresence initial={false} mode="wait">
                            {(isExpanded ? project.features : project.features.slice(0, 3)).map((feature, i) => (
                                <motion.div
                                    key={`${i}-${feature}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-start gap-3"
                                >
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 shadow-[0_0_8px_rgba(14,165,233,0.5)]" />
                                    <span className="text-sm text-slate-300">{feature}</span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {project.features.length > 3 && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-xs text-sky-400 pl-4 italic hover:text-sky-300 transition-colors flex items-center gap-1 cursor-pointer mt-2 w-full text-left"
                        >
                            {isExpanded ? (
                                <>
                                    Show Less <ChevronUp size={12} />
                                </>
                            ) : (
                                <>
                                    + {project.features.length - 3} more features <ChevronDown size={12} />
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default ProjectCard;
