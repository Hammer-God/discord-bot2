import { CreationOptional, DataTypes, Sequelize } from 'sequelize';
import { InitializableModel } from '../types';

class TrailblazerReloadedLeague extends InitializableModel<TrailblazerReloadedLeague> {
  declare name: string;
  declare points: number;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;

  static initialize = (sequelize: Sequelize) => {
    TrailblazerReloadedLeague.init(
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
        tableName: 'TrailblazerReloadedLeague',
        sequelize,
      },
    );
  };

  static initializeAssociations() {}
}

export default TrailblazerReloadedLeague;
