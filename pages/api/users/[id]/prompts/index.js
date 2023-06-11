import { connectToDb } from "@/utils/database"
import Prompt from "@/models/prompt"

export default async function handler(req, res) {
  const { id } = req.query
  try {
    await connectToDb()
    const prompts = await Prompt.find({ creator: id }).populate("creator") // 
    return res.status(200).json({ prompts })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Failed to fetch prompts created by user." })
  }
}
