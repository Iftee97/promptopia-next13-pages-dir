import { connectToDb } from "@/utils/database"
import Prompt from "@/models/prompt"

// GET all prompts
export default async function handler(req, res) {
  await connectToDb() // must need to do so, because serverless function doesn't have any connection to database
  const prompts = await Prompt.find({}).populate("creator")
  return res.status(200).json(prompts)
}
