import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/dbConnect";

interface ChecklistItemAttributes {
	id?: number,
	itemName?: string | null,
    checklistId?: number | null,


	createdAt?: Date,
	updatedAt? : Date
}

export interface ChecklistItemInput extends Optional<ChecklistItemAttributes, 'id'>{ }
export interface ChecklistItemOutput extends Required<ChecklistItemAttributes>{ }

class ChecklistItem extends Model<ChecklistItemAttributes, ChecklistItemInput> implements ChecklistItemAttributes {
	public id!: number;
  	public name!: string;
    public checklistId!: number;

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
    checklistId: {
        allowNull: true,
		type: DataTypes.BIGINT
    }
}, {
  timestamps: true,
  sequelize: connection,
  underscored: false
});

export default ChecklistItem;