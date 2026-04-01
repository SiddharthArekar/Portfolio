import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield, Mail, Lock, Eye, EyeOff, Loader2, AlertCircle,
    Sparkles, Zap, FolderOpen, Award, User, GraduationCap, LayoutDashboard, Map
} from 'lucide-react';

/* ─────────────────────────────────────────────
   ROTATING RING — the ring div rotates;
   icons are absolute children that orbit with it
───────────────────────────────────────────────*/
const RotatingRing = ({ diameter, icons, duration, clockwise = true, ringStyle, ringColor, glowColor }) => {
    const R = diameter / 2;

    return (
        <motion.div
            className="absolute rounded-full"
            style={{
                width: diameter,
                height: diameter,
                top: '50%', left: '50%',
                marginTop: -R, marginLeft: -R,
                border: `1px ${ringStyle} ${ringColor}`,
                boxShadow: glowColor ? `0 0 18px ${glowColor}, inset 0 0 18px ${glowColor}` : 'none',
            }}
            animate={{ rotate: clockwise ? 360 : -360 }}
            transition={{ duration, repeat: Infinity, ease: 'linear' }}
        >
            {icons.map((item, i) => {
                const angle = item.angle ?? (360 / icons.length) * i;
                const rad   = (angle * Math.PI) / 180;
                const x     = R * Math.sin(rad);
                const y     = -R * Math.cos(rad);
                const Icon  = item.icon;
                return (
                    <div
                        key={i}
                        className={`absolute flex items-center justify-center rounded-full border ${item.bg} ${item.border}`}
                        style={{
                            width: item.size ?? 38,
                            height: item.size ?? 38,
                            top: '50%', left: '50%',
                            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                            backdropFilter: 'blur(12px)',
                            boxShadow: `0 0 14px ${item.glow}, 0 4px 16px rgba(0,0,0,0.5)`,
                        }}
                    >
                        <Icon size={item.iconSize ?? 15} className={item.color} />
                    </div>
                );
            })}
        </motion.div>
    );
};

/* ─────────────────
   PULSING HALO
─────────────────*/
const Halo = ({ size, delay, color }) => (
    <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
            width: size, height: size,
            top: '50%', left: '50%',
            marginTop: -size / 2, marginLeft: -size / 2,
            border: `1px solid ${color}`,
        }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 3.5, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
);

/* ring data */
const ring1Icons = [
    { icon: LayoutDashboard, angle: 0,   color: 'text-sky-300',     bg: 'bg-sky-950/80',     border: 'border-sky-500/30',     glow: 'rgba(14,165,233,0.3)',  size: 40, iconSize: 16 },
    { icon: User,            angle: 180, color: 'text-violet-300',  bg: 'bg-violet-950/80',  border: 'border-violet-500/30',  glow: 'rgba(139,92,246,0.3)',  size: 40, iconSize: 16 },
];
const ring2Icons = [
    { icon: Zap,           angle: 270, color: 'text-yellow-300',  bg: 'bg-yellow-950/80',  border: 'border-yellow-500/30',  glow: 'rgba(234,179,8,0.3)',   size: 36, iconSize: 14 },
    { icon: FolderOpen,    angle: 30,  color: 'text-emerald-300', bg: 'bg-emerald-950/80', border: 'border-emerald-500/30', glow: 'rgba(16,185,129,0.3)',  size: 36, iconSize: 14 },
    { icon: GraduationCap, angle: 150, color: 'text-blue-300',    bg: 'bg-blue-950/80',    border: 'border-blue-500/30',    glow: 'rgba(59,130,246,0.3)',  size: 36, iconSize: 14 },
];
const ring3Icons = [
    { icon: Award,  angle: 60,  color: 'text-pink-300',    bg: 'bg-pink-950/80',    border: 'border-pink-500/30',    glow: 'rgba(236,72,153,0.3)',  size: 32, iconSize: 13 },
    { icon: Map,    angle: 200, color: 'text-orange-300',  bg: 'bg-orange-950/80',  border: 'border-orange-500/30',  glow: 'rgba(249,115,22,0.3)',  size: 32, iconSize: 13 },
];

/* ─────────────────────────────────────
   ORBITAL SYSTEM (entire left panel)
─────────────────────────────────────*/
const OrbitalSystem = ({ bgOnly = false }) => (
    <div className="flex flex-col items-center gap-6">

        <motion.p
            className={`text-slate-700 text-[10px] font-bold uppercase tracking-[0.3em] ${bgOnly ? 'hidden' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
        >
            Portfolio CMS
        </motion.p>

        {/* Ring container */}
        <div className="relative flex items-center justify-center" style={{ width: 400, height: 400 }}>

            {/* ── Ambient glow ── */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                    className="w-80 h-80 rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 65%)' }}
                    animate={{ scale: [1, 1.12, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                    className="w-48 h-48 rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 65%)' }}
                    animate={{ scale: [1.1, 1, 1.1] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                />
            </div>

            {/* ── Halo pulses ── */}
            <Halo size={118} delay={0}   color="rgba(14,165,233,0.25)" />
            <Halo size={145} delay={1.1} color="rgba(124,58,237,0.18)" />
            <Halo size={170} delay={2.2} color="rgba(14,165,233,0.1)" />

            {/* ── Ring 3 — outer, slow clockwise, dotted, faint pink ── */}
            <RotatingRing
                diameter={380}
                icons={ring3Icons}
                duration={45}
                clockwise={true}
                ringStyle="dashed"
                ringColor="rgba(236,72,153,0.12)"
                glowColor={null}
            />

            {/* ── Ring 2 — middle, medium counter-clockwise, dashed, violet ── */}
            <RotatingRing
                diameter={280}
                icons={ring2Icons}
                duration={28}
                clockwise={false}
                ringStyle="dashed"
                ringColor="rgba(139,92,246,0.18)"
                glowColor={null}
            />

            {/* ── Ring 1 — inner, fastest clockwise, solid, sky ── */}
            <RotatingRing
                diameter={178}
                icons={ring1Icons}
                duration={16}
                clockwise={true}
                ringStyle="solid"
                ringColor="rgba(14,165,233,0.18)"
                glowColor="rgba(14,165,233,0.03)"
            />

            {/* ── Central orb ── */}
            <div className="absolute z-20" style={{ top: '50%', left: '50%', marginTop: -52, marginLeft: -52 }}>
                <motion.div
                    className="w-[104px] h-[104px] rounded-[2.2rem] flex items-center justify-center"
                    style={{
                        background: 'linear-gradient(140deg, rgba(14,165,233,0.28), rgba(124,58,237,0.28))',
                        border: '1px solid rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(24px)',
                        boxShadow: '0 0 0 1px rgba(14,165,233,0.1), 0 0 50px rgba(14,165,233,0.15), 0 0 100px rgba(124,58,237,0.1)',
                    }}
                    animate={{ y: [0, -8, 0], rotate: [0, 1.5, 0, -1.5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <Shield size={46} className="text-sky-300 drop-shadow-lg" />
                </motion.div>

                {/* Sparkle */}
                <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-sky-400 to-violet-500 flex items-center justify-center shadow-lg shadow-sky-500/40 z-30"
                    animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <Sparkles size={11} className="text-white" />
                </motion.div>
            </div>

            {/* ── Tiny orbit-speed indicator dots ── */}
            {[
                { r: 89,  delay: 0,   dur: 16,  cw: true,  color: 'rgba(14,165,233,0.8)' },
                { r: 140, delay: 0.5, dur: 28,  cw: false, color: 'rgba(139,92,246,0.8)' },
                { r: 190, delay: 1,   dur: 45,  cw: true,  color: 'rgba(236,72,153,0.7)' },
            ].map((dot, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full pointer-events-none"
                    style={{ width: 5, height: 5, top: '50%', left: '50%', marginTop: -2.5, marginLeft: -2.5,
                        background: dot.color, boxShadow: `0 0 8px ${dot.color}` }}
                    animate={{ rotate: dot.cw ? 360 : -360 }}
                    transition={{ duration: dot.dur, repeat: Infinity, ease: 'linear', delay: dot.delay }}
                    transformOrigin={`0 0`}
                    // Use offsetX trick — translate then orbit
                    transformTemplate={({ rotate }) =>
                        `translateY(-${dot.r}px) rotate(${rotate})`
                    }
                />
            ))}
        </div>

        {/* Title */}
        {!bgOnly && (
            <div className="text-center -mt-2">
                <motion.h1
                    className="text-2xl font-bold text-white leading-tight"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    Portfolio{' '}
                    <span className="bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">
                        Command Center
                    </span>
                </motion.h1>
                <motion.p
                    className="text-slate-600 text-sm mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 }}
                >
                    Real-time editing · Instant live sync
                </motion.p>
            </div>
        )}

        {!bgOnly && (
            <motion.div
                className="flex items-center gap-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                {[
                    { color: 'bg-sky-400',    label: 'Core' },
                    { color: 'bg-violet-400', label: 'Content' },
                    { color: 'bg-pink-400',   label: 'Media' },
                ].map(({ color, label }) => (
                    <div key={label} className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${color}`} />
                        <span className="text-slate-600 text-[10px] font-medium">{label}</span>
                    </div>
                ))}
            </motion.div>
        )}
    </div>
);

/* ══════════════════════════════════
   MAIN LOGIN COMPONENT
══════════════════════════════════ */
const AdminLogin = () => {
    const [email, setEmail]               = useState('');
    const [password, setPassword]         = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading]           = useState(false);
    const [error, setError]               = useState('');
    const [focused, setFocused]           = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch {
            setError('Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const container = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
    const item = {
        hidden: { opacity: 0, y: 14 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
    };

    return (
        <div className="min-h-screen bg-[#060912] flex overflow-hidden">

            {/* ══ LEFT ══ */}
            <div className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(14,165,233,0.05) 0%, transparent 60%)' }} />
                <OrbitalSystem />
            </div>

            {/* Divider */}
            <motion.div
                className="hidden lg:block w-px my-16 shrink-0"
                style={{ background: 'linear-gradient(to bottom, transparent, rgba(100,116,139,0.25), transparent)' }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
            />

            {/* ══ RIGHT ══ */}
            <div className="w-full lg:w-[460px] flex items-center justify-center px-8 py-12 relative overflow-hidden shrink-0">

                {/* ── Mobile background: orbital system dimmed behind form ── */}
                <div className="lg:hidden absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                    <div style={{ transform: 'scale(0.62)', opacity: 0.22, transformOrigin: 'center center' }}>
                        <OrbitalSystem bgOnly />
                    </div>
                </div>

                {/* Dark radial vignette so form is readable over the orbital bg */}
                <div className="lg:hidden absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at center, rgba(6,9,18,0.2) 0%, rgba(6,9,18,0.85) 70%)' }} />

                <motion.div
                    className="relative z-10 w-full max-w-sm"
                    initial={{ opacity: 0, x: 48 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Header */}
                    <motion.div variants={container} initial="hidden" animate="show" className="mb-10">
                        <motion.div variants={item} className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-violet-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
                                <Shield size={20} className="text-white" />
                            </div>
                            <span className="text-white font-bold tracking-tight">Admin Access</span>
                        </motion.div>
                        <motion.h2 variants={item} className="text-[2rem] font-bold text-white mb-1.5 leading-tight">
                            Welcome back
                        </motion.h2>
                        <motion.p variants={item} className="text-slate-500 text-sm">
                            Sign in to manage your portfolio
                        </motion.p>
                    </motion.div>

                    {/* Error */}
                    <AnimatePresence>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.96 }}
                                className="flex items-center gap-3 mb-5 px-4 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                            >
                                <AlertCircle size={15} className="shrink-0" />
                                <span>{error}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Form */}
                    <motion.form
                        onSubmit={handleLogin}
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="space-y-4"
                    >
                        {/* Email */}
                        <motion.div variants={item} className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-[0.15em]">Email</label>
                            <motion.div
                                animate={focused === 'email' ? { scale: 1.015 } : { scale: 1 }}
                                transition={{ duration: 0.18 }}
                                className={`relative flex items-center rounded-2xl border transition-all duration-200 ${
                                    focused === 'email'
                                        ? 'border-sky-500/50 bg-sky-950/20 shadow-[0_0_24px_rgba(14,165,233,0.07)]'
                                        : 'border-white/[0.06] bg-white/[0.03] hover:border-white/10'
                                }`}
                            >
                                <Mail size={14} className={`absolute left-4 transition-colors duration-200 ${focused === 'email' ? 'text-sky-400' : 'text-slate-700'}`} />
                                <input
                                    type="email" value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    onFocus={() => setFocused('email')}
                                    onBlur={() => setFocused('')}
                                    required placeholder="your@email.com"
                                    className="w-full bg-transparent pl-10 pr-4 py-3.5 text-white text-sm placeholder-slate-700 focus:outline-none"
                                    style={{
                                        WebkitTextFillColor: 'white',
                                        WebkitBoxShadow: '0 0 0 1000px transparent inset',
                                        transition: 'background-color 5000s ease-in-out 0s',
                                    }}
                                />
                            </motion.div>
                        </motion.div>

                        {/* Password */}
                        <motion.div variants={item} className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-slate-600 uppercase tracking-[0.15em]">Password</label>
                            <motion.div
                                animate={focused === 'password' ? { scale: 1.015 } : { scale: 1 }}
                                transition={{ duration: 0.18 }}
                                className={`relative flex items-center rounded-2xl border transition-all duration-200 ${
                                    focused === 'password'
                                        ? 'border-sky-500/50 bg-sky-950/20 shadow-[0_0_24px_rgba(14,165,233,0.07)]'
                                        : 'border-white/[0.06] bg-white/[0.03] hover:border-white/10'
                                }`}
                            >
                                <Lock size={14} className={`absolute left-4 transition-colors duration-200 ${focused === 'password' ? 'text-sky-400' : 'text-slate-700'}`} />
                                <input
                                    type={showPassword ? 'text' : 'password'} value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    onFocus={() => setFocused('password')}
                                    onBlur={() => setFocused('')}
                                    required placeholder="••••••••••"
                                    className="w-full bg-transparent pl-10 pr-11 py-3.5 text-white text-sm placeholder-slate-700 focus:outline-none"
                                    style={{
                                        WebkitTextFillColor: 'white',
                                        WebkitBoxShadow: '0 0 0 1000px transparent inset',
                                        transition: 'background-color 5000s ease-in-out 0s',
                                    }}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 text-slate-700 hover:text-sky-400 transition-colors">
                                    <motion.div key={showPassword ? 'on' : 'off'}
                                        initial={{ rotate: -20, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                                    </motion.div>
                                </button>
                            </motion.div>
                        </motion.div>

                        {/* Submit */}
                        <motion.div variants={item} className="pt-1">
                            <motion.button
                                type="submit" disabled={loading}
                                className="w-full relative overflow-hidden py-3.5 px-6 rounded-2xl font-semibold text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #7c3aed 100%)' }}
                                whileHover={{ scale: 1.02, boxShadow: '0 8px 40px rgba(14,165,233,0.28)' }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                                    animate={{ x: ['-130%', '230%'] }}
                                    transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
                                />
                                <span className="relative flex items-center justify-center gap-2">
                                    {loading ? <><Loader2 size={15} className="animate-spin" />Signing in...</> : 'Sign In →'}
                                </span>
                            </motion.button>
                        </motion.div>
                    </motion.form>

                    {/* Footer */}
                    <motion.p
                        className="text-center text-slate-700 text-xs mt-8 pt-6 border-t border-white/[0.04]"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                    >
                        🔒 Secured by Firebase Authentication
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminLogin;
