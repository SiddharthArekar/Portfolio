import { motion } from 'framer-motion';
import { Award, BookOpen } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import Card from '../components/ui/Card';

const Certifications = () => {
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

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <Card className="flex items-start gap-4 hover:border-sky-500/50 transition-colors">
                    <div className="p-3 bg-yellow-500/10 rounded-lg text-yellow-500 shrink-0">
                        <Award size={32} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">AWS Certified Cloud Practitioner</h3>
                        <p className="text-slate-400 text-sm mb-2">Amazon Web Services</p>
                        <span className="inline-block px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded border border-yellow-500/30">In Progress</span>
                        <p className="mt-3 text-slate-300 text-sm">
                            Mastering core AWS services, security, and architecture best practices.
                        </p>
                    </div>
                </Card>

                <Card className="flex items-start gap-4 hover:border-emerald-500/50 transition-colors">
                    <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-500 shrink-0">
                        <BookOpen size={32} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Linux Administration</h3>
                        <p className="text-slate-400 text-sm mb-2">Self-Paced / Coursera</p>
                        <span className="inline-block px-2 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded border border-emerald-500/30">Completed</span>
                        <p className="mt-3 text-slate-300 text-sm">
                            Hands-on experience with user management, permissions, and bash scripting.
                        </p>
                    </div>
                </Card>
            </div>
        </SectionWrapper>
    );
};

export default Certifications;
