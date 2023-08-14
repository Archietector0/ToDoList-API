import { DataTypes, Model } from 'sequelize';
import { DB_CONNECTION } from '../database'; // Your Sequelize instance
import { MODEL_NAMES } from '../constants';

export interface UserListMediatorAttributes {
  uuid: string;
  uuid_list: string;
  uuid_user: string;
}

export class UserListMediator extends Model<UserListMediatorAttributes> implements UserListMediatorAttributes {
  public uuid!: string;
  public uuid_list!: string;
  public uuid_user!: string;
}

UserListMediator.init(
  {
    uuid: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    uuid_list: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uuid_user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: DB_CONNECTION,
    timestamps: false,
    tableName: MODEL_NAMES.USER_LIST_MEDIATOR, // Change this to your desired table name
  }
);
