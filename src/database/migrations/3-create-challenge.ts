import { DataTypes, QueryInterface } from 'sequelize';

import { Challenge } from '../models';
import { ChallengeDifficulty } from '../models/Challenge/Challenge';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable<Challenge>('Challenge', {
      difficulty: {
        type: DataTypes.ENUM<ChallengeDifficulty>(
          ChallengeDifficulty.NOVICE,
          ChallengeDifficulty.INTERMEDIATE,
          ChallengeDifficulty.EXPERIENCED,
          ChallengeDifficulty.MASTER,
          ChallengeDifficulty.GRANDMASTER,
        ),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      regionOneId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: 'Region',
          key: 'id',
        },
      },
      regionTwoId: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: 'Region',
          key: 'id',
        },
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
    await queryInterface.dropTable('Challenge');
  },
};
