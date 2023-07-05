"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast"

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const onLogin = async () => {
        try {
            const response = await axios.post("/api/users/login", user)
            console.log("Login success", response.data);
            toast.success("Login successfull")
            router.push("/profile")

        } catch (error: any) {
            console.log("Login failed", error.message);
        }
    }

    useEffect(() => {

    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Login</h1>
            <hr />
            <label htmlFor="email">email</label>
            <input className="text-black"
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
            />

            <label htmlFor="password">password</label>
            <input className="text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
            />
            <button onClick={onLogin}>Login</button>
            <Link href="/signup"> Visit Signup </Link>
        </div>
    )
}