import React, { useEffect, useState } from 'react'
import './css/records.css'
import axios from 'axios';
import Navbar from "./Navbar";

const Records = () => {
    const [record,setrecord]=useState([]);
    useEffect(()=>{
        fetchrecord()
    },[])
    const fetchrecord= async()=>{
        try {
        const rec= await axios.get('http://localhost:9002/empl');
        setrecord(rec.data)
            
        } catch (e) {
            console.error(e)
        }
        
    }
  return (
    <>
      <Navbar/>
    <div className='maine'>
        <table className='templo'>
  <thead>
  <tbody>
    <tr className='text-center'>
      <th className='namee'>Employee Name</th>
      <th className='ename'>Secret Santa Name</th>
      <th className='semail'>Secret Santa Email</th>
      
    </tr>
    {
      record.map((employee)=>
      <tr key={employee.id} >
        <td className='emname'>{employee.firstname} {employee.lastname}  {` -->`} </td>
        <td className='ememail'> {employee.santaname}</td>
        <td className='saemail'> {employee.santaemail}</td>
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