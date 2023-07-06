"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";


export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const onSignup = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup success", response.data);
            router.push("/login")

        } catch (error: any) {
            console.log("Signup failed", error.message);

            toast.error(error.message);
        }

        setIsLoading(false);
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true)
        }
    }, [user])




    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl font-bold mb-4">Signup</h1>
            <hr className="w-16 border-t-2 mb-4" />
            <label htmlFor="username" className="text-lg font-medium mb-1">
                Username
            </label>
            <input
                className="px-4 py-2 border border-gray-300 text-black rounded-lg mb-4"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="Username"
            />

            <label htmlFor="email" className="text-lg font-medium mb-1">
                Email
            </label>
            <input
                className="px-4 py-2 border border-gray-300 text-black rounded-lg mb-4"
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email"
            />

            <label htmlFor="password" className="text-lg font-medium mb-1">
                Password
            </label>
            <input
                className="px-4 py-2 border border-gray-300 text-black rounded-lg mb-4"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Password"
            />

            <button
                className={`px-6 py-2 rounded-lg ${buttonDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500"
                    } text-white text-lg font-medium`}
                onClick={onSignup}
                disabled={buttonDisabled || isLoading}
            >
                {isLoading ? "Signing up..." : buttonDisabled ? "No Signup" : "Signup"}
            </button>
            <Link href="/login" className="text-blue-500 mt-4">
                Visit Login
            </Link>

            <Toaster />
        </div>
    )
}