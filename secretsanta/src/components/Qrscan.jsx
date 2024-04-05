import React, { useEffect, useState } from 'react'
import './css/qrscan.css'

import axios from 'axios';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
const Qrscan = () => {

  // set employees using use states
  const[employees,setEmployees]= useState([]);
  // use navigate function for the navigation
  const navigate=useNavigate()

  //call fetch Data function at the time of Page loading
useEffect(()=>{
    fetchData()
  },[])

  // Fetch data function for getting employees from the DB 
const fetchData = async()=>{
    try {
      const response= await axios.get(`${process.env.REACT_APP_ROUTE_KEY}/empl`) //Request to get all the employees 
      setEmployees(response.data);
      // console.log(employees);
    
    } 
    catch (e) {
      console.error('Error fetching employee Data',e)
    }
}
const GenerateQR= async(id)=>{
  navigate(`/secretSanta?Data=${id}`)    // On click generate QR button we will navigate to a page where we get a QR code that individual employee


}
  
  return (
    <>
    <Navbar/>
    <div className="qrmain">
    <h1 className='qrhead'>Generate QR to become a Secret Santa</h1>
<div className='qrcode'>
<table className='templ'>
  <thead>
  <tbody>
    <tr className='text-center'>
      <th className='qrname'>Name</th>
      <th className='qremail'>Email</th>
      <th className='qrg'>Generate QR</th>
    </tr>
    {
      employees.map((employee)=>
      <tr key={employee.id} >
        <td className='qremname'>{employee.firstname} {employee.lastname}</td>
        <td className='qrememail'> {employee.email}</td>
        <td className='qremqr'><button className='btn btn3' onClick={()=>GenerateQR(employee._id)}>Generate QR</button></td>
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