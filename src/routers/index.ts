import { Router } from "express";
import {battle, ranking} from "../controllers/battleController.js";
const router = Router();

router.post ("/battle",battle);
router.post("/rankign",ranking);

export default router;