import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CalorieRing from '../components/CalorieRing';
import useDietPlan from '../hooks/useDietPlan';

function DietLogPage() {
    const navigate = useNavigate();
    const { dietPlan, loading } = useDietPlan();

    const goal = dietPlan ? Math.round(dietPlan.calorieTarget) : 0;
    const intake = 0; // later uit food logs
    const remaining = Math.max(goal - intake, 0);

    return (
        <div className="min-h-screen bg-[#02050a] text-white">
            <div className="flex min-h-screen w-full overflow-hidden bg-[#0b0f15]">
                <Sidebar />

                <main className="flex flex-1 items-stretch justify-center p-8">
                    <div className="w-full">
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-slate-400">Track your</p>
                                <h1 className="text-4xl font-bold tracking-tight text-white">
                                    Diet Logs
                                </h1>
                            </div>

                            {dietPlan && (
                                <button className="rounded-full border border-lime-400 bg-lime-400/10 px-4 py-2 text-sm font-semibold text-lime-400 transition hover:bg-lime-400 hover:text-black">
                                    + Add Food
                                </button>
                            )}
                        </div>

                        {loading ? (
                            <p className="text-slate-400">Loading...</p>
                        ) : !dietPlan ? (
                            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5">
                                <p className="text-lg text-slate-300">
                                    You don&apos;t have a diet plan yet.
                                </p>
                                <button
                                    onClick={() => navigate('/create-diet')}
                                    className="rounded-2xl bg-lime-400 px-8 py-4 text-lg font-semibold text-black transition hover:bg-lime-300"
                                >
                                    Create a diet plan
                                </button>
                            </div>
                        ) : (
                            <div className="grid gap-6 lg:grid-cols-[1.5fr_0.9fr]">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-8 rounded-[28px] border border-white/10 bg-[#12151d] p-6">
                                        <CalorieRing
                                            value={intake.toLocaleString()}
                                            subtitle={`of ${goal.toLocaleString()} kcal`}
                                            progress={goal ? intake / goal : 0}
                                            size={180}
                                        />
                                        <div className="grid flex-1 gap-4 md:grid-cols-3">
                                            <div>
                                                <p className="text-xs uppercase tracking-widest text-slate-500">Intake</p>
                                                <p className="mt-2 text-2xl font-bold">{intake} kcal</p>
                                            </div>
                                            <div>
                                                <p className="text-xs uppercase tracking-widest text-slate-500">Goal</p>
                                                <p className="mt-2 text-2xl font-bold">{goal.toLocaleString()} kcal</p>
                                            </div>
                                            <div>
                                                <p className="text-xs uppercase tracking-widest text-lime-400">Remaining</p>
                                                <p className="mt-2 text-2xl font-bold text-lime-400">
                                                    {remaining.toLocaleString()} kcal
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-[28px] border border-white/10 bg-[#12151d] p-6">
                                        <h2 className="mb-4 text-lg font-semibold">Breakfast</h2>
                                        <p className="text-sm text-slate-500">No food logged yet.</p>
                                    </div>
                                </div>

                                <div className="rounded-[28px] border border-white/10 bg-[#12151d] p-6">
                                    <h2 className="text-lg font-semibold">Nutritional Breakdown</h2>
                                    <p className="mt-4 text-sm text-slate-500">
                                        Coming soon.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default DietLogPage;