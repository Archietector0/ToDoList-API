import { DataTypes, Model } from 'sequelize';
import { MODEL_NAMES } from '../constants';
import { DB_CONNECTION } from '../database';

export interface TaskAttributes {
  uuid: string;
  created_at: Date;
  updated_at: Date;
  task_role: string;
  task_rights: string[];
  header: string;
  description: string;
  priority: string;
  list_id: string;
}

export class Task extends Model<TaskAttributes> implements TaskAttributes {
  public uuid!: string;
  public created_at!: Date;
  public updated_at!: Date;
  public task_role!: string;
  public task_rights!: string[];
  public header!: string;
  public description!: string;
  public priority!: string;
  public list_id!: string;
}

Task.init(
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
    task_role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    task_rights: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
    },
    header: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    priority: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    list_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  },
  {
    sequelize: DB_CONNECTION,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    tableName: MODEL_NAMES.TASK,
  }
);
