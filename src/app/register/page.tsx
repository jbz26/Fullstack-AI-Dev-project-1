'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';

export default function RegisterPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    username: '',
    location: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert(JSON.stringify(form)); // Replace with actual registration logic
    router.push('/login');
  };

  if (!mounted) return null;
  const isDark = theme === 'dark';
  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] flex items-center justify-center px-4 transition-colors duration-300">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-[#1c1c1c] text-black dark:text-white p-8 rounded-3xl shadow-xl space-y-6 transition-colors duration-300"
      >
        <h2 className="text-3xl font-bold text-center">Create Account</h2>

        <div className="flex flex-col items-center space-y-2">
          <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center text-2xl">
            👤
          </div>
          <button
            type="button"
            className="text-xs bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Upload
          </button>
        </div>

        <div className="space-y-4">
          {[
            { label: 'Full Name', name: 'fullName', type: 'text', placeholder: 'Enter your full name' },
            { label: 'Username', name: 'username', type: 'text', placeholder: 'Choose a username' },
            { label: 'Email', name: 'email', type: 'email', placeholder: 'Your email' },
            { label: 'Password', name: 'password', type: 'password', placeholder: 'Create a password' },
          ].map((field) => (
            <div key={field.name}>
              <label className="text-sm font-medium">{field.label}</label>
              <input
                name={field.name}
                type={field.type}
                value={(form as any)[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#2b2b2b] text-black dark:text-white rounded-xl focus:outline-none"
              />
            </div>
          ))}

          <div>
            <label className="text-sm font-medium">Location</label>
            <select
              name="location"
              value={form.location}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#2b2b2b] text-black dark:text-white rounded-xl focus:outline-none"
            >
              <option value="">Select your location</option>
              <option value="Hanoi">Hanoi</option>
              <option value="Ho Chi Minh">Ho Chi Minh</option>
              <option value="Da Nang">Da Nang</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600"
        >
          Register
        </button>

        <button
          type="button"
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="w-full py-2 bg-white text-black rounded-xl border hover:bg-gray-200"
        >
          Sign up with Google
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-green-500 hover:underline">
            Sign in
          </a>
        </p>

        <button
          type="button"
          onClick={() => router.push('/')}
          className="w-full py-2 mt-2 text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white underline"
        >
          ← Back to Home
        </button>
      </form>
    </div>
  );
}
