import express from "express";
import { getAllproducts } from "../controllers/productoController.js";
import { createProduct } from "../controllers/productoController.js";
const router = express.Router();


//CRUDs de la API
router.get("/", getAllproducts);
router.post("/", createProduct);


router.put("/", );

router.delete("/", );

export default router;