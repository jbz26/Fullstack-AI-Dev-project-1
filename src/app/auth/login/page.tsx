'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/contexts/UserContext'
import { handleGoogleSignup } from '../google/google_signup';

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [mounted, setMounted] = useState(false)
  const { setUser } = useUser()
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const fetchUserData = async (token: string) => {
    const res = await fetch(`${API_URL}/data/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) throw new Error('Lỗi lấy thông tin người dùng')

    const data = await res.json()

    const user = {
      email: data.email,
      fullName: data.full_name,
      id: data.id,
      avatar: `https://i.pravatar.cc/150?u=${data.email}`,
    }

    setUser(user)
    router.replace('/dashboard')
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Lỗi đăng nhập')

      const token = data.access_token
      localStorage.setItem('access_token', token)

      await fetchUserData(token)
    } catch (err) {
      console.error(err)
      alert('Đăng nhập thất bại')
    }
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] flex items-center justify-center px-4 transition-colors duration-300">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white dark:bg-[#1c1c1c] text-black dark:text-white p-8 rounded-3xl shadow-xl space-y-6"
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
              className="mt-1 w-full px-4 py-2 border rounded-xl bg-gray-100 text-black dark:bg-[#2b2b2b] dark:text-white dark:border-gray-700"
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
              className="mt-1 w-full px-4 py-2 border rounded-xl bg-gray-100 text-black dark:bg-[#2b2b2b] dark:text-white dark:border-gray-700"
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
          onClick={() => handleGoogleSignup({ API_URL, setUser, router })}
          className="w-full py-2 rounded-xl border bg-gray-200 text-black hover:bg-gray-300 dark:bg-white dark:hover:bg-gray-200"
        >
          Sign in with Google
        </button>

        <p className="text-sm text-center mt-4">
          Don&apos;t have an account?{' '}
          <a href="/auth/register" className="hover:underline text-green-600 dark:text-green-400">
            Create one
          </a>
        </p>

        <button
          type="button"
          onClick={() => router.push('/')}
          className="w-full py-2 mt-2 text-sm underline text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
        >
          ← Back to Home
        </button>
      </form>
    </div>
  )
}
