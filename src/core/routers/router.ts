import { Router } from "express";
import { ROUTES } from "../constants";
import { userController } from "../controllers/user.controller";

const router = Router()

router.get(ROUTES.DEFAULT, (req, res, next) => {
  res.send('Hello')
  res.status(200)
})

router.post(ROUTES.REGISTRATION, userController.registration)

export default router