import axios from 'axios';
import React from 'react'

const fetchBooks = async () => {
    // const requestOptions = {
    //     method: "GET",
    //     redirect: "follow"
    //   };
      
     let result = await axios.get("http://localhost:3000/api/bookFetch", )
        console.log("result", result);
        if (!result) {
            throw new Error("failed to fetching books")
        }
        let data = result.data.books;
        // console.log('data :>> ', data);
        return data
}

export default async function page() {

    const data = await fetchBooks();
    console.log('data', data)

  return (
    <>
    <div>
        <h1>All Books</h1>
    </div>
    <div>
        {data?.map((item,index)=> {
            return (
                <>
                <div key={index}>
                    <h1>{item.title}</h1>
                </div>
                </>
            )
        })}
    </div>
    
    </>
  )
}
