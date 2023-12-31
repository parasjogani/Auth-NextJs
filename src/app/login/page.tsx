"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast"

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user)
            console.log("Login success", response.data);
            toast.success("Login successfull")
            router.push("/profile")

        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error("Login failed")

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <hr className="w-16 border-t-2 mb-4" />
            <label htmlFor="email" className="text-lg font-medium mb-1">email</label>
            <input className="px-4 py-2 border border-gray-300 text-black rounded-lg mb-4"
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
            />

            <label htmlFor="password" className="text-lg font-medium mb-1">password</label>
            <input className="px-4 py-2 border border-gray-300  text-black rounded-lg mb-4"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
            />
            <Link href="/forgotpassword" className="text-blue-500 mb-2"> Forgot Password </Link>
            <button
                className={`px-6 py-2 rounded-lg ${buttonDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500"
                    } text-white text-lg font-medium`}
                onClick={onLogin}
                disabled={buttonDisabled || loading}
            >
                {loading ? "Loging in..." : buttonDisabled ? "Login" : "Login"}
            </button>
            <Link href="/signup" className="text-blue-500 mt-4"> Visit Signup </Link>

            <Toaster />
        </div>
    )
}