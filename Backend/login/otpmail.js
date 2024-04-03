const nodemailer = require("nodemailer");

async function sendOtpMail(formData)
{
    const transporter= nodemailer.createTransport({
         service:'gmail',
         auth:{
             user:'amankeenable@gmail.com',
             pass:'vvnlpdyidktwuklt'
         }
     })
 
     const mailOptions = {
         from: 'amankeenable@gmail.com',
         to:formData.emu,
         subject:'Secret Santa OTP',
         text:`Your OTP for Secret Santa is ${formData.otp_val}`,
     }
 
     try {
        const result= await transporter.sendMail(mailOptions)
        console.log('OTP email sent')
     } catch (error) {
         console.log(error);
     }
 }
 // Export send otp mail function
 module.exports = sendOtpMail;