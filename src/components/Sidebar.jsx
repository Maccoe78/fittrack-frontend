function Sidebar() {
    const userName = localStorage.getItem('loggedInUserName') || 'User';

    return (
        <aside className="flex h-full w-[260px] flex-col border-r border-white/10 bg-[#12151d] px-6 py-6">
            <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                    Fit<span className="text-lime-400">Track</span>
                </h2>
            </div>

            <nav className="mt-10 space-y-2">
                <button className="flex w-full items-center rounded-2xl border border-lime-400 bg-lime-400/10 px-4 py-3 text-left text-sm font-semibold text-lime-400">
                    Home
                </button>
                <button className="flex w-full items-center rounded-2xl px-4 py-3 text-left text-sm text-slate-400 transition hover:bg-white/5 hover:text-white">
                    Diet Logs
                </button>
                <button className="flex w-full items-center rounded-2xl px-4 py-3 text-left text-sm text-slate-400 transition hover:bg-white/5 hover:text-white">
                    Training Logs
                </button>
                <button className="flex w-full items-center rounded-2xl px-4 py-3 text-left text-sm text-slate-400 transition hover:bg-white/5 hover:text-white">
                    Profile
                </button>
            </nav>

            <div className="mt-auto border-t border-white/10 pt-6 text-sm text-slate-400">
                <div className="font-medium text-white">{userName}</div>
                <div className="text-xs">Premium Member</div>
            </div>
        </aside>
    );
}

export default Sidebar;