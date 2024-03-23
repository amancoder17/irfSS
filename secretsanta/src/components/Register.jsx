import React, { useState } from "react";
import './css/register.css';
import validator from 'validator'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const Register = () => {

const [user,setUser]= useState({
  name:"",
  email:"",
  password:""
})

const handlechange= (e) =>{
  e.preventDefault();
  const {name,value}=e.target
  setUser({
  ...user,[name]:value
  })
}
const [message, setMessage] = useState("");
const [pass, setpass] = useState("");

const handlechangeemail=(e)=>{
  e.preventDefault();
  let new_Email = e.target.value;
  const {name,value}=e.target
    setUser({
    ...user,[name]:value
    })
  if (!validator.isEmail(new_Email)) {
    setMessage("Please, enter a valid email!");
  } else {
    setMessage("");
    
  }

}

const handlechangepass=(e)=>{
  e.preventDefault();
  let new_pass = e.target.value;
  const {name,value}=e.target
    setUser({
    ...user,[name]:value
    })
  if (new_pass.length<6) {
    setpass("Please, enter a valid Password of minimum length 7");
  } else {
    setpass("");
    
  }

}

const register= ()=>{
  const {name,email,password}=user
  const valemail=validator.isEmail(email)
  if(name && valemail && password.length>6)
  {
    axios.post("http://localhost:9002/register",user)
    .then(res=> console.log(res))
    .then(window.location.replace('/'))
  }
  else{
    toast('Fill all the Details Correctly',{
      style:{
        background:'red',
        color:'white'
      }
    });
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
                       <h2>Register</h2>
                  </div>
                  <div style = {{ color: "red" }}> {message} </div>
                  <div className="input-group mb-3">
                      <input type="email" name="email" value={user.email} onChange={handlechangeemail} id="email" className="form-control form-control-lg bg-light fs-6" placeholder="Email address" required/>
                  </div>
                  <div className="input-group mb-3">
                      <input type="text" name="name" value={user.name} onChange={handlechange} className="form-control form-control-lg bg-light fs-6" placeholder="Name"/>
                  </div>
                  <div className="mb-3" style = {{ color: "red" }}> {pass} </div>
                  <div className="input-group mb-3">
                      <input type="password" name="password" value={user.password} onChange={handlechangepass} className="form-control form-control-lg bg-light fs-6" placeholder="Password"/>
                  </div>
                  <div className="input-group mb-3 bro">
                      <button className="text-black btn btn-lg btn-primary w-100 fs-6" onClick={register}>Register</button>
                  </div>
                  <Toaster />
            </div>
         </div> 
  
        </div>
      </div>
  
  </body>
  )
}

export default Register;