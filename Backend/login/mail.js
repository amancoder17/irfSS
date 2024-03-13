const nodemailer = require("nodemailer");

async function sendMail(formData){
   const transporter= nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'amankeenable@gmail.com',
            pass:'vvnlpdyidktwuklt'
        }
    })

    const mailOptions = {
        from: 'amankeenable@gmail.com',
        to:formData.email,
        subject:'Thank your Secret Santa for auspicious gift ',
        text:`Hloo ${formData.firstname} ${formData.lastname}, your secret santa on this christmas is ${formData.santanames}`,
    }

    try {
       const result= await transporter.sendMail(mailOptions)
       console.log('email sent')
    } catch (error) {
        console.log(error);
    }
}
module.exports = sendMail;