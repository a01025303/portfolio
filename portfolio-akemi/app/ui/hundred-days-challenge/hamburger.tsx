import React, { useState } from 'react';

export default function Hamburger() {
    const [isOpen, setIsOpen] = useState(false);
    const genericHamburgerLine = 'h-2 w-16 rounded-full bg-gray-900 my-1 transition ease-in transform duration-300';
    return (
        <div>
        <button 
            className = 'h-24 w-24 flex flex-col justify-center items-center group'
            onClick={() => setIsOpen(!isOpen)}>
            <div className={`${genericHamburgerLine} ${isOpen ? "translate-y-4 -rotate-45": "opacity-75 group-hover:opacity-100"}`}></div>
            <div className={`${genericHamburgerLine} ${isOpen ? "opacity-0" : "opacity-75 group-hover:opacity-100"}`}></div>
            <div className={`${genericHamburgerLine} ${isOpen ? "-translate-y-4 rotate-45": "opacity-75 group-hover:opacity-100"}`}></div>
        </button>
        </div>
    );
}