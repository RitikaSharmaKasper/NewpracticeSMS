import express from "express";
import {
  createStaff,
  getStaffs,
  getStaffById,
  deleteStaff,
  updateStaff,
  updateLoginPermission,
  sendPasswordChangeLink,
} from "../../controllers/Staffs/AddStaff.js";
import upload from "../../middleware/Multer/multer.js";
import { authMiddleware, requireRole } from "../../middleware/auth.js";

const router = express.Router();

// create a staff in admin
router.post(
  "/create-staff",
  authMiddleware,
  requireRole("Admin"),
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "documents", maxCount: 20 },
  ]),
  createStaff,
);

// all staff in admin
router.get("/all-staff", authMiddleware, requireRole("Admin"), getStaffs);

router.get("/:id", authMiddleware, requireRole("Admin"), getStaffById);

router.delete("/delete-staff/:id", deleteStaff);
router.put(
  "/:id",
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "documents", maxCount: 10 },
  ]),
  updateStaff,
);

router.patch("/update-login-permission/:id", updateLoginPermission);

router.post("/send-password-link/:id", sendPasswordChangeLink);

export default router;
