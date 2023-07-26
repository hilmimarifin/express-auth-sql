import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";
import ChecklistItem from "./ChecklistItem";

interface ChecklistAttributes {
  id?: number,
  name?: string | null,
  createdAt?: Date,
  updatedAt? : Date
}

export interface ChecklistInput extends Optional<ChecklistAttributes, 'id'>{ }
export interface ChecklistOutput extends Required<ChecklistAttributes>{ }

class Checklist extends Model<ChecklistAttributes, ChecklistInput> implements ChecklistAttributes {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt! : Date;
}

Checklist.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.BIGINT
  },
  name: {
    allowNull: true,
    type: DataTypes.STRING
  },
}, {
  timestamps: true,
  sequelize: connection,
  underscored: false
});

Checklist.hasMany(ChecklistItem);

export default Checklist;