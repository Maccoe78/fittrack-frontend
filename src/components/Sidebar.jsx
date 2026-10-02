import { NavLink } from 'react-router-dom';

function Sidebar() {
    const linkClass = ({ isActive }) =>
        [
            'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition',
            isActive
                ? 'bg-lime-400/10 text-lime-400 border border-lime-400'
                : 'text-slate-400 hover:bg-white/5 hover:text-white',
        ].join(' ');

    return (
        <aside className="flex h-full w-[260px] flex-col border-r border-white/10 bg-[#12151d] px-6 py-6">
            <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                    Fit<span className="text-lime-400">Track</span>
                </h2>
            </div>

            <nav className="mt-10 space-y-2">
                <NavLink to="/dashboard" className={linkClass}>
                    <span>Home</span>
                </NavLink>

                <NavLink to="/diet-log" className={linkClass}>
                    <span>Diet Logs</span>
                </NavLink>

                <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white">
                    <span>Training Logs</span>
                </button>

                <button className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white">
                    <span>Profile</span>
                </button>
            </nav>

            <div className="mt-auto border-t border-white/10 pt-6 text-sm text-slate-400">
                <div className="font-medium text-white">
                    {localStorage.getItem('loggedInUserName') || 'User'}
                </div>
                <div className="text-xs">Premium Member</div>
            </div>
        </aside>
    );
}

export default Sidebar;