import { DataTypes, Sequelize, Model, CreationOptional } from 'sequelize';
import { InitializableModel } from '../types';

class GrandmasterChallengeCard extends InitializableModel<GrandmasterChallengeCard> {
  declare user_id: string;
  declare challengeOne: string;
  declare challengeTwo: string;
  declare challengeThree: string;
  declare challengeFour: string;
  declare challengeFive: string;
  declare rerolled: number;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;

  static initialize = (sequelize: Sequelize) => {
    GrandmasterChallengeCard.init(
      {
        user_id: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
          unique: true,
        },
        challengeOne: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        challengeTwo: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        challengeThree: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        challengeFour: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        challengeFive: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        rerolled: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        tableName: 'GrandmasterChallengeCard',
        sequelize,
      },
    );
  };
}

export default GrandmasterChallengeCard;
