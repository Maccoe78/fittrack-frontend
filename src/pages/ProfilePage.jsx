import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import {
    deleteMyAccount,
    getMyProfile,
    updateMyProfile,
} from '../services/authService';

function ProfilePage() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [name, setName] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [deletePassword, setDeletePassword] = useState('');
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        getMyProfile()
            .then((data) => {
                setProfile(data);
                setName(data.name);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    async function handleSave(event) {
        event.preventDefault();
        setError('');
        setMessage('');

        const updatedName = name.trim() !== profile.name ? name.trim() : null;
        if (!updatedName && !newPassword) {
            setError('You haven\'t filled in any changes');
            return;
        }

        try {
            const updated = await updateMyProfile({
                currentPassword,
                name: updatedName,
                newPassword: newPassword || null,
            });
            setProfile(updated);
            setName(updated.name);
            localStorage.setItem('loggedInUserName', updated.name);
            setCurrentPassword('');
            setNewPassword('');
            setEditing(false);
            setMessage('Your profile has been updated.');
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleDelete() {
        setError('');
        if (!window.confirm('Are you sure you want to delete your account?')) return;

        try {
            await deleteMyAccount(deletePassword);
            sessionStorage.removeItem('token');
            localStorage.removeItem('loggedInUserId');
            localStorage.removeItem('loggedInUserName');
            navigate('/login', { replace: true });
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="min-h-screen bg-[#0b0f15] text-white">
            <div className="flex min-h-screen w-full">
                <Sidebar />
                <main className="flex-1 p-8">
                    <h1 className="mb-8 text-4xl font-bold">Profile</h1>

                    {loading ? (
                        <p className="text-slate-400">Loading...</p>
                    ) : (
                        <div className="max-w-xl space-y-8">
                            {error && <p className="text-red-400">{error}</p>}
                            {message && <p className="text-lime-400">{message}</p>}

                            <section className="rounded-2xl border border-white/10 bg-[#12151d] p-6">
                                <h2 className="mb-4 text-xl font-semibold">Account details</h2>
                                <p className="mb-2 text-slate-300">Name: {profile?.name}</p>
                                <p className="mb-5 text-slate-300">Password: ••••••••</p>

                                {!editing ? (
                                    <button
                                        type="button"
                                        onClick={() => setEditing(true)}
                                        className="rounded-xl bg-lime-400 px-4 py-2 font-semibold text-black"
                                    >
                                        Edit profile
                                    </button>
                                ) : (
                                    <form onSubmit={handleSave} className="space-y-4">
                                        <label className="block">
                                            <span className="mb-1 block text-sm text-slate-300">Name</span>
                                            <input
                                                value={name}
                                                onChange={(event) => setName(event.target.value)}
                                                className="w-full rounded-xl bg-[#0b0f15] p-3 text-white"
                                                required
                                            />
                                        </label>
                                        <label className="block">
                                            <span className="mb-1 block text-sm text-slate-300">
                                                Current password
                                            </span>
                                            <input
                                                type="password"
                                                value={currentPassword}
                                                onChange={(event) => setCurrentPassword(event.target.value)}
                                                className="w-full rounded-xl bg-[#0b0f15] p-3 text-white"
                                                required
                                            />
                                        </label>
                                        <label className="block">
                                            <span className="mb-1 block text-sm text-slate-300">
                                                New password (optional)
                                            </span>
                                            <input
                                                type="password"
                                                value={newPassword}
                                                onChange={(event) => setNewPassword(event.target.value)}
                                                className="w-full rounded-xl bg-[#0b0f15] p-3 text-white"
                                            />
                                        </label>
                                        <div className="flex gap-3">
                                            <button className="rounded-xl bg-lime-400 px-4 py-2 font-semibold text-black">
                                                Save
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setEditing(false);
                                                    setName(profile.name);
                                                    setCurrentPassword('');
                                                    setNewPassword('');
                                                }}
                                                className="rounded-xl bg-white/10 px-4 py-2"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </section>

                            <section className="rounded-2xl border border-red-500/30 bg-[#12151d] p-6">
                                <h2 className="mb-2 text-xl font-semibold text-red-400">Delete account</h2>
                                <p className="mb-4 text-sm text-slate-400">
                                    Je account en gekoppelde diet plans worden verwijderd.
                                </p>
                                <label className="mb-4 block">
                                    <span className="mb-1 block text-sm text-slate-300">
                                        Current password
                                    </span>
                                    <input
                                        type="password"
                                        value={deletePassword}
                                        onChange={(event) => setDeletePassword(event.target.value)}
                                        className="w-full rounded-xl bg-[#0b0f15] p-3 text-white"
                                    />
                                </label>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={!deletePassword}
                                    className="rounded-xl bg-red-700 px-4 py-2 font-semibold text-white hover:bg-red-800 disabled:opacity-50"
                                >
                                    Delete my account
                                </button>
                            </section>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default ProfilePage;