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

export default router