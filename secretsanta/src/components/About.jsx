import React from 'react'
import "./css/about.css"
import Navbar from './Navbar'
// react icon library
import { AiFillHeart } from "react-icons/ai";

const About = () => {
  return (
    <>
    <Navbar/>
    <div className='abt'>
 <p>
The Secret Santa Website facilitates several essential processes to ensure the smooth and effective management of Secret Santa events within our organization.
One crucial feature is the QR code generation tool, allowing admins to generate unique QR codes for each participant, simplifying the process of assigning Secret Santas.
Moreover, the Secret Santa Website automates email notifications, sending them out on December 26th to inform participants of their assigned Secret Santas. These emails contain all the necessary details, ensuring clarity and transparency in the gift exchange process. Overall, the website streamlines the organization and execution of Secret Santa events, making it a valuable tool for creating memorable holiday experiences within our organization.
Continuous improvements and enhancements are planned to ensure ongoing success and positive engagement in future celebrations.
    </p>
    </div>
    <div className='fotter'>
        <h5>Made By Foxians: (Aman, Irfan and Aditi), for all Foxians with <AiFillHeart className='dil'/> 
      </h5>
    </div>
    </>
   
   
  )
}

export default About