"use client"
import { useState } from 'react';
import { RiSearch2Line } from "react-icons/ri";


const SearchBar = () => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const openSearchBar = () => {
    setIsSearchBarOpen(true);
  };

  const closeSearchBar = () => {
    setIsSearchBarOpen(false);
  };

  return (
    <div>
      {isSearchBarOpen && (
        <div className="search-bar">
          <input type="text" className='text' placeholder="Search..." />
          <div className="close-icon" onClick={closeSearchBar}>✖</div>
        </div>
      )}
      <div className="navbar">
        <div className="search-icon" onClick={openSearchBar}><RiSearch2Line className="text-red-500"/></div>
      </div>
    </div>
  );
};

export default SearchBar;
