'use client'
import User from '@/schemas/userSchema/User'
import React from 'react'
import DeleteBtn from '../componenets/deleteBtn/DeleteBtn';
import UpdateModal from '../componenets/updateModal/UpdateModal';
import axios from 'axios';
import { signOut } from 'next-auth/react';
import SignOut from '../componenets/signOut/SignOut';



const fetchUsers = async () => {
    try {
      let response = await axios.get("http://localhost:3000/api/userapi")
            if (!response) {
                throw new Error('Failed to fetch users');
            }
          let data = response.data.users;
          console.log("data",data);
            return data
    } catch (error) {
        console.error("Error", error);
    }
}

const signOutHandler =  () => {
    signOut()
}

export default async function page() {

    const data = await fetchUsers();
    return (
        <>
       <button onClick={signOutHandler}>Sign Out</button>
        <div>Fetching Data</div>
            {
                data?.map((item, index) => {
                    return (
                        <div key={index}>
                            <p>Id : {item._id}</p>
                            <p>Name : {item.name}</p>
                            <p>Last Name : {item.lastname}</p>
                            <DeleteBtn title="Delete" id={item._id} />
                            <UpdateModal obj={item} />
                            <br />
                        </div>
                    )
                })
            }
        </>
    )
}
