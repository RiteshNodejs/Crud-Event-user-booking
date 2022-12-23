import jwt from "jsonwebtoken";
import bookingDb from "../models/booking";
import eventDb from "../models/events";
import AuthValidation from "../utils/auth_middleware"
class BookingServices{
   async bookEvent(parent,args,context){
    AuthValidation.Validattion(parent, args, context)
    // if (context.user.role == "user") {
    //   throw new Error("Access denied not for users");
    // }
        const idUser = context.user._id;
        const manager = await eventDb.findOne({ _id: idUser });

        const argsData = {
            userId: manager.userId,
            eventId:manager._id,
            by: args.booking.by[0]
          };
        const newBooking = new bookingDb(argsData);
         await newBooking.save();
        return {
            venue:manager.venue,
            eventTime:manager.eventTime,
            city:manager.city,  
        }
    }
    async allBookingList(parent, args, context) {
        AuthValidation.Validattion(parent, args, context)
        if (context.user.role !== "admin") {
          throw new Error("Access denied not for users");
        }
        const idUser = context.user._id;
        const allBooking = await bookingDb.find({userId:idUser})
        
        return allBooking
        
        
      }

}

export default new BookingServices