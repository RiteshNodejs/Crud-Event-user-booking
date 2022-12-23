import jwt from "jsonwebtoken";
import bookingDb from "../models/booking";
import eventDb from "../models/events";
class BookingServices{
   async bookEvent(parent,args,context){
        const token = context.token;
        const decoded = jwt.verify(token, "mykey");
        context.user = decoded;
        const idUser = context.user._id;
        const manager = await eventDb.findOne({ _id: idUser });
        const argsData = {
            
            userId: manager.userId,
            eventId:manager._id,
            by: args.booking.by[0]
          };
        const newBooking = new bookingDb(argsData);
        let saveEvent = await newBooking.save();
        return {
            venue:manager.venue,
            eventTime:manager.eventTime,
            city:manager.city,
            
            
        }

    }
}

export default new BookingServices