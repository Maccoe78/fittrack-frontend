import LoginForm from '../components/LoginForm';

function LoginPage() {
    return (
        <main className="min-h-screen bg-[#080b0f] text-white flex items-center justify-center px-4">
            <section className="w-full max-w-5xl overflow-hidden rounded-[32px] bg-[#141820] shadow-2xl border border-white/5">
                <div className="grid md:grid-cols-2">
                    <div className="hidden md:block bg-[#0f1319]">
                        <div className="h-full w-full bg-gradient-to-br from-[#0f1319] via-[#10151c] to-[#080b0f] p-10">
                            <div className="h-full rounded-[28px] border border-white/5 bg-[radial-gradient(circle_at_top_left,_rgba(163,230,53,0.12),_transparent_35%),linear-gradient(to_bottom,_rgba(255,255,255,0.03),_transparent)]">
                                <div className="flex h-full items-end p-10">
                                    <div>
                                        <h2 className="text-4xl font-extrabold tracking-tight text-white">
                                            FitTrack
                                        </h2>
                                        <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
                                            Track your training, monitor your progress and reach your goals.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 sm:p-10 md:p-14">
                        <LoginForm />
                    </div>
                </div>
            </section>
        </main>
    );
}

export default LoginPage;