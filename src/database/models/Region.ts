import { CreationOptional, DataTypes, Sequelize } from 'sequelize';
import { InitializableModel } from './types';

class Region extends InitializableModel<Region> {
  declare name: string;
  declare discordRoleId?: CreationOptional<string>;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly id: CreationOptional<number>;
  declare readonly updatedAt: CreationOptional<Date>;

  static initialize = (sequelize: Sequelize) => {
    Region.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        discordRoleId: {
          type: DataTypes.STRING,
        },
        /** Auto-generated */
        id: {
          type: DataTypes.BIGINT,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        tableName: 'Region',
        sequelize,
      },
    );
  };
}

export default Region;
