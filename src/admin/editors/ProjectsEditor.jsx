import { useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../config/firebase';
import { Save, Loader2, Plus, Trash2, CheckCircle, ChevronDown, ChevronUp, Github, ExternalLink, ImageIcon, Upload } from 'lucide-react';
import { Field, TextareaField } from './HeroEditor';

const emptyProject = () => ({
    id: Date.now().toString(),
    title: '',
    description: '',
    tech: [],
    features: [],
    github: '',
    demo: '',
    image: '',
});

const ProjectsEditor = () => {
    const [projects, setProjects] = useState([
        {
            id: '1',
            title: "Cloud Monitoring Dashboard",
            description: "A centralized dashboard simulating real-time system metrics and incident detection.",
            tech: ["React", "Node.js", "WebSocket", "Tailwind CSS"],
            features: ["Real-time data visualization using Chart.js", "Automated incident alert system", "Simulated server health metrics", "Responsive incident timeline"],
            github: "https://github.com/yourusername/cloud-dashboard",
            demo: "",
            image: "",
        },
        {
            id: '2',
            title: "Real-time News Aggregator",
            description: "An AI-powered news application that delivers live updates and concise summaries.",
            tech: ["React", "Firebase", "OpenAI API", "News API"],
            features: ["User authentication via Firebase", "Live news feed integration", "AI-powered article summarization", "Personalized news categories"],
            github: "https://github.com/SiddharthArekar/Satya_Varta",
            demo: "https://satya-varta.vercel.app/",
            image: "",
        }
    ]);
    const [expanded, setExpanded] = useState(null);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [newTech, setNewTech] = useState({});
    const [newFeature, setNewFeature] = useState({});
    const [uploadingImage, setUploadingImage] = useState({});

    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'portfolio', 'projects'), (docSnap) => {
            if (docSnap.exists() && docSnap.data().list) {
                setProjects(docSnap.data().list);
            }
        });
        return unsub;
    }, []);

    const handleImageUpload = async (id, e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file.');
            return;
        }

        setUploadingImage(prev => ({ ...prev, [id]: true }));
        const storagePath = `projects/${Date.now()}_${file.name}`;
        const storageRef = ref(storage, storagePath);
        const task = uploadBytesResumable(storageRef, file);

        task.on('state_changed', null, 
            (err) => { console.error(err); setUploadingImage(prev => ({ ...prev, [id]: false })); },
            async () => {
                const url = await getDownloadURL(task.snapshot.ref);
                update(id, 'image', url);
                setUploadingImage(prev => ({ ...prev, [id]: false }));
            }
        );
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, 'portfolio', 'projects'), { list: projects });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (e) { console.error(e); }
        setSaving(false);
    };

    const update = (id, field, value) => setProjects(p => p.map(x => x.id === id ? { ...x, [field]: value } : x));

    const addTech = (id) => {
        const t = newTech[id]?.trim();
        if (!t) return;
        update(id, 'tech', [...(projects.find(p => p.id === id)?.tech || []), t]);
        setNewTech(s => ({ ...s, [id]: '' }));
    };

    const removeTech = (id, i) => update(id, 'tech', projects.find(p => p.id === id).tech.filter((_, j) => j !== i));

    const addFeature = (id) => {
        const f = newFeature[id]?.trim();
        if (!f) return;
        update(id, 'features', [...(projects.find(p => p.id === id)?.features || []), f]);
        setNewFeature(s => ({ ...s, [id]: '' }));
    };

    const removeFeature = (id, i) => update(id, 'features', projects.find(p => p.id === id).features.filter((_, j) => j !== i));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Projects Section</h2>
                    <p className="text-slate-400 text-sm mt-1">Add, edit, and remove projects from your portfolio</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={() => { const p = emptyProject(); setProjects(ps => [...ps, p]); setExpanded(p.id); }}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium transition-all text-sm">
                        <Plus size={16} /> Add Project
                    </button>
                    <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-all disabled:opacity-50">
                        {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <CheckCircle size={16} /> : <Save size={16} />}
                        {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {projects.map((project) => (
                    <div key={project.id} className="rounded-2xl bg-slate-800/30 border border-slate-700 overflow-hidden">
                        {/* Project header */}
                        <div className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-slate-800/50 transition-colors" onClick={() => setExpanded(expanded === project.id ? null : project.id)}>
                            <div className="flex-1">
                                <p className="font-semibold text-white">{project.title || 'Untitled Project'}</p>
                                <p className="text-slate-500 text-sm truncate">{project.description || 'No description yet'}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button onClick={(e) => { e.stopPropagation(); setProjects(ps => ps.filter(p => p.id !== project.id)); }}
                                    className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                                    <Trash2 size={14} />
                                </button>
                                {expanded === project.id ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
                            </div>
                        </div>

                        {/* Expanded form */}
                        {expanded === project.id && (
                            <div className="px-5 pb-6 space-y-5 border-t border-slate-700/50 pt-5">
                                
                                {/* Project Image */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="block text-xs font-medium text-slate-400">Project Image (Banner)</label>
                                        <div className="flex items-center gap-2">
                                            {project.image && (
                                                <button
                                                    onClick={() => update(project.id, 'image', '')}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400"
                                                >
                                                    <Trash2 size={12} />
                                                    Remove Image
                                                </button>
                                            )}
                                            <label className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all
                                                ${uploadingImage[project.id] ? 'bg-slate-800/60 text-slate-500 pointer-events-none' : 'bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/25 text-sky-400'}`}>
                                                {uploadingImage[project.id] ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
                                                {uploadingImage[project.id] ? 'Uploading...' : 'Upload Image'}
                                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(project.id, e)} disabled={uploadingImage[project.id]} />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="relative w-full h-40 rounded-xl border border-slate-700/50 bg-slate-900/50 overflow-hidden flex items-center justify-center">
                                        {project.image ? (
                                            <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-90" />

                                        ) : (
                                            <div className="text-center text-slate-500">
                                                <ImageIcon size={24} className="mx-auto mb-2 opacity-50" />
                                                <span className="text-xs">No image provided</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Field label="Project Title" value={project.title} onChange={v => update(project.id, 'title', v)} />
                                    <Field label="GitHub URL" value={project.github} onChange={v => update(project.id, 'github', v)} />
                                    <Field label="Live Demo URL (optional)" value={project.demo} onChange={v => update(project.id, 'demo', v)} />
                                </div>

                                <TextareaField label="Description" value={project.description} onChange={v => update(project.id, 'description', v)} rows={3} />

                                {/* Tech Stack */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-2">Tech Stack</label>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {project.tech.map((t, i) => (
                                            <span key={i} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs group">
                                                {t}
                                                <button onClick={() => removeTech(project.id, i)} className="opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <input value={newTech[project.id] || ''} onChange={e => setNewTech(s => ({ ...s, [project.id]: e.target.value }))}
                                            onKeyDown={e => e.key === 'Enter' && addTech(project.id)}
                                            placeholder="Add technology..." className="flex-1 bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-sky-500/50" />
                                        <button onClick={() => addTech(project.id)} className="px-3 py-2 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-400 text-sm"><Plus size={14} /></button>
                                    </div>
                                </div>

                                {/* Features */}
                                <div>
                                    <label className="block text-xs font-medium text-slate-400 mb-2">Key Features</label>
                                    <div className="space-y-2 mb-2">
                                        {project.features.map((f, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <span className="text-sky-400 text-xs">▹</span>
                                                <span className="flex-1 text-slate-300 text-sm">{f}</span>
                                                <button onClick={() => removeFeature(project.id, i)} className="text-red-400 hover:text-red-300"><Trash2 size={12} /></button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <input value={newFeature[project.id] || ''} onChange={e => setNewFeature(s => ({ ...s, [project.id]: e.target.value }))}
                                            onKeyDown={e => e.key === 'Enter' && addFeature(project.id)}
                                            placeholder="Add feature..." className="flex-1 bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-sky-500/50" />
                                        <button onClick={() => addFeature(project.id)} className="px-3 py-2 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-400 text-sm"><Plus size={14} /></button>
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

export default ProjectsEditor;
