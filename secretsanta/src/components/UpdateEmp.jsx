import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './css/updateemp.css'
import { useNavigate } from 'react-router-dom';
const UpdateEmp = () => {

  const[Ename,setname]= useState([]);
   
  const navigate= useNavigate();
  const url=new URL(window.location.href);
    const idi= url.pathname;
    const sidi= idi.slice(16);
  useEffect(()=>{
    fetchName(sidi)
  },[])

  const fetchName= async(id)=>{
    try {
        const ename= await axios.get(`http://localhost:9002/empname/${id}`)
        setname(ename.data);
    } catch (e) {
        console.error(e);
    }
  }
  const handlechange= e =>{
    const {name,value}=e.target
    setname({
    ...Ename,[name]:value
    })
  }
  const update=(id)=>{

    const {firstname,lastname,email}=Ename
    axios.patch(`http://localhost:9002/empl/${id}`,Ename)
    .then(res=> console.log(res))
    .then(navigate('/emplist'))
  }

  return (
  
    <div className='mino'>
    <div className='updf'>
      <h1>Update Employee Details</h1>
    <label className='ms-3'>First Name</label><br />
    <input  type="text" aria-label="First name" name='firstname' className="form-control eml" value={Ename.firstname} onChange={handlechange} placeholder='First Name'/>
    <br />
    <label className='ms-3'>Last Name</label><br />
    <input  type="text" aria-label="Last name" name='lastname' className="form-control eml" value={Ename.lastname} onChange={handlechange} placeholder='Last Name'/>
    <br />
    <label className='ms-3' >Email</label><br />
    <input type="email" className="form-control eml" name='email' id="exampleFormControlInput1" value={Ename.email} onChange={handlechange} placeholder="Email"/>
    <br />
    <button className="btn btn-primary uto" onClick={()=>update(sidi)}>Update</button>

    </div>
    </div>
  )
}

export default UpdateEmp