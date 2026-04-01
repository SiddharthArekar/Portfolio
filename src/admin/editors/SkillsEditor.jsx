import { useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Zap, Plus, Trash2 } from 'lucide-react';
import { SectionHeader, Card } from './HeroEditor';

const iconOptions = ['Cloud', 'Terminal', 'Database', 'Code', 'Shield', 'GitBranch', 'Cpu', 'Zap', 'Globe', 'Lock', 'Server', 'Layers'];

const SkillsEditor = () => {
    const [categories, setCategories] = useState([]);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [newSkill, setNewSkill] = useState({});

    // Default data as fallback
    const defaultCategories = [
        { id: '1', category: "Cloud & Platforms", iconName: "Cloud", skills: ["AWS EC2", "AWS S3", "AWS IAM", "CloudWatch", "Vercel", "Netlify"] },
        { id: '2', category: "DevOps & OS", iconName: "Terminal", skills: ["Linux Fundamentals", "Git & GitHub", "Bash Scripting", "CI/CD Basics"] },
        { id: '3', category: "Backend & Tools", iconName: "Database", skills: ["Firebase", "REST APIs", "Authentication", "Node.js Basics"] },
        { id: '4', category: "Modern Development", iconName: "Zap", skills: ["React", "Tailwind CSS", "AI-Assisted Coding", "Rapid Prototyping"] }
    ];

    // Real-time data fetching
    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'portfolio', 'skills'), (docSnap) => {
            if (docSnap.exists() && docSnap.data().categories) {
                setCategories(docSnap.data().categories);
            } else {
                // Initialize with defaults if database is empty
                setCategories(defaultCategories);
            }
        });
        return () => unsub();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, 'portfolio', 'skills'), { categories });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (e) { console.error(e); }
        setSaving(false);
    };

    const addCategory = () => {
        setCategories(c => [...c, { id: Date.now().toString(), category: 'New Category', iconName: 'Code', skills: [] }]);
    };

    const removeCategory = (id) => setCategories(c => c.filter(x => x.id !== id));

    const updateCategory = (id, field, value) => {
        setCategories(c => c.map(x => x.id === id ? { ...x, [field]: value } : x));
    };

    const addSkill = (catId) => {
        const skill = newSkill[catId]?.trim();
        if (!skill) return;
        setCategories(c => c.map(x => x.id === catId ? { ...x, skills: [...x.skills, skill] } : x));
        setNewSkill(s => ({ ...s, [catId]: '' }));
    };

    const removeSkill = (catId, skillIndex) => {
        setCategories(c => c.map(x => x.id === catId ? { ...x, skills: x.skills.filter((_, i) => i !== skillIndex) } : x));
    };

    return (
        <div className="space-y-6">
            <SectionHeader
                icon={Zap}
                title="Skills Section"
                description="Manage skill categories and individual skills"
                color="text-yellow-400"
                onSave={handleSave}
                saving={saving}
                saved={saved}
            />

            <div className="flex justify-end">
                <button onClick={addCategory} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white font-medium transition-all text-sm border border-slate-700">
                    <Plus size={14} /> Add Category
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((cat) => (
                    <Card key={cat.id} className="space-y-4">
                        {/* Category header */}
                        <div className="flex items-center gap-2">
                            <input
                                value={cat.category}
                                onChange={e => updateCategory(cat.id, 'category', e.target.value)}
                                className="flex-1 bg-slate-900/80 border border-slate-700/60 rounded-lg px-3 py-2 text-white text-sm font-semibold focus:outline-none focus:border-sky-500/50"
                            />
                            <select
                                value={cat.iconName}
                                onChange={e => updateCategory(cat.id, 'iconName', e.target.value)}
                                className="bg-slate-900/80 border border-slate-700/60 rounded-lg px-2 py-2 text-slate-300 text-xs focus:outline-none focus:border-sky-500/50"
                            >
                                {iconOptions.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                            </select>
                            <button onClick={() => removeCategory(cat.id)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                                <Trash2 size={14} />
                            </button>
                        </div>

                        {/* Skills tags */}
                        <div className="flex flex-wrap gap-2">
                            {cat.skills.map((skill, i) => (
                                <span key={i} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-700/70 border border-slate-600 text-slate-300 text-xs group">
                                    {skill}
                                    <button onClick={() => removeSkill(cat.id, i)} className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity">
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>

                        {/* Add skill input */}
                        <div className="flex gap-2">
                            <input
                                value={newSkill[cat.id] || ''}
                                onChange={e => setNewSkill(s => ({ ...s, [cat.id]: e.target.value }))}
                                onKeyDown={e => e.key === 'Enter' && addSkill(cat.id)}
                                placeholder="Add a skill..."
                                className="flex-1 bg-slate-900/80 border border-slate-700/60 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-700 focus:outline-none focus:border-sky-500/50"
                            />
                            <button onClick={() => addSkill(cat.id)} className="px-3 py-2 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-400 text-sm transition-colors">
                                <Plus size={14} />
                            </button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default SkillsEditor;
