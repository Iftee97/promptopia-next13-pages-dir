import { Schema, model, models } from "mongoose"
import User from "./user.js" // Import the User model

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User", // references the User Model's id in db
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  }
})

const Prompt = models?.Prompt || model("Prompt", PromptSchema)

export default Prompt
