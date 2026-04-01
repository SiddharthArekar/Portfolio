import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, BookOpen, Brain, ExternalLink, ShieldCheck, Sparkles, X, Star, Code, Globe } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import Card from '../components/ui/Card';
import { useCertificationsData } from '../hooks/usePortfolioData';

// Map icon names from Firestore to actual Lucide components
const iconMap = { Award, BookOpen, Brain, ShieldCheck, Sparkles, Star, Code, Globe };

const Certifications = () => {
    const { data: certifications } = useCertificationsData();
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedImage]);

    return (
        <SectionWrapper id="certifications">
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl font-bold mb-4">Learning & <span className="text-sky-400">Certifications</span></h2>
                <p className="text-slate-400">Continuous learning is part of my DNA.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {certifications.map((cert, index) => {
                    const Icon = iconMap[cert.iconName] || Award;
                    return (
                        <Card key={cert.id || index} className={`flex flex-col gap-4 ${cert.hoverColor} transition-colors h-full`}>
                            <div className="flex items-start justify-between w-full">
                                <div className={`p-3 rounded-lg shrink-0 ${cert.color}`}>
                                    <Icon size={32} />
                                </div>
                                <span className={`px-2 py-1 text-xs rounded border ${cert.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'}`}>
                                    {cert.status}
                                </span>
                            </div>

                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-1">{cert.title}</h3>
                                <p className="text-slate-400 text-sm mb-3">{cert.issuer}</p>
                                <p className="text-slate-300 text-sm">{cert.description}</p>
                            </div>

                            <div className="mt-auto pt-4 border-t border-slate-700/50">
                                {cert.image ? (
                                    (cert.image.includes('.pdf') || cert.image.includes('%2Epdf')) ? (
                                        <a
                                            href={cert.image}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors pointer-events-auto"
                                        >
                                            View PDF Document <ExternalLink size={16} />
                                        </a>
                                    ) : (
                                        <button
                                            onClick={() => setSelectedImage(cert.image)}
                                            className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors cursor-pointer"
                                        >
                                            View Certificate <ExternalLink size={16} />
                                        </button>
                                    )
                                ) : (
                                    <a
                                        href={cert.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors pointer-events-auto"
                                    >
                                        View Credential <ExternalLink size={16} />
                                    </a>
                                )}
                            </div>
                        </Card>
                    );
                })}
            </div>

            {createPortal(
                <AnimatePresence>
                    {selectedImage && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedImage(null)}
                            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm"
                        >
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-5 right-5 p-3 text-slate-400 hover:text-sky-400 transition-colors z-[100] cursor-pointer"
                            >
                                <X size={32} />
                            </button>

                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                className="relative max-w-7xl max-h-[90vh] bg-slate-900/40 backdrop-blur-md rounded-xl border border-slate-700/30 shadow-2xl overflow-hidden flex flex-col"
                            >
                                <div className="flex-1 overflow-auto flex items-center justify-center p-1 bg-transparent">
                                    <img
                                        src={selectedImage}
                                        alt="Certificate Evidence"
                                        className="max-h-[85vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </SectionWrapper>
    );
};

export default Certifications;
