import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema(
  {
    // ── School Details ──────────────────────────────────────────
    schoolName: {
      type: String,
      required: true,
      trim: true,
    },

    schoolDomain: {
      type: String,
      required: true,
      unique: true,
    },

    schoolCode: {
      type: String,
      required: true,
      unique: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    schoolType: {
      type: String,
      enum: ["Public", "Private", "Charter", "International", "Other"],
      required: true,
    },

    numberOfStudents: {
      type: String,
      required: true,
      min: 1,
    },

    logo: String,

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Inactive",
    },

    approvalStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    // ── Plan ────────────────────────────────────────────────────
    plan: {
      type: String,
      enum: ["Basic", "Premium", "Advanced"],
      default: "Basic",
    },

    // ── Admin (embedded) ────────────────────────────────────────
    admin: {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true, // store hashed password
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Students",
        default: null,
      },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("School", schoolSchema);
