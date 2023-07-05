"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing")

    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            router.push('/login')

        } catch (error: any) {
            console.log(error.message);

        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
    }
    return (
        <div>
            <h1>Profile page</h1>
            <h2>{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />

            <button
                onClick={logout}
                className="mt-4">Logout</button>
            <button
                onClick={getUserDetails}
                className="mt-4">Get User Detail</button>
        </div>

    )
}