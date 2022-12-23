import mongoose from "mongoose";
import { Schema } from "mongoose";
import {nanoid} from "nanoid";
const bookingSchema =new Schema({
    _id:{
        type:String,
        default:()=>nanoid()
    },
    userId:{
        type:String,
        required:true
    },
    eventId:{
        type:String,
        required:true
    },
    by:{
        type:String,
        enum:{admin:'admin',manager:'manager',user:'user'},
        required:true 
    }

},{timestamps:true})
let bookingDb =mongoose.model('booking',bookingSchema)
export default bookingDb