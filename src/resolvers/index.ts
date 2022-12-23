import { mergeResolvers } from "@graphql-tools/merge";
import userResolvers from './user_resolvers'
import eventResolvers from './event_resolver';
import bookingResolvers from './booking_resolvers'
const resolvers = mergeResolvers ([
    userResolvers,
    eventResolvers,
    bookingResolvers

])

export default resolvers