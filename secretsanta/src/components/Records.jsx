import React, { useEffect, useState } from 'react'
import './css/records.css'
import axios from 'axios';

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
    

    <div className='maine'>
        <div className="head">
                    <h1 className="ms-4">Secret Santa</h1>
                    <img className="logo" src="https://www.shutterstock.com/image-vector/santa-hat-600nw-209018503.jpg" alt="" />
                </div>
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
  )
}

export default Records