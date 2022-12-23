 const typeDefs = `#graphql
 type user {
    id:ID,
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    role:String   
 }
 type login {
  email:String,
  password:String,
  Token:String,
 }
 type updateuser{
  id:ID,
  firstName:String,
  lastName:String,
  email:String
 }
 enum Role {
  user,
  admin,
  manager
 }
 type eventadd{
  id:ID,
  userId:String,
  title:String,
  description:String,
  venue:String,
  eventTime:Float,
  city:String,
  state:String
 }
 type updateEvent{
  title:String,
  description:String,
  venue:String,
  eventTime:Float,
  city:String,
  state:String
 }
 type deleteEvent{
  id:ID
 }
 type token{
  Token:String
 }
 type booking{
  by:String,
  venue:String,
  eventTime:Float,
  city:String,
}

  type Query {
    hello: String,
    getEventToken(id:ID):token
  }

  input userInput {
    firstName:String,
    lastName:String,
    email:String!,
    password:String!,
    role:[Role]
  },
  input logInput {
    email:String!,
    password:String!,
  },
  input UpdateUser{
    firstName:String,
    lastName:String,
    email:String
  },
  input eventaddInput{
    title:String,
    description:String,
    venue:String,
    eventTime:Float,
    city:String,
    state:String
   }
   input eventUpdateInput{
    id:ID,
    title:String,
    description:String,
    venue:String,
    eventTime:Float,
    city:String,
    state:String
   }
   input deleteEventInput{
    id:ID
   }
  input bookingInput{
    by:[Role]
  }
  type Mutation{
    signUpUser(user:userInput):user,
    logInUser(login:logInput):login,
    updateUser(updateuser:UpdateUser):updateuser,
    addEvent(eventadd:eventaddInput):eventadd,
    eventUpdate(updateEvent:eventUpdateInput):updateEvent,
    deleteEvent(deleteEvent:deleteEventInput):deleteEvent,
    addBooking(booking:bookingInput):booking
  }  
`;


export default typeDefs