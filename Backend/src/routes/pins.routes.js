import Router from "express"
import { savePin, getPin } from "../controllers/Pins.controllers.js";

const router = Router()

// CREATING ENDPOINTS

router.route("/").post(savePin).get(getPin)

export default router;