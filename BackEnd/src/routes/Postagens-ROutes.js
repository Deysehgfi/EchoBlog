import { Router } from "express";

const router = Router()

import { create, getAll, getPostagens, updatePostagem, deletePostagem} from "../controllers/Postagens-Controllers.js";



router.post("/", create)
router.get("/", getAll)
router.get("/:id", getPostagens)
router.put("/:id", updatePostagem)
router.delete("/:id", deletePostagem)


export default router;
