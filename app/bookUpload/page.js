'use client'
import { useState } from "react";

export default function page() {

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

    reader.onloadend = () => {

      const imageData = reader.result;
      setImg(imageData)
    }

   const fileResult =  reader.readAsDataURL(file)

   console.log("fileResult",fileResult);
  }

  console.log(img);


  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  userid: "6630ba04213e235ce6245b54",
  title: title,
  author: author,
  price:price,
  category: category,
  description: description,
  img: img
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://localhost:3000/api/bookUploadApi", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
    } catch (error) {
      
    }
  }


    return (
      <div class="bg-gray-100 px-10 lg:px-16 rounded-md">
        <div
          class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            class="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            ></div>
        </div>
        <form action="#" method="POST" class="mx-auto mt-16 max-w-xl sm:mt-20">
          <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label
                for="first-name"
                class="block text-sm font-semibold leading-6 text-gray-900"
              >
                Title :
              </label>
              <div class="mt-2.5">
                <input
                  type="text"
                  name="title"
                  onChange={changehandler}
                  class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                for="last-name"
                class="block text-sm font-semibold leading-6 text-gray-900"
              >
               Author Name:
              </label>
              <div class="mt-2.5">
                <input
                  type="text"
                  name="author"
                  onChange={changehandler}
                  class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label
                for="company"
                class="block text-sm font-semibold leading-6 text-gray-900"
              >
                Price :
              </label>
              <div class="mt-2.5">
                <input
                  type="number"
                  name="price"
                  onChange={changehandler}
                  class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label
                for="email"
                class="block text-sm font-semibold leading-6 text-gray-900"
              >
                Category :
              </label>
              <div class="mt-2.5">
                <input
                  type="text"
                  name="category"
                  onChange={changehandler}
                  class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label
                for="Image"
                class="block text-sm font-semibold leading-6 text-gray-900"
              >
                Image :
              </label>
              <div class="mt-2.5">
                <input
                  type="file"
                  name="image"
                  onChange={imageChangeHandler}
                  class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label
                for="message"
                class="block text-sm font-semibold leading-6 text-gray-900"
              >
                Description :
              </label>
              <div class="mt-2.5">
                <textarea
                  name="description"
                  onChange={changehandler}
                  rows="4"
                  class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="mt-10">
            <button
              type="submit"
              class="block w-full rounded-md my-5 py-3 bg-red-600 lg:px-3.5 lg:py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
