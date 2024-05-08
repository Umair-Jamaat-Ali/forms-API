import Link from "next/link";


export default function Home() {
  return (
    <>
   <div>
    <li className="flex justify-center gap-4">
      <Link href='/form'>Student Form</Link>
      <Link href='/admin'>Admin</Link>
      <Link href='/signup'>SignIn</Link>
      <Link href='/bookUpload'>Books Upload</Link>
      <Link href='/bookFetch'>All Books </Link>
    </li>
   </div>
    </>
  );
}
