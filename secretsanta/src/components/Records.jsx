import React, { useEffect, useState } from 'react'
import './css/records.css'
import axios from 'axios';
import Navbar from "./Navbar";

const Records = () => {

  // hook to set the records of secret santa 
    const [record,setrecord]=useState([]);

    // useeffect to render the fetched records at the time of Page Loading
    useEffect(()=>{
        fetchrecord()
    },[])

    // functions to fetch records 
    const fetchrecord= async()=>{
        try {
        const rec= await axios.get(`${process.env.REACT_APP_ROUTE_KEY}/empl`);   // API request to get the employess with records from DB.
        setrecord(rec.data)
            
        } catch (e) {
            console.error(e)
        }
        
    }
  return (
    <>
      <Navbar/>
    <div className='rmaine'>
        <table className='rtemplo'>
  <thead>
  <tbody>
    <tr className='text-center'>
      <th className='rnamee'>Employee Name</th>
      <th className='rename'>Secret Santa Name</th>
      <th className='rsemail'>Secret Santa Email</th>
      
    </tr>
    {
      record.map((employee)=>
      <tr key={employee.id} >
        <td className='remname'>{employee.firstname} {employee.lastname}  {` -->`} </td>
        <td className='rememail'> {employee.santaname}</td>
        <td className='rsaemail'> {employee.santaemail}</td>
      </tr>)
    }
    </tbody>
  </thead>  
</table>
    </div>
    </>
  )
}

export default Records