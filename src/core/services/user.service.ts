import { USER_ROLES } from "../constants";
import { User } from "../database/models/user.model";
import { CUserDTO } from "../dtos/user.dto";
import { RegistrationCredentials } from "../types";
import crypto from 'crypto'
import { tokenService } from "./token.service";

function generateSalt(length) {
  return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

function hashPassword({ password, salt }) {
  const hash = crypto.createHmac('sha256', salt);
  hash.update(password);
  return hash.digest('hex');
}

class CUserService {
  constructor() {}

  async registration({ email, password }: RegistrationCredentials) {
    const condidate = await User.findOne({ where: { email } })
    if (condidate) { throw new Error(`Current email: ${email} is already exist`) }
    const hashedPassword = `${hashPassword({ password, salt: generateSalt(3) })}`

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
}

export const userService = new CUserService()