import { DataTypes, Model } from "sequelize";
import { MODEL_NAMES } from "../constants";
import { DB_CONNECTION } from "../database";
import { Token } from "./token.model";

export interface UserAttributes {
  uuid: string;
  created_at: Date;
  email: string;
  password: string;
  role: string;
  token_id: string;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public uuid!: string;
  public created_at!: Date;
  public email!: string;
  public password!: string;
  public role!: string;
  public token_id!: string;
}

User.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
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
    tableName: MODEL_NAMES.USER,
  }
);