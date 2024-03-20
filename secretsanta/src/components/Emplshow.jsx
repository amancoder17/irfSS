
import React, { useEffect, useState } from 'react'
import '../components/css/emplshow.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Emplshow = () => {
    const[employees,setEmployees]= useState([]);

    const navigate= useNavigate();
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


const handleDelete = async(id)=>{
  try {
     await axios.delete(`http://localhost:9002/empl/${id}`)
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
    <div className='ms'>
        <div className='ect'>
        <table className='templ'>
  <thead>
  <tbody>
    <tr className='text-center'>
      <th className='namee'>Name</th>
      <th className='eemail'>Email</th>
      <th className='demp'>Delete Employee</th>
      <th className='uemp'>Update Employee</th>
    </tr>
    {
      employees.map((employee)=>
      <tr key={employee.id} >
        <td className='emname'>{employee.firstname} {employee.lastname}</td>
        <td className='ememail'> {employee.email}</td>
        <td className='delbtn'><button  onClick={()=>handleDelete(employee._id)}>Delete</button></td>
        <td className='upbtn'><button onClick={()=>handleUpdate(employee._id)}>Update</button></td>
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


