import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';
import { skillsData } from '../data/skills';

const SkillOrb = ({ skill, index }) => (
    <motion.div
        drag
        dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay: index * 0.05, type: 'spring' }}
        whileHover={{ scale: 1.1, zIndex: 10 }}
        className="relative flex items-center justify-center p-4 bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-full cursor-pointer hover:bg-sky-500/20 hover:border-sky-500/50 transition-colors shadow-lg group"
    >
        <span className="text-slate-300 font-medium whitespace-nowrap group-hover:text-white transition-colors">{skill}</span>
    </motion.div>
);

const CategoryCluster = ({ category, icon: Icon, skills, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="flex flex-col items-center"
        >
            <div className="relative mb-8">
                {/* Central Category Node */}
                <div className="w-24 h-24 rounded-full bg-slate-900 border-2 border-sky-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(14,165,233,0.2)] z-10 relative">
                    <Icon size={40} className="text-sky-400" strokeWidth={1.5} />
                </div>
                {/* Connecting Lines (Decorative) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-slate-800 rounded-full -z-10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-dashed border-slate-800 rounded-full -z-10 animate-spin-slow" />
            </div>

            <h3 className="text-xl font-bold text-white mb-6 text-center">{category}</h3>

            <div className="flex flex-wrap justify-center gap-4 max-w-sm">
                {skills.map((skill, idx) => (
                    <SkillOrb key={idx} skill={skill} index={idx} />
                ))}
            </div>
        </motion.div>
    );
};

const Skills = () => {
    return (
        <SectionWrapper id="skills" className="relative overflow-hidden">
            {/* Background Matrix Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black -z-20"></div>

            <div className="text-center mb-20">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold mb-6"
                >
                    My <span className="text-sky-400">Tech Universe</span>
                </motion.h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    Exploration of the technologies that power my development journey.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 max-w-7xl mx-auto">
                {skillsData.map((category, index) => (
                    <CategoryCluster key={index} {...category} index={index} />
                ))}
            </div>
        </SectionWrapper>
    );
};

export default Skills;
