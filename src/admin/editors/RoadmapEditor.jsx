import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Save, Loader2, Plus, Trash2, CheckCircle } from 'lucide-react';
import { Field, TextareaField } from './HeroEditor';

const statusOptions = ['current', 'upcoming', 'goal'];
const statusColors = { current: 'bg-sky-500/20 text-sky-400 border-sky-500/30', upcoming: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30', goal: 'bg-slate-600/20 text-slate-400 border-slate-500/30' };

const RoadmapEditor = () => {
    const [steps, setSteps] = useState([
        { id: '1', title: "Cloud Engineer", status: "current", date: "Now", description: "Building deep knowledge of AWS services, troubleshooting real-world incidents, and handling customer issues effectively." },
        { id: '2', title: "Senior Cloud Engineer", status: "upcoming", date: "Next Step", description: "Designing scalable architectures, implementing IaC (Terraform), and automating deployments." },
        { id: '3', title: "DevOps Engineer", status: "goal", date: "Future Goal", description: "Mastering Kubernetes, building advanced CI/CD pipelines, and ensuring site reliability at scale." }
    ]);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, 'portfolio', 'roadmap'), { steps });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (e) { console.error(e); }
        setSaving(false);
    };

    const update = (id, field, value) => setSteps(s => s.map(x => x.id === id ? { ...x, [field]: value } : x));

    const addStep = () => setSteps(s => [...s, { id: Date.now().toString(), title: '', status: 'goal', date: '', description: '' }]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Career Roadmap</h2>
                    <p className="text-slate-400 text-sm mt-1">Define your career progression steps</p>
                </div>
                <div className="flex gap-3">
                    <button onClick={addStep} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium transition-all text-sm">
                        <Plus size={16} /> Add Step
                    </button>
                    <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-all disabled:opacity-50">
                        {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <CheckCircle size={16} /> : <Save size={16} />}
                        {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {steps.map((step, index) => (
                    <div key={step.id} className="p-5 rounded-2xl bg-slate-800/30 border border-slate-700 space-y-4">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-slate-700 text-slate-400 font-bold text-sm shrink-0">{index + 1}</span>
                            <span className={`px-2.5 py-1 rounded-full border text-xs font-semibold ${statusColors[step.status]}`}>{step.status}</span>
                            <button onClick={() => setSteps(s => s.filter(x => x.id !== step.id))} className="ml-auto p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                                <Trash2 size={14} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Field label="Title" value={step.title} onChange={v => update(step.id, 'title', v)} placeholder="e.g. Senior Cloud Engineer" />
                            <Field label="Date Label" value={step.date} onChange={v => update(step.id, 'date', v)} placeholder="e.g. Next Step" />
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-1.5">Status</label>
                                <select value={step.status} onChange={e => update(step.id, 'status', e.target.value)}
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-sky-500/50">
                                    {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>

                        <TextareaField label="Description" value={step.description} onChange={v => update(step.id, 'description', v)} rows={2} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoadmapEditor;
