import { userService } from "../services/user.service"

class CUserController {

  constructor () {}

  async registration(req, res, next) {
    try {
      const { email, password } = req.body
      
      const userData = await userService.registration({ email, password })
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 68 * 68 * 1000, // 30 days
        httpOnly: true
      })

      return res.json(userData)
    } catch (error: any) {
      throw new Error(error)
    }
  }
}

export const userController = new CUserController()