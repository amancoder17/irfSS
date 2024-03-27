const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
var cron = require('node-cron');
const path = require('path')
const app = express();
const sendMail = require('./mail');
const sendOtpMail = require('./otpmail')
const bcrypt = require('bcrypt');
const PORT = process.env.PORT || 9002;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());


//connecting Database
// mongoose.connect('mongodb+srv://amanpanwarcs2019:9119Aman@cluster0.szdvs6c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
// .then(()=>{
//     console.log('DB connected');
// })
// .catch((err)=>{
//     console.log(err);
// })

mongoose.connect('mongodb://127.0.0.1:27017/secrets')
    .then(() => {
        console.log('DB connected');
    })
    .catch((err) => {
        console.log(err);
    })

const User = require('./models/user');
const Emp = require('./models/emp');



app.post('/login', async (req, res) => {
    try {
        const { email, passwordi } = req.body
        const conf = User.findOne({ email: email })
            .then((docs) => {
                if (docs === null) {
                    res.json({
                        isLoggedIn: false,
                    })
                }
                else {
                    checkUser(passwordi, docs.password)
                    async function checkUser(password, phash) {
                        const match = await bcrypt.compare(password, phash);

                        if (match) {
                            res.json({
                                isLoggedIn: match,

                                // Other relevant data for the React component
                            });
                        }
                        else {
                            res.json({
                                isLoggedIn: false,
                            })
                        }
                    }

                }
            })

    }
    catch (error) {
        console.log(error);
    }
})
const sse = [];


app.post('/santasubmit', async (req, res) => {
    const { santanames, santaemails, ids } = req.body
    // console.log(santaemails,santanames)
    const check = await Emp.findById(ids)
    const { santaname, santaemail } = check
    if (santaemails == check.email) {
        res.json({
            submit: false
        })
    }
    else {

        if (santaname === "" && santaemail === "") {

            const santassign = await Emp.findByIdAndUpdate(ids, { santaname: santanames, santaemail: santaemails })
                .then(santassign => {
                    if (santassign) {
                        const { email, firstname, lastname } = santassign
                        // console.log(santassign,santanames);

                        res.json({
                            tex: true,
                        })
                        // sse.push({santanames,email,firstname,lastname});
                        // console.log(sse)
                        sendMail({ santanames, email, firstname, lastname });
                        // res.send({message:"santa assigned",santassign})

                    }
                    else {
                        res.send({ message: "Wrong subbmission" })
                    }
                })
        }
        else {
            res.json({
                tex: false,
            })
        }

    }


})

// cron.schedule('59 01 * * *', () => {
//     for(let i=0;i<sse.length;i++)
//     {
//         sendMail(sse[i].santanames,sse[i].email,sse[i].firstname,sse[i].lastname);
//     }

//   });


app.get('/empname/:id', async (req, res) => {
    try {
        const name = await Emp.findById(req.params.id)
        res.json(name);
    } catch (e) {
        console.error(e);
    }
})

app.get('/empl', cors(), async (req, res) => {
    try {
        const empdata = await Emp.find()
        res.json(empdata)
    } catch (e) {
        console.error(e)
    }
})

app.delete('/empl/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await Emp.findByIdAndDelete(id)
    }
    catch (e) {
        console.error(e);
    }
})

app.patch('/empl/:id', async (req, res) => {
    try {
        const id = req.params.id;
        // const {firstname,lastname,email}=req.body
        await Emp.findByIdAndUpdate(id, req.body);
        res.send({ message: "updated user" })

    } catch (e) {
        console.log(e);
    }
})

app.post('/register', async (req, res) => {
    try {
        const count = await User.countDocuments()
        if(count<1)
        {
            const { name, email, password } = req.body
            const saltRound = 10;
            const hashpass = await bcrypt.hash(password, saltRound);
            const user = await User.create({
                name,
                email,
                password: hashpass,
            })
            res.send({ message: "admin created" })

        }
        else{
            res.json({
                count:false
            })
        }
       

    }
     catch (error) {
        console.log(error);
    }
});

app.post('/otpmail', (req, res) => {
    const { otp_val, emu } = req.body
    if (otp_val && emu) {
        sendOtpMail({ otp_val, emu })
        res.send({ message: "OTP sent" })
    }
    else {
        res.send({ message: "Unable to sent OTP" })
    }


})

app.post('/resetotpmail', async (req, res) => {
    const { otp_val, emu } = req.body
    if (otp_val && emu) {
        const mila = await User.findOne({ email: emu })
            .then((resp) => {
                if (resp === null) {
                    res.json({
                        find: false
                    })
                }
                else {
                    sendOtpMail({ otp_val, emu })
                    res.send({ message: "OTP sent" })

                }

            })

    }
    else {
        res.send({ message: "Unable to sent OTP" })
    }


})
app.post('/reset', async (req, res) => {
    const { email, passwordi } = req.body
    const saltRound = 10;
    const hashpass = await bcrypt.hash(passwordi, saltRound);
    const badla = await User.findOneAndUpdate({ email: email }, { password: hashpass })
        .then((chabi) => {
            res.send({ message: "password Updated" })

        })
})

app.post('/emplist', async (req, res) => {

    const { firstname, lastname, email } = req.body
    const fin = await Emp.findOne({ email: email })
        .then((final) => {
            if (final === null) {



                const emp = new Emp({
                    firstname,
                    lastname,
                    email,
                    santaname: "",
                    santaemail: ""
                })
                emp.save()
                    .then(
                        res.json({
                            ans: false
                        }))




            }
            else {
                res.json({
                    ans: true
                })
            }

        })
})

// console.log(process.env);


app.listen(PORT, () => {
    console.log("server is up at port", PORT);
})
