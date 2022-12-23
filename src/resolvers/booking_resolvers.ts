
import BookingServices from "../services/booking_services"
 const bookingResolvers = {
    Query: {
      hello: () => 'world',
      allBookingList:BookingServices.allBookingList
    },
    Mutation:{
        addBooking:BookingServices.bookEvent
    }
  };
export default bookingResolvers

