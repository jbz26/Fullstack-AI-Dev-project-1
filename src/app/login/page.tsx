'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [form, setForm] = useState({ email: '', password: '' });
  const [mounted, setMounted] = useState(false);

  // Tránh lỗi hydration mismatch do theme chưa có trên SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn('credentials', {
      email: form.email,
      password: form.password,
      callbackUrl: '/',
    });
  };

  if (!mounted) return null; // Đợi theme được xác định

  const isDark = theme === 'dark';


  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
        isDark ? 'bg-[#0f0f0f]' : 'bg-gray-100'
      }`}
    >
      <form
        onSubmit={handleLogin}
        className={`w-full max-w-md p-8 rounded-3xl shadow-xl space-y-6 transition-colors duration-300 ${
          isDark ? 'bg-[#1c1c1c] text-white' : 'bg-white text-black'
        }`}
      >
        <h2 className="text-3xl font-bold text-center">Welcome Back</h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email"
              required
              className={`mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none ${
                isDark
                  ? 'border-gray-700 bg-[#2b2b2b] text-white'
                  : 'border-gray-300 bg-gray-100 text-black'
              }`}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Your password"
              required
              className={`mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none ${
                isDark
                  ? 'border-gray-700 bg-[#2b2b2b] text-white'
                  : 'border-gray-300 bg-gray-100 text-black'
              }`}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600"
        >
          Sign In
        </button>

        <button
          type="button"
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className={`w-full py-2 rounded-xl border transition ${
            isDark
              ? 'bg-white text-black hover:bg-gray-200'
              : 'bg-gray-200 text-black hover:bg-gray-300'
          }`}
        >
          Sign in with Google
        </button>

        <p className="text-sm text-center mt-4">
          Don&#39;t have an account?{' '}
          <a
            href="/register"
            className={`hover:underline ${
              isDark ? 'text-green-400' : 'text-green-600'
            }`}
          >
            Create one
          </a>
        </p>

        <button
          type="button"
          onClick={() => router.push('/')}
          className={`w-full py-2 mt-2 text-sm underline ${
            isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
          }`}
        >
          ← Back to Home
        </button>
      </form>
    </div>
  );
}
