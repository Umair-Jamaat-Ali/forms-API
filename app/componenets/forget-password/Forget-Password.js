"use client"

import { useState } from 'react';

export default function Forget_Password() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("")
  

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const submitHandler = () => {
    
  }

  return (
    <div>

      <button onClick={openModal}>Forgot Password?</button>
      {isModalOpen && (
        <div className="modal">
          
            <span className="close" onClick={closeModal}>&times;</span>
            <form className='form'>
              <div>
                <label>E-Mail</label>
                <input placeholder='Place your name' value={name}
                onChange={(e) => setEmail(e.target.value)} />
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
