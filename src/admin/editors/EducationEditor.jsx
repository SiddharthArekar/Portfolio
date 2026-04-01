import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Save, Loader2, CheckCircle } from 'lucide-react';
import { Field } from './HeroEditor';

const EducationEditor = () => {
    const [form, setForm] = useState({
        degreeType: "Master's Degree",
        degree: "Master of Computer Applications",
        university: "Reva University",
        logoUrl: "/Reva University.png",
        timeline: "2023 - 2025",
        location: "Bengaluru, Karnataka",
        status: "Completed",
    });
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            await setDoc(doc(db, 'portfolio', 'education'), form);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (e) { console.error(e); }
        setSaving(false);
    };

    const set = (field, value) => setForm(f => ({ ...f, [field]: value }));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Education Section</h2>
                    <p className="text-slate-400 text-sm mt-1">Update your academic background details</p>
                </div>
                <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-semibold transition-all disabled:opacity-50">
                    {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <CheckCircle size={16} /> : <Save size={16} />}
                    {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
                </button>
            </div>

            <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Degree Type (e.g. Master's Degree)" value={form.degreeType} onChange={v => set('degreeType', v)} />
                    <Field label="Full Degree Name" value={form.degree} onChange={v => set('degree', v)} />
                    <Field label="University / Institution" value={form.university} onChange={v => set('university', v)} />
                    <Field label="Logo URL (in /public folder)" value={form.logoUrl} onChange={v => set('logoUrl', v)} placeholder="/university-logo.png" />
                    <Field label="Timeline (e.g. 2023 - 2025)" value={form.timeline} onChange={v => set('timeline', v)} />
                    <Field label="Location" value={form.location} onChange={v => set('location', v)} />
                    <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">Status</label>
                        <select
                            value={form.status}
                            onChange={e => set('status', e.target.value)}
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-sky-500/50"
                        >
                            <option value="Completed">Completed</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Pursuing">Pursuing</option>
                        </select>
                    </div>
                </div>

                {/* Preview */}
                <div className="mt-4 p-4 rounded-xl bg-slate-900/50 border border-slate-700/50">
                    <p className="text-xs text-slate-500 mb-3">Preview</p>
                    <div className="flex items-center gap-4">
                        {form.logoUrl && <img src={form.logoUrl} alt="Logo" className="w-12 h-12 object-contain rounded-lg bg-white/5 p-1" onError={e => e.target.style.display = 'none'} />}
                        <div>
                            <p className="text-xs text-sky-400 font-semibold uppercase tracking-wider">{form.degreeType}</p>
                            <p className="text-white font-bold text-lg">{form.degree}</p>
                            <p className="text-slate-400 text-sm">{form.university} · {form.timeline} · {form.location}</p>
                            <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${form.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{form.status}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EducationEditor;
