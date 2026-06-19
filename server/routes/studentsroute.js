import express from "express"; // ✅

const router = express.Router();

import upload from "../middleware/Multer/multer.js"; // ✅

import {
  validate,
  createStudentSchema,
  updateStudentSchema,
} from "../validators/studentValidator.js"; // ✅

import {
  createUser,
  getAllStudents,
  getStudentById,
  updateStudent,
  updateStudentSection,
  deleteStudent,
  updatePassword,
  updateStudentStatus,
  uploadStudentDocument,
  getStudentDocuments,
  deleteStudentDocument,
} from "../controllers/studentscontroller.js"; // ✅
import { authMiddleware, requireRole } from "../middleware/auth.js"; // ✅

// Protected routes
// change by Aman
router.post(
  "/add",
  authMiddleware,
  requireRole("Admin"),
  upload.single("profileImage"),
  validate(createStudentSchema),
  createUser,
);

router.get("/students", getAllStudents);
router.get("/student/:id", getStudentById);
router.put(
  "/student/:id",
  upload.single("profileImage"),
  validate(updateStudentSchema),
  updateStudent,
);
router.patch("/student/:id/section", authMiddleware, updateStudentSection);
router.delete("/student/:id", authMiddleware, deleteStudent);
router.put("/update-password/:id", authMiddleware, updatePassword);
router.patch("/student/:id/status", authMiddleware, updateStudentStatus);
router.post(
  "/student/:studentId/documents",
  // authMiddleware,
  upload.single("document"), // Using same multer middleware
  uploadStudentDocument,
);
router.get(
  "/student/:studentId/documents",
  // authMiddleware,
  getStudentDocuments,
);

router.delete(
  "/student/:studentId/documents/:documentId/:category",
  // authMiddleware,
  deleteStudentDocument,
);

export default router; // ✅
