import React, { useState } from "react";
import './css/login.css';
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import validator from 'validator'
import { useNavigate } from "react-router-dom";
const Login = () => {
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


  const [validotp, setvalidotp] = useState("")
  const handlechangeOtp = (o) => {
    o.preventDefault();
    setvalidotp(o.target.value)
  }

  const forgot = () => {
    document.getElementById('logindiv').style.display = 'none';
    document.getElementById('forgetdiv').style.display = 'block';
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

      axios.post("http://localhost:9002/resetotpmail", cred)
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
            const fdise=document.getElementById('foremail');
            fdise.disabled=true;
            document.getElementById('oootp').style.display = 'block';
            document.getElementById('sotpbtn').style.display = 'none';
            document.getElementById('cpbtn').style.display = 'block';
            document.getElementById('psinput').style.display = 'block';
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
    const emu = user.email;
    const valemail = validator.isEmail(emu)
    if (valemail===true && user.passwordi.length > 6 && Otp == validotp) {
      axios.post("http://localhost:9002/reset", user)
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
      axios.post("http://localhost:9002/login", user)
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
              <a className="text-center" id="forget" onClick={forgot}>Forgotten password?</a>


            </div>
            <div className="row align-items-center" id="forgetdiv">
              <div className="header-text mb-4">
                <h2>Forgot Password</h2>
              </div>
              <div className="input-group mb-3">
                <input type="email" name="email" value={user.email} onChange={handlechange} id="foremail" className="form-control form-control-lg bg-light fs-6" placeholder="Email address" required />
              </div>
              <div className="input-group mb-3">
                <input type="text" name="otp" value={validotp} onChange={handlechangeOtp} id="oootp" maxLength="6" className="form-control form-control-lg bg-light fs-6 " placeholder="OTP" required />
              </div>
              <div className="mb-3" style={{ color: "red" }}> {pass} </div>
              <div className="input-group mb-3">
                <input type="password" name="passwordi" value={user.passwordi} onChange={handlechangepass} id="psinput" className="form-control form-control-lg bg-light fs-6" placeholder="New Password" required />
              </div>
              <div className="input-group mb-3 bro">
                <button className="text-black btn btn-lg btn-primary w-100 fs-6" id="sotpbtn" onClick={forgotOtp}>Send OTP</button>
              </div>
              <div className="input-group mb-3 bro">
                <button className="text-black btn btn-lg btn-primary w-100 fs-6" id="cpbtn" onClick={changepassword}>Change Password</button>
              </div> <br />
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