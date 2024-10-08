import { DataTypes, Sequelize, Model } from 'sequelize';
import { ChallengeCardBase } from './ChallengeCard';

class GrandmasterChallengeCard
  extends Model<ChallengeCardBase>
  implements ChallengeCardBase
{
  user_id: string;
  challengeOne: string;
  challengeTwo: string;
  challengeThree: string;
  challengeFour: string;
  challengeFive: string;
  rerolled: number;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

const initializeGrandmasterChallengeCard = (sequelize: Sequelize) => {
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
    },
    {
      tableName: 'GrandmasterChallengeCard',
      sequelize,
    },
  );
};

export { initializeGrandmasterChallengeCard };

export default GrandmasterChallengeCard;
