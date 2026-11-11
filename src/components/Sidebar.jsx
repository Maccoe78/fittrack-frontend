import { NavLink, useNavigate } from 'react-router-dom';

function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        localStorage.removeItem('loggedInUserId');
        localStorage.removeItem('loggedInUserName');
        navigate('/login', { replace: true });
    };

    const linkClass = ({ isActive }) =>
        [
            'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition',
            isActive
                ? 'bg-lime-400/10 text-lime-400 border border-lime-400'
                : 'text-slate-400 hover:bg-white/5 hover:text-white',
        ].join(' ');

    return (
        <aside className="flex min-h-screen w-[260px] flex-col border-r border-white/10 bg-[#12151d] px-6 py-6">
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

                <NavLink to="/profile" className={linkClass}>
                   <span>Profile</span>
                </NavLink>
            </nav>

            <div className="mt-auto border-t border-white/10 pt-6 text-sm text-slate-400">
                <div className="font-medium text-white">
                    {localStorage.getItem('loggedInUserName') || 'User'}
                </div>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-4 w-full rounded-2xl bg-red-700 px-4 py-3 text-left text-sm font-medium text-white transition hover:bg-red-800"
                >
                    Log out
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;