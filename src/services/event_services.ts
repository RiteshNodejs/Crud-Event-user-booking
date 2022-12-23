import eventDb from "../models/events";
import jwt from "jsonwebtoken";
import userDb from "../models/user";
import bookingDb from "../models/booking";
import AuthValidation from "../utils/auth_middleware";
class EventServices {
  async addEvent(parent, args, context) {
   AuthValidation.Validattion(parent, args, context)
    
    if (context.user.role !== "manager") {
      throw new Error("Access denied");
    }
    const idUser = context.user._id;
    const user = await userDb.findOne({ _id: idUser });
    const argsData = {
      userId: idUser,
      title: args.eventadd.title,
      description: args.eventadd.description,
      venue: args.eventadd.venue,
      eventTime: args.eventadd.eventTime,
      city: args.eventadd.city,
      state: args.eventadd.state,
    };
    const newEvent = new eventDb(argsData);
    let saveEvent = await newEvent.save();
    return {
      title: saveEvent.title,
      description: saveEvent.description,
      venue: saveEvent.venue,
      eventTime: saveEvent.eventTime,
      city: saveEvent.city,
      state: saveEvent.state,
    };
  }
  async updateEvent(parent, args, context) {
    AuthValidation.Validattion(parent, args, context)
    
    if (context.user.role == "user") {
      throw new Error("Access denied not for users");
    }
    const idUser = context.user._id;
    const booked = bookingDb.find({userId:idUser})
    if(booked){
      throw new Error ("unable to delete ")
    }
    // const user = await userDb.findOne({ _id: idUser });
    const managerid = args.updateEvent.id;
    // const manager = await eventDb.findById(managerid);
   
    const argsData = {
      title: args.updateEvent.title,
      description: args.updateEvent.description,
      venue: args.updateEvent.venue,
      eventTime: args.updateEvent.eventTime,
      city: args.updateEvent.city,
      state: args.updateEvent.state,
    };
    const updatedEvent = await eventDb.findByIdAndUpdate(managerid, argsData, {
      new: true,
    });
    return {
      title: updatedEvent.title,
      description: updatedEvent.description,
      venue: updatedEvent.venue,
      eventTime: updatedEvent.eventTime,
      city: updatedEvent.city,
      state: updatedEvent.state,
    };
  }
  async deleteEvent(parent, args, context) {
    AuthValidation.Validattion(parent, args, context)
    if (context.user.role == "user") {
      throw new Error("Access denied not for users");
    }
    const idUser = context.user._id;
    const booked = bookingDb.find({userId:idUser})
    if(booked){
      throw new Error ("unable to delete ")
    }
    const managerid = args.deleteEvent.id;
    console.log(managerid)
    const delEvent = await eventDb.findByIdAndUpdate(managerid,{isDeleted:true});
    console.log(delEvent)
    return {};
  }
  async managerEventList(parent, args, context) {
    AuthValidation.Validattion(parent, args, context)
    if (context.user.role == "user") {
      throw new Error("Access denied not for users");
    }
    const idUser = context.user._id;
    const allEvent = await eventDb.find({userId:idUser})
    
    return allEvent
    
    
  }
  async getEventToken(parent, args, context) {
    const token = await jwt.sign({ _id: args.id }, "mykey", {
      expiresIn: "6000s",
    });
    return {
      Token: token,
    };
  }
}

export default new EventServices();
