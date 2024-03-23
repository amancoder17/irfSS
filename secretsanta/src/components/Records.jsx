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