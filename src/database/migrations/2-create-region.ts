import { DataTypes, QueryInterface } from 'sequelize';

import { Region } from '../models';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable<Region>('Region', {
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
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('Region');
  },
};
