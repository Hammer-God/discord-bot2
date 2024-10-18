import { DataTypes, QueryInterface } from 'sequelize';

import { Challenge } from '../models';
import {
  ChallengeDifficulity,
  ChallengeRegion,
} from '../models/Challenge/Challenge';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable<Challenge>('Challenge', {
      difficulty: {
        type: DataTypes.ENUM<ChallengeDifficulity>(
          'novice',
          'intermediate',
          'experienced',
          'master',
          'grandmaster',
        ),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      region_one: {
        type: DataTypes.ENUM<ChallengeRegion>(
          'asgarnia',
          'desert',
          'kandarin',
          'kourend',
          'misthalin',
          'morytania',
          'fremennik',
          'desert',
          'tirannwn',
          'varlamore',
          'wilderness',
        ),
        allowNull: false,
      },
      region_two: {
        type: DataTypes.ENUM<ChallengeRegion>(
          'asgarnia',
          'desert',
          'kandarin',
          'kourend',
          'misthalin',
          'morytania',
          'fremennik',
          'desert',
          'tirannwn',
          'varlamore',
          'wilderness',
        ),
        allowNull: false,
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
