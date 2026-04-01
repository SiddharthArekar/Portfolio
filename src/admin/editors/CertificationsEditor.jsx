import { useState, useRef } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../config/firebase';
import { Save, Loader2, Plus, Trash2, CheckCircle, Upload, Image, ChevronDown, ChevronUp } from 'lucide-react';
import { Field, TextareaField } from './HeroEditor';

const iconOptions = ['Brain', 'ShieldCheck', 'Sparkles', 'Award', 'BookOpen', 'Star', 'Code', 'Globe'];
const colorOptions = [
    { label: 'Blue', value: 'bg-blue-500/10 text-blue-500 border-blue-500/20', hover: 'hover:border-blue-500/50' },
    { label: 'Teal', value: 'bg-teal-500/10 text-teal-500 border-teal-500/20', hover: 'hover:border-teal-500/50' },
    { label: 'Purple', value: 'bg-purple-500/10 text-purple-500 border-purple-500/20', hover: 'hover:border-purple-500/50' },
    { label: 'Yellow', value: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30', hover: 'hover:border-yellow-500/50' },
    { label: 'Green', value: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30', hover: 'hover:border-emerald-500/50' },
    { label: 'Red', value: 'bg-red-500/10 text-red-500 border-red-500/20', hover: 'hover:border-red-500/50' },
];

const CertificationsEditor = () => {
    const [certs, setCerts] = useState([
        { id: '1', title: 'Microsoft Certified: Azure AI Fundamentals', issuer: 'Microsoft', status: 'Completed', description: 'Validates foundational knowledge of ML and AI concepts and related Azure services.', image: '/azure-ai-fundamentals.png', link: 'https://learn.microsoft.com/users/siddhartharekar/credentials/certification/azure-ai-fundamentals', iconName: 'Brain', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20', hoverColor: 'hover:border-blue-500/50' },
        { id: '2', title: 'Cisco Certified Support Technician Cybersecurity', issuer: 'Cisco', status: 'Completed', description: 'Validates skills in security principles, network security, and incident handling.', image: '/Cisco Certified Support Technician Cybersecurity.jpg', link: '#', iconName: 'ShieldCheck', color: 'bg-teal-500/10 text-teal-500 border-teal-500/20', hoverColor: 'hover:border-teal-500/50' },
        { id: '3', title: 'Introduction to Generative AI', issuer: 'Google Cloud', status: 'Completed', description: 'Explores the fundamentals of Generative AI, LLMs, and how they differ from traditional AI.', image: '/Generative AI.jpg', link: '#', iconName: 'Sparkles', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20', hoverColor: 'hover:border-purple-500/50' },
        { id: '4', title: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', status: 'In Progress', description: 'Mastering core AWS services, security, and architecture best practices.', image: null, link: 'https://aws.amazon.com/certification/certified-cloud-practitioner/', iconName: 'Award', color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30', hoverColor: 'hover:border-yellow-500/50' },
        { id: '5', title: 'Linux Administration', issuer: 'Self-Paced / Coursera', status: 'In Progress', description: 'Hands-on experience with user management, permissions, and bash scripting.', image: null, link: '#', iconName: 'BookOpen', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30', hoverColor: 'hover:border-emerald-500/50' }
    ]);
    const [expanded, setExpanded] = useState(null);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [uploading, setUploading] = useState({});
    const fileRefs = useRef({});

    const handleSave = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, 'portfolio', 'certifications'), { list: certs });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (e) { console.error(e); }
        setSaving(false);
    };

    const update = (id, field, value) => setCerts(c => c.map(x => x.id === id ? { ...x, [field]: value } : x));

    const handleImageUpload = async (id, file) => {
        if (!file) return;
        setUploading(u => ({ ...u, [id]: true }));
        try {
            const storageRef = ref(storage, `certificates/${id}_${file.name}`);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            update(id, 'image', url);
        } catch (e) { console.error('Upload error:', e); }
        setUploading(u => ({ ...u, [id]: false }));
    };

    const addCert = () => {
        const newId = Date.now().toString();
        setCerts(c => [...c, { id: newId, title: '', issuer: '', status: 'Completed', description: '', image: null, link: '#', iconName: 'Award', color: colorOptions[0].value, hoverColor: colorOptions[0].hover }]);
        setExpanded(newId);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Certifications</h2>
                    <p className="text-slate-400 text-sm mt-1">Manage your certificates with image uploads</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={addCert} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium transition-all text-sm">
                        <Plus size={16} /> Add Certificate
                    </button>
                    <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-all disabled:opacity-50">
                        {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <CheckCircle size={16} /> : <Save size={16} />}
                        {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {certs.map((cert) => (
                    <div key={cert.id} className="rounded-2xl bg-slate-800/30 border border-slate-700 overflow-hidden">
                        {/* Cert header */}
                        <div className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-slate-800/50 transition-colors" onClick={() => setExpanded(expanded === cert.id ? null : cert.id)}>
                            <div className="flex-1">
                                <p className="font-semibold text-white">{cert.title || 'Untitled Certificate'}</p>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-slate-500 text-sm">{cert.issuer || 'No issuer'}</span>
                                    <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${cert.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{cert.status}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {cert.image && <Image size={14} className="text-sky-400" />}
                                <button onClick={(e) => { e.stopPropagation(); setCerts(c => c.filter(x => x.id !== cert.id)); }} className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                                    <Trash2 size={14} />
                                </button>
                                {expanded === cert.id ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
                            </div>
                        </div>

                        {/* Expanded form */}
                        {expanded === cert.id && (
                            <div className="px-5 pb-6 space-y-4 border-t border-slate-700/50 pt-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Field label="Certificate Title" value={cert.title} onChange={v => update(cert.id, 'title', v)} />
                                    <Field label="Issuer" value={cert.issuer} onChange={v => update(cert.id, 'issuer', v)} />
                                    <Field label="Credential / Info Link" value={cert.link} onChange={v => update(cert.id, 'link', v)} />
                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 mb-1.5">Status</label>
                                        <select value={cert.status} onChange={e => update(cert.id, 'status', e.target.value)} className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-sky-500/50">
                                            <option value="Completed">Completed</option>
                                            <option value="In Progress">In Progress</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 mb-1.5">Icon</label>
                                        <select value={cert.iconName} onChange={e => update(cert.id, 'iconName', e.target.value)} className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-sky-500/50">
                                            {iconOptions.map(i => <option key={i} value={i}>{i}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 mb-1.5">Color Theme</label>
                                        <select value={cert.color} onChange={e => { const c = colorOptions.find(x => x.value === e.target.value); update(cert.id, 'color', c.value); update(cert.id, 'hoverColor', c.hover); }} className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-sky-500/50">
                                            {colorOptions.map(c => <option key={c.label} value={c.value}>{c.label}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <TextareaField label="Description" value={cert.description} onChange={v => update(cert.id, 'description', v)} rows={2} />

                                {/* File/Image Upload */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-2">Certificate File (Image or PDF)</label>
                                    <div className="flex items-start gap-4">
                                        {cert.image && (
                                            <div className="relative group">
                                                {cert.image.includes('.pdf') || cert.image.includes('%2Epdf') ? (
                                                    <div className="w-24 h-16 flex items-center justify-center bg-slate-800 rounded-lg border border-slate-700 text-slate-400 text-xs font-medium">
                                                        PDF File
                                                    </div>
                                                ) : (
                                                    <img src={cert.image} alt="Certificate" className="w-24 h-16 object-cover rounded-lg border border-slate-700" onError={e => e.target.style.display = 'none'} />
                                                )}
                                                <button onClick={() => update(cert.id, 'image', null)} className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10">×</button>
                                            </div>
                                        )}
                                        <div>
                                            <input type="file" accept="image/*,application/pdf" ref={el => fileRefs.current[cert.id] = el} onChange={e => handleImageUpload(cert.id, e.target.files[0])} className="hidden" />
                                            <button onClick={() => fileRefs.current[cert.id]?.click()} disabled={uploading[cert.id]} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm font-medium transition-colors disabled:opacity-50">
                                                {uploading[cert.id] ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                                                {uploading[cert.id] ? 'Uploading...' : cert.image ? 'Replace File' : 'Upload File'}
                                            </button>
                                            <p className="text-slate-600 text-xs mt-1">JPG, PNG, or PDF up to 5MB.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CertificationsEditor;
