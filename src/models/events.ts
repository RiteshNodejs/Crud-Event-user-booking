import mongoose from "mongoose";
import { Schema } from "mongoose";
import {nanoid} from "nanoid";
const eventSchema =new Schema({
    _id:{
        type:String,
        default:()=>nanoid()
    },
    userId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:false
    },
    description:{
        type:String,
        required:false
    },
    venue:{
        type:String,
        required:false
    },
    eventTime:{
        type:Date,
        required:true
    },
    city:{
        type:String,
        required:false
    },
    state:{
        type:String,
        required:false
    },

},{timestamps:true})
let eventDb =mongoose.model('event',eventSchema)
export default eventDb