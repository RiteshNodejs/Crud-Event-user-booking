
import EventServices from "../services/event_services"
 const eventResolvers = {
    Query: {
      hello: () => 'world',
     
      getEventToken:EventServices.getEventToken
    },
    Mutation:{
       
        addEvent:EventServices.addEvent,
        eventUpdate:EventServices.updateEvent ,
        deleteEvent:EventServices.deleteEvent
    

    }
  };
export default eventResolvers