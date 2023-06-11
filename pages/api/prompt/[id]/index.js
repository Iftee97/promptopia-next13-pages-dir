import { connectToDb } from "@/utils/database"
import Prompt from "@/models/prompt"

export default async function handler(req, res) {
  const { id } = req.query

  // GET prompt by id
  if (req.method === "GET") {
    try {
      await connectToDb()
      const prompt = await Prompt.findById(id).populate("creator")
      if (!prompt) {
        return res.status(404).json({ message: "Prompt not found." })
      }
      return res.status(200).json({ prompt })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Could not fetch prompt." })
    }
  }

  // PATCH (update) prompt by id
  if (req.method === "PATCH") {
    try {
      const {
        prompt,
        tag
      } = req.body
      await connectToDb()
      const updatedPrompt = await Prompt.findByIdAndUpdate(
        id,
        { prompt, tag },
        { new: true }
      )
      if (!updatedPrompt) {
        return res.status(404).json({ message: "Prompt not found." })
      }
      return res.status(200).json({
        message: "Prompt updated successfully!",
        prompt: updatedPrompt,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Could not update prompt." })
    }
  }

  // DELETE prompt by id
  if (req.method === "DELETE") {
    try {
      await connectToDb()
      await Prompt.findByIdAndRemove(id)
      return res.status(200).json({ message: "Prompt deleted successfully!" })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Could not delete prompt." })
    }
  }
}
