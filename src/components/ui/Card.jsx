import { motion } from 'framer-motion';

const Card = ({ children, className = '', ...props }) => {
    return (
        <motion.div
            className={`glass-card p-6 rounded-xl shadow-xl ${className}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
