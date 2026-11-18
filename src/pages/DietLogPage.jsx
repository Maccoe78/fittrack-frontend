import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CalorieRing from '../components/CalorieRing';

import {
    addFoodEntry,
    getFoodEntriesByDate,
    getTodayFoodSummary,
} from '../services/foodEntryService';

function getAmsterdamDate() {
    const parts = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Europe/Amsterdam',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).formatToParts(new Date());

    const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
    return `${values.year}-${values.month}-${values.day}`;
}

function DietLogPage() {
    const navigate = useNavigate();

    const today = getAmsterdamDate();
    const [selectedDate, setSelectedDate] = useState(today);
    const [summary, setSummary] = useState(null);
    const [loadingEntries, setLoadingEntries] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);
    const [foodName, setFoodName] = useState('');
    const [calories, setCalories] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;

        async function loadEntries() {
            setLoadingEntries(true);
            setError('');

            try {
                let result;

                if (selectedDate === getAmsterdamDate()) {
                    result = await getTodayFoodSummary();
                } else {
                    const entries = await getFoodEntriesByDate(selectedDate);
                    result = {
                        date: selectedDate,
                        entries,
                        consumedCalories: entries.reduce(
                            (total, entry) => total + entry.calories,
                            0
                        ),
                        calorieTarget: null,
                        remainingCalories: null,
                    };
                }

                if (!cancelled) setSummary(result);
            } catch (requestError) {
                if (!cancelled) setError(requestError.message);
            } finally {
                if (!cancelled) setLoadingEntries(false);
            }
        }

        loadEntries();

        return () => {
            cancelled = true;
        };
    }, [selectedDate, refreshKey]);

    async function handleAddFood(event) {
        event.preventDefault();
        setError('');

        try {
            await addFoodEntry(foodName.trim(), Number(calories));
            setFoodName('');
            setCalories('');
            setRefreshKey((key) => key + 1);
        } catch (requestError) {
            setError(requestError.message);
        }
    }

    const isToday = selectedDate === getAmsterdamDate();
    const entries = summary?.entries ?? [];
    const consumed = summary?.consumedCalories ?? 0;
    const goal = summary?.calorieTarget;
    const remaining = summary?.remainingCalories;

    return (
        <div className="min-h-screen bg-[#02050a] text-white">
            <div className="flex min-h-screen w-full overflow-hidden bg-[#0b0f15]">
                <Sidebar />

                <main className="flex flex-1 justify-center p-8">
                    <div className="w-full">
                        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <p className="text-sm text-slate-400">Track your</p>
                                <h1 className="text-4xl font-bold tracking-tight">
                                    Diet Logs
                                </h1>
                            </div>

                            <label className="text-sm text-slate-400">
                                Select date
                                <input
                                    type="date"
                                    value={selectedDate}
                                    max={today}
                                    onChange={(event) => setSelectedDate(event.target.value)}
                                    className="ml-3 rounded-xl border border-white/10 bg-[#12151d] px-3 py-2 text-white"
                                />
                            </label>
                        </div>

                        {error && (
                            <p role="alert" className="mb-5 text-red-400">
                                {error}
                            </p>
                        )}

                        {loadingEntries  ? (
                            <p className="text-slate-400">Loading...</p>
                        ) : (
                            <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
                                <div className="space-y-6">
                                    <section className="flex flex-wrap items-center gap-8 rounded-[28px] border border-white/10 bg-[#12151d] p-6">
                                        {isToday && goal != null && (
                                            <CalorieRing
                                                value={consumed.toLocaleString()}
                                                subtitle={`of ${Math.round(goal).toLocaleString()} kcal`}
                                                progress={goal > 0 ? Math.min(consumed / goal, 1) : 0}
                                                size={180}
                                            />
                                        )}

                                        <div className="flex flex-1 flex-wrap gap-8">
                                            <div>
                                                <p className="text-xs uppercase tracking-widest text-slate-500">
                                                    Consumed
                                                </p>
                                                <p className="mt-2 text-2xl font-bold">
                                                    {consumed.toLocaleString()} kcal
                                                </p>
                                            </div>

                                            {isToday && goal != null ? (
                                                <>
                                                    <div>
                                                        <p className="text-xs uppercase tracking-widest text-slate-500">
                                                            Goal
                                                        </p>
                                                        <p className="mt-2 text-2xl font-bold">
                                                            {Math.round(goal).toLocaleString()} kcal
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs uppercase tracking-widest text-lime-400">
                                                            Remaining
                                                        </p>
                                                        <p className="mt-2 text-2xl font-bold text-lime-400">
                                                            {Math.round(remaining).toLocaleString()} kcal
                                                        </p>
                                                    </div>
                                                </>
                                            ) : isToday ? (
                                                <div>
                                                    <p className="text-slate-400">
                                                        No diet plan yet.
                                                    </p>
                                                    <button
                                                        onClick={() => navigate('/create-diet')}
                                                        className="mt-3 rounded-xl bg-lime-400 px-4 py-2 font-semibold text-black"
                                                    >
                                                        Create a diet plan
                                                    </button>
                                                </div>
                                            ) : (
                                                <p className="text-sm text-slate-400">
                                                    Historical calorie goals are not stored.
                                                </p>
                                            )}
                                        </div>
                                    </section>

                                    {isToday && (
                                        <form
                                            onSubmit={handleAddFood}
                                            className="grid gap-3 rounded-[28px] border border-white/10 bg-[#12151d] p-6 sm:grid-cols-[1fr_150px_auto]"
                                        >
                                            <input
                                                value={foodName}
                                                onChange={(event) => setFoodName(event.target.value)}
                                                placeholder="Food name"
                                                maxLength={255}
                                                required
                                                className="rounded-xl border border-white/10 bg-[#0b0f15] px-4 py-3 text-white"
                                            />
                                            <input
                                                type="number"
                                                value={calories}
                                                onChange={(event) => setCalories(event.target.value)}
                                                placeholder="Calories"
                                                min="0"
                                                step="1"
                                                required
                                                className="rounded-xl border border-white/10 bg-[#0b0f15] px-4 py-3 text-white"
                                            />
                                            <button
                                                type="submit"
                                                className="rounded-xl bg-lime-400 px-5 py-3 font-semibold text-black hover:bg-lime-300"
                                            >
                                                Add food
                                            </button>
                                        </form>
                                    )}

                                    <section className="rounded-[28px] border border-white/10 bg-[#12151d] p-6">
                                        <h2 className="mb-4 text-lg font-semibold">
                                            Food entries
                                        </h2>

                                        {entries.length === 0 ? (
                                            <p className="text-sm text-slate-500">
                                                No food logged for this day.
                                            </p>
                                        ) : (
                                            <ul className="divide-y divide-white/10">
                                                {entries.map((entry) => (
                                                    <li
                                                        key={entry.id}
                                                        className="flex justify-between gap-4 py-3"
                                                    >
                                                        <span>{entry.foodName}</span>
                                                        <span className="text-slate-400">
                                                            {entry.calories} kcal
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </section>
                                </div>

                                <section className="rounded-[28px] border border-white/10 bg-[#12151d] p-6">
                                    <h2 className="text-lg font-semibold">Daily total</h2>
                                    <p className="mt-4 text-3xl font-bold">
                                        {consumed.toLocaleString()} kcal
                                    </p>
                                    <p className="mt-1 text-sm text-slate-400">
                                        {summary?.date}
                                    </p>
                                </section>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default DietLogPage;