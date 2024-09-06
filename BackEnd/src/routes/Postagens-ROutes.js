import { Router } from "express";

const router = Router()

import { create} from "../controllers/Postagens-Controllers.js";



router.post("/", create)


export default router;
