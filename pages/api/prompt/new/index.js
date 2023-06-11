import { connectToDb } from "@/utils/database"
import Prompt from "@/models/prompt"

export default async function handler(req, res) {
  const {
    userId,
    prompt,
    tag
  } = req.body
  try {
    await connectToDb()
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag
    })
    await newPrompt.save()
    return res.status(200).json({
      message: "Prompt created successfully!",
      prompt: newPrompt
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Creating prompt failed." })
  }
}
