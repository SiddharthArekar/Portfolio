import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, BookOpen, Brain, ExternalLink, ShieldCheck, Sparkles, X } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import Card from '../components/ui/Card';

const certifications = [
    {
        title: 'Microsoft Certified: Azure AI Fundamentals',
        issuer: 'Microsoft',
        status: 'Completed',
        description: 'Validates foundational knowledge of machine learning and artificial intelligence concepts and related Microsoft Azure services.',
        image: '/azure-ai-fundamentals.png', // Add your certificate image to the public folder with this name
        link: 'https://learn.microsoft.com/users/siddhartharekar/credentials/certification/azure-ai-fundamentals', // Replace with your actual credential URL
        icon: <Brain size={32} />,
        color: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
        hoverColor: 'hover:border-blue-500/50'
    },
    {
        title: 'Cisco Certified Support Technician Cybersecurity',
        issuer: 'Cisco',
        status: 'Completed',
        description: 'Validates skills in security principles, network security, endpoint security concepts, and incident handling.',
        image: '/Cisco Certified Support Technician Cybersecurity.jpg',
        link: '#',
        icon: <ShieldCheck size={32} />,
        color: 'bg-teal-500/10 text-teal-500 border-teal-500/20',
        hoverColor: 'hover:border-teal-500/50'
    },
    {
        title: 'Introduction to Generative AI',
        issuer: 'Google Cloud',
        status: 'Completed',
        description: 'Explores the fundamentals of Generative AI, Large Language Models, and how they differ from traditional AI development.',
        image: '/Generative AI.jpg',
        link: '#',
        icon: <Sparkles size={32} />,
        color: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
        hoverColor: 'hover:border-purple-500/50'
    },
    {
        title: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services',
        status: 'In Progress',
        description: 'Mastering core AWS services, security, and architecture best practices.',
        link: 'https://aws.amazon.com/certification/certified-cloud-practitioner/',
        icon: <Award size={32} />,
        color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
        hoverColor: 'hover:border-yellow-500/50'
    },
    {
        title: 'Linux Administration',
        issuer: 'Self-Paced / Coursera',
        status: 'In Progress',
        description: 'Hands-on experience with user management, permissions, and bash scripting.',
        link: '#',
        icon: <BookOpen size={32} />,
        color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
        hoverColor: 'hover:border-emerald-500/50'
    }
];

const Certifications = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    // Lock body scroll when modal is open
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
                {certifications.map((cert, index) => (
                    <Card key={index} className={`flex flex-col gap-4 ${cert.hoverColor} transition-colors h-full`}>
                        <div className="flex items-start justify-between w-full">
                            <div className={`p-3 rounded-lg shrink-0 ${cert.color}`}>
                                {cert.icon}
                            </div>
                            <span className={`px-2 py-1 text-xs rounded border ${cert.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'}`}>
                                {cert.status}
                            </span>
                        </div>

                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-1">{cert.title}</h3>
                            <p className="text-slate-400 text-sm mb-3">{cert.issuer}</p>
                            <p className="text-slate-300 text-sm">
                                {cert.description}
                            </p>
                        </div>

                        <div className="mt-auto pt-4 border-t border-slate-700/50">
                            {cert.image ? (
                                <button
                                    onClick={() => setSelectedImage(cert.image)}
                                    className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors cursor-pointer"
                                >
                                    View Certificate <ExternalLink size={16} />
                                </button>
                            ) : (
                                <a
                                    href={cert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors pointer-events-auto"
                                >
                                    View Certificate <ExternalLink size={16} />
                                </a>
                            )}
                        </div>
                    </Card>
                ))}
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
                            {/* Close Button - Top Right of Screen */}
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
