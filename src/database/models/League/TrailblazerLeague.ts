import { CreationOptional, DataTypes, Sequelize } from 'sequelize';
import { InitializableModel } from '../types';

class TrailblazerLeague extends InitializableModel<TrailblazerLeague> {
  declare name: string;
  declare points: number;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;

  static initialize = (sequelize: Sequelize) => {
    TrailblazerLeague.init(
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
        tableName: 'TrailblazerLeague',
        sequelize,
      },
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  static initializeAssociations() {}
}

export default TrailblazerLeague;
