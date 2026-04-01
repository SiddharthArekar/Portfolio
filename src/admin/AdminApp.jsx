import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import AdminLogin from './AdminLogin';
import AdminPanel from './AdminPanel';

const AdminApp = () => {
    const [user, setUser] = useState(undefined); // undefined = still loading

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => setUser(u));
        return unsub;
    }, []);

    if (user === undefined) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return user ? <AdminPanel user={user} /> : <AdminLogin />;
};

export default AdminApp;
