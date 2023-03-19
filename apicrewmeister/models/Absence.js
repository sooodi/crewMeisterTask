import mongoose from "mongoose";

const AbsenceSchema = new mongoose.Schema({
  admitterId: {
    type: String,
  },
  admitterNote: {
    type: String,
  },
  confirmedAt: {
    type: String,
  },
  createdAt: {
    type: String,
    required: true,
  },
  crewId: {
    type: Number,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  memberNote: {
    type: String,
  },
  rejectedAt: {
    type: String,
  },
  userId: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Absence", AbsenceSchema);
