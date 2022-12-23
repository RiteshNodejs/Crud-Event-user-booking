import mongoose from 'mongoose';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import typeDefs  from './graphql/schema' ;
import resolvers from './resolvers/index';

// import { url } from 'inspector';
mongoose.set("strictQuery",false)
mongoose.connect('mongodb://localhost:27017/apolo').then(() => {
    console.log("MESSAGES.DB_SUCCESS")
}).catch((err) => {
    console.log("MESSAGES.DB_ERROR, err")
})
// const server = new ApolloServer({
//     typeDefs,
//     resolvers,

//     plugins: [ApolloServerPluginLandingPageLocalDefault()],
//   });
 
//    startStandaloneServer(server).then(url=>{
//     console.log(`🚀 Server ready at ${url.url}`);
//    });
const server = new ApolloServer({ typeDefs, resolvers });
startStandaloneServer(server, {
  context: async ({ req }) => ({ token: req.headers.authorization }),
  listen: { port: 4000 }
})
  