"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
    const router = useRouter();

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            axios.post('/api/users/verifyemail', { token })
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);

        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "")
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token])

    useEffect(() => {
        if (verified) {
            const redirectTimeout = setTimeout(() => {
                router.push("/login")
            }, 3000)

            return () => clearTimeout(redirectTimeout)
        }

    }, [verified, router])


    return (
        <div>
            {verified && (
                <div className="text-center gap-5 mt-5">
                    <h2>Email verified successfully</h2>
                    <p>You will be redirected to the login page within 3 seconds...</p>
                </div>
            )}

            {error && (
                <div>
                    <h2>Error</h2>
                </div>
            )}
        </div>
    )
}