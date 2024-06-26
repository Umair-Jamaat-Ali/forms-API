// forgetPassword.js (or whatever you name the file)

'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ForgetPassword() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // try {
    //   const result = await axios.post('/api/forget_password', { email });
    //   console.log(result.data);
    // } catch (err) {
    //   console.error(err.response.data);
    // }

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      const raw = JSON.stringify({
        email,
      });
      
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };
      
      let result = await fetch("http://localhost:3000/api/forget_password", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
        console.log("Result", result);
    } catch (error) {
      console.log("Error", error);
    }


  };

  return (
    <div>
      <button onClick={openModal}>Forgot Password?</button>
      {isModalOpen && (
        <div className="modal">
          <span className="close" onClick={closeModal}>&times;</span>
          <form className='form' onSubmit={submitHandler}>
            <div>
              <label>E-Mail</label>
              <input placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              {error}
            </div>
            <div className='btn'>
              <button type="submit" onClick={submitHandler}>Submit</button>
            </div>
          </form>
        </div>
      )}
      <style jsx>{`
        .modal {
          display: block;
          position: fixed;
          z-index: 1;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 50%;
          height: 20%;
          overflow: auto;
          background-color: wheat;
        }

        .form {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .form input {
          margin: 10px;
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

