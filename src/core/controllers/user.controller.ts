import { ApiError } from "../exceptions/api.error"
import { userService } from "../services/user.service"
import { validationResult } from 'express-validator';


class CUserController {

  constructor () {}

  async registration(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty())
        return next(ApiError.BadRequest({ message: 'Validation error', errors: errors.array() }))

      const { email, password } = req.body
      const userData = await userService.registration({ email, password })
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 68 * 68 * 1000, // 30 days
        httpOnly: true
      })

      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const userData = await userService.login({ email, password })

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 68 * 68 * 1000, // 30 days
        httpOnly: true
      })
      return res.json(userData)
    } catch (error) {
      next(error)
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const tokenData = await userService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(tokenData)

      
    } catch (error) {
      next(error)
    }
  }
}

export const userController = new CUserController()