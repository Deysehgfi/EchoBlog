import { Router } from "express";

const router = Router()

import { create, getAll, getPostagens } from "../controllers/Postagens-Controllers.js";



router.post("/",create)
router.get("/", getAll )
router.get("/:id", getPostagens)

export default router;
