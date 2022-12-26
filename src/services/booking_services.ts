import bookingDb from "../models/booking";
import eventDb from "../models/events";
import AuthValidation from "../utils/auth_middleware"
class BookingServices{
   async bookEvent(parent,args,context){
    AuthValidation.Validattion(parent, args, context)
        const idUser = context.user._id;
        const eventID = args.booking.eventId
        console.log("hhh")
        //if role is manager then manager book only own created event
        if(context.user.role === 'manager'){
          const ownManager =await eventDb.findOne({_id:eventID ,userId:idUser})
          console.log(ownManager)
          if(ownManager === null){
            throw new Error ("Access denied manager")
          }
        }
       // check manager can book only one for their own 
        const managerValidation = await bookingDb.aggregate([
          {
            '$match': {
              'userId':idUser, 
              'by': 'manager'
            }
          }
        ])
        if(managerValidation.length>=1){
          throw new Error (" error limit for manager")
        }

        const manager = await eventDb.findOne({ _id: eventID });
        const argsData = {
            userId: idUser,
            eventId:manager._id,
            by: context.user.role
          };
        const newBooking = new bookingDb(argsData);
         await newBooking.save();
        return {
            venue:manager.venue,
            eventTime:manager.eventTime,
            city:manager.city,
            description:manager.description 
        }
    }
    async allBookingList(parent, args, context) {
        AuthValidation.Validattion(parent, args, context)
        if (context.user.role !== "admin") {
          throw new Error("Access denied not for users");
        }
        const idUser = args.eventId;
        const allBooking = await bookingDb.find({userId:idUser})
        return allBooking
        
      }

}

export default new BookingServices