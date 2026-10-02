import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function DashboardPage() {
    const navigate = useNavigate();
    const hasDietPlan = false;
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

                        <div className="flex min-h-[70vh] flex-1 items-center justify-center">
                            {hasDietPlan ? (
                                <div className="w-full max-w-4xl rounded-[28px] border border-white/10 bg-[#12151d] p-8">
                                    <h2 className="text-2xl font-semibold">Your diet plan</h2>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-5">
                                    <p className="text-lg text-slate-300">
                                        You don&apos;t have a diet plan yet.
                                    </p>
                                    <button
                                        onClick={() => navigate('/create-diet')}
                                        className="rounded-2xl bg-lime-400 px-8 py-4 text-lg font-semibold text-black transition hover:bg-lime-300"
                                    >
                                        Create an diet plan
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default DashboardPage;