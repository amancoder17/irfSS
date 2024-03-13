import React, {useState } from 'react'
import axios from 'axios'
import '../components/css/emplist.css'
import Emplshow from './Emplshow'

const Emplist = () => {

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
    axios.post("http://localhost:9002/emplist",emp)
    .then(res=> console.log(res))
    window.location.reload(true)
  }

  return (
    <>
    <div className='maino'>
    <div className="head">
                    <h1 className="ms-4">Secret Santa</h1>
                    <img className="logo" src="https://www.shutterstock.com/image-vector/santa-hat-600nw-209018503.jpg" alt="" />
                </div>
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
    </div>
    </>
  )
}

export default Emplist;