import { USER_ROLES } from "../constants";
import { User } from "../database/models/user.model";
import { CUserDTO } from "../dtos/user.dto";
import { RegistrationCredentials } from "../types";
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { tokenService } from "./token.service";
import { ApiError } from "../exceptions/api.error";


class CUserService {
  constructor() {}

  async registration({ email, password }: RegistrationCredentials) {
    const condidate = await User.findOne({ where: { email } })
    if (condidate) throw ApiError.BadRequest({ message: `Current email: [${email}] is already exist` })
    const hashedPassword = `${await bcrypt.hash(password, 3)}`

    const userRecord = {
      uuid: `${crypto.randomUUID()}`,
      created_at: new Date(),
      email,
      password: hashedPassword,
      role: USER_ROLES.REGULAR,
      token_id: `${crypto.randomUUID()}`
    }

    const user = await User.create(userRecord)
    const userDTO = new CUserDTO(user)
    const tokens = tokenService.generateToken({ ...userDTO })
    await tokenService.saveToken({
      tokenId: user.token_id,
      refreshToken: tokens.refreshToken
    })
    return {
      ...tokens,
      userDTO
    }
  }

  async login({ email, password }) {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      throw ApiError.BadRequest({ message: `Current email: [${email}] is not found` })
    }
    const isPassIsEqual = await bcrypt.compare(password, user.password)
    
    if (!isPassIsEqual) {
      throw ApiError.BadRequest({ message: `The specified password: [${password}] is incorrect` })
    }
    const userDTO = new CUserDTO(user)
    const tokens = tokenService.generateToken({ ...userDTO })
    await tokenService.saveToken({
      tokenId: user.token_id,
      refreshToken: tokens.refreshToken
    })
    return {
      ...tokens,
      userDTO
    }
  }

  async logout(refreshToken) {
    const tokenData = await tokenService.removeToken(refreshToken)
    return tokenData
  }
}

export const userService = new CUserService()