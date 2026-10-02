import { useState } from 'react';
import { loginUser } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';


function LoginForm() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await loginUser(name, password);
            console.log('Login successful:', data);
            localStorage.setItem('loggedInUserName', name);
            navigate('/dashboard');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-md">
            <div className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight text-white">
                    Login
                </h1>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                    Enter your credentials to access your fitness panel
                </p>
            </div>

            <div className="space-y-5">
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                        Name
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="john doe"
                        className="w-full rounded-2xl border border-white/10 bg-[#080b0f] px-4 py-3.5 text-white placeholder:text-slate-500 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-2xl border border-white/10 bg-[#080b0f] px-4 py-3.5 text-white placeholder:text-slate-500 outline-none transition focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                    />
                </div>

                {error && (
                    <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                        {error}
                    </div>
                )}

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-full rounded-2xl bg-lime-400 px-4 py-3.5 font-semibold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <Link to="/register" className="mt-4 block text-center text-sm text-lime-400 hover:text-lime-300">
                    Don't have an account? Register here
                </Link>
            </div>
        </div>
    );
}

export default LoginForm;