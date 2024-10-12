import { CreationOptional, DataTypes, Model } from 'sequelize';
import { InitializableModel } from '../types';

class Challenge extends InitializableModel<Challenge> {
  declare id: number;
  declare difficulty: string;
  declare description: string;
  declare region_one: number;
  declare region_two: number;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;

  static initialize = (sequelize: any) => {
    Challenge.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        difficulty: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        region_one: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        region_two: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        tableName: 'Challenge',
        sequelize,
      },
    );
  };

  static initializeAssociations() {}
}
export default Challenge;
