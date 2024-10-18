import { DataTypes, QueryInterface } from 'sequelize';

import { DiscordUser } from '../models';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable<DiscordUser>('DiscordUser', {
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      twisted_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      trailblazer_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      shattered_relics_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      trailblazer_reloaded_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('DiscordUser');
  },
};
