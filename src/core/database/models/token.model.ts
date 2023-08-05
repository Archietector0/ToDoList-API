import { DataTypes, Model } from "sequelize";
import { MODEL_NAMES } from "../constants";
import { DB_CONNECTION } from "../database";

export interface TokenAttributes {
  uuid: string;
  created_at: Date;
  refresh_token: string;
  token_id: string;
}

export class Token extends Model<TokenAttributes> implements TokenAttributes {
  public uuid!: string;
  public created_at!: Date;
  public refresh_token!: string;
  public token_id!: string;
}

Token.init(
  {
    uuid: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: DB_CONNECTION,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: MODEL_NAMES.TOKEN,
  }
);