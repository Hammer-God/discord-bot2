import { DataTypes, QueryInterface } from 'sequelize';

import { TwistedLeague } from '../models';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable<TwistedLeague>('TwistedLeague', {
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
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('TwistedLeague');
  },
};
