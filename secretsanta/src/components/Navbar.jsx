import React, {useRef} from 'react'
import "./css/navbar.css"

import { FaBars, FaTimes } from "react-icons/fa";
import { Link} from 'react-router-dom';

const Navbar = () => {
    
    const navRef = useRef();  // react hook to create mutable refrence

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};
  return (
    <header>
    <h3 className='lognav'>SECRET SANTA</h3>
    <nav ref={navRef}>
       <Link to='/home'>
        <a>Home</a></Link> 
        <Link to='/about'>
        <a>About</a></Link>
        
        
        <button
            className="nav-btn nav-close-btn"
            onClick={showNavbar}>
            <FaTimes />
        </button>
    </nav>
    <button
        className="nav-btn"
        onClick={showNavbar}>
        <FaBars />
    </button>
</header>
  )
}

export default Navbar