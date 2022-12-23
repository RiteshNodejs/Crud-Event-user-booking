import mongoose from "mongoose";
import { Schema } from "mongoose";
import {nanoid} from "nanoid";
import bcrypt from "bcrypt"
const userSchema =new Schema({
    _id:{
        type:String,
        default:()=>nanoid()
    },
    firstName:{
        type:String,
        required:false
    },
    lastName:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:false
    },
    password:{
        type:String,
        required:false
    },
    role:{
        type:String,
        enum:{admin:'admin',manager:'manager',user:'user'},
        required:true 
    }

},{timestamps:true})

userSchema.pre("save", async function (next) {
    try {
      const salt = await bcrypt.genSalt(12)
      const passwordhash = await bcrypt.hash(this.password, salt);
      this.password = passwordhash
      next();
    }
    catch(error) {
     return next(error)
  
    }
  })
let userDb =mongoose.model('user',userSchema)
export default userDb