const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    userId:{
        type:String,
        

    },
    username:{
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true,

    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        max:50,

    },
    password:{
        type:String,
        required:true,
        min:8,
    },
    isAvatarImageSet :{
        type:Boolean,
        default:false,
    },
    avatarImage:{
        type:String,
        default:"",
    },
    height:{
        type:String,
        default:""
    },
    weight:{
        type:String,
        default:''
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isDoctor:{
        type:Boolean,
        default:false
    },
    notification:{
        type:Array,
        default:[]
    },
    seennotification:{
        type:Array,
        default:[]
    },
   

})

const userModel=mongoose.model('users',userSchema)

module.exports=userModel;