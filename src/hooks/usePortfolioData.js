import { useState, useEffect } from 'react';
import { doc, onSnapshot, collection } from 'firebase/firestore';
import { db } from '../config/firebase';

// Default data (fallback if Firestore is empty)
const defaults = {
    hero: {
        greeting: "Hello, I'm a",
        title: "Cloud",
        titleHighlight: "Engineer",
        description: "Designing scalable infrastructure, automating deployments, and securing the cloud. Focused on AWS, Kubernetes, and DevOps.",
        available: true,
        ctaPrimary: { label: "View Projects", href: "#projects" },
        ctaSecondary: { label: "Download Resume", href: "/resume.pdf" },
    },
    about: {
        paragraphs: [
            "I am a recent graduate with a strong passion for Cloud Computing and DevOps. My journey started with a curiosity about how massive applications scale and maintain reliability.",
            "Currently, I am focused on mastering AWS services, Linux system administration, and modern deployment pipelines. I believe in learning by doing—building real projects that solve actual problems.",
            "I am actively looking for a Cloud Engineer role where I can apply my troubleshooting skills while growing towards becoming a full-fledged DevOps Engineer."
        ],
        whyHireMe: [
            "Strong fundamental understanding of Cloud Infrastructure",
            "Hands-on experience with AWS & Linux",
            "Problem-solving mindset developed through building projects",
            "Quick learner adaptable to new tools and technologies",
            "Product-focused approach to engineering"
        ]
    },
    education: {
        degreeType: "Master's Degree",
        degree: "Master of Computer Applications",
        university: "Reva University",
        logoUrl: "/Reva University.png",
        timeline: "2023 - 2025",
        location: "Bengaluru, Karnataka",
        status: "Completed"
    }
};

export function useHeroData() {
    const [data, setData] = useState(defaults.hero);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'portfolio', 'hero'), (snap) => {
            if (snap.exists()) setData({ ...defaults.hero, ...snap.data() });
            else setData(defaults.hero);
            setLoading(false);
        }, () => { setData(defaults.hero); setLoading(false); });
        return unsub;
    }, []);

    return { data, loading };
}

export function useAboutData() {
    const [data, setData] = useState(defaults.about);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'portfolio', 'about'), (snap) => {
            if (snap.exists()) setData({ ...defaults.about, ...snap.data() });
            else setData(defaults.about);
            setLoading(false);
        }, () => { setData(defaults.about); setLoading(false); });
        return unsub;
    }, []);

    return { data, loading };
}

export function useSkillsData() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'portfolio', 'skills'), (snap) => {
            if (snap.exists() && snap.data().categories) {
                setData(snap.data().categories);
            } else {
                // Default skills (without icon components — stored as strings)
                setData([
                    { id: '1', category: "Cloud & Platforms", iconName: "Cloud", skills: ["AWS EC2", "AWS S3", "AWS IAM", "CloudWatch", "Vercel", "Netlify"] },
                    { id: '2', category: "DevOps & OS", iconName: "Terminal", skills: ["Linux Fundamentals", "Git & GitHub", "Bash Scripting", "CI/CD Basics"] },
                    { id: '3', category: "Backend & Tools", iconName: "Database", skills: ["Firebase", "REST APIs", "Authentication", "Node.js Basics"] },
                    { id: '4', category: "Modern Development", iconName: "Zap", skills: ["React", "Tailwind CSS", "AI-Assisted Coding", "Rapid Prototyping"] }
                ]);
            }
            setLoading(false);
        }, () => { setLoading(false); });
        return unsub;
    }, []);

    return { data, loading };
}

export function useProjectsData() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'portfolio', 'projects'), (snap) => {
            if (snap.exists() && snap.data().list) {
                setData(snap.data().list);
            } else {
                setData([
                    {
                        id: '1',
                        title: "Cloud Monitoring Dashboard",
                        description: "A centralized dashboard simulating real-time system metrics and incident detection.",
                        tech: ["React", "Node.js", "WebSocket", "Tailwind CSS"],
                        features: ["Real-time data visualization using Chart.js", "Automated incident alert system", "Simulated server health metrics", "Responsive incident timeline"],
                        github: "https://github.com/yourusername/cloud-dashboard",
                        demo: null,
                    },
                    {
                        id: '2',
                        title: "Real-time News Aggregator",
                        description: "An AI-powered news application that delivers live updates and concise summaries.",
                        tech: ["React", "Firebase", "OpenAI API", "News API"],
                        features: ["User authentication via Firebase", "Live news feed integration", "AI-powered article summarization", "Personalized news categories"],
                        github: "https://github.com/SiddharthArekar/Satya_Varta",
                        demo: "https://satya-varta.vercel.app/",
                    }
                ]);
            }
            setLoading(false);
        }, () => { setLoading(false); });
        return unsub;
    }, []);

    return { data, loading };
}

export function useEducationData() {
    const [data, setData] = useState(defaults.education);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'portfolio', 'education'), (snap) => {
            if (snap.exists()) setData({ ...defaults.education, ...snap.data() });
            else setData(defaults.education);
            setLoading(false);
        }, () => { setData(defaults.education); setLoading(false); });
        return unsub;
    }, []);

    return { data, loading };
}

export function useRoadmapData() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'portfolio', 'roadmap'), (snap) => {
            if (snap.exists() && snap.data().steps) {
                setData(snap.data().steps);
            } else {
                setData([
                    { id: '1', title: "Cloud Engineer", status: "current", date: "Now", description: "Building deep knowledge of AWS services, troubleshooting real-world incidents, and handling customer issues effectively." },
                    { id: '2', title: "Senior Cloud Engineer", status: "upcoming", date: "Next Step", description: "Designing scalable architectures, implementing IaC (Terraform), and automating deployments." },
                    { id: '3', title: "DevOps Engineer", status: "goal", date: "Future Goal", description: "Mastering Kubernetes, building advanced CI/CD pipelines, and ensuring site reliability at scale." }
                ]);
            }
            setLoading(false);
        }, () => { setLoading(false); });
        return unsub;
    }, []);

    return { data, loading };
}

export function useCertificationsData() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'portfolio', 'certifications'), (snap) => {
            if (snap.exists() && snap.data().list) {
                setData(snap.data().list);
            } else {
                setData([
                    { id: '1', title: 'Microsoft Certified: Azure AI Fundamentals', issuer: 'Microsoft', status: 'Completed', description: 'Validates foundational knowledge of ML and AI concepts and related Azure services.', image: '/azure-ai-fundamentals.png', link: 'https://learn.microsoft.com/users/siddhartharekar/credentials/certification/azure-ai-fundamentals', iconName: 'Brain', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20', hoverColor: 'hover:border-blue-500/50' },
                    { id: '2', title: 'Cisco Certified Support Technician Cybersecurity', issuer: 'Cisco', status: 'Completed', description: 'Validates skills in security principles, network security, endpoint security concepts, and incident handling.', image: '/Cisco Certified Support Technician Cybersecurity.jpg', link: '#', iconName: 'ShieldCheck', color: 'bg-teal-500/10 text-teal-500 border-teal-500/20', hoverColor: 'hover:border-teal-500/50' },
                    { id: '3', title: 'Introduction to Generative AI', issuer: 'Google Cloud', status: 'Completed', description: 'Explores the fundamentals of Generative AI, LLMs, and how they differ from traditional AI.', image: '/Generative AI.jpg', link: '#', iconName: 'Sparkles', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20', hoverColor: 'hover:border-purple-500/50' },
                    { id: '4', title: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', status: 'In Progress', description: 'Mastering core AWS services, security, and architecture best practices.', image: null, link: 'https://aws.amazon.com/certification/certified-cloud-practitioner/', iconName: 'Award', color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30', hoverColor: 'hover:border-yellow-500/50' },
                    { id: '5', title: 'Linux Administration', issuer: 'Self-Paced / Coursera', status: 'In Progress', description: 'Hands-on experience with user management, permissions, and bash scripting.', image: null, link: '#', iconName: 'BookOpen', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30', hoverColor: 'hover:border-emerald-500/50' }
                ]);
            }
            setLoading(false);
        }, () => { setLoading(false); });
        return unsub;
    }, []);

    return { data, loading };
}
