// backend/src/models/shortlist.model.js
import mongoose from "mongoose";

// Status enum for shortlisted vs waitlisted
export const Status = {
  SHORTLISTED: "shortlisted",
  WAITLISTED: "waitlisted"
};

// Stage enum for interview rounds
export const Stage = {
  R1: "R1",
  R2: "R2",
  R3: "R3",
  R4: "R4",
  REJECTED: "REJECTED"
};

// Interview status enum (color-coded)
export const InterviewStatus = {
  R: "R", // Red
  Y: "Y", // Yellow
  G: "G"  // Green
};

const ShortlistSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  companyName: { type: String, trim: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  studentEmail: { type: String, lowercase: true, trim: true },
  status: { type: String, enum: Object.values(Status), default: Status.SHORTLISTED },
  stage: { type: String, enum: Object.values(Stage), required: false },
  interviewStatus: { type: String, enum: Object.values(InterviewStatus), required: false },
  isOffered: { type: Boolean, default: false }
}, {
  timestamps: true
});

// Ensure one application/pair per student+company
ShortlistSchema.index({ studentId: 1, companyId: 1 }, { unique: true });
ShortlistSchema.index({ companyId: 1 });
ShortlistSchema.index({ studentId: 1 });

export default mongoose.model("Shortlist", ShortlistSchema);
