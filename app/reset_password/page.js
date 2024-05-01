
"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter ,useSearchParams ,usePathname   } from "next/navigation";

const page = ({params}) => {
  const router = useRouter();
  const searchParams = useSearchParams()
  // const pathname = usePathname()
  const [password, setPassword] = useState("");

  
  const token = searchParams.get('token')

  async function changepass(e) {
    e.preventDefault();
    await axios
      .put("http://localhost:3000/api/forget_password", { password , token})
      .then((result) => {
        console.log(result.data);
        router.push('/signin')
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  return (
    <>
      <div>
        <form onSubmit={changepass}>
          <label htmlFor=""> Type your new password </label>
          <input
            type="text"
            name="name"
            id=""
            placeholder="type your new password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button>Submit</button>
        </form>
      </div>
    </>
  );
};

export default page;
