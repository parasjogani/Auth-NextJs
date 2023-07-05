"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();

    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            router.push('/login')

        } catch (error: any) {
            console.log(error.message);

        }
    }
    return (
        <div>
            <h1>Profile page</h1>

            <hr />

            <button
                onClick={logout}
                className="mt-4">Logout</button>
        </div>

    )
}