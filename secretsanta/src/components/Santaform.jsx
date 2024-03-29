import axios from 'axios'
import React, { useState } from 'react'
import './css/santaform.css'
import validator from 'validator'
import toast, { Toaster } from 'react-hot-toast';

const Santaform = () => {


  const url = new URL(window.location.href);
  const idi = url.pathname;
  const sidi = idi.slice(11);


  const inputs = document.querySelectorAll("#otfieldsanta input");

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

  const [Santa, setSanta] = useState({
    santaemails: "",
    ids: ""

  })
  const handlechange = e => {
    const { name, value } = e.target
    setSanta({
      ...Santa, [name]: value, ids: sidi
    })
  }
  const [Otp, setOtp] = useState("")
  const santaOtp = () => {
    const sse = document.getElementById('sswemail')
    sse.disabled = true;
    const bbs = document.getElementById('santaotpres')
    bbs.disabled = true;
    let otp_val = Math.floor((Math.random() * 900000) + 100000);
    setOtp(otp_val)
    const { santaemails } = Santa;
    const emu = santaemails;
    const valemail = validator.isEmail(emu)
    if (valemail === true) {
      const cred = { otp_val, emu }

      axios.post("http://localhost:9002/otpmailsanta", cred)
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
            }, 20000);
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
  const submit = () => {

    let validotp = "";
    inputs.forEach((input) => {
        validotp += input.value;
        // input.disabled = true;
        // input.classList.add("disabled");
    });

    const { santaemails, ids } = Santa
    if (santaemails && validotp == Otp) {
      axios.post(`http://localhost:9002/santasubmit`, Santa)
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
              window.location.href = `/empname?Data=${sidi}`;
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