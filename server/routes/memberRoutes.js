import express from "express";
import {
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
} from "../controllers/memberController.js";
import authenticateJWT from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";

const router = express.Router();

router.get("/", authenticateJWT, isAdmin, getAllMembers);
router.get("/:memberId", authenticateJWT, getMemberById);
router.put("/:memberId", authenticateJWT, updateMember);
router.delete("/:memberId", authenticateJWT, deleteMember);

export default router;
