import UserServices from "../services/user_services";

 const userResolvers = {
    Query: {
      hello: () => 'world'
    },
    Mutation:{
        signUpUser:UserServices.signUpUser,
        logInUser:UserServices.logIn,
        updateUser:UserServices.updateUser
    }
  };
  export default  userResolvers


