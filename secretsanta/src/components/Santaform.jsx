import axios from 'axios'
import React, { useState } from 'react'
import './css/santaform.css'
import validator from 'validator'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Santaform = () => {

  //navigate function from react router to navigate through diffrent pages
  const navigate= useNavigate();

  const url = new URL(window.location.href);       // read entire url from browser window
  const idi = url.pathname;                        //pathname assigned to idi
  const sidi = idi.slice(11);                         // slice up only individual user id from path name


  const inputs = document.querySelectorAll("#otfieldsanta input");        // selects all the inputs of div with id otfieldsanta

  inputs.forEach((input, index) => {
      input.dataset.index = index;
      input.addEventListener("keyup", handleOtp);             // event listener function that will key up to next place as we enter a value in it
      input.addEventListener("paste", handleOnPasteOtp);      // event listener to paste the entire otp from clipboard 
  });
  
  function handleOtp(e) {
      const input = e.target;                            
      let value = input.value;               // takes the input value from the blocks
      let isValidInput = value.match(/[0-9a-z]/gi);            // validating entered otp field value
      input.value = "";
      input.value = isValidInput ? value[0] : "";
  
      let fieldIndex = input.dataset.index;
      if (fieldIndex < inputs.length - 1 && isValidInput) {         
          input.nextElementSibling.focus();                       // cursor moves to next block
      }
  
      if (e.key === "Backspace" && fieldIndex > 0) {
          input.previousElementSibling.focus();                    // cursor moves to previous block on clicking backspace.
      }
  }

  // functions when we paste otp from clipboard

  function handleOnPasteOtp(e) {
    const data = e.clipboardData.getData("text");  // gets the copied text data from clipboard and store it in const 
    const value = data.split("");                  //splits the value sepreatly of the copied data
    if (value.length === inputs.length) {           //checks that the length of value is equal to no of coloumns for otp
        inputs.forEach((input, index) => (input.value = value[index]));  //assigns each value to each box of otp
    }
}


// hook to set santa
  const [Santa, setSanta] = useState({
    santaemails: "",
    ids: ""

  })
  // function to set values in santa 
  const handlechange = e => {
    const { name, value } = e.target
    setSanta({
      ...Santa, [name]: value, ids: sidi
    })
  }

  //hook to set otp
  const [Otp, setOtp] = useState("")

  // function to handle otp generation and and send otp to mail
  const santaOtp = () => {
    const sse = document.getElementById('sswemail')
    sse.disabled = true;
    const bbs = document.getElementById('santaotpres')
    bbs.disabled = true;
    let otp_val = Math.floor((Math.random() * 900000) + 100000);       // otp genteration of 6 digits
    setOtp(otp_val)       // set otp using setotp
    const { santaemails } = Santa;             // fetch santa email from santa 
    const emu = santaemails;
    const valemail = validator.isEmail(emu)
    if (valemail === true) {
      const cred = { otp_val, emu }           // store otp_val and santa email into cred

      axios.post(`${process.env.REACT_APP_ROUTE_KEY}/otpmailsanta`, cred)      // post api request to send otp to validate email of assignee
        .then((res) => {
          if (res.data.find === false) {
            toast('Not a Valid employee of Keenable', {
              style: {
                background: 'red',
                color: 'white'
              }
            })
          }
          else {
            setTimeout(() => {
              document.getElementById('santaotpres').disabled = null;
            }, 20000);               // santa resend button active after 20 seconds.
            document.getElementById('santsub').style.display = 'block';
            document.getElementById('santaotp').style.display = 'none';
            document.getElementById('santaotpres').style.display = 'block';
            document.getElementById('otfieldsanta').style.display = 'block';
            
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


  // submit function when we click on submit
  const submit = () => {

    let validotp = "";
    inputs.forEach((input) => {
        validotp += input.value;          // store entered otp values in valid otp
        // input.disabled = true;
        // input.classList.add("disabled");
    });

    const { santaemails, ids } = Santa
    if (santaemails && validotp == Otp) {
      axios.post(`${process.env.REACT_APP_ROUTE_KEY}/santasubmit`, Santa)       // post request to submit santa with all details.
        .then((res) => {
          if (res.data.submit === false) {          
            toast('Reshuffle the QR', {
              style: {
                background: 'yellow'
              }
            });
          }
          else {
            if (res.data.tex === true) {
              localStorage.setItem('hogya', true)
              navigate(`/empname?Data=${sidi}`)      // navigate to next page of showemp name 
            }
            else if (res.data.cid === false) {
              toast('Not a valid Employee of Keenable', {
                style: {
                  background: 'red',
                  color: 'white'
                }
              });
            }
            else {
              toast('Form Already Submitted', {
                style: {
                  background: 'red',
                  color: 'white'
                }
              });
            }

          }

        })

    }
    else {
      toast('Please fill All the Details Correctly', {
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
                <h2>Jingle Bells..Jingle Bells</h2>
              </div>
              <div className="input-group mb-3">
                <input type="email" name="santaemails" value={Santa.santaemails} onChange={handlechange} id="sswemail" className="form-control form-control-lg bg-light fs-6" placeholder="Email address" required />
              </div>
              <div class="input-group mb-3 otp-field" id="otfieldsanta">
                <input type="text" maxlength="1" />
                <input type="text" maxlength="1" />
                <input class="space" type="text" maxlength="1" />
                <input type="text" maxlength="1" />
                <input type="text" maxlength="1" />
                <input type="text" maxlength="1" />
              </div>
              <div className="input-group mb-3 bro">
                <button className="text-black btn btn-lg btn-primary w-100 fs-6" id="santaotp" onClick={santaOtp}>Send OTP</button>
              </div>
              <div className="input-group mb-3 bro">
                <button className="text-black btn btn0 btn-lg btn-primary w-100 fs-6" id='santsub' onClick={submit}>Submit</button>
              </div>
              <div className="input-group mb-3 bro">
                <button className="text-black btn btn-lg btn-primary w-50 fs-6" id="santaotpres" onClick={santaOtp}>Resend OTP</button>
              </div>

              <Toaster />
            </div>
          </div>

        </div>
      </div>

    </body>
  )
}

export default Santaform