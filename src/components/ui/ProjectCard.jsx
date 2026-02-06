import { motion } from 'framer-motion';
import { ExternalLink, Github, Code2, Layers, Cpu } from 'lucide-react';
import Card from './Card';

const ProjectCard = ({ project, index }) => {
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
                <div className="mt-auto space-y-3 bg-slate-950/30 p-4 rounded-xl border border-slate-800/50">
                    {project.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0 shadow-[0_0_8px_rgba(14,165,233,0.5)]" />
                            <span className="text-sm text-slate-300">{feature}</span>
                        </div>
                    ))}
                    {project.features.length > 3 && (
                        <p className="text-xs text-slate-500 pl-4 italic">+ {project.features.length - 3} more features</p>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default ProjectCard;
