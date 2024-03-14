const express= require('express');
const cors = require('cors')
const mongoose= require('mongoose');

const path =require('path')
const app= express();
const sendMail= require('./mail');
const bcrypt= require('bcrypt');
const PORT = process.env.PORT || 9002;
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors());
 
// app.use(express.static(path.join(__dirname, 'public')));
// app.get('/*', function (req, res) {
//    res.sendFile(path.join(__dirname, 'public', 'index.html'));
//  });

//connecting Database
mongoose.connect('mongodb+srv://amanpanwarcs2019:9119Aman@cluster0.szdvs6c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log('DB connected');
})
.catch((err)=>{
    console.log(err);
})

// mongoose.connect('mongodb://127.0.0.1:27017/secrets')
// .then(()=>{
//     console.log('DB connected');
// })
// .catch((err)=>{
//     console.log(err);
// })

const User = require('./models/user');
const Emp= require('./models/emp');



app.post('/login',async(req,res)=>{
    try {
   const {email,passwordi}= req.body
   const conf= User.findOne({email:email})
   .then((docs)=>{
               if(docs===null){
                res.json({
                    isLoggedIn:false,
                })
               }
               else{
                checkUser(passwordi,docs.password)
                async function checkUser(password,phash) {
                   const match = await bcrypt.compare(password,phash);
               
                   if(match) {
                       res.json({
                           isLoggedIn: match,
   
                           // Other relevant data for the React component
                       });
                   }
                   else{
                       res.json({
                           isLoggedIn:false,
                       })
                   }
               }
           
            }
   })
   
    } 
    catch (error)
    {
        console.log(error);
    }    
})


app.post('/santasubmit',async(req,res)=>{
    const {santanames,santaemails,ids}=req.body
    // console.log(santaemails,santanames)
    const check = await Emp.findById(ids)
        const {santaname,santaemail}=check
        if(santaname===""&&santaemail==="")
        {
            const santassign= await Emp.findByIdAndUpdate(ids,{santaname:santanames,santaemail:santaemails})
            .then(santassign=>{
                if(santassign)
                {
                    const {email,firstname,lastname}=santassign
                    // console.log(santassign,santanames);
                    sendMail({santanames,email,firstname,lastname});
                    res.json({
                        tex:true,
                    })
                    // res.send({message:"santa assigned",santassign})
                   
                }
                else
                {
                    res.send({message: "Wrong subbmission"})
                }
            })
        }
        else{
            res.json({
                tex:false,
            })
        }
    
    
})



app.get('/empname/:id',async(req,res)=>{
        try {
            const name= await Emp.findById(req.params.id)
            res.json(name);
        } catch (e) {
            console.error(e);
        }
    })

app.get('/empl',cors(),async(req,res)=>{
    try {
        const empdata= await Emp.find()
        res.json(empdata)
    } catch (e) {
        console.error(e)
    }
})

app.delete('/empl/:id',async(req,res)=>{
    try {
        const id= req.params.id;
        await Emp.findByIdAndDelete(id)
    }
     catch (e) {
        console.error(e);
    }
})

app.patch('/empl/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        await Emp.findByIdAndUpdate(id);

    } catch (e) {
        console.log(e);
    }   
})

app.post('/register',async(req,res)=>{
    try {
    const {name,email,password}= req.body
    const saltRound=10;
    const hashpass= await bcrypt.hash(password,saltRound);
    const user = await User.create({
                        name,
                        email,
                        password:hashpass,
                    })
                    res.send({message:"admin created"})
        
    } catch (error) {
        console.log(error);
    }    
});

 
app.post('/emplist',(req,res)=>{
    const {firstname,lastname,email}=req.body
    const emp= new Emp({
        firstname,
        lastname,
        email,
        santaname:"",
        santaemail:""
    })
    emp.save()
    .then(
        res.send({message:"Added"})
    )
})

// console.log(process.env);


app.listen(PORT,()=>{
    console.log("server is up at port",PORT);
})
