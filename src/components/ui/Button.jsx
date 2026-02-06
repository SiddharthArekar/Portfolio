import { motion } from 'framer-motion';

const Button = ({
    children,
    variant = 'primary',
    className = '',
    onClick,
    href,
    ...props
}) => {
    const baseStyles = "px-8 py-3.5 rounded-2xl font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer";

    const variants = {
        primary: "bg-[#2563EB] hover:bg-[#1d4ed8] text-white shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 border border-transparent",
        outline: "bg-transparent hover:bg-slate-800/80 text-white border border-slate-600 hover:border-slate-400 backdrop-blur-sm",
        ghost: "bg-transparent hover:bg-slate-800/50 text-slate-400 hover:text-white"
    };

    const Component = href ? motion.a : motion.button;

    return (
        <Component
            href={href}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Button;
