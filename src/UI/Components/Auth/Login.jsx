import React, { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link, useNavigate } from 'react-router-dom'
const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useNavigate()

    const handleEmailLogin = async (e) => {
        e.preventDefault()
        setError("")

        if (!email || !password) {
            setError("Please enter both email and password")
            return
        }

        try {
            setIsLoading(true)
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // For demo purposes, we'll just redirect to home
            // In a real app, you would validate credentials and set auth cookies/tokens
            router.push("/")
        } catch (err) {
            setError("Invalid email or password")
        } finally {
            setIsLoading(false)
        }
    }

    const handlePhoneLogin = async (e) => {
        e.preventDefault()
        setError("")

        if (!phone) {
            setError("Please enter your phone number")
            return
        }

        try {
            setIsLoading(true)
            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // For demo purposes, we'll just show OTP verification
            // In a real app, you would send an OTP to the phone number
            setError("OTP sent to your phone number (demo)")
        } catch (err) {
            setError("Failed to send OTP")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left side - Image */}
            <div className="hidden md:flex md:w-1/2 bg-secondary relative justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/70"></div>
                <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
                    <h1 className="text-4xl font-bold mb-6">Welcome Back</h1>
                    <p className="text-sm mb-8 text-center">
                        Login to access your Rawverge account and continue your shopping journey
                    </p>
                    <div className="w-full max-w-md">
                        <img
                            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D"
                            alt="Shopping Experience"
                            className="rounded-lg shadow-xl h-3/4 w-full object-cover object-top"
                        />
                    </div>
                    <div className="mt-12">
                        <p className="text-sm opacity-80">© 2023 RAWVERGE All rights reserved.</p>
                    </div>
                </div>
            </div>

            {/* Right side - Login form */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 bg-white">
                <div className="w-full max-w-md">
                    <div className="flex justify-between items-center mb-8">
                        <Link to="/" className="flex items-center text-gray-600 hover:text-primary">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Home
                        </Link>
                        <Link to="/" className="text-2xl font-bold">
                            RAWVERGE
                        </Link>
                    </div>

                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold">Sign In</h1>
                        <p className="text-gray-500 mt-2">Access your account and manage your orders</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border p-8">
                        <Tabs defaultValue="email" className="w-full">
                            <TabsList className="grid grid-cols-2 mb-6">
                                <TabsTrigger value="email">Email</TabsTrigger>
                                <TabsTrigger value="phone">Phone</TabsTrigger>
                            </TabsList>

                            <TabsContent value="email">
                                <form onSubmit={handleEmailLogin} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="Enter your email"
                                                className="pl-10"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <Label htmlFor="password">Password</Label>
                                            <Link href="/auth/forgot-password" className="text-xs text-primary hover:underline">
                                                Forgot Password?
                                            </Link>
                                        </div>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter your password"
                                                className="pl-10 pr-10"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-4 w-4 text-gray-400" />
                                                ) : (
                                                    <Eye className="h-4 w-4 text-gray-400" />
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    {error && <p className="text-red-500 text-sm">{error}</p>}

                                    <Button type="submit" className="w-full" disabled={isLoading}>
                                        {isLoading ? "Signing in..." : "Sign In"}
                                    </Button>
                                </form>
                            </TabsContent>

                            <TabsContent value="phone">
                                <form onSubmit={handlePhoneLogin} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="Enter your phone number"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>

                                    {error && <p className="text-red-500 text-sm">{error}</p>}

                                    <Button type="submit" className="w-full" disabled={isLoading}>
                                        {isLoading ? "Sending OTP..." : "Continue"}
                                    </Button>
                                </form>
                            </TabsContent>
                        </Tabs>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <Separator />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            
                        </div>
                    </div>

                    <p className="text-center mt-6">
                        Don&apos;t have an account?{" "}
                        <Link to="/auth/register" className="text-primary hover:underline font-medium">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login