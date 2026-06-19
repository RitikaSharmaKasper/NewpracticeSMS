import mongoose from "mongoose";

const userAccountSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      sparse: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      default: null,
    },

    permissions: [{ type: String }],

    lastLogin: Date,

    passwordChangedAt: {
      type: Date,
      default: Date.now,
    },

    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },

    otp: String,
    otpExpires: Date,

    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Active",
    },

    profileImage: {
      url: String,
      public_id: String,
    },

    trustedDevices: [
      {
        deviceId: String,
        deviceInfo: String,
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    refreshTokens: [
      {
        token: String,
        deviceInfo: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    resetPasswordToken: String,
    resetPasswordExpires: String,
    resetPasswordOTP: String,
    resetPasswordOTPExpires: Date,
    resetRequestCount: {
      type: Number,
      default: 0,
    },
    resetRequestWindowStart: Date,
    resetRequestBlockedUntil: Date,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      default: null,
    },

    userType: {
      type: String,
      enum: ["Super Admin", "Admin", "Teacher", "Student", "Staff", "Parent"],
      required: true,
    },

    account: userAccountSchema,

    profileRef: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "profileModel",
      default: null,
    },

    profileModel: {
      type: String,
      enum: ["Student", "Teacher", "Staff", "Parent"],
      default: null,
    },

    metadata: {
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      registrationIP: String,
      lastModifiedIP: String,
      isDeleted: {
        type: Boolean,
        default: false,
      },
      deletedAt: Date,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

userSchema.index({ schoolId: 1 });
userSchema.index({ userType: 1 });
userSchema.index({ "account.email": 1 });
userSchema.index({ "account.username": 1 });

export default mongoose.model("User", userSchema);