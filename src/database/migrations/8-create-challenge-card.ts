import { DataTypes, QueryInterface } from 'sequelize';

import { ChallengeCard } from '../models';
import { ChallengeCardStatus } from '../models/Challenge/ChallengeCard';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface
      .createTable<ChallengeCard>('ChallengeCard', {
        challengeOneId: {
          type: DataTypes.BIGINT,
          allowNull: false,
          references: {
            model: 'Challenge',
            key: 'id',
          },
        },
        challengeTwoId: {
          type: DataTypes.BIGINT,
          allowNull: false,
          references: {
            model: 'Challenge',
            key: 'id',
          },
        },
        challengeThreeId: {
          type: DataTypes.BIGINT,
          allowNull: false,
          references: {
            model: 'Challenge',
            key: 'id',
          },
        },
        challengeFourId: {
          type: DataTypes.BIGINT,
          references: {
            model: 'Challenge',
            key: 'id',
          },
        },
        challengeFiveId: {
          type: DataTypes.BIGINT,
          references: {
            model: 'Challenge',
            key: 'id',
          },
        },
        difficulty: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        discordUserId: {
          type: DataTypes.BIGINT,
          allowNull: false,
          references: {
            model: 'DiscordUser',
            key: 'user_id',
          },
        },
        proof: {
          type: DataTypes.STRING,
        },
        status: {
          defaultValue: 'assigned',
          type: DataTypes.ENUM<ChallengeCardStatus>(
            'assigned',
            'review',
            'completed',
          ),
          allowNull: false,
        },
        rerollCount: {
          type: DataTypes.INTEGER,
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
      })
      .then(async () => {
        await queryInterface.addIndex(
          'ChallengeCard',
          ['discordUserId', 'difficulty'],
          { unique: true },
        );
      });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('ChallengeCard');
  },
};
