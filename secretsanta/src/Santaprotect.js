import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Santaprotect = (props) => {
    const {Component}=props;
    const navigate= useNavigate;
    useEffect(()=>{
        let khulja=localStorage.getItem('hogya');
        if(!khulja){
            navigate('/invalid')
        }
    })
  return (
    <div>
        <Component/>
    </div>
  )
}

export default Santaprotect