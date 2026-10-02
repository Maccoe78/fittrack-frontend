import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { createDietPlan } from '../services/dietService';

function CreateDietPage() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        age: '',
        weight: '',
        height: '',
        goalWeight: '',
        gender: 'MALE',
        activityLevel: 'SEDENTARY',
        pace: 'SLOW',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const userId = localStorage.getItem('loggedInUserId');

        const payload = {
            age: parseInt(formData.age, 10),
            weight: parseFloat(formData.weight),
            height: parseFloat(formData.height),
            goalWeight: parseFloat(formData.goalWeight),
            gender: formData.gender,
            activityLevel: formData.activityLevel,
            pace: formData.pace,
            userId: parseInt(userId, 10),
        };
        console.log('stored userId:', userId);
        console.log('payload:', payload);

        try {
            const data = await createDietPlan(payload);
            console.log('Diet plan created:', data);
            navigate('/dashboard');
        }   catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#02050a] text-white">
            <div className="flex min-h-screen w-full overflow-hidden bg-[#0b0f15]">
                <Sidebar />

                <main className="flex flex-1 items-stretch justify-center p-8">
                    <div className="w-full">
                        <div className="mb-8">
                            <p className="text-sm text-slate-400">Create your</p>
                            <h1 className="text-4xl font-bold tracking-tight text-white">
                                Diet Plan
                            </h1>
                        </div>

                        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr]">
                            <form
                                onSubmit={handleSubmit}
                                className="rounded-[28px] border border-white/10 bg-[#12151d] p-8 shadow-2xl shadow-black/40"
                            >
                                <h2 className="mb-6 text-2xl font-semibold">
                                    Fill in your details
                                </h2>

                                <div className="grid gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-300">
                                            Age
                                        </label>
                                        <input
                                            type="number"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleChange}
                                            className="w-full rounded-2xl border border-white/10 bg-[#080b0f] px-4 py-3.5 text-white outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-300">
                                            Weight
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            name="weight"
                                            value={formData.weight}
                                            onChange={handleChange}
                                            className="w-full rounded-2xl border border-white/10 bg-[#080b0f] px-4 py-3.5 text-white outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-300">
                                            Height
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            name="height"
                                            value={formData.height}
                                            onChange={handleChange}
                                            className="w-full rounded-2xl border border-white/10 bg-[#080b0f] px-4 py-3.5 text-white outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-300">
                                            Goal Weight
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            name="goalWeight"
                                            value={formData.goalWeight}
                                            onChange={handleChange}
                                            className="w-full rounded-2xl border border-white/10 bg-[#080b0f] px-4 py-3.5 text-white outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 grid gap-5 md:grid-cols-3">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-300">
                                            Gender
                                        </label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className="w-full rounded-2xl border border-white/10 bg-[#080b0f] px-4 py-3.5 text-white outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                                        >
                                            <option value="MALE">Male</option>
                                            <option value="FEMALE">Female</option>
                                            <option value="OTHER">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-300">
                                            Activity Level
                                        </label>
                                        <select
                                            name="activityLevel"
                                            value={formData.activityLevel}
                                            onChange={handleChange}
                                            className="w-full rounded-2xl border border-white/10 bg-[#080b0f] px-4 py-3.5 text-white outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                                        >
                                            <option value="SEDENTARY">Sedentary</option>
                                            <option value="LIGHT">Light</option>
                                            <option value="MODERATE">Moderate</option>
                                            <option value="VERY_ACTIVE">Very Active</option>
                                            <option value="EXTRA_ACTIVE">Extra Active</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-300">
                                            Pace
                                        </label>
                                        <select
                                            name="pace"
                                            value={formData.pace}
                                            onChange={handleChange}
                                            className="w-full rounded-2xl border border-white/10 bg-[#080b0f] px-4 py-3.5 text-white outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                                        >
                                            <option value="SLOW">Slow</option>
                                            <option value="NORMAL">Normal</option>
                                            <option value="FAST">Fast</option>
                                        </select>
                                    </div>
                                </div>

                                {error && (
                                    <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                                        {error}
                                    </div>
                                )}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="mt-8 rounded-2xl bg-lime-400 px-8 py-4 font-semibold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading ? 'Creating...' : 'Create Diet Plan'}
                                </button>
                            </form>

                            <div className="rounded-[28px] border border-white/10 bg-[#12151d] p-8 shadow-2xl shadow-black/40">
                                <h2 className="text-2xl font-semibold">Preview</h2>
                                <p className="mt-2 text-slate-400">
                                    Here you&apos;ll later see the calculated intake and targets.
                                </p>

                                <div className="mt-8 rounded-[22px] border border-lime-400/30 bg-lime-400/10 p-6">
                                    <p className="text-sm text-lime-300">Calculated Daily Intake</p>
                                    <p className="mt-2 text-4xl font-bold text-white">-</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default CreateDietPage;