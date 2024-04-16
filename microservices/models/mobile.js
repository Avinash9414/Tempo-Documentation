const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const mobileSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }
},{timestamps:true});

const Mobile=mongoose.model('Mobile',mobileSchema);
module.exports=Mobile;