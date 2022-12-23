import eventDb from "../models/events";
import jwt from "jsonwebtoken";
import userDb from "../models/user";

class EventServices {
  async addEvent(parent, args, context) {
    const token = context.token;
    const decoded = jwt.verify(token, "mykey");
    context.user = decoded;
    const idUser = context.user._id;
    console.log("hello")
    const manager = await userDb.findOne({ _id: idUser });
    if (manager.role !== "manager") {
      throw new Error("Access denied");
    }
    const argsData = {
        userId:idUser,
        title: args.eventadd.title,
        description:args.eventadd.description,
        venue: args.eventadd.venue,
        eventTime: args.eventadd.eventTime,
        city: args.eventadd.city,
        state: args.eventadd.state
      };
    const newEvent = new eventDb(argsData);
    let saveEvent = await newEvent.save();
    return {
        title: saveEvent.title,
        description:saveEvent.description,
        venue: saveEvent.venue,
        eventTime: saveEvent.eventTime,
        city: saveEvent.city,
        state: saveEvent.state
    };
  };
  async updateEvent(parent,args,context){
    const token = context.token;
    const decoded = jwt.verify(token, "mykey");
    context.user = decoded;
    const idUser = context.user._id;
    const ismanager = await userDb.findOne({ _id: idUser });
    console.log(ismanager)
    if (ismanager.role == "user" ) {
      throw new Error("Access denied");
    }
    const  managerid = args.updateEvent.id
    console.log(managerid);
    const manager = await eventDb.findById(managerid)
    console.log("managerr==",manager)
    // if(manager.userId!==idUser){
    //     throw new Error("Access denied invalid Id or token");
    // }
    const argsData={
        title: args.updateEvent.title,
        description:args.updateEvent.description,
        venue: args.updateEvent.venue,
        eventTime: args.updateEvent.eventTime,
        city: args.updateEvent.city,
        state: args.updateEvent.state
    }
    const updatedEvent = await eventDb.findByIdAndUpdate(managerid, argsData,{new:true})
    return {
        title: updatedEvent.title,
        description:updatedEvent.description,
        venue: updatedEvent.venue,
        eventTime: updatedEvent.eventTime,
        city: updatedEvent.city,
        state: updatedEvent.state
    };
  }
  async deleteEvent(parent,args,context){
    const token = context.token;
    const decoded = jwt.verify(token, "mykey");
    context.user = decoded;
    const idUser = context.user._id;
    const ismanager = await userDb.findOne({ _id: idUser });
    console.log(ismanager)
    if (ismanager.role == "user" ) {
      throw new Error("Access denied");
    }
    const  managerid = args.deleteEvent.id
      const delEvent= await  eventDb.findByIdAndDelete(managerid)
      return{
        
      }
  }
  async getEventToken(parent,args,context){
    console.log(args);
    
    const token = await jwt.sign({ _id: args.id }, "mykey", {
      expiresIn: "6000s",
  });
  return{
    
    Token:token
    
  }
  }

}

export default new EventServices();
