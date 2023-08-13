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

  async login({ email, password }: RegistrationCredentials) {
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

  async logout(refreshToken: string) {
    if (!refreshToken)
      throw ApiError.UnauthorizedError()
    
    const tokenData = await tokenService.removeToken(refreshToken)
    return tokenData
  }

  async setRole({ refreshToken, role }) {
    const decodedToken = tokenService.validateRefreshToken(refreshToken)

    if (!refreshToken || !decodedToken) 
      throw ApiError.UnauthorizedError()

    if (typeof decodedToken === 'string')
      throw ApiError.BadRequest({ message: `Got value of type 'string', but need 'JwtPayload'` });

    if (decodedToken.role === role)
      throw ApiError.BadRequest({ message: `Сurrent role: [${role}] is already installed` });

    if (role !== USER_ROLES.CREATOR && role !== USER_ROLES.REGULAR)
      throw ApiError.BadRequest({ message: `Сurrent role: [${role}] does not exist` });

    if (!role)
      throw ApiError.BadRequest({ message: `Current role is 'undefined'` });
    const dataForUpdate = { role }

    await User.update(dataForUpdate, { where: { uuid: decodedToken.uuid } })
    const userData = await User.findByPk(decodedToken.uuid)

    const userDTO = new CUserDTO(userData)
    const tokens = tokenService.generateToken({ ...userDTO })
    await tokenService.saveToken({
      tokenId: userData?.token_id,
      refreshToken: tokens.refreshToken
    })

    return {
      ...tokens,
      userDTO
    }
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }
    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)
 
    if (!userData || !tokenFromDb)
      throw ApiError.UnauthorizedError()

    if (typeof userData === 'string')
      throw ApiError.BadRequest({ message: `Got value of type 'string', but need 'JwtPayload'` });

    const user = await User.findByPk(userData.uuid)
    const userDTO = new CUserDTO(user)
    
    const tokens = tokenService.generateToken({ ...userDTO })
    await tokenService.saveToken({
      tokenId: user?.token_id,
      refreshToken: tokens.refreshToken
    })
    return {
      ...tokens,
      userDTO
    }
  }
}

export const userService = new CUserService()