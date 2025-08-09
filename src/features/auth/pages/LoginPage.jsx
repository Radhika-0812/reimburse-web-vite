import { useState } from 'react';
import { useLoginMutation } from '../authApi.js';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../authSlice.js';

export default function LoginPage(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res)); // expects {token, user}
      window.location.href = '/';
    } catch (e) {
      setErr(e?.data?.message || 'Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow rounded-xl p-6">
        <h1 className="text-2xl font-semibold text-center mb-4">Sign in</h1>
        {err && <div className="bg-red-50 text-red-700 p-3 rounded mb-3 text-sm">{err}</div>}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="you@company.com"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="••••••••"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          </div>
          <button disabled={isLoading} className="w-full rounded-md bg-indigo-600 text-white py-2 font-medium hover:bg-indigo-700 disabled:opacity-60">
            {isLoading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
