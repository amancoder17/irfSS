import React, {useState } from 'react'
import axios from 'axios'
import './css/emplist.css'
import Emplshow from './Emplshow'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';  // npm pacakge to show alerts

const Emplist = () => {

  // React router function to navigate b/w Pages
  const navigate= useNavigate();

  // set the state for employees to add them in DB
  const [emp,setEmp]= useState({
    firstname:"",
    lastname:"",
    email:""
  })

  // On changing input values handle changes and set employee in useState
  const handlechange= e =>{
    const {name,value}=e.target
    setEmp({
    ...emp,[name]:value
    })
  }

  // Function to Add a employee to DB
  const add=()=>{
    const {firstname,lastname,email}=emp
    if(firstname && lastname && email)      // Check is all fields exists
    {
      axios.post(`${process.env.REACT_APP_ROUTE_KEY}/emplist`,emp)    // post request to add employee in db.
      .then((res)=>{
        if(res.data.ans===false)         // in response if false employee added to DB
        {
          navigate(0)
          toast('Employee  Added',{
            style:{
              background:'green',
              color:'white'
            }
          });
        }
        else                          // if res is not false then employee already exists
        {
          toast('Employee Already Added',{
            style:{
              background:'red',
              color:'white'
            }
          });
        }
      } )
    }
    else{
      toast('Please fill All the Details',{
        style:{
          background:'red',
          color:'white'
        }
      });
    }

  }

  return (
    <>
    {/* frontend Code for Employee list  */}
    <Navbar/>
    <div className='listmai'>
    
    <h4 className='he mx-auto mt-5'>Add Employee</h4>
    <div className='listmain'>
  <div className="input-group eminp mx-auto mt-5">
    
  <input  type="text" aria-label="First name" name='firstname' className="form-control emll" value={emp.firstname} onChange={handlechange} placeholder='First Name'required/>
  <input  type="text" aria-label="Last name" name='lastname' className="form-control emll ms-2" value={emp.lastname} onChange={handlechange} placeholder='Last Name'required/>
  <input type="email" className="form-control ms-5 emll" name='email' id="exampleFormControlInput1" value={emp.email} onChange={handlechange} placeholder="Email" required/>
  <a href="#" className="btn btn4 ms-3" onClick={add}>ADD</a>    
    </div>
    </div>
    <Emplshow/>
    <Toaster />
    </div>
    </>
  )
  }
export default Emplist;