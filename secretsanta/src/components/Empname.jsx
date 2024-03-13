import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import './css/empname.css'

const Empname = () => {
    const[Ename,setname]= useState([]);
    const [searchid]=useSearchParams();
    const id= searchid.get('Data');

    useEffect(()=>{
        fetchName(id)
      },[])

      const fetchName= async(id)=>{
        try {
            const ename= await axios.get(`http://localhost:9002/empname/${id}`)
            setname(ename.data);
        } catch (e) {
            console.error(e);
        }
      }

    
    
  return (
    <div className='Enameb'>
        <p>You are Secret Santa of <b>{Ename.firstname} {Ename.lastname} </b> </p>
        
    </div>
  )
}

export default Empname