'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";

export default function page() {


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false)

    const router = useRouter();

    const saveHandler = async (e) => {
        e.preventDefault();
        if (!name || !password || !email) {
            setError("All fields are required");
            return;
        }
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                name,
                email,
                password
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            const res = await fetch("http://localhost:3000/api/signin", requestOptions);
            if (!res.ok) {
                throw new Error("Failed to register user");
            }
            alert("User successfully registered");
            router.replace("/signin")
        } catch (error) {
            console.error("Error:", error);
            setError("Something went wrong");
        }
    };


    return (
        <>
            <div className='grid place-items-center h-screen'>
                <div className='shadow-lg p-5 rounded-lg border-t-4 border-green-400'>
                    <h1 className='text-xl font-bold ml-6'>Registration Form</h1>

                    <form className='flex flex-col gap-4 '>
                        <input onChange={(e) => setName(e.target.value)} type='text' placeholder='Enter Name' />
                        <input onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Enter E-mail' />
                        <div className="mt-2 flex items-center">
                            <input onChange={(e) => setPassword(e.target.value)} type={`${showPassword ? "text" : "password"}`}
                                placeholder='Enter Password' />
                            <div onClick={() => setShowPassword(!showPassword)}
                                className='cursor-pointer'
                            >
                                {showPassword ?
                                    <BiSolidShow className='ml-2' /> :
                                    <BiSolidHide className='ml-2' />}
                            </div>
                        </div>
                        <button
                            onClick={saveHandler}
                            className='w-20 h-7 rounded-md bg-green-700 ml-20'>
                            Submit
                        </button>
                        {error && (
                            <span className='bg-red-600 rounded-md px-4 py-2 w-30'>{error}</span>
                        )}
                    </form>
                </div>
            </div>
        </>
    )
}
