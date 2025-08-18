/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { LogIn, Home } from 'lucide-react'
import { useLoginMutation } from "@/redux/api/authApi"
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import Cookies from 'js-cookie'
import { setUser } from "@/redux/features/authSlice"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const dispatch = useDispatch()
  const [login, { isLoading, error }] = useLoginMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await login({ email, password }).unwrap()
      if (response.success) {
      
        dispatch(setUser({ token: response.data.accessToken }))
        Cookies.set('accessToken', response.data.accessToken, { expires: 7 })
        toast.success(response.message, {
          description: `Welcome back, ${response.data.firstName}!`,
          duration: 3000,
        })
        router.push('/')
      } else {
        throw new Error("Login failed")
      }
    } catch (err) {
      toast.error("Login failed", {
        description:
          (error && 'data' in error && typeof error.data === 'object' && error.data && 'message' in error.data)
            ? (error.data as { message?: string }).message
            : "Invalid credentials. Please try again.",
        duration: 5000,
      })
      console.error("Login failed:", err)
    }
  }

  const handleGoToHome = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-black/90 backdrop-blur-sm p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-center mb-6">
          <LogIn size={48} className="text-amber-400" />
        </div>
        <h2 className="text-2xl font-bold text-white text-center mb-6">Login to Food Store</h2>
        
        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">
            {"data" in error && typeof error.data === "object" && error.data && "message" in error.data
              ? (error.data as { message?: string }).message
              : "Invalid credentials. Please try again."}
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-amber-400 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 transition-colors ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>

          <button
            onClick={handleGoToHome}
            className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-amber-400 rounded-md shadow-sm text-sm font-medium text-amber-400 hover:bg-amber-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 transition-colors"
          >
            <Home size={18} />
            Go to Home
          </button>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-white">
            Do not have an account?{' '}
            <button
              onClick={() => router.push('/register')}
              className="text-amber-400 hover:text-amber-500 font-medium"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}