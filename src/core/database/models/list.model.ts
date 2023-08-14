import { DataTypes, Model } from 'sequelize';
import { MODEL_NAMES } from '../constants';
import { DB_CONNECTION } from '../database';

export interface ListAttributes {
  uuid: string;
  created_at: Date;
  updated_at: Date;
  list_role: string;
  list_rights: string[];
  refresh_token: string;
  token_id: string;
}

export class List extends Model<ListAttributes> implements ListAttributes {
  public uuid!: string;
  public created_at!: Date;
  public updated_at!: Date;
  public list_role!: string;
  public list_rights!: string[];
  public refresh_token!: string;
  public token_id!: string;
}

List.init(
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
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    list_role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    list_rights: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
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
    tableName: MODEL_NAMES.LIST,
  }
);
