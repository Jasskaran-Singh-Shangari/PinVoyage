import Router from "express"
import { getCurrentUser } from "../controllers/User.controller.js";

const router = Router()

router.route("/getUser", getCurrentUser)

export default router;