import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, KeyRound, User } from 'lucide-react';
import { API_BASE_URL } from '../../config';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid admin credentials');
      }

      localStorage.setItem('adminToken', data.token);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to connect to backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 relative overflow-hidden font-montserrat">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur-md shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 mb-4">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Admin Portal</h1>
          <p className="text-slate-400 text-sm mt-2">Manage Adhyayan 2026 events & users</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Username</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                <User className="h-5 w-5" />
              </span>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-sky-500/50 transition-colors"
                placeholder="Enter username"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                <KeyRound className="h-5 w-5" />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-950/50 border border-slate-800 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:border-sky-500/50 transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-sky-500 hover:to-indigo-500 transition-all shadow-md shadow-sky-600/10 hover:shadow-sky-500/20 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
