import { CreationOptional, DataTypes, Sequelize } from 'sequelize';
import { InitializableModel } from '../types';

class ShatteredRelicsLeague extends InitializableModel<ShatteredRelicsLeague> {
  declare name: string;
  declare points: number;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;

  static initialize = (sequelize: Sequelize) => {
    ShatteredRelicsLeague.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
          unique: true,
        },
        points: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        tableName: 'ShatteredRelicsLeague',
        sequelize,
      },
    );
  };

  static initializeAssociations() {}
}

export default ShatteredRelicsLeague;
