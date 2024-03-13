import React, { useEffect, useState } from 'react'
import './css/qrscan.css'

import axios from 'axios';
const Qrscan = () => {
  const[employees,setEmployees]= useState([]);

useEffect(()=>{
    fetchData()
  },[])

const fetchData = async()=>{
    try {
      const response= await axios.get('http://localhost:9002/empl')
      setEmployees(response.data);
      // console.log(employees);
    
    } 
    catch (e) {
      console.error('Error fetching employee Data',e)
    }
}
const GenerateQR= async(id)=>{
  window.location.href=`/secretSanta?Data=${id}`;

}
  
  return (
    <>
    <div className="qrmain">

    <div className="head">
                    <h1 className="ms-4">Secret Santa</h1>
                    <img className="logo" src="https://www.shutterstock.com/image-vector/santa-hat-600nw-209018503.jpg" alt="" />
                </div>
        
<div className='qrcode'>
<h1 className='qrhead'>Generate QR to become a Secret Santa</h1>
<table className='templ'>
  <thead>
  <tbody>
    <tr className='text-center'>
      <th className='namee'>Name</th>
      <th className='eemail'>Email</th>
      <th className='gqr'>Generate QR</th>
    </tr>
    {
      employees.map((employee)=>
      <tr key={employee.id} >
        <td className='emname'>{employee.firstname} {employee.lastname}</td>
        <td className='ememail'> {employee.email}</td>
        <td className='emqr'><button onClick={()=>GenerateQR(employee._id)}>Generate QR</button></td>
      </tr>)
    }
    </tbody>
  </thead>  
</table>
</div>
</div>
    </>
  )
}

export default Qrscan