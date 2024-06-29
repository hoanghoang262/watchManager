import { Router } from "express";
import {
  getAllWatches,
  getWatchById,
  searchWatches,
  filterWatchesByBrand,
  createWatch,
  updateWatch,
  deleteWatch,
  addComment,
} from "../controllers/watchController.js";
import authenticateJWT from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";

const router = Router();

router.get("/", authenticateJWT, getAllWatches);
router.get("/:watchId", authenticateJWT, getWatchById);
router.get("/search", authenticateJWT, searchWatches);
router.get("/filter", authenticateJWT, filterWatchesByBrand);

router.post("/", authenticateJWT, isAdmin, createWatch);
router.put("/:watchId", authenticateJWT, isAdmin, updateWatch);
router.delete("/:watchId", authenticateJWT, isAdmin, deleteWatch);

router.post("/:watchId/comments", authenticateJWT, addComment);

export default router;
