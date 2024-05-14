'use client'
import { useState } from 'react';
import React from 'react';
import { PiShoppingCartBold } from "react-icons/pi";
import Modal from 'react-modal';

const customStyles = {
    content: {
       width: "300px",
       height: "400px",
        top: '40%',
        left: '70%',
        right: 'auto',
        bottom: 'auto',
        padding: "20px",
        marginRight: '-50%',
        transform: 'translate(0, -40%)',
    },
};


export function CartModel() {

    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }
    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div>
            <button onClick={openModal}>
            {/* <span className='cart-items'>0</span> */}
                <PiShoppingCartBold className='w-10 h-10' />
            </button>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={null}
                onRequestClose={null}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className='text-end'><button onClick={closeModal}>&#x2715;</button></div>
                <div className='text-center align-bottom'><p>Your cart is empty</p></div>
                {/* <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                </form> */}
            </Modal>
        </div>
    );
}
