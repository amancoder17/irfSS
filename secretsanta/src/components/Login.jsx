import React, { useState } from "react";
import './css/login.css';
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate= useNavigate();

const [user,setUser]= useState({
  email:"",
  passwordi:""
})

const handlechange= e =>{
  const {name,value}=e.target
  setUser({
  ...user,[name]:value
  })
}

const login=()=>{
 

  if(user.email===""||user.passwordi==="")
  {
    toast('Enter Email and Password',{
      style:{
        background:'red'
      }
    });
  }
  else{
    axios.post("http://localhost:9002/login",user)
    .then((res)=>{
      if(res.data.isLoggedIn===true)
      {
        localStorage.setItem('log',true)
        navigate('/home')
        
        // alert("ok h");
      }
      else if(res.data.isLoggedIn===false){
        toast('Wrong Email or Password',{
          style:{
            background:'red'
          }
        })
      }
    }
      
    )
  }
 
}

  return (
    <>
      <div className="maino">
        <div className="head">
          <h1 className="ms-4">Secret Santa</h1>
          <img className="logo" src="https://www.shutterstock.com/image-vector/santa-hat-600nw-209018503.jpg" alt="" />
        </div>
        <div className="main">
          <form className="form w-75">
            <h1 className="loghead">Login</h1>
            <div className="mb-3 w-100 mx-auto p-2">
              <label for="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" name="email" value={user.email} onChange={handlechange} className="form-control inpq" placeholder="Enter your Email ID" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
            </div>
            <div className="mb-3 w-100 mx-auto p-2">
              <label for="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" name="passwordi" className="form-control inpq" value={user.passwordi} onChange={handlechange} placeholder="Enter your Password" id="exampleInputPassword1" required />
            </div>
            <div className="mb-3 mx-auto p-2 sbtn">

              <div className="btn btn-primary sub" onClick={login}>Submit</div>
              <Toaster />

              
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login;