import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import User from "@/models/user"
import { connectToDb } from "@/utils/database"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async signIn({ profile }) {
      try {
        await connectToDb()
        const userExists = await User.findOne({ email: profile.email })
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          })
        }
        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message)
        return false
      }
    }, // Check if user exists in db on sign in otherwise create user in db with email, username and image
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email })
      session.user.id = sessionUser._id.toString()
      return session
    }, // Add user id from db to next auth session object
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
