
import React, { useEffect, useState } from 'react'
import '../components/css/emplshow.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Emplshow = () => {
  // React-router function to navigate b/w the pages
  const navigate= useNavigate();


  // set the states for employees into the list 
    const[employees,setEmployees]= useState([]);

 // Function to fecth employee data from DB and render it.    
  const fetchData = async()=>{
    try {
      const response= await axios.get(`${process.env.REACT_APP_ROUTE_KEY}/empl`)
      setEmployees(response.data);
      // console.log(employees);
    
    } 
    catch (e) {
      console.error('Error fetching employee Data',e)
    }
}

// function to delete an employee from DB
const handleDelete = async(id)=>{
  try {
     await axios.delete(`${process.env.REACT_APP_ROUTE_KEY}/empl/${id}`)
     .then((response)=>{

      console.log(response)
      
     })
     .then(window.location.reload(true))
     
  } catch (e) {
    console.error(e);
  }
  
}
// Update function to update details of a particular employee
const handleUpdate =  (id)=>{
  try {
   navigate(`updemp/${id}`)  // navigate to update page with particular unique id of an employee
    }
    
  catch (e) {
    console.error(e);
  }
}

// Hook used to render data at time of page loading 
useEffect(()=>{
  fetchData()
},[])


// Frontend for employee show
  return (
    <div className='mss'>
        <div className='ectt'>
        <table className='templl'>
  <thead>
  <tbody>
    <tr className='text-center'>
      <th className='shname'>Name</th>
      <th className='eemaill'>Email</th>
      <th className='dempl'>Delete Employee</th>
      <th className='uempl'>Update Employee</th>
    </tr>
    {
      employees.map((employee)=>
      <tr key={employee.id} >
        <td className='oemname'>{employee.firstname} {employee.lastname}</td>
        <td className='oememail'> {employee.email}</td>
        <td className='odelbtn'><button className='btn btn7' onClick={()=>handleDelete(employee._id)}>Delete</button></td>
        <td className='oupbtn'><button className='btn btn7' onClick={()=>handleUpdate(employee._id)}>Update</button></td>
      </tr>)
    }
    </tbody>
  </thead>  
</table>
        </div>
        
    </div>
  )
}
export default Emplshow;


