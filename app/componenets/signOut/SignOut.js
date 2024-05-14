"use client"
import { signOut } from "next-auth/react"
import { useRouter} from "next/navigation";

export default function SignOut({title}) {

  const router = useRouter();

  const signOutHandler = () => {
    signOut();
    router.replace('/imageUpload')
    
  }
  return (
    <div className="w-[120px] h-[40px] bg-amber-500 pt-2 pl-4 rounded-xl hover:bg-amber-900 hover:scale-x-105 hover:scale-y-105 cursor-pointer">
  <button onClick={signOutHandler} >{title}</button>
</div>

  )
}