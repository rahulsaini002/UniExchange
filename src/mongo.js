const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/LoginFormPractice")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    rno:{
        type:String,
        required:true
    },
    pno:{
        type:String,
        required:true
    },
    department: {
        type: String, 
        required: true,
        enum: ['CSE', 'ECE', 'ME'] 
    },
    hostel: {
        type: String, 
        required: true,
        enum: ['A', 'B', 'C'] 
    },
    password:{
        type:String,
        required:true
    }
})

const productSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
    },
})

const Product = new mongoose.model('products',productSchema)
const LogInCollection=new mongoose.model('LogInCollection',logInSchema)

module.exports = {LogInCollection, Product}