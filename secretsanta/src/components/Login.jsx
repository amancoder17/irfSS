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
        background:'red',
        color:"white"
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
            background:'red',
            color:"white",
            
          }
        })
      }
    }
      
    )
  }
 
}

  return (
      
      <body>
       <div className="container d-flex justify-content-center align-items-center min-vh-100">
  
      
  
         <div className="row border rounded-5 p-3 bg-white shadow box-area">
  
  
         <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
             <div className="featured-image mb-3">
              <img src="https://www.shutterstock.com/image-vector/santa-hat-600nw-209018503.jpg"alt="santaimg" className="img-fluid simg"/>
             </div>
             <p className="text-black fs-2 ss">Secret Santa</p>
         </div> 
  
      
          
         <div className="col-md-6 right-box">
            <div className="row align-items-center">
                  <div className="header-text mb-4">
                       <h2>Login</h2>
                  </div>
                  <div className="input-group mb-3">
                      <input type="email" name="email" value={user.email} onChange={handlechange} id="email" className="form-control form-control-lg bg-light fs-6" placeholder="Email address" required/>
                  </div>
                  <div className="input-group mb-3">
                      <input type="password" name="passwordi" value={user.passwordi} onChange={handlechange} className="form-control form-control-lg bg-light fs-6" placeholder="Password" required/>
                  </div>
                  <div className="input-group mb-3 bro">
                      <button className="text-black btn btn-lg btn-primary w-100 fs-6" onClick={login}>Login</button>
                  </div>
                  <Toaster />
            </div>
         </div> 
  
        </div>
      </div>
  
  </body>
  )
}

export default Login;