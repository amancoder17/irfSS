import React, { useState } from "react";
import './css/login.css';
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
    toast('Enter Name in Aplha letters only',{
      style:{
        background:'red'
      }
    });
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
            <h1 className="loghead">Register</h1>
          <div style = {{ color: "red" }}> {message} </div>
            <div className="mb-3 w-100 mx-auto p-2">
              <label for="exampleFormControlInput1" className="form-label">Email address</label>
              <input type="email" name="email" value={user.email} onChange={handlechangeemail} className="form-control inpq" placeholder="Enter your Email ID" id="email" aria-describedby="emailHelp" required/>
            </div>
            <div className="mb-3 w-100 mx-auto p-2">
              <label className="form-label">Name</label>
              <input type="text" name="name" className="form-control inpq" value={user.name} onChange={handlechange} placeholder="Enter your name" id="examplename" required/>
            </div>
            <div style = {{ color: "red" }}> {pass} </div>
            <div className="mb-3 w-100 mx-auto p-2">
              <label for="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" name="password" className="form-control inpq" value={user.password} onChange={handlechangepass} placeholder="Enter your Password" id="password" required/>
            </div>
            
            <div className="mb-3 mx-auto p-2 sbtn">
              <div className="btn btn-primary sub" onClick={register}>Register</div>
              <Toaster />
             
              
            </div>
          </form>
          
        </div>
      </div>
      
    </>
  )
}

export default Register;