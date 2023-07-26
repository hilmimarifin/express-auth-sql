import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

interface ChecklistItemAttributes {
	id?: number,
	itemName?: string | null,

	createdAt?: Date,
	updatedAt? : Date
}

export interface ChecklistItemInput extends Optional<ChecklistItemAttributes, 'id'>{ }
export interface ChecklistItemOutput extends Required<ChecklistItemAttributes>{ }

class ChecklistItem extends Model<ChecklistItemAttributes, ChecklistItemInput> implements ChecklistItemAttributes {
	public id!: number;
  	public name!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt! : Date;
}

ChecklistItem.init({
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.BIGINT
	},
	itemName: {
		allowNull: true,
		type: DataTypes.STRING
	},
}, {
  timestamps: true,
  sequelize: connection,
  underscored: false
});

export default ChecklistItem;