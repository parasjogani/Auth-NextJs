"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast"

export default function ForgotPassword() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSendlink = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/forgotpassword", user)
            console.log("Send success", response.data);
            toast.success("Link sent successfully")

        } catch (error: any) {
            console.log("Sending failed", error.message);
            toast.error("Sending failed")

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl font-bold mb-4">Forgot Password</h1>
            <hr className="w-16 border-t-2 mb-4" />
            <label htmlFor="email" className="text-lg font-medium mb-1">Enter email</label>
            <input className="px-4 py-2 border border-gray-300 text-black rounded-lg mb-4"
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
            />

            <button
                className={`px-6 py-2 rounded-lg ${buttonDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500"
                    } text-white text-lg font-medium`}
                onClick={onSendlink}
                disabled={buttonDisabled || loading}
            >
                {loading ? "Sending link..." : "Send Link"}
            </button>

            <Toaster />
        </div>
    )
}