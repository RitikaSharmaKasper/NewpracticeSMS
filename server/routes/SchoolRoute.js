import express from "express";
import {
  registerSchool,
  getAllSchools,
  getSchoolById,
  updateSchool,
  deleteSchool,
  approveSchool,
  rejectSchool,
  getSchoolDashboard,
} from "../controllers/SchoolController.js";
import { authMiddleware, requireRole } from "../middleware/auth.js"

const router = express.Router();

// ── Public ─────────────────────────────────────────────────────────────────────
// No auth required — anyone (or the registration form) can call this
router.post("/register", registerSchool);



// ── Super Admin only protected route ───────────────────────────────────────────────────────────
// List all schools, approve / reject, hard-delete
router.get(   "/",            authMiddleware, requireRole("Super Admin"), getAllSchools);
// approve it
router.patch( "/:id/approve", authMiddleware, requireRole("Super Admin"), approveSchool);
router.patch( "/:id/reject",  authMiddleware, requireRole("Super Admin"), rejectSchool);
router.delete("/:id",         authMiddleware, requireRole("Super Admin"), deleteSchool);

// ── Super Admin  OR  the school's own admin ────────────────────────────────────
// Read a single school 
router.get("/:id", authMiddleware, requireRole("Super Admin", "Admin"), getSchoolById);

// Update school profile
// Admin can only update their own school (enforce that inside the controller)
router.put("/:id", authMiddleware, requireRole("Super Admin", "Admin"), updateSchool);

// ── Admin only ───────────────────────────────────────────────────────────
// Dashboard stats scoped to the logged-in school
router.get("/:id/dashboard", authMiddleware, requireRole("Admin"), getSchoolDashboard);

export default router;