import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import ProjectCard from '../components/ui/ProjectCard';
import { projectsData } from '../data/projects';

const Projects = () => {
    return (
        <SectionWrapper id="projects" className="relative z-10 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[120px] -z-10" />

            <motion.div
                className="text-center mb-20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                    Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">Deployments</span>
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                    Real-world applications architected for scalability, reliability, and performance.
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {projectsData.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="h-full"
                    >
                        <ProjectCard project={project} index={index} />
                    </motion.div>
                ))}
            </div>
        </SectionWrapper>
    );
};

export default Projects;
