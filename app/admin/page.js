import User from '@/schemas/userSchema/User'
import React from 'react'
import DeleteBtn from '../componenets/deleteBtn/DeleteBtn';
import UpdateModal from '../componenets/updateModal/UpdateModal';



const fetchUsers = async() => {
    try {
        let data = await User.find()
        console.log("user data", data);
        return data
    } catch (error) {
        console.error("Error", error);
    }
}

export default async function page() {

    const data = await fetchUsers();
  return (
    <>
    {
        data?.map((item,index)=> {
            return(
                <div key={index}>
                    <p>Id : {item._id}</p>
                    <p>Name : {item.name}</p>
                    <p>Last Name : {item.lastname}</p>
                    <DeleteBtn title="Delete" id={item._id}/>
                  <UpdateModal obj={item}/>
                    <br/>
                </div>
            )
        })
    }
    </>
  )
}
