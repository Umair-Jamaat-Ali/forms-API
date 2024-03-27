import Link from "next/link";


export default function Home() {
  return (
    <>
   <div>
    <li>
      <Link href='/form'>Student Form</Link>
      <Link href='/admin'>Admin</Link>
    </li>
   </div>
    </>
  );
}
