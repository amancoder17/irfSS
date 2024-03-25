import axios from 'axios'
import React, {useState } from 'react'
import './css/santaform.css'
import toast, { Toaster } from 'react-hot-toast';

const Santaform = () => {


    const url=new URL(window.location.href);
    const idi= url.pathname;
    const sidi= idi.slice(11);



    const [Santa,setSanta]= useState({
        santaname:"",
        santaemail:"",
        ids:""

      })
      const handlechange= e =>{
        const {name,value}=e.target
        setSanta({
        ...Santa,[name]:value,ids:sidi
        })
      }

      const submit= ()=>{
        const {santanames,santaemails,ids}=Santa
        if(santanames && santaemails)
        {
          axios.post(`http://localhost:9002/santasubmit`,Santa)
          .then((res)=>{
            if(res.data.submit===false)
            {
              toast('Reshuffle the QR',{
                style:{
                  background:'yellow'
                }
              });
            }
            else{
              if(res.data.tex===true){
                window.location.href=`/empname?Data=${sidi}`;
              }
              else
              {
                toast('Form Already Submitted',{
                  style:{
                    background:'red',
                    color:'white'
                  }
                });
              }

            }
           
          } )
          
        }
        else{
          toast('Please fill All the Details',{
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
                       <h2>Jingle Bells..Jingle Bells</h2>
                  </div>
                  <div className="input-group mb-3">
                      <input type="email" name="santaemails" value={Santa.email} onChange={handlechange} id="email" className="form-control form-control-lg bg-light fs-6" placeholder="Email address" required/>
                  </div>
                  <div className="input-group mb-3">
                      <input type="text" name="santanames" value={Santa.name} onChange={handlechange} className="form-control form-control-lg bg-light fs-6" placeholder="Name" required/>
                  </div>
                  <div className="input-group mb-3 bro">
                      <button className="text-black btn btn0 btn-lg btn-primary w-100 fs-6" onClick={submit}>Submit</button>
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