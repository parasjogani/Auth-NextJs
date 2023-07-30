"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserData {
    username: string;
    email: string;
    isVerified: boolean;
}

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState<UserData | null>(null)
    const [error, setError] = useState(null)

    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            router.push('/login')

        } catch (error: any) {
            console.log(error.message);

        }
    }

    useEffect(() => {
        axios.get("/api/users/me")
            .then((response) => {
                setUser(response.data.data);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col gap-4 items-center">
            <h1 className="text-3xl mt-10">Profile Page</h1>

            <div className="flex flex-col w-[90%] md:w-[50%] h-[70vh] mt- 5 justify-start items-center">

                <div className="px-6 py-2 rounded-lg text-white text-lg">Username: {user.username}</div>
                <div className="px-6 py-2 rounded-lg text-white text-lg">Email: {user.email}</div>
                <div className="px-6 py-2 rounded-lg text-white text-lg">Is Verified: {user.isVerified ? "Yes" : "No"}</div>
                <div className="flex ">
                    <button
                        onClick={logout}
                        className="px-6 py-2 rounded-lg text-white bg-blue-500 text-lg font-medium">Logout
                    </button>
                </div>
            </div>

        </div>

    )
}