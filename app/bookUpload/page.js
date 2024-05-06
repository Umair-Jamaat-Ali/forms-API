// 'use client'
// import axios from "axios";
// import { useSession } from "next-auth/react";
// import { useState } from "react";

// export default function page() {

//   const {data : session, status} = useSession();
//   console.log("session",session);
//   console.log('status', status)
  
//   const [ title, setTitle] = useState("")
//   const [ author, setAuthor] = useState("")
//   const [ price, setPrice] = useState(null)
//   const [ category, setCategory] = useState("")
//   const [ description, setDescription] = useState("")
//   const [imgs_url, setImgs_url] = useState([]);

 

//   const imageChangeHandler = async (e) => {
//     const files = e.target.files[0]

//     if (files.length > 5 || imgs_url.length >= 5) {
//       alert ("Maximum 5 images are allowed to upload");
//       return
//     }

  
//   try {
//     const promises = [];
//     for (let i = 0; i < files.length; i++) {
//       let file = files[i];
//       if (file.size > 4 * 1024 * 1024) {
//         continue;
//       }
//       // Read the selected image and convert it to a Data URL
//       const reader = new FileReader();

//       const promise = new Promise((resolve) => {
//         reader.onload = (e) => {
//           setImgs_url((prevselectedimg) => [
//             ...prevselectedimg,
//             { url: e.target.result, file: file.name },
//           ]);
//           resolve();
//         };
//       });
//       reader.readAsDataURL(file);
//       promises.push(promise);
//     }
//     await Promise.all(promises);
//   } catch (error) {
//     console.error("Error reading images:", error);
  
//   }
//   }

//   console.log("imgs_url",imgs_url);


//   const submitHandler = async (e) => {
//     e.preventDefault();

//     try {

//       if (session) {
//         let userid = session.user.id

//         console.log("userid",userid);
//       }

//       if (!userid) {
//         throw new Error("please login")
//       }
// //       const myHeaders = new Headers();
// // myHeaders.append("Content-Type", "application/json");

// const raw = {
//   title: title,
//   author: author,
//   price:price,
//   category: category,
//   description: description,
//   imgs_url: imgs_url,
//   userid : userid
// };



// await axios.post("http://localhost:3000/api/bookUploadApi", raw)
//   .then((result) =>{ console.log(result);
//   setTitle(raw.title)
//   setAuthor(rwa.author)
//   setCategory(raw.category)
//   setDescription(raw.description)
//   setPrice(raw.price)
//   setimgs_url([])

//   alert("book successfully uploaded")
//     })
//   .catch((error) => console.error(error));

//   alert("book are save")
//     } catch (error) {
//       console.log("error", error);
//     }
//   }



//     return (
//       <div className="bg-gray-100 px-10 lg:px-16 rounded-md">
//         <div
//           className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
//           aria-hidden="true"
//         >
//           <div
//             className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
//             ></div>
//         </div>
//         <form onSubmit={submitHandler} className="mx-auto mt-16 max-w-xl sm:mt-20">
//           <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
//             <div>
//               <label
//                 htmlFor="first-name"
//                 className="block text-sm font-semibold leading-6 text-gray-900"
//               >
//                 Title :
//               </label>
//               <div className="mt-2.5">
//                 <input
//                   type="text"
//                   name="title"
//                   onChange={(e)=>setTitle(e.target.value)}
//                   className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>
//             <div>
//               <label
//                 htmlFor="last-name"
//                 className="block text-sm font-semibold leading-6 text-gray-900"
//               >
//                Author Name:
//               </label>
//               <div className="mt-2.5">
//                 <input
//                   type="text"
//                   name="author"
//                   onChange={(e)=>setAuthor(e.target.value)}
//                   className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>
//             <div className="sm:col-span-2">
//               <label
//                 htmlFor="company"
//                 className="block text-sm font-semibold leading-6 text-gray-900"
//               >
//                 Price :
//               </label>
//               <div className="mt-2.5">
//                 <input
//                   type="number"
//                   name="price"
//                   onChange={(e)=>setPrice(e.target.value)}
//                   className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>
//             <div className="sm:col-span-2">
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-semibold leading-6 text-gray-900"
//               >
//                 Category :
//               </label>
//               <div className="mt-2.5">
//                 <input
//                   type="text"
//                   name="category"
//                   onChange={(e)=>setCategory(e.target.value)}
//                   className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>
//             <div className="sm:col-span-2">
//               <label
//                 htmlFor="Image"
//                 className="block text-sm font-semibold leading-6 text-gray-900"
//               >
//                 Image :
//               </label>
//               <div className="mt-2.5">
//                 <input
//                   type="file"
//                   name="image"
//                   onChange={imageChangeHandler}
//                   className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>
//             <div className="sm:col-span-2">
//               <label
//                 htmlFor="message"
//                 className="block text-sm font-semibold leading-6 text-gray-900"
//               >
//                 Description :
//               </label>
//               <div className="mt-2.5">
//                 <textarea
//                   name="description"
//                   onChange={(e)=>setDescription(e.target.value)}
//                   rows="4"
//                   className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 ></textarea>
//               </div>
//             </div>
//           </div>
//           <div className="mt-10">
//             <button
//               type="submit"
//               onClick={submitHandler}
//               className="block w-full rounded-md my-5 py-3 bg-red-600 lg:px-3.5 lg:py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     );
//   }


"use client";

// import Context from "@/config/context";
import Image from "next/image";
import React, {useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const page = () => {
  const { data: sessionData } = useSession();
  console.log('sessionData', sessionData)
  // const { message, setMessage } = useContext(Context);

let obj ={
    title: "",
    author: "",
    price: null,
    catogery: "",
    description: "",
  }

  const [bookinfo, setBookinfo] = useState(obj);
  const [img, setImg] = useState([]);
  function changehandler(e) {
    setBookinfo({ ...bookinfo, [e.target.name]: e.target.value });
  }
  

  async function imagehandler(e) {
    const files = e.target.files;
    
    console.log(files)
    if (files.length > 5 || img.length >= 5) {
      return;
    }
    try {
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        if (file.size > 4 * 1024 * 1024) {
          continue;
        }
        // Read the selected image and convert it to a Data URL
        const reader = new FileReader();

        const promise = new Promise((resolve) => {
          reader.onload = (e) => {
            setImg((prevselectedimg) => [
              ...prevselectedimg,
              { url: e.target.result, file: file.name },
            ]);
            resolve();
          };
        });
        reader.readAsDataURL(file);
        promises.push(promise);
      }
      await Promise.all(promises);
    } catch (error) {
      console.error("Error reading images:", error);
    } 
  }

  
  async function uploaddata(e) {
    e.preventDefault();
    if (sessionData != null) {
      var userid = sessionData?.user?.id;
    }
    if (!userid) {
      return;
    }
    let obj = {
      bookinfo,
      img,
      userid,
    };
   const response = await axios
      .post("http://localhost:3000/api/bookUploadApi", obj)
      .then((result) => {
        console.log(result);
        setBookinfo(obj)
        setImg([])
      })
      .catch((err) => {
        console.log(err);
      });
      console.log('response', response)
  }

  function del(index) {
    let images_for_delete = [...img];
    images_for_delete.splice(index, 1);
    setImg(images_for_delete);
  }
  return (
    <>
      <div className="main-page-layout">
        <h1>Upload your Book</h1>
        <form onSubmit={uploaddata}>
          <div>
            <label htmlFor="">Title</label>
            <br />
            <input type="text" onChange={changehandler} name="title" />
            <br />
            <label htmlFor="">Author Name</label>
            <br />
            <input type="text" onChange={changehandler} name="author" />
            <br />
            <label htmlFor="">Price(Rs)</label>
            <br />
            <input type="number" onChange={changehandler} name="price" />
            <br />
            <label htmlFor="">Description</label>
            <br />
            <input
              type="text-area"
              onChange={changehandler}
              name="description"
            />
            <br />
            <label htmlFor="">Select Catogery</label>
            <select onChange={changehandler} name="catogery" id="">
              <option value="">Select</option>
              <option value="Fiction">Fiction</option>
              <option value="Literature">Literature</option>
              <option value="Classics">Classics</option>
              <option value="Comics">Comics</option>
              <option value="Non Fiction">Non Fiction</option>
              <option value="Biographies">Biographies</option>
            </select>
            <label htmlFor="">Select Images</label>
            <input
              type="file"
              accept="image/*"
              onChange={imagehandler}
              multiple
            />
          </div>
          <button type="submit">Post</button>
        </form>
        <div className="image-main-show">
          {img?.map((v, index) => {
            // console.log(v)
            return (
              <>
                <div className="image-show-box">
                  <Image src={v.url} alt="Loading" width={150} height={100} />
                  <button className="image-del-btn" onClick={() => del(index)}>
                    delete
                  </button>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default page;
