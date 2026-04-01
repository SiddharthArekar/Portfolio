import { useState, useEffect } from 'react';
import {
    doc, setDoc, updateDoc, collection,
    onSnapshot, addDoc, writeBatch, deleteDoc, serverTimestamp,
} from 'firebase/firestore';
import {
    ref, uploadBytesResumable, getDownloadURL, deleteObject,
} from 'firebase/storage';
import { db, storage } from '../../config/firebase';
import {
    Save, Loader2, CheckCircle, LayoutDashboard,
    Upload, Trash2, FileText, Star, Clock, CheckCheck, ImageIcon, X, Cloud
} from 'lucide-react';

/* ── Shared UI primitives (exported for other editors) ── */
export const SectionHeader = ({ icon: Icon, title, description, color = 'text-sky-400', onSave, saving, saved }) => (
    <div className="flex items-start justify-between mb-8 pb-6 border-b border-slate-800/60">
        <div className="flex items-start gap-4">
            <div className={`p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/50 ${color}`}>
                <Icon size={20} />
            </div>
            <div>
                <h2 className="text-xl font-bold text-white">{title}</h2>
                <p className="text-slate-500 text-sm mt-0.5">{description}</p>
            </div>
        </div>
        {onSave && (
            <button onClick={onSave} disabled={saving}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                    ${saved
                        ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400'
                        : 'bg-gradient-to-r from-sky-500 to-violet-600 text-white hover:opacity-90 shadow-lg shadow-sky-500/20'
                    }`}>
                {saving ? <Loader2 size={15} className="animate-spin" /> : saved ? <CheckCircle size={15} /> : <Save size={15} />}
                {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
            </button>
        )}
    </div>
);

export const Field = ({ label, value, onChange, placeholder, type = 'text' }) => (
    <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">{label}</label>
        <input
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-slate-900/80 border border-slate-700/60 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-700 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/10 transition-all hover:border-slate-600"
        />
    </div>
);

export const TextareaField = ({ label, value, onChange, rows = 4 }) => (
    <div>
        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">{label}</label>
        <textarea
            value={value}
            onChange={e => onChange(e.target.value)}
            rows={rows}
            className="w-full bg-slate-900/80 border border-slate-700/60 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-700 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/10 transition-all resize-none hover:border-slate-600"
        />
    </div>
);

export const Card = ({ children, className = '' }) => (
    <div className={`p-5 rounded-2xl bg-slate-900/40 border border-slate-800/60 ${className}`}>
        {children}
    </div>
);

/* ══════════════════════════════════════
   RESUME MANAGER CARD
══════════════════════════════════════ */
const ResumeManager = () => {
    const [resumes, setResumes]           = useState([]);
    const [uploading, setUploading]       = useState(false);
    const [progress, setProgress]         = useState(0);
    const [deletingId, setDeletingId]     = useState(null);
    const [activatingId, setActivatingId] = useState(null);

    /* live-sync resume list */
    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'resumes'), snap => {
            const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
            docs.sort((a, b) => (b.uploadedAt?.seconds ?? 0) - (a.uploadedAt?.seconds ?? 0));
            setResumes(docs);
        });
        return unsub;
    }, []);

    /* ── Upload PDF ── */
    const handleUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.type !== 'application/pdf') {
            alert('Please select a PDF file.');
            return;
        }

        setUploading(true);
        setProgress(0);

        const storagePath = `resumes/${Date.now()}_${file.name}`;
        const storageRef  = ref(storage, storagePath);
        const task        = uploadBytesResumable(storageRef, file);

        task.on(
            'state_changed',
            snap => setProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
            err  => { console.error(err); setUploading(false); },
            async () => {
                const url = await getDownloadURL(task.snapshot.ref);
                await addDoc(collection(db, 'resumes'), {
                    name: file.name,
                    url,
                    storagePath,
                    uploadedAt: serverTimestamp(),
                    isActive: false,
                });
                setUploading(false);
                setProgress(0);
                e.target.value = '';
            }
        );
    };

    /* ── Set Active (sets this one active, others inactive + updates hero) ── */
    const setActive = async (resume) => {
        setActivatingId(resume.id);
        try {
            const batch = writeBatch(db);
            resumes.forEach(r => {
                batch.update(doc(db, 'resumes', r.id), { isActive: r.id === resume.id });
            });
            /* Update the hero document so portfolio shows this URL */
            batch.set(
                doc(db, 'portfolio', 'hero'),
                { activeResumeUrl: resume.url },
                { merge: true }
            );
            await batch.commit();
        } finally {
            setActivatingId(null);
        }
    };

    /* ── Delete ── */
    const handleDelete = async (resume) => {
        if (!confirm(`Delete "${resume.name}"?`)) return;
        setDeletingId(resume.id);
        try {
            /* remove from storage */
            await deleteObject(ref(storage, resume.storagePath));
            /* remove from Firestore */
            await deleteDoc(doc(db, 'resumes', resume.id));
            /* if it was active, clear activeResumeUrl in hero */
            if (resume.isActive) {
                await updateDoc(doc(db, 'portfolio', 'hero'), { activeResumeUrl: '' });
            }
        } catch (err) {
            console.error(err);
        } finally {
            setDeletingId(null);
        }
    };

    const formatDate = (ts) => {
        if (!ts?.seconds) return '—';
        return new Date(ts.seconds * 1000).toLocaleDateString('en-IN', {
            day: '2-digit', month: 'short', year: 'numeric',
        });
    };

    const activeResume = resumes.find(r => r.isActive);

    return (
        <Card>
            {/* Header row */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <FileText size={16} className="text-sky-400" />
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Resume Manager</p>
                    {activeResume && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-[10px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                            Active: {activeResume.name.replace(/^\d+_/, '')}
                        </span>
                    )}
                </div>

                {/* Upload button */}
                <label className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all
                    ${uploading
                        ? 'bg-slate-800/60 text-slate-500 pointer-events-none'
                        : 'bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/25 text-sky-400'
                    }`}>
                    {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                    {uploading ? `Uploading ${progress}%` : 'Upload PDF'}
                    <input type="file" accept=".pdf,application/pdf" className="hidden" onChange={handleUpload} disabled={uploading} />
                </label>
            </div>

            {/* Upload progress bar */}
            {uploading && (
                <div className="mb-4 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-sky-500 to-violet-500 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}

            {/* Resume list */}
            {resumes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                    <FileText size={32} className="text-slate-700 mb-3" />
                    <p className="text-slate-600 text-sm font-medium">No resumes uploaded yet</p>
                    <p className="text-slate-700 text-xs mt-1">Upload a PDF to get started</p>
                </div>
            ) : (
                <div className="space-y-2">
                    {resumes.map(resume => (
                        <div
                            key={resume.id}
                            className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200
                                ${resume.isActive
                                    ? 'bg-emerald-500/8 border-emerald-500/25'
                                    : 'bg-slate-900/50 border-slate-800/60 hover:border-slate-700'
                                }`}
                        >
                            {/* File icon */}
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0
                                ${resume.isActive ? 'bg-emerald-500/20' : 'bg-slate-800'}`}>
                                <FileText size={16} className={resume.isActive ? 'text-emerald-400' : 'text-slate-500'} />
                            </div>

                            {/* Name + date */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className="text-white text-sm font-medium truncate">
                                        {resume.name.replace(/^\d+_/, '')}
                                    </p>
                                    {resume.isActive && (
                                        <span className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                                            <CheckCheck size={10} /> Active
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-1 mt-0.5">
                                    <Clock size={10} className="text-slate-600" />
                                    <span className="text-slate-600 text-xs">{formatDate(resume.uploadedAt)}</span>
                                </div>
                            </div>

                            {/* Preview link */}
                            <a
                                href={resume.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shrink-0 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-medium transition-all border border-slate-700"
                            >
                                View
                            </a>

                            {/* Set active */}
                            {!resume.isActive && (
                                <button
                                    onClick={() => setActive(resume)}
                                    disabled={activatingId === resume.id}
                                    className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 text-sky-400 text-xs font-semibold transition-all border border-sky-500/20 disabled:opacity-50"
                                >
                                    {activatingId === resume.id
                                        ? <Loader2 size={12} className="animate-spin" />
                                        : <Star size={12} />
                                    }
                                    Set Active
                                </button>
                            )}

                            {/* Delete */}
                            <button
                                onClick={() => handleDelete(resume)}
                                disabled={deletingId === resume.id}
                                className="shrink-0 p-2 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-50"
                                title="Delete"
                            >
                                {deletingId === resume.id
                                    ? <Loader2 size={14} className="animate-spin" />
                                    : <Trash2 size={14} />
                                }
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Info note */}
            <p className="mt-4 text-slate-700 text-xs">
                💡 The <span className="text-emerald-400 font-semibold">Active</span> resume is shown as the download link in your portfolio. You can store multiple versions.
            </p>
        </Card>
    );
};

/* ══════════════════════════════════════
   HERO EDITOR
══════════════════════════════════════ */
const HeroEditor = () => {
    const [form, setForm] = useState({
        greeting: "Hello, I'm a",
        title: "Cloud",
        titleHighlight: "Engineer",
        description: "Designing scalable infrastructure, automating deployments, and securing the cloud. Focused on AWS, Kubernetes, and DevOps.",
        available: true,
        ctaPrimary: { label: "View Projects", href: "#projects" },
        ctaSecondary: { label: "Download Resume", href: "" },
        heroImage: "",
    });
    const [saving, setSaving] = useState(false);
    const [saved, setSaved]   = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'portfolio', 'hero'), (docSnap) => {
            if (docSnap.exists()) {
                setForm(prev => ({ ...prev, ...docSnap.data() }));
            }
        });
        return unsub;
    }, []);

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file.');
            return;
        }
        setUploadingImage(true);
        const storagePath = `hero/${Date.now()}_${file.name}`;
        const storageRef = ref(storage, storagePath);
        const task = uploadBytesResumable(storageRef, file);

        task.on('state_changed', null, 
            (err) => { console.error(err); setUploadingImage(false); },
            async () => {
                const url = await getDownloadURL(task.snapshot.ref);
                setForm(f => ({ ...f, heroImage: url }));
                setUploadingImage(false);
            }
        );
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, 'portfolio', 'hero'), form, { merge: true });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (e) { console.error(e); }
        setSaving(false);
    };

    return (
        <div className="space-y-6">
            <SectionHeader
                icon={LayoutDashboard}
                title="Hero Section"
                description="Main landing — title, subtitle, CTA buttons"
                color="text-sky-400"
                onSave={handleSave}
                saving={saving}
                saved={saved}
            />

            {/* Title row */}
            <Card>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Title & Headline</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Field label="Greeting Text" value={form.greeting} onChange={v => setForm(f => ({ ...f, greeting: v }))} placeholder="Hello, I'm a" />
                    <Field label="Main Title" value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} placeholder="Cloud" />
                    <Field label="Highlighted Word" value={form.titleHighlight} onChange={v => setForm(f => ({ ...f, titleHighlight: v }))} placeholder="Engineer" />
                </div>
            </Card>

            {/* Description */}
            <Card>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Description</p>
                <TextareaField label="Bio / Subtitle" value={form.description} onChange={v => setForm(f => ({ ...f, description: v }))} rows={3} />
            </Card>

            {/* Status & Primary CTA */}
            {/* Status & Settings */}
            <div className="grid grid-cols-1 gap-4">
                <Card className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-semibold text-white">Available for Hire</p>
                        <p className="text-xs text-slate-500 mt-0.5">Shows pulse badge in hero</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4 shrink-0">
                        <input type="checkbox" checked={form.available} onChange={e => setForm(f => ({ ...f, available: e.target.checked }))} className="sr-only peer" />
                        <div className="w-10 h-5 bg-slate-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-500"></div>
                    </label>
                </Card>
            </div>

            {/* Image Manager & CTA */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Primary CTA Button</p>
                    <div className="space-y-3">
                        <Field label="Label" value={form.ctaPrimary.label} onChange={v => setForm(f => ({ ...f, ctaPrimary: { ...f.ctaPrimary, label: v } }))} />
                        <Field label="Link / Href" value={form.ctaPrimary.href} onChange={v => setForm(f => ({ ...f, ctaPrimary: { ...f.ctaPrimary, href: v } }))} />
                    </div>
                </Card>

                {/* Hero Image Card */}
                <Card>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Hero Image</p>
                            <p className="text-[10px] text-slate-500 mt-0.5">Replaces the default animated cloud icon</p>
                        </div>
                        <label className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all
                            ${uploadingImage ? 'bg-slate-800/60 text-slate-500 pointer-events-none' : 'bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/25 text-sky-400'}`}>
                            {uploadingImage ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
                            {uploadingImage ? '...' : 'Upload'}
                            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                        </label>
                    </div>

                    <div className="relative w-full h-32 rounded-xl border border-slate-700/50 bg-slate-900/50 overflow-hidden flex items-center justify-center group">
                        {form.heroImage ? (
                            <>
                                <img src={form.heroImage} alt="Hero" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                                <button
                                    onClick={() => setForm(f => ({ ...f, heroImage: "" }))}
                                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500/80 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                                    title="Revert to Default Icon"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </>
                        ) : (
                            <div className="text-center flex flex-col items-center">
                                <div className="p-3 bg-slate-800 rounded-2xl border border-slate-700 mb-2">
                                    <Cloud size={24} className="text-sky-400" />
                                </div>
                                <span className="text-[10px] font-semibold text-slate-400">Default Graphic</span>
                            </div>
                        )}
                    </div>
                </Card>
            </div>

            {/* Resume Manager */}
            <ResumeManager />
        </div>
    );
};

export default HeroEditor;
