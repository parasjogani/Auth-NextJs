"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast"

export default function ResetPasswordPage() {
    const router = useRouter();
    const [token, setToken] = useState("");

    const [user, setUser] = React.useState({
        password: "",
        cpassword: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onResetPassword = async () => {
        try {
            setLoading(true);
            if (user.password === user.cpassword) {
                const response = await axios.post("/api/users/resetpassword", { user, token })
                console.log("Password change success", response.data);
                toast.success("Password changed")
                router.push("/login")
            } else {
                toast.error("Password does not match");
            }

        } catch (error: any) {
            console.log("failed", error.message);
            toast.error("Something goes wrong")

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.password.length > 0 && user.cpassword.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "")
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl font-bold mb-4">Reset Password</h1>
            <hr className="w-16 border-t-2 mb-4" />
            <label htmlFor="password" className="text-lg font-medium mb-1">Enter new password</label>
            <input className="px-4 py-2 border border-gray-300  text-black rounded-lg mb-4"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Enter new password"
            />

            <label htmlFor="confirmpassword" className="text-lg font-medium mb-1">confirm password</label>
            <input className="px-4 py-2 border border-gray-300  text-black rounded-lg mb-4"
                id="cpassword"
                type="password"
                value={user.cpassword}
                onChange={(e) => setUser({ ...user, cpassword: e.target.value })}
                placeholder="confirm password"
            />
            <button
                className={`px-6 py-2 rounded-lg ${buttonDisabled ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500"
                    } text-white text-lg font-medium`}
                onClick={onResetPassword}
                disabled={buttonDisabled || loading}
            >
                {loading ? "Reseting password..." : "Reset Password"}
            </button>

            <Toaster />
        </div>
    )
}