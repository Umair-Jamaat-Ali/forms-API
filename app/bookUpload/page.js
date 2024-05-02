'use client'
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function page() {

  const {data : session} = useSession();
  console.log("session",session);
  // console.log("session.user", session);

  const object = {
    title:"",
    author:"",
    price: null,
    category:"",
    description:""
  }

  const [bookInfo, setBookInfo] = useState(object);
  const [img, setImg] = useState([]);

  function changehandler(e) {
    setBookInfo({ ...bookInfo , [e.target.name]: e.target.value})
  }

  const imageChangeHandler = (e) => {
    const file = e.target.files[0]

    const reader = new FileReader();

    reader.onloadend = (e) => {

      // const imageData = reader.result;
      // console.log("imageData",imageData);
      setImg((preimage)=> [
        ...preimage,
        {url : e.target.result, file: file.name}
      ])
    }

   const fileResult =  reader.readAsDataURL(file)

   console.log("fileResult",fileResult);
  }

  console.log("img",img);


  const submitHandler = async (e) => {
    e.preventDefault();

    try {

      if (session) {
        let userid = session.user.id

        console.log("userid",userid);
      }
      const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  title: title,
  author: author,
  price:price,
  category: category,
  description: description,
  img: img,
  userid : userid
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

await fetch("http://localhost:3000/api/bookUploadApi", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

  alert("book are save")
    } catch (error) {
      console.log("error", error);
    }
  }


    return (
      <div className="bg-gray-100 px-10 lg:px-16 rounded-md">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            ></div>
        </div>
        <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label
                for="first-name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Title :
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="title"
                  onChange={changehandler}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                for="last-name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
               Author Name:
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="author"
                  onChange={changehandler}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                for="company"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Price :
              </label>
              <div className="mt-2.5">
                <input
                  type="number"
                  name="price"
                  onChange={changehandler}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                for="email"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Category :
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="category"
                  onChange={changehandler}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                for="Image"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Image :
              </label>
              <div className="mt-2.5">
                <input
                  type="file"
                  name="image"
                  onChange={imageChangeHandler}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                for="message"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Description :
              </label>
              <div className="mt-2.5">
                <textarea
                  name="description"
                  onChange={changehandler}
                  rows="4"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              onClick={submitHandler}
              className="block w-full rounded-md my-5 py-3 bg-red-600 lg:px-3.5 lg:py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
