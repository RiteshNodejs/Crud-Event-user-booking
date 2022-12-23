
import BookingServices from "../services/booking_services"
 const bookingResolvers = {
    Query: {
      hello: () => 'world'

    },
    Mutation:{
        addBooking:BookingServices.bookEvent
    }
  };
export default bookingResolvers

