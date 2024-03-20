import axios from 'axios'
import React, { useState } from 'react'
import './css/updateemp.css'
import { useNavigate } from 'react-router-dom';
const UpdateEmp = () => {
   
  const navigate= useNavigate();
  const url=new URL(window.location.href);
    const idi= url.pathname;
    const sidi= idi.slice(16);
  const [emp,setEmp]= useState({
    firstname:"",
    lastname:"",
    email:""
  })
  const handlechange= e =>{
    const {name,value}=e.target
    setEmp({
    ...emp,[name]:value
    })
  }
  const update=(id)=>{
    const {firstname,lastname,email}=emp
    axios.patch(`http://localhost:9002/empl/${id}`,emp)
    .then(res=> console.log(res))
    .then(navigate('/emplist'))
  }

  return (
  
    <div className='mino'>
    <div className='updf'>
      <h1>Update Employee Details</h1>
    <label className='ms-3'>First Name</label><br />
    <input  type="text" aria-label="First name" name='firstname' className="form-control eml" value={emp.firstname} onChange={handlechange} placeholder='First Name'/>
    <br />
    <label className='ms-3'>Last Name</label><br />
    <input  type="text" aria-label="Last name" name='lastname' className="form-control eml" value={emp.lastname} onChange={handlechange} placeholder='Last Name'/>
    <br />
    <label className='ms-3' >Email</label><br />
    <input type="email" className="form-control eml" name='email' id="exampleFormControlInput1" value={emp.email} onChange={handlechange} placeholder="Email"/>
    <br />
    <button className="btn btn-primary uto" onClick={()=>update(sidi)}>Update</button>

    </div>
    </div>
  )
}

export default UpdateEmp