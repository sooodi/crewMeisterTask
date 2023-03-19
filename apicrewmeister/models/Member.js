import mongoose from "mongoose";
const MemberSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    crewId: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Member", MemberSchema);
