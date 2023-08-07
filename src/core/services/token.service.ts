import { TokenPair } from "../types";
import * as jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { 
  ACCESS_TOKEN_ALIVE_PERIOD, JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET, REFRESH_TOKEN_ALIVE_PERIOD
} from "../../../config";
import { Token } from "../database/models/token.model";

class CTokenService {
  constructor () {}

  generateToken(payload: object): TokenPair {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: ACCESS_TOKEN_ALIVE_PERIOD
    })
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: REFRESH_TOKEN_ALIVE_PERIOD
    })

    return {
      accessToken,
      refreshToken
    }
  }

  async saveToken({ tokenId, refreshToken }) {
    const tokenData = await Token.findOne({ where: { token_id: tokenId } })
    const tokenRecord = {
      uuid: `${crypto.randomUUID()}`,
      created_at: new Date(),
      refresh_token: refreshToken,
      token_id: tokenId
    }
    const newData = {
      refresh_token: refreshToken
    }

    tokenData
      ? await Token.update(newData, { where: { token_id: tokenId }})
      : await Token.create(tokenRecord)
  }

  async removeToken(refreshToken) {
    const tokenData = await Token.destroy({ where: { refresh_token: refreshToken } })
    return tokenData
  }
}

export const tokenService = new CTokenService()