import { connectToDb } from "@/utils/database"
import Prompt from "@/models/prompt"

// GET all prompts
export default async function handler(req, res) {
  try {
    await connectToDb() // must need to do so, because serverless function doesn't have connection to database
    const prompts = await Prompt.find({}).populate("creator")
    return res.status(200).json(prompts)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Could not fetch prompts." })
  }
}
