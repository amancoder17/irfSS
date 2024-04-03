import React, { useState } from "react";
import './css/login.css';
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import validator from 'validator'
import { useNavigate } from "react-router-dom";
const Login = () => {

  const navigate = useNavigate();

  const inputs = document.querySelectorAll("#otfieldfor input");  // selects the all input in id > otfieldfor and stores in as inputs 

  // for each coloumn of OTP handless events of keyup and paste 
  inputs.forEach((input, index) => {
    input.dataset.index = index;
    input.addEventListener("keyup", handleOtp);   // handle the keyup on entering values singely of OTP
    input.addEventListener("paste", handleOnPasteOtp); // handle the event of pasteing complete otp directly
  });

  // handle otp function
  function handleOtp(e) {
    const input = e.target;          //get the target in input
    let value = input.value;          // get the value from input

    let isValidInput = value.match(/[0-9a-z]/gi);   // check that entered value is from 0 to 9 and a to z
    input.value = "";
    input.value = isValidInput ? value[0] : "";   // if the is valid input then it sets it value to value[0] if not then assigns an empty string to it.

    let fieldIndex = input.dataset.index;             // get the index of input coloumn
    if (fieldIndex < inputs.length - 1 && isValidInput) {   // checks the field index is it less then the length of inputs and it is a valid input according to input check
      input.nextElementSibling.focus();    // them cursor moves to next sibling automaticly
    }

    if (e.key === "Backspace" && fieldIndex > 0) {  //if we click backspace and field index is greater than 0.
      input.previousElementSibling.focus(); // then it moves to previous block.
    }
  }


  // function to handle on pasting the otp.
  function handleOnPasteOtp(e) {
    const data = e.clipboardData.getData("text");   // gets the copied text data from clipboard and store it in const 
    const value = data.split("");    // splits the value sepreatly of the copied data
    if (value.length === inputs.length) {     // checks that the length of value is equal to no of coloumns for otp
      inputs.forEach((input, index) => (input.value = value[index]));   // assigns each value to each box of otp
    }
  }



  
  //Hook to set user state for login page
  const [user, setUser] = useState({
    email: "",
    passwordi: ""
  })

  // function to handle changes in input field 
  const handlechange = e => {
    const { name, value } = e.target
    setUser({
      ...user, [name]: value
    })
  }

  // Hook state to set password
  const [pass, setpass] = useState("");

  // function to handle reset password changes
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

  // function when we click on forgot password
  const forgot = () => {
    document.getElementById('logindiv').style.display = 'none';
    document.getElementById('forgetdiv').style.display = 'block';
    const resbtn = document.getElementById('resend');
    resbtn.disabled = true;
  }

  // function when we click on login from forget password page
  const logins = () => {
    document.getElementById('forgetdiv').style.display = 'none';
    document.getElementById('logindiv').style.display = 'block';
  }




  // state used for setting the otp when generated
  const [Otp, setOtp] = useState("")

  // function when we click on send otp on fogot password page
  const forgotOtp = () => {
    let otp_val = Math.floor((Math.random() * 900000) + 100000);   // method to generate 6 Digit otp
    setOtp(otp_val)    // set the generated otp in state
    const emu = user.email;
    const valemail = validator.isEmail(emu)     //check for is entered email is valid or not using npm validator
    if (valemail === true) {

      const cred = { otp_val, emu }  
// POST request to send reset otp mail
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
              document.getElementById('resend').disabled = null;    // function to enable resend otp button after 20 sec
            }, 20000);        
            const resbtn = document.getElementById('resend') 
            resbtn.style.display = 'block';
            const fdise = document.getElementById('foremail');
            fdise.disabled = true;
            document.getElementById('hidh').style.display = 'block';
            document.getElementById('sotpbtn').style.display = 'none';
            document.getElementById('cpbtn').style.display = 'block';
            document.getElementById('psinput').style.display = 'block';
            document.getElementById('otfieldfor').style.display = 'block';
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

  // function for change password button
  const changepassword = () => {


    let validotp = "";
    inputs.forEach((input) => {
      validotp += input.value;       // set valid OTP from input value which ve enter in blocks of OTP 
    });       



    const emu = user.email;
    const valemail = validator.isEmail(emu)
    if (valemail === true && user.passwordi.length > 6 && Otp == validotp) {  // check conditions for change password is they are valid 
      //Post request for change password
      axios.post(`${process.env.REACT_APP_ROUTE_KEY}/reset`, user)
        .then(res => console.log(res))
        .then(navigate(0))
        .then(
          toast('Password Updated', {
            style: {
              background: 'green',
              color: 'white'
            }
          })
        )
    }
    else {
      toast('Enter Correct Details', {
        style: {
          background: 'red',
          color: "white"
        }
      });
    }
  }


  // Function call for login 
  const login = () => {

//check 1: if email and password is empty
    if (user.email === "" || user.passwordi === "") {
      toast('Enter Email and Password', {
        style: {
          background: 'red',
          color: "white"
        }
      });
    }
    else {
      //POST Request for login which goes with credentials in body
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
                <input class="space" type="text" maxlength="1" />
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