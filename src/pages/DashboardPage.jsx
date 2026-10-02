import Sidebar from '../components/Sidebar';
import CalorieRing from '../components/CalorieRing';
import useDietPlan from '../hooks/useDietPlan';

function DashboardPage() {
    const { dietPlan, loading } = useDietPlan();
    const userName = localStorage.getItem('loggedInUserName') || 'User';

    return (
        <div className="min-h-screen bg-[#02050a] text-white">
            <div className="flex min-h-screen w-full overflow-hidden bg-[#0b0f15]">
                <Sidebar />

                <main className="flex flex-1 items-stretch justify-center p-8">
                    <div className="w-full">
                        <div className="mb-8">
                            <p className="text-sm text-slate-400">Hello,</p>
                            <h1 className="text-4xl font-bold tracking-tight text-white">
                                {userName}
                            </h1>
                        </div>

                        <div className="flex min-h-[60vh] items-center justify-center">
                            {loading ? (
                                <p className="text-slate-400">Loading...</p>
                            ) : dietPlan ? (
                                <div className="flex flex-col items-center gap-6">
                                    <h2 className="text-xl font-semibold text-slate-300">
                                        Daily Calories
                                    </h2>
                                    <CalorieRing
                                        value={Math.round(dietPlan.calorieTarget).toLocaleString()}
                                        subtitle="kcal target"
                                        progress={1}
                                    />
                                </div>
                            ) : (
                                <p className="text-lg text-slate-300">
                                    You don&apos;t have a diet plan yet.
                                </p>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default DashboardPage;