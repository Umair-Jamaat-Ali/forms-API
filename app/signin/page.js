'use client'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ForgetPassword from '../componenets/forget-password/forgetPassword';


export default function SignIn() {

  let router = useRouter();

  const[email, setEmail] = useState ("");
  const [password, setPassword] = useState ("")
  const [error, setError] = useState ("")

 

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
     const users = await signIn("credentials",{
        email,
        password,
        redirect:false
      })

      console.log("Users",users);

      if (users.error) {
        setError("Invalid Credentials");
        return
      }

      router.replace("/admin")
    } catch (error) {
      console.log(error);
    }

  }

    return (
      <>
      

        <div className="flex min-h-full flex-1 flex-col bg-slate-900 text-white justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-white">
            TOᗪᗩY ᖴᗩᔕᕼIOᑎ
            </h2>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={onSubmitHandler} className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={(e)=>setEmail(e.target.value)}
                    autoComplete="email"
                    placeholder="enter your email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      <ForgetPassword/>
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={(e)=>setPassword(e.target.value)}
                    placeholder="enter your password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  onClick={onSubmitHandler}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                Sign In
                </button> 
              </div>
            </form>
            {error && (
              <div>
              {error}
            </div>
            )}
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Create one
              </a>
            </p>
          </div>
        </div>
      </>
    )
  }
