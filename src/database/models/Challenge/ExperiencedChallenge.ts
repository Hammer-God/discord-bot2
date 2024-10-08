import { DataTypes, Sequelize, Model } from 'sequelize';
import { ChallengeCardBase } from './ChallengeCard';

class ExperiencedChallengeCard
  extends Model<ChallengeCardBase>
  implements ChallengeCardBase
{
  user_id: string;
  challengeOne: string;
  challengeTwo: string;
  challengeThree: string;
  challengeFour: string;
  rerolled: number;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

const initializeExperiencedChallengeCard = (sequelize: Sequelize) => {
  ExperiencedChallengeCard.init(
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
      rerolled: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
    },
    {
      tableName: 'ExperiencedChallengeCard',
      sequelize,
    },
  );
};

export { initializeExperiencedChallengeCard };

export default ExperiencedChallengeCard;
