
import dbConnect from "@/config/dbConnect";
import SignIn from "@/schemas/signinSchema/SignIn";
import NextAuth from "next-auth/next";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'


const authOptions = {
  providers:[
    CredentialsProvider({
      name:"credentials",
      credentials:{},
      async authorize(credentials){
        const {email,password} = credentials;

        try {
          await dbConnect()
          let userFound = await SignIn.findOne({email})

          if (!userFound) {
            throw new Error("user not found")
            return null
          }
          let passwordFound = await bcrypt.compare(password, userFound.password)

          if (!passwordFound) {
            throw new Error("user not found")
            return null
          }

          return userFound;
        } catch (error) {
          console.log("User found Error", error);
        }

      }
    })
  ],
  session:{
    strategy:"jwt"
  },
  secret:process.env.NEXTAUTH_SECRET,
  pages:{
    signIn: "/signin"
  },
}

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};