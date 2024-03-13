const mongoose=require('mongoose')

const empSchema = new mongoose.Schema(
    {
        firstname:String,
        lastname:String,
        email:String,
        santaname:String,
        santaemail:String
    }
)

const Emp = mongoose.model('Emp',empSchema)
module.exports=Emp