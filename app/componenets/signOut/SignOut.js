"use client"
import { signOut } from "next-auth/react"
import { useRouter} from "next/navigation";

export default function SignOut({title}) {

  const router = useRouter();

  const signOutHandler = () => {
    signOut({redirect: false});
    router.replace('/signin')
    
  }
  return (
    
    <button type="button" onClick={signOutHandler} class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">{title}</button>


  )
}