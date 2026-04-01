import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import Card from '../components/ui/Card';
import { useAboutData } from '../hooks/usePortfolioData';

const About = () => {
    const { data } = useAboutData();

    return (
        <SectionWrapper id="about" className="bg-slate-900/50">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-bold mb-6">
                        About <span className="text-sky-400">Me</span>
                    </h2>
                    <div className="space-y-4 text-slate-300 text-lg leading-relaxed">
                        {data.paragraphs.map((para, i) => (
                            <p key={i}>{para}</p>
                        ))}
                    </div>
                </motion.div>

                <Card className="p-8 border-t-4 border-t-sky-500">
                    <h3 className="text-xl font-bold mb-4 text-white">Why Hire Me?</h3>
                    <ul className="space-y-3">
                        {data.whyHireMe.map((item, index) => (
                            <li key={index} className="flex items-start gap-3 text-slate-300">
                                <span className="text-sky-400 mt-1">▹</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
        </SectionWrapper>
    );
};

export default About;
