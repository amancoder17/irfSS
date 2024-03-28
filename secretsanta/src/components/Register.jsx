import React, { useState } from "react";
import './css/register.css';
import validator from 'validator'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {

  const navigate=useNavigate();

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

const[confirmv,setConfirmv]=useState("");

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
  if (new_pass.length<7) {
    setpass("Please, enter a valid Password of minimum length 7");
  } else {
    setpass("");
    
  }

}


const handlechangepassconfirm=(e)=>{
e.preventDefault();
const inputValue= e.target.value;
setConfirmv(inputValue)
}


const[validotp,setvalidotp]=useState("")
const handlechangeOtp=(o)=>{
  o.preventDefault();
  setvalidotp(o.target.value)
}
// console.log(validotp)


const [Otp,setOtp]=useState("")

const otp=()=>{
  const resenbt= document.getElementById('resendo');
resenbt.disabled=true;
   let otp_val=Math.floor((Math.random()*900000)+100000);
   setOtp(otp_val)
   const edis=document.getElementById('email')
    edis.disabled=true;
    const ndis=document.getElementById('inname')
    ndis.disabled=true;
    

   const emu=user.email;
   const {name,password}=user
   const valemail=validator.isEmail(emu)
   if(valemail===true && password.length>6 && name!=="" && password===confirmv){
    setTimeout(() => {
      document.getElementById('resendo').disabled=null;
    }, 20000);
    const pdis=document.getElementById('inpass')
    pdis.disabled=true;
    const cpdis=document.getElementById('inpasscon')
    cpdis.disabled=true;
    const cred = {otp_val,emu}
    document.getElementById('resendo').style.display='block'
    document.getElementById('oootp').style.display = 'block';
    document.getElementById('oootpbtn').style.display='none';
    document.getElementById('rgbtn').style.display='block';
    
    axios.post("http://localhost:9002/otpmail",cred)
   .then(res=>console.log(res))

   toast('OTP sent to Email',{
    style:{
      background:'green',
      color:'white'
    }
   })
   }
   else if(password!==confirmv){
    toast('Re-enter correct password',{
      style:{
        background:'red',
        color:'white'
      }
     })
   }
   else{
    toast('Enter your Details Correctly',{
      style:{
        background:'red',
        color:'white'
      }
     })
   }
   
}

const register= ()=>{
  const {name,email,password}=user
  const valemail=validator.isEmail(email)
  if(name && valemail && password.length>6 && validotp==Otp)
  {
    axios.post("http://localhost:9002/register",user)
    .then((res)=>{
      if(res.data.count===false)
      {
        toast('Maximum User Limit Reached',{
          style:{
            background:'red',
            color:'white'
          }
        });
      }
      else{
        console.log(res)
        navigate('/')
      }
    })
    
    
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
                      <input type="text" name="name" value={user.name} onChange={handlechange} id="inname" className="form-control form-control-lg bg-light fs-6" placeholder="Name" required/>
                  </div>
                  <div className="mb-3" style = {{ color: "red" }}> {pass} </div>
                  <div className="input-group mb-3">
                      <input type="password" name="password" value={user.password} id="inpass" maxLength="10" onChange={handlechangepass} className="form-control form-control-lg bg-light fs-6" placeholder="Password" required/>
                  </div>
                  <div className="input-group mb-3">
                      <input type="password" name="confirmpassword" value={confirmv} id="inpasscon" maxLength="10" onChange={handlechangepassconfirm} className="form-control form-control-lg bg-light fs-6" placeholder="Confirm Password" required/>
                  </div>
                  <div className="input-group mb-3">
                      <input type="text" name="otp" value={validotp} onChange={handlechangeOtp} id="oootp" maxLength="6" className="form-control form-control-lg bg-light fs-6 "  placeholder="OTP" required/>
                  </div>

                  <div className="input-group mb-3 bro">
                      <button className="text-black btn btn-lg btn-primary w-100 fs-6" id="oootpbtn" onClick={otp}>Generate OTP</button>
                  </div> <br />
                  <div className="input-group mb-3 bro">
                      <button className="text-black btn btn-lg btn-primary w-100 fs-6" id="rgbtn" onClick={register}>Register</button>
                  </div>
                  <div className="input-group mb-3 bro">
                <button className="text-black btn btn-lg btn-primary w-50 fs-6 " id="resendo" onClick={otp}>Resend OTP</button>
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