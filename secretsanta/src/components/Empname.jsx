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
            const ename= await axios.get(`${process.env.REACT_APP_ROUTE_KEY}/empname/${id}`)
            setname(ename.data);
        } catch (e) {
            console.error(e);
        }
      }

    
    
  return (
    <div className='Enameb'>
       <div className="head">
                    <h4 className="ms-4 mt-4">Secret Santa</h4>
                    <img className="logo" src="https://www.shutterstock.com/image-vector/santa-hat-600nw-209018503.jpg" alt="" />
                </div>

        <p>You are Secret Santa of <b>{Ename.firstname} {Ename.lastname} </b> </p>
        
    </div>
  )
}

export default Empname