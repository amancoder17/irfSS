import React, {useState } from 'react'
import axios from 'axios'
import '../components/css/emplist.css'
import Emplshow from './Emplshow'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

const Emplist = () => {
  const navigate= useNavigate();

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

  const add=()=>{
    const {firstname,lastname,email}=emp
    if(firstname && lastname && email)
    {
      axios.post("http://localhost:9002/emplist",emp)
      .then((res)=>{
        if(res.data.ans===false)
        {
          navigate(0)
        }
        else
        {
          toast('Employee Already Added',{
            style:{
              background:'red'
            }
          });
        }
      } )
    }
    else{
      toast('Please fill All the Details',{
        style:{
          background:'red'
        }
      });
    }

  }

  return (
    <>
    <Navbar/>
    <div className='maino'>
    
    <h5 className='he mx-auto mt-5'>Add Employee</h5>
    <div className='heado'>
  <div className="input-group eminp mx-auto mt-5">
    
  <input  type="text" aria-label="First name" name='firstname' className="form-control eml" value={emp.firstname} onChange={handlechange} placeholder='First Name'/>
  <input  type="text" aria-label="Last name" name='lastname' className="form-control eml" value={emp.lastname} onChange={handlechange} placeholder='Last Name'/>
  <input type="email" className="form-control ms-5 eml" name='email' id="exampleFormControlInput1" value={emp.email} onChange={handlechange} placeholder="Email"/>
  <a href="#" className="btn btn-primary ms-3" onClick={add}>ADD</a>
    </div>
    </div>
    <Emplshow/>
    <Toaster />
    </div>
    </>
  )
  }
export default Emplist;