'use client';

import { useState , useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import axios  from '@/utils/axiosInstance';

export default function HomePage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  useEffect(() => {
    const fetchUser = async () => {
      const user = localStorage.getItem('user');
      const access_token = localStorage.getItem('access_token');

      if (user && access_token) {
        try {
          const res = await  fetch (`${API_URL}/data/user`)
          const data = await res.json();
          const user = {
            email: data.email,
            fullName: data.full_name,
            id: data.id,
            avatar: `https://i.pravatar.cc/150?u=${data.email}`,
          };
          
          router.replace('/dashboard');
        } catch (err) {
          console.error(err);
        }
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
      }
    };

    fetchUser();
  }, []); 

  


  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] text-black dark:text-white flex flex-col items-center justify-center transition-colors duration-300">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-4">Welcome to RecruitMaster</h1>
      <p className="text-center text-gray-600 dark:text-gray-300 max-w-lg mb-8">
        Efficiently manage your job applications and candidate profiles with RecruitMaster.
        Track application statuses, schedule interviews, and organize recruitment processes all in one place.
      </p>



      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200"
          onClick={() => router.push('/auth/login')}
        >
          Login
        </button>
        <button
          className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600"
          onClick={() => router.push('/auth/register')}
        >
          Register
        </button>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-sm text-gray-500 dark:text-gray-400">
        © 2025 RecruitMaster. All rights reserved.
      </footer>
    </div>
  );
}
