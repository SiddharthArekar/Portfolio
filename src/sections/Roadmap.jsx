import { motion } from 'framer-motion';
import { Briefcase, ChevronRight, Target } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';

const Roadmap = () => {
    const steps = [
        {
            title: "Cloud Engineer",
            status: "current",
            date: "Now",
            description: "Building deep knowledge of AWS services, troubleshooting real-world incidents, and handling customer issues effectively.",
        },
        {
            title: "Senior Cloud Engineer",
            status: "upcoming",
            date: "Next Step",
            description: "Designing scalable architectures, implementing IaC (Terraform), and automating deployments.",
        },
        {
            title: "DevOps Engineer",
            status: "goal",
            date: "Future Goal",
            description: "Mastering Kubernetes, building advanced CI/CD pipelines, and ensuring site reliability at scale.",
        }
    ];

    return (
        <SectionWrapper id="roadmap">
            <motion.h2
                className="text-3xl md:text-4xl font-bold mb-16 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                Career <span className="text-sky-400">Roadmap</span>
            </motion.h2>

            <div className="relative max-w-3xl mx-auto">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-800" />

                <div className="space-y-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="relative flex gap-8 items-start"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <div className={`
                                relative z-10 w-16 h-16 rounded-full flex items-center justify-center border-4 shrink-0
                                ${step.status === 'current' ? 'bg-sky-500 border-slate-950 shadow-[0_0_20px_rgba(14,165,233,0.5)]' :
                                    step.status === 'upcoming' ? 'bg-slate-800 border-slate-900 text-sky-400' : 'bg-slate-900 border-slate-800 text-slate-500'}
                            `}>
                                {step.status === 'current' ? <Briefcase size={24} className="text-white" /> :
                                    step.status === 'upcoming' ? <ChevronRight size={24} /> : <Target size={24} />}
                            </div>

                            <div className="pt-2">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className={`text-xl font-bold ${step.status === 'current' ? 'text-white' : 'text-slate-300'}`}>
                                        {step.title}
                                    </h3>
                                    <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700">
                                        {step.date}
                                    </span>
                                </div>
                                <p className="text-slate-400 max-w-lg leading-relaxed">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};

export default Roadmap;
