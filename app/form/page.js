'use client'
import axios from "axios";
import { useState } from "react"


export default function Form() {


  const [name, setName] = useState ("");
  const [lastname, setLastname] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "name": name,
        "lastname": lastname
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      //  await fetch("http://localhost:3000/api/userapi", {method:"post", body:raw})
    //  await axios.post("http://localhost:3000/api/userapi", raw)
    await fetch("http://localhost:3000/api/userapi", requestOptions)
    .then((response) => {
          alert("Data is Sent");
          return response.text()
        })
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
    } catch (error) {

      console.log("Error", error);
    }
  }



  return (
    <>
      <div>
        Student Data
      </div>
      <form>
        <div>
          <label>Name</label>
          <input placeholder='Place your name' onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Last Name</label>
          <input placeholder='Place your lastname' onChange={(e) => setLastname(e.target.value)} />
        </div>
        <div><button onClick={submitHandler}>Submit</button></div>
      </form>
    </>
  )
}
