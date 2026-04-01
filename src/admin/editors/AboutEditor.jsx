import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { User, Plus, Trash2, GripVertical } from 'lucide-react';
import { Field, TextareaField, SectionHeader, Card } from './HeroEditor';

const AboutEditor = () => {
    const [paragraphs, setParagraphs] = useState([
        "I am a recent graduate with a strong passion for Cloud Computing and DevOps. My journey started with a curiosity about how massive applications scale and maintain reliability.",
        "Currently, I am focused on mastering AWS services, Linux system administration, and modern deployment pipelines. I believe in learning by doing—building real projects that solve actual problems.",
        "I am actively looking for a Cloud Engineer role where I can apply my troubleshooting skills while growing towards becoming a full-fledged DevOps Engineer."
    ]);
    const [whyHireMe, setWhyHireMe] = useState([
        "Strong fundamental understanding of Cloud Infrastructure",
        "Hands-on experience with AWS & Linux",
        "Problem-solving mindset developed through building projects",
        "Quick learner adaptable to new tools and technologies",
        "Product-focused approach to engineering"
    ]);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, 'portfolio', 'about'), { paragraphs, whyHireMe });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (e) { console.error(e); }
        setSaving(false);
    };

    return (
        <div className="space-y-6">
            <SectionHeader
                icon={User}
                title="About Section"
                description="Bio paragraphs and key strengths"
                color="text-violet-400"
                onSave={handleSave}
                saving={saving}
                saved={saved}
            />

            {/* Bio Paragraphs */}
            <Card>
                <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Bio Paragraphs</p>
                    <button onClick={() => setParagraphs(p => [...p, ''])} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-medium transition-colors border border-slate-700">
                        <Plus size={14} /> Add Paragraph
                    </button>
                </div>
                {paragraphs.map((para, i) => (
                    <div key={i} className="flex gap-3">
                        <div className="flex-1">
                            <TextareaField
                                label={`Paragraph ${i + 1}`}
                                value={para}
                                onChange={v => setParagraphs(p => p.map((x, j) => j === i ? v : x))}
                                rows={3}
                            />
                        </div>
                        <button onClick={() => setParagraphs(p => p.filter((_, j) => j !== i))} className="mt-6 p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors self-start">
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </Card>

            {/* Why Hire Me */}
            <Card>
                <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Why Hire Me — Bullet Points</p>
                    <button onClick={() => setWhyHireMe(w => [...w, ''])} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs font-medium transition-colors border border-slate-700">
                        <Plus size={14} /> Add Point
                    </button>
                </div>
                {whyHireMe.map((point, i) => (
                    <div key={i} className="flex items-center gap-3">
                        <GripVertical size={16} className="text-slate-600 shrink-0" />
                        <input
                            value={point}
                            onChange={e => setWhyHireMe(w => w.map((x, j) => j === i ? e.target.value : x))}
                            placeholder={`Bullet point ${i + 1}`}
                            className="flex-1 bg-slate-900/80 border border-slate-700/60 rounded-xl px-4 py-2.5 text-white text-sm placeholder-slate-700 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/10 transition-all"
                        />
                        <button onClick={() => setWhyHireMe(w => w.filter((_, j) => j !== i))} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </Card>
        </div>
    );
};

export default AboutEditor;
