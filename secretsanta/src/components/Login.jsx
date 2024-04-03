import React, { useState } from "react";
import './css/login.css';
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import validator from 'validator'
import { useNavigate } from "react-router-dom";
const Login = () => {


  const inputs = document.querySelectorAll("#otfieldfor input");

  inputs.forEach((input, index) => {
      input.dataset.index = index;
      input.addEventListener("keyup", handleOtp);
      input.addEventListener("paste", handleOnPasteOtp);
  });
  
  function handleOtp(e) {
      const input = e.target;
      let value = input.value;
      let isValidInput = value.match(/[0-9a-z]/gi);
      input.value = "";
      input.value = isValidInput ? value[0] : "";
  
      let fieldIndex = input.dataset.index;
      if (fieldIndex < inputs.length - 1 && isValidInput) {
          input.nextElementSibling.focus();
      }
  
      if (e.key === "Backspace" && fieldIndex > 0) {
          input.previousElementSibling.focus();
      }
  }
  function handleOnPasteOtp(e) {
    const data = e.clipboardData.getData("text");
    const value = data.split("");
    if (value.length === inputs.length) {
        inputs.forEach((input, index) => (input.value = value[index]));
    }
}



  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    passwordi: ""
  })

  const handlechange = e => {
    const { name, value } = e.target
    setUser({
      ...user, [name]: value
    })
  }

  const [pass, setpass] = useState("");
  const handlechangepass = (e) => {
    e.preventDefault();
    let new_pass = e.target.value;
    const { name, value } = e.target
    setUser({
      ...user, [name]: value
    })
    if (new_pass.length < 7) {
      setpass("Please, enter a valid Password of minimum length 7");
    } else {
      setpass("");

    }

  }

  const forgot = () => {
    document.getElementById('logindiv').style.display = 'none';
    document.getElementById('forgetdiv').style.display = 'block';
    const resbtn= document.getElementById('resend');
    resbtn.disabled=true;
  }

  const logins = () => {
    document.getElementById('forgetdiv').style.display = 'none';
    document.getElementById('logindiv').style.display = 'block';
  }

 


  const [Otp, setOtp] = useState("")
  const forgotOtp = () => {
    let otp_val = Math.floor((Math.random()*900000)+100000);
    setOtp(otp_val)
    const emu = user.email;
    const valemail = validator.isEmail(emu)
    if (valemail === true) {
      
      const cred = { otp_val, emu }

      axios.post(`${process.env.REACT_APP_ROUTE_KEY}/resetotpmail`, cred)
        .then((res) => {
          if (res.data.find === false) {
            toast('User Not Found', {
              style: {
                background: 'red',
                color: 'white'
              }
            })
          }
          else {
            setTimeout(() => {
              document.getElementById('resend').disabled=null;
            }, 20000);
            const resbtn=document.getElementById('resend')
            resbtn.style.display='block';
            const fdise=document.getElementById('foremail');
            fdise.disabled=true;
            document.getElementById('hidh').style.display='block';
            document.getElementById('sotpbtn').style.display = 'none';
            document.getElementById('cpbtn').style.display = 'block';
            document.getElementById('psinput').style.display = 'block';
            document.getElementById('otfieldfor').style.display='block';
            toast('OTP sent to Email', {
              style: {
                background: 'green',
                color: 'white'
              }
            })
          }
        })

    }
    else {
      toast('Enter your correct Email', {
        style: {
          background: 'red',
          color: 'white'
        }
      })
    }

  }
  const changepassword = () => {


    let validotp = "";
    inputs.forEach((input) => {
        validotp += input.value;
    });



    const emu = user.email;
    const valemail = validator.isEmail(emu)
    if (valemail===true && user.passwordi.length > 6 && Otp == validotp) {
      axios.post(`${process.env.REACT_APP_ROUTE_KEY}/reset`, user)
        .then(res => console.log(res))
        .then(navigate(0))
        .then(
          toast('Password Updated',{
            style:{
              background:'green',
              color:'white'
            }
           })
        )
    }
    else{
      toast('Enter Correct Details', {
        style: {
          background: 'red',
          color: "white"
        }
      });
    }
  }

  const login = () => {


    if (user.email === "" || user.passwordi === "") {
      toast('Enter Email and Password', {
        style: {
          background: 'red',
          color: "white"
        }
      });
    }
    else {
      axios.post(`${process.env.REACT_APP_ROUTE_KEY}/login`, user)
        .then((res) => {
          if (res.data.isLoggedIn === true) {
            localStorage.setItem('log', true)
            navigate('/home')

            // alert("ok h");
          }
          else if (res.data.isLoggedIn === false) {
            toast('Wrong Email or Password', {
              style: {
                background: 'red',
                color: "white",

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
              <img src="https://www.shutterstock.com/image-vector/santa-hat-600nw-209018503.jpg" alt="santaimg" className="img-fluid simg" />
            </div>
            <p className="text-black fs-2 ss">Secret Santa</p>
          </div>



          <div className="col-md-6 right-box">
            <div className="row align-items-center" id="logindiv" >
              <div className="header-text mb-4">
                <h2>Login</h2>
              </div>
              <div className="input-group mb-3">
                <input type="email" name="email" value={user.email} onChange={handlechange} id="email" className="form-control form-control-lg bg-light fs-6" placeholder="Email address" required />
              </div>
              <div className="input-group mb-3">
                <input type="password" name="passwordi" value={user.passwordi} onChange={handlechange} className="form-control form-control-lg bg-light fs-6" placeholder="Password" required />
              </div>
              <div className="input-group mb-3 bro">
                <button className="text-black btn btn-lg btn-primary w-100 fs-6" onClick={login}>Login</button>
              </div> <br />
              <a className="text-center" id="forget" onClick={forgot}>Forgotten password? </a>


            </div>
            <div className="row align-items-center" id="forgetdiv">
              <div className="header-text mb-4">
                <h2>Forgot Password </h2>
              </div>
              <div className="input-group mb-3">
                <input type="email" name="email" value={user.email} onChange={handlechange} id="foremail" className="form-control form-control-lg bg-light fs-6" placeholder="Email address" required />
              </div>
              <div className="mb-3" style={{ color: "red" }}> {pass} </div>
              <div className="input-group mb-3">
                <input type="password" name="passwordi" value={user.passwordi} onChange={handlechangepass} id="psinput" maxLength="10" className="form-control form-control-lg bg-light fs-6" placeholder="New Password" required />
              </div>
              <h4 className="text-center" id="hidh">OTP</h4>
              <div class="input-group mb-1 otp-field" id="otfieldfor">
                <input type="text" maxlength="1" />
                <input type="text" maxlength="1" />
                <input class="space" type="text" maxlength="1"/>
                <input type="text" maxlength="1" />
                <input type="text" maxlength="1" />
                <input type="text" maxlength="1" />
              </div>
              <div className="input-group mb-3 bro">
                <button className="text-black btn btn-lg btn-primary w-100 fs-6" id="sotpbtn" onClick={forgotOtp}>Send OTP</button>
              </div>
              <div className="input-group mb-3 bro">
                <button className="text-black btn btn-lg btn-primary w-100 fs-6" id="cpbtn" onClick={changepassword}>Change Password</button>
              </div>
              <div className="input-group mb-3 bro">
                <button className="text-black btn btn-lg btn-primary w-50 fs-6 " id="resend" onClick={forgotOtp}>Resend OTP</button>
              </div>
              <a className="text-center" id="logoi" onClick={logins}>Login</a>
            </div>
          </div>
          <Toaster />
        </div>
      </div>

    </body>
  )
}

export default Login;