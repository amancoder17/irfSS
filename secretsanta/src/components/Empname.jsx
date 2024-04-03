import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import './css/empname.css'

const Empname = () => {
  // state to set a particular emp name to show it to Qr Scanner
    const[Ename,setname]= useState([]);

    // store the searchparams URL in an array
    const [searchid]=useSearchParams();

    // get the Data from serachid array 
    const id= searchid.get('Data');

    // hook to fetch name of particular  employee using its unique id 
    useEffect(()=>{
        fetchName(id)
      },[])

      // function to fetch name of employee
      const fetchName= async(id)=>{
        try {
            const ename= await axios.get(`${process.env.REACT_APP_ROUTE_KEY}/empname/${id}`)  //get request to get details of employee using its id
            setname(ename.data);  // set name through response.data which is in ename
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