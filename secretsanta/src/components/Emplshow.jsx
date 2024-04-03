
import React, { useEffect, useState } from 'react'
import '../components/css/emplshow.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Emplshow = () => {
    const[employees,setEmployees]= useState([]);

    const navigate= useNavigate();
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
const handleUpdate =  (id)=>{
  try {
   navigate(`updemp/${id}`)
    }
    
  catch (e) {
    console.error(e);
  }
}


useEffect(()=>{
  fetchData()
},[])



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


