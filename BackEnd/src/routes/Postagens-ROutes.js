import { Router } from "express";

const router = Router()

import { create, getAll} from "../controllers/Postagens-Controllers.js";



router.post("/", create)
router.get("/", getAll)


export default router;
