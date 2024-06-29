import { Router } from "express";
import {
  getAllBrands,
  createBrand,
  getBrandById,
  updateBrand,
  deleteBrand,
} from "../controllers/brandController.js";
import authenticateJWT from "../middleware/auth.js";
import isAdmin from "../middleware/isAdmin.js";

const router = Router();

router.get("/", authenticateJWT, getAllBrands);
router.post("/", authenticateJWT, isAdmin, createBrand);
router.get("/:brandId", authenticateJWT, isAdmin, getBrandById);
router.put("/:brandId", authenticateJWT, isAdmin, updateBrand);
router.delete("/:brandId", authenticateJWT, isAdmin, deleteBrand);

export default router;
