"use client"

import { useState } from 'react';

export default function UpdateModal({obj}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState(obj.name);
  const [lastname, setLastname] = useState(obj.lastname);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const submitHandler = (e) => {
    e.preventDefault()
    try {
      
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "id": obj._id,
  "name": name,
  "lastname": lastname
});
const requestOptions = {
  method: "PUT",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://localhost:3000/api/userapi", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
    } catch (error) {
      
    }
}

  return (
    <div>

      <button onClick={openModal}>Update</button>
      {isModalOpen && (
        <div className="modal">
          
            <span className="close" onClick={closeModal}>&times;</span>
            <form className='form'>
              <div>
                <label>Name</label>
                <input placeholder='Place your name' value={name}
                onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label>Last Name</label>
                <input placeholder='Place your lastname' value={lastname}
                onChange={(e) => setLastname(e.target.value)}  />
              </div>
              <div className='btn'><button onClick={submitHandler}>Submit</button></div>
            </form>
          </div>
        
      )}
      <style jsx>{`
        .modal {
          display: block;
          position: fixed;
          z-index: 1;
          left: 100px;
          top: 100px;
          width: 50%;
          height: 20%;
          overflow: auto;
          background-color: wheat;
        }

        .form{
          display: column;
          justify-content: centre;
          align-item: centre;
        }

        .form input{
          margin: 10px
        }
        

        .close {
          color: #aaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
        }

        .close:hover,
        .close:focus {
          color: red;
          text-decoration: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
