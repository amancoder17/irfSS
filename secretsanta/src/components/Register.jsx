import React, { useState } from "react";
import './css/register.css';
import validator from 'validator'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {

  // React router function to navigate through pages
  const navigate = useNavigate();

  // React hook to set user 
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  })






// Selects the div all otfield's input  
  const inputs = document.querySelectorAll("#otfield input");


  inputs.forEach((input, index) => {
      input.dataset.index = index;
      input.addEventListener("keyup", handleOtp);//  event listner which moves to next block on enetering value 
      input.addEventListener("paste", handleOnPasteOtp);  // event listener which handels the paste function 
  });
  
  // otp function which handels otp on entering values in blocks.
  function handleOtp(e) {
      const input = e.target;    
      let value = input.value;   // input value of block which we enter
      let isValidInput = value.match(/[0-9a-z]/gi);   // check fo validating input is it lies b/w 0 to 9 or a to z. 
      input.value = "";
      input.value = isValidInput ? value[0] : "";    // ternary operator if valid input it assigns with the value in input block otherwise blank string assigned to it.
  
      let fieldIndex = input.dataset.index;        // get the index of input
      if (fieldIndex < inputs.length - 1 && isValidInput) {        // if condition to jump on to next block automaticaly after entering value in it.
          input.nextElementSibling.focus();
      }
  
      if (e.key === "Backspace" && fieldIndex > 0) {     // if condition when we click on backspace
          input.previousElementSibling.focus();
      }
  }

  // function for pasting otp from clipboard to input blocks
  function handleOnPasteOtp(e) {
    const data = e.clipboardData.getData("text");   // gets the copied text data from clipboard and store it in const
    const value = data.split("");   // splits the value sepreatly of the copied data
    if (value.length === inputs.length) {    // checks that the length of value is equal to no of coloumns for otp
        inputs.forEach((input, index) => (input.value = value[index]));   // assigns each value to each box of otp
    }
}















  // function to handle changes in input field 
  const handlechange = (e) => {
    e.preventDefault();
    const { name, value } = e.target
    setUser({
      ...user, [name]: value
    })
  }

  // Hook state to set alert message when we enter email
  const [message, setMessage] = useState("");

  // Hook state to set password alert when we enter password
  const [pass, setpass] = useState("");


  // Hook state to store confirmed password
  const [confirmv, setConfirmv] = useState("");


  // function that handels changes in input when we enter email
  const handlechangeemail = (e) => {
    e.preventDefault();
    let new_Email = e.target.value;
    const { name, value } = e.target
    setUser({
      ...user, [name]: value
    })
    if (!validator.isEmail(new_Email)) {
      setMessage("Please, enter a valid email!");
    } else {
      setMessage("");

    }

  }

  // handels the changes in input of change password
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


  //handles the changes in input of confirm password 
  const handlechangepassconfirm = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    setConfirmv(inputValue)
  }

// hook to set otp 
  const [Otp, setOtp] = useState("")

  //  function to generate otp and handle sbmission and otp changes
  const otp = () => {
    const resenbt = document.getElementById('resendo');   // In starting the resend  button is disabeled
    resenbt.disabled = true;                             
    let otp_val = Math.floor((Math.random() * 900000) + 100000);   // method to generate a 6 digit otp
    setOtp(otp_val)    // generated otp is set to otp using setotp.
    const edis = document.getElementById('email')            // disabled the email input field after generating otp.
    edis.disabled = true;
    const ndis = document.getElementById('inname')             // disabled the name input field after generating otp.
    ndis.disabled = true;


    const emu = user.email;                     // stores the user email in emu
    const { name, password } = user                       // calls name and password from user
    const valemail = validator.isEmail(emu)           // checks that validates the entered email is valid or not
    if (valemail === true && password.length > 6 && name !== "" && password === confirmv) {   // if condition to validate and then send otp 
      setTimeout(() => {
        document.getElementById('resendo').disabled = null;                 // resend otp btn disabled for 20 seconds
      }, 20000);
      const pdis = document.getElementById('inpass')
      pdis.disabled = true;                                      // disabled paswoord input field
      const cpdis = document.getElementById('inpasscon')            
      cpdis.disabled = true;                                    // disabled password confirm field after otp generation
      const cred = { otp_val, emu }
      document.getElementById('resendo').style.display = 'block'
      document.getElementById('otfield').style.display = 'block';
      document.getElementById('oootpbtn').style.display = 'none';
      document.getElementById('rgbtn').style.display = 'block';

      axios.post(`${process.env.REACT_APP_ROUTE_KEY}/otpmail`, cred)      // post request to send otp for registration
        .then(res => console.log(res))

      toast('OTP sent to Email', {
        style: {
          background: 'green',
          color: 'white'
        }
      })
    }
    else if (password !== confirmv) {
      toast('Re-enter correct password', {
        style: {
          background: 'red',
          color: 'white'
        }
      })
    }
    else {
      toast('Enter your Details Correctly', {
        style: {
          background: 'red',
          color: 'white'
        }
      })
    }

  }


  // function to register user when we click on register button 
  const register = () => {
    

    let validotp = "";
    inputs.forEach((input) => {
        validotp += input.value;                             // set valid otp from entered inputs in blocks
        // input.classList.add("disabled");
    });




    const { name, email, password } = user
    const valemail = validator.isEmail(email)
    if (name && valemail && password.length > 6 && validotp == Otp) {          // check with various conditions
      axios.post(`${process.env.REACT_APP_ROUTE_KEY}/register`, user)          // Post request to register admin 
        .then((res) => {
          if (res.data.count === false) {          // check is maximum users limit reached or not
            toast('Maximum User Limit Reached', {
              style: {
                background: 'red',
                color: 'white'
              }
            });
          }
          else {
            console.log(res)
            navigate('/')
          }
        })


    }
    else {
      toast('Fill all the Details Correctly', {
        style: {
          background: 'red',
          color: 'white'
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
              <img src="https://www.shutterstock.com/image-vector/santa-hat-600nw-209018503.jpg" alt="santaimg" className="img-fluid simg" />
            </div>
            <p className="text-black fs-2 ss">Secret Santa</p>
          </div>



          <div className="col-md-6 right-box">
            <div className="row align-items-center">
              <div className="header-text mb-4">
                <h2>Register</h2>
              </div>
              <div style={{ color: "red" }}> {message} </div>
              <div className="input-group mb-3">
                <input type="email" name="email" value={user.email} onChange={handlechangeemail} id="email" className="form-control form-control-lg bg-light fs-6" placeholder="Email address" required />
              </div>
              <div className="input-group mb-3">
                <input type="text" name="name" value={user.name} onChange={handlechange} id="inname" className="form-control form-control-lg bg-light fs-6" placeholder="Name" required />
              </div>
              <div className="mb-3" style={{ color: "red" }}> {pass} </div>
              <div className="input-group mb-3">
                <input type="password" name="password" value={user.password} id="inpass" maxLength="10" onChange={handlechangepass} className="form-control form-control-lg bg-light fs-6" placeholder="Password" required />
              </div>
              <div className="input-group mb-3">
                <input type="password" name="confirmpassword" value={confirmv} id="inpasscon" maxLength="10" onChange={handlechangepassconfirm} className="form-control form-control-lg bg-light fs-6" placeholder="Confirm Password" required />
              </div>
              <div class="input-group mb-1 otp-field" id="otfield">
                <input type="text" maxlength="1" />
                <input type="text" maxlength="1" />
                <input class="space" type="text" maxlength="1" />
                <input type="text" maxlength="1" />
                <input type="text" maxlength="1" />
                <input type="text" maxlength="1" />
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