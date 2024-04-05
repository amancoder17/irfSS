import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './css/updateemp.css'
import { useNavigate } from 'react-router-dom';
const UpdateEmp = () => {

  // hook to set name of employee
  const[Ename,setname]= useState([]);
   
  const navigate= useNavigate(); // react router function which helps to navigate b/w the pages

  const url=new URL(window.location.href);          // url from browser window
    const idi= url.pathname;         // path name from url
    const sidi= idi.slice(16);               // extract id from path name

    // hook to load data at the time of page loading
  useEffect(()=>{
    fetchName(sidi)             
  },[])


  // function to fetch details of a particular employee
  const fetchName= async(id)=>{
    try {
        const ename= await axios.get(`${process.env.REACT_APP_ROUTE_KEY}/empname/${id}`)   // get request to fetch all the details of particular employee with help of ids
        setname(ename.data);
    } catch (e) {
        console.error(e);
    }
  }

  // function to handle changes and set them in state
  const handlechange= e =>{
    const {name,value}=e.target
    setname({
    ...Ename,[name]:value
    })
  }

  // update function button when we click on update 
  const update=(id)=>{

    const {firstname,lastname,email}=Ename
    axios.patch(`${process.env.REACT_APP_ROUTE_KEY}/empl/${id}`,Ename)   // patch request to update all the details of employee
    .then(res=> console.log(res))
    .then(navigate('/emplist'))    // navigate to employee list page
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
    <button className="btn btn-primary uto mb-3" onClick={()=>update(sidi)}>Update</button>

    </div>
    </div>
  )
}

export default UpdateEmp