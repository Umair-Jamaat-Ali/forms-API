'use client'
import axios from 'axios';
import { useSession } from 'next-auth/react'
import React,{useEffect, useState} from 'react'
import Image from 'next/image';
import Loader from '../componenets/loader/Loader';

export default function page() {

  const { data: session } = useSession()
  // console.log('session :>> ', session);
  const userId = session?.user?.id;
  console.log('userId :>> ', userId);

  const [books , setBooks] = useState("")
  const [loader,setLoader] = useState(false)
  
  const fetchData = async () => {
    try {
      setLoader(true)
      const response = await axios.get(`http://localhost:3000/api/adminportal/${userId}`);
      console.log('response :>> ', response);
      

      const data = await response.data.body
      console.log('Data:', data);

      setBooks(data)
      setLoader(false)

    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);
  


  return (
    <>
      <div>
        <h1>Admin Portal</h1>
      </div>
      <div>
      {books.length ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books?.map((book,index) => (
              <tr key={index}>
                <td>{book.id}</td>
                <td>
                  <Image height={100} width={100} src={book.imgs_url[0].img_url}   alt="" />
                </td>
                <td>{book.title}</td>
                <td>{book.description}</td>
                <td>
                  <button >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (<div>{loader ? <Loader/> : (<div>Books not found</div>)}</div>)}
      </div>
    </>
  )
}
