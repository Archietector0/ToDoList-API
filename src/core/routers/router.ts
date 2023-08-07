import { Router } from "express";
import { ROUTES } from "../constants";
import { body } from 'express-validator';
import { userController } from "../controllers/user.controller";

const router = Router()

router.get(ROUTES.DEFAULT, (req, res, next) => {
  res.send('Hello')
  res.status(200)
})

router.post(ROUTES.REGISTRATION,
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 18 }),
  userController.registration)

router.post(ROUTES.LOGIN, userController.login)

router.post(ROUTES.LOGOUT, userController.logout)

router.get(ROUTES.REFRESH, userController.refresh)

export default router