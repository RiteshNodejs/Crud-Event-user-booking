import userDb from "../models/user";
import UserInputError from "@apollo/server"
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";

class UserServices {
  async signUpUser(parent, args) {
    const extUser = await userDb.findOne({ email:args.user.email }); 
    if(extUser){
        throw new Error('User already exist')
    }
    const argsData = {
        
      firstName: args.user.firstName,
      lastName:args.user.lastName,
      email: args.user.email,
      password: args.user.password,
      role:args.user.role[0]
    };
    const newUser = new userDb(argsData);
    let saveUser = await newUser.save(); 
    return {
      email: saveUser.email,
      
    };
  }
   async logIn(parent,args){
      
    const extUser = await userDb.findOne({ email:args.login.email }); 
    if(!extUser){
        throw new Error('Invalid Credentials ')
    }
    const validPassword = await bcrypt.compare(
      args.login.password,
      extUser.password
  );
  if (!validPassword) {
    throw new Error('Invalid Credentials ')
  }
     // genrate jwt token
      const token = await jwt.sign({ _id: extUser._id}, "mykey", {
      expiresIn: "6000s",
  });
  return{
    email:extUser.email,
    Token:token
    
  }
}
async updateUser(parent,args,context){
  const token=context.token
   
        try {
            const decoded = jwt.verify(token, "mykey")  
            context.user = decoded
        const idUser= context.user._id
        args.updateuser.email
        const extUser = await userDb.findOne({ email: args.updateuser.email, _id: { $ne: idUser } })
                .lean();
                if(extUser){
                  throw new Error('Invalid or same Credentials  ')
                }
                const argsData = {
        
                  firstName: args.updateuser.firstName,
                  lastName:args.updateuser.lastName,
                  email: args.updateuser.email,
                };
        const updatedUser = await userDb.findByIdAndUpdate(idUser, argsData,{new:true})
        return {
          firstName:updatedUser.firstName,
          lastName:updatedUser.lastName,
          email: updatedUser.email,  
        }
        }
        catch(e){
          throw new Error('Invalid Credentials or something went wrong ')
        }
  
  // const updatedUser = await userDb.findByIdAndUpdate( args.body, { new: true })
}
async getbyId(parent,args){
    const { id }=args;
    return await userDb.findById(id)
}

}
export default new UserServices();
