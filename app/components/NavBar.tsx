"use client"

import Link from "next/link";
import AuthModal from "./AuthModal";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";

export default function NavBar() {
    const {data, loading } = useContext(AuthenticationContext)
    return (
        <nav className="bg-white p-2 flex justify-between">
            <Link href="/" className="font-bold text-gray-700 text-2xl"> OpenTable </Link>
            <div>
                { loading ? null : (
                    <div className="flex">
                        {
                            data ? <button className="bg-blue-400 text-white border p-1 px-4 rounded mr-3">Logout</button> : (
                                <>
                                    <AuthModal isSignin={true} />
                                    <AuthModal isSignin={false} />
                                </>
                            )
                        }
                    </div>
                ) }
            </div>
        </nav>
    )
}