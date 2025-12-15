import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [String],
  image: {type:String}
}, { timestamps: true });

export default mongoose.model("Journal", journalSchema);
