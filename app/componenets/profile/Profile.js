"use client";
import React, { useState } from "react";
import SignOut from "../signOut/SignOut";
import { useSession } from "next-auth/react";
import SignIn from "../signin/SignIn";
import { FaRegUserCircle } from "react-icons/fa";
import UserDashBoard from "../userDashBoard/UserDashBoard";
// import UserLogOut from "../userLogout/UserLogOut";

export default function Profile() {
  const [isOpen, setIsOpen] = useState(false);

  const {data : session} = useSession();
  console.log('session :>> ', session);

  const username = session?.user?.name;
  const userMail = session?.user?.email;
  const openModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={openModal}
        className="bg-blue-500 h-10 w-10 lg:ml-4 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <FaRegUserCircle />
      </button>

      {isOpen && (
        <div className="w-full ">
        <div className="absolute mx-auto lg:-right-2 flex flex-col space-y-2 items-center justify-center -right-[17px] h-[250px] mt-[9px] w-screen md:w-[250px] lg:w-[250px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="">
                <p className="text-lg lg:text-2xl font-semibold lg:font-bold">{username}</p>
                </div>
                <div className="">
                <p className="">{userMail}</p>
                </div>
                <div className="">
                  {session && <UserDashBoard/>}
                
                </div>
          <div className="py-1 ">
          <SignOut title="Log Out"/>

            {/* {session ? 
          <SignOut title="Log Out"/>
          :
          <SignIn/> } */}
          </div>
        </div>
        </div>
      )}
    </div>
  );
}