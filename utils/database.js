import mongoose from "mongoose"

let isConnected = false

export async function connectToDb() {
  mongoose.set("strictQuery", true)
  if (isConnected) {
    console.log("mongodb already connected")
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "share_prompt"
    })
    isConnected = true
    console.log("mongodb connected")
  } catch (error) {
    console.log("mongodb connection error", error)
  }
}
