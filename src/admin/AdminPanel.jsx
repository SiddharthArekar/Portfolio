import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import HeroEditor from './editors/HeroEditor';
import AboutEditor from './editors/AboutEditor';
import SkillsEditor from './editors/SkillsEditor';
import ProjectsEditor from './editors/ProjectsEditor';
import EducationEditor from './editors/EducationEditor';
import RoadmapEditor from './editors/RoadmapEditor';
import CertificationsEditor from './editors/CertificationsEditor';
import {
    LayoutDashboard, User, Zap, FolderOpen, GraduationCap,
    Map, Award, LogOut, Menu, X, ExternalLink,
    ChevronRight, Shield, Activity, Layers
} from 'lucide-react';

const navItems = [
    { id: 'hero',           label: 'Hero',           icon: LayoutDashboard, description: 'Main title & CTA',   color: 'text-sky-400',    bg: 'bg-sky-500/10',    border: 'border-sky-500/20',    activeBg: 'bg-sky-500/15' },
    { id: 'about',          label: 'About',          icon: User,            description: 'Bio & strengths',    color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20', activeBg: 'bg-violet-500/15' },
    { id: 'skills',         label: 'Skills',         icon: Zap,             description: 'Skill categories',  color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', activeBg: 'bg-yellow-500/15' },
    { id: 'projects',       label: 'Projects',       icon: FolderOpen,      description: 'Project showcase',  color: 'text-emerald-400',bg: 'bg-emerald-500/10',border: 'border-emerald-500/20',activeBg: 'bg-emerald-500/15' },
    { id: 'education',      label: 'Education',      icon: GraduationCap,   description: 'Academic details',  color: 'text-blue-400',   bg: 'bg-blue-500/10',   border: 'border-blue-500/20',   activeBg: 'bg-blue-500/15' },
    { id: 'roadmap',        label: 'Roadmap',        icon: Map,             description: 'Career path',       color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', activeBg: 'bg-orange-500/15' },
    { id: 'certifications', label: 'Certifications', icon: Award,           description: 'Certifications',    color: 'text-pink-400',   bg: 'bg-pink-500/10',   border: 'border-pink-500/20',   activeBg: 'bg-pink-500/15' },
];

const editors = {
    hero:           <HeroEditor />,
    about:          <AboutEditor />,
    skills:         <SkillsEditor />,
    projects:       <ProjectsEditor />,
    education:      <EducationEditor />,
    roadmap:        <RoadmapEditor />,
    certifications: <CertificationsEditor />,
};

/* ── Dashboard Overview Cards ── */
const DashboardOverview = ({ onNavigate }) => {
    const [visitorCount, setVisitorCount] = useState(0);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'analytics', 'visitors'), (doc) => {
            if (doc.exists()) {
                setVisitorCount(doc.data().count || 0);
            }
        });
        return () => unsub();
    }, []);

    return (
    <div className="space-y-8">
        {/* Welcome banner */}
        <div className="relative overflow-hidden rounded-3xl p-8 border border-white/10"
            style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.15) 0%, rgba(124,58,237,0.15) 100%)' }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl" />
            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-400 to-violet-500 flex items-center justify-center">
                        <Shield size={16} className="text-white" />
                    </div>
                    <span className="text-sky-400 text-sm font-semibold uppercase tracking-wider">Portfolio Admin</span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Welcome back! 👋</h1>
                <p className="text-slate-400 text-sm max-w-lg">
                    Your portfolio is live and synced with Firebase. Select any section below to start editing — all changes are reflected instantly.
                </p>
                <div className="flex items-center gap-2 mt-4">
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-emerald-400 text-xs font-medium">Live Sync Active</span>
                    <span className="text-slate-600 text-xs ml-2">All changes save directly to Firestore</span>
                </div>
            </div>
        </div>

        {/* Section cards grid */}
        <div>
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Layers size={14} />
                Portfolio Sections
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {navItems.map(({ id, label, icon: Icon, description, color, bg, border }) => (
                    <button
                        key={id}
                        onClick={() => onNavigate(id)}
                        className={`group relative p-5 rounded-2xl border ${border} ${bg} text-left hover:scale-[1.02] transition-all duration-200 hover:shadow-xl overflow-hidden`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className={`w-10 h-10 rounded-xl ${bg} border ${border} flex items-center justify-center mb-4`}>
                            <Icon size={20} className={color} />
                        </div>
                        <p className="text-white font-semibold text-sm mb-1">{label}</p>
                        <p className="text-slate-500 text-xs">{description}</p>
                        <ChevronRight size={14} className={`absolute bottom-4 right-4 ${color} opacity-0 group-hover:opacity-100 transition-all translate-x-0 group-hover:translate-x-1`} />
                    </button>
                ))}
            </div>
        </div>

        {/* Quick links */}
        <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-3">Quick Actions</p>
            <div className="flex flex-wrap gap-3">
                <a href="/" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-sm transition-all border border-slate-700">
                    <ExternalLink size={14} />
                    View Live Portfolio
                </a>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 text-slate-500 text-sm border border-slate-700 cursor-default">
                    <Activity size={14} />
                    7 Sections Available
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/10 text-indigo-400 text-sm border border-indigo-500/20 cursor-default">
                    <User size={14} />
                    {visitorCount} Total Visitors
                </div>
            </div>
        </div>
    </div>
    );
};

/* ── Main Component ── */
const AdminPanel = ({ user }) => {
    const [active, setActive] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const handleLogout = () => signOut(auth);

    const activeNav = navItems.find(n => n.id === active);

    return (
        <div className="h-screen bg-[#050810] flex text-slate-100 overflow-hidden">

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(false)} />
            )}

            {/* ── SIDEBAR ── */}
            <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300
                ${sidebarCollapsed ? 'w-[72px]' : 'w-64'}
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:relative lg:translate-x-0
                bg-slate-900/90 backdrop-blur-2xl border-r border-slate-800/60`}>

                {/* Subtle gradient bg */}
                <div className="absolute inset-0 bg-gradient-to-b from-sky-950/20 via-transparent to-violet-950/20 pointer-events-none" />

                {/* Logo row */}
                <div className={`relative z-10 flex items-center gap-3 px-4 py-5 border-b border-slate-800/60 ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-violet-600 flex items-center justify-center shadow-lg shadow-sky-500/20 shrink-0">
                            <Shield size={18} className="text-white" />
                        </div>
                        {!sidebarCollapsed && (
                            <div className="min-w-0">
                                <p className="text-white font-bold text-sm leading-tight">Portfolio CMS</p>
                                <p className="text-slate-500 text-xs truncate">{user?.email}</p>
                            </div>
                        )}
                    </div>
                    <button onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-1 rounded-lg hover:bg-slate-800 text-slate-500 shrink-0">
                        <X size={16} />
                    </button>
                    <button onClick={() => setSidebarCollapsed(c => !c)}
                        className={`hidden lg:flex p-1.5 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-white transition-colors shrink-0 ${sidebarCollapsed ? 'mx-auto' : ''}`}>
                        <ChevronRight size={14} className={`transition-transform ${sidebarCollapsed ? '' : 'rotate-180'}`} />
                    </button>
                </div>

                {/* Nav */}
                <nav className="relative z-10 flex-1 px-3 py-6 space-y-1.5 overflow-y-auto hidden-scrollbar">
                    {/* Dashboard home */}
                    <button onClick={() => { setActive('dashboard'); setSidebarOpen(false); }}
                        title="Dashboard"
                        className={`w-full flex items-center gap-3 rounded-xl transition-all duration-150 group
                            ${sidebarCollapsed ? 'justify-center px-2 py-3' : 'px-3 py-2.5'}
                            ${active === 'dashboard'
                                ? 'bg-white/10 text-white'
                                : 'text-slate-500 hover:text-white hover:bg-white/5'
                            }`}>
                        <LayoutDashboard size={18} className="shrink-0" />
                        {!sidebarCollapsed && <span className="text-sm font-medium">Dashboard</span>}
                    </button>

                    {!sidebarCollapsed && (
                        <p className="text-[10px] font-bold text-slate-700 uppercase tracking-widest px-3 pt-4 pb-1">Sections</p>
                    )}
                    {sidebarCollapsed && <div className="my-2 mx-3 h-px bg-slate-800" />}

                    {navItems.map(({ id, label, icon: Icon, color, activeBg, border }) => (
                        <button
                            key={id}
                            onClick={() => { setActive(id); setSidebarOpen(false); }}
                            title={label}
                            className={`w-full flex items-center gap-3 rounded-xl transition-all duration-150 group
                                ${sidebarCollapsed ? 'justify-center px-2 py-3' : 'px-3 py-2.5'}
                                ${active === id
                                    ? `${activeBg} border ${border} ${color}`
                                    : 'text-slate-500 hover:text-white hover:bg-white/5 border border-transparent'
                                }`}
                        >
                            <Icon size={18} className="shrink-0" />
                            {!sidebarCollapsed && (
                                <span className={`text-sm font-medium flex-1 text-left ${active === id ? '' : 'group-hover:text-white'}`}>
                                    {label}
                                </span>
                            )}
                            {!sidebarCollapsed && active === id && (
                                <div className={`w-1.5 h-1.5 rounded-full ${color.replace('text-', 'bg-')}`} />
                            )}
                        </button>
                    ))}
                </nav>

                {/* Sidebar footer */}
                <div className={`relative z-10 px-2 py-3 border-t border-slate-800/60 space-y-1`}>
                    {!sidebarCollapsed && (
                        <a href="/" target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-all text-sm">
                            <ExternalLink size={16} className="shrink-0" />
                            <span>View Portfolio</span>
                        </a>
                    )}
                    <button onClick={handleLogout}
                        title="Sign Out"
                        className={`w-full flex items-center gap-3 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all text-sm
                            ${sidebarCollapsed ? 'justify-center px-2 py-3' : 'px-3 py-2.5'}`}>
                        <LogOut size={16} className="shrink-0" />
                        {!sidebarCollapsed && <span>Sign Out</span>}
                    </button>
                </div>
            </aside>

            {/* ── MAIN CONTENT ── */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

                {/* Top bar */}
                <header className="sticky top-0 z-30 flex items-center gap-4 px-5 py-3.5 border-b border-slate-800/60 bg-[#050810]/80 backdrop-blur-xl">
                    <button onClick={() => setSidebarOpen(true)}
                        className="lg:hidden p-2 rounded-xl hover:bg-slate-800 text-slate-400 transition-colors">
                        <Menu size={18} />
                    </button>

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-slate-600">Admin</span>
                        <ChevronRight size={14} className="text-slate-700" />
                        <span className={`font-semibold ${activeNav?.color || 'text-white'}`}>
                            {active === 'dashboard' ? 'Dashboard' : activeNav?.label}
                        </span>
                    </div>

                    {/* Right side */}
                    <div className="ml-auto flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                            </span>
                            <span className="text-emerald-400 text-xs font-medium">Live</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold shadow-lg">
                            {user?.email?.[0]?.toUpperCase() || 'A'}
                        </div>
                    </div>
                </header>

                {/* Editor area */}
                <main className="flex-1 overflow-y-auto relative">
                    {/* Subtle background grid */}
                    <div className="fixed inset-0 pointer-events-none opacity-50" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

                    <div className="relative z-10 p-5 lg:p-8 max-w-5xl mx-auto">
                        {active === 'dashboard'
                            ? <DashboardOverview onNavigate={setActive} />
                            : editors[active]
                        }
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminPanel;
