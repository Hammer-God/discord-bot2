import { DataTypes, Sequelize, Model } from 'sequelize';
import { ChallengeCardBase } from './ChallengeCard';

class IntermediateChallengeCard
  extends Model<ChallengeCardBase>
  implements ChallengeCardBase
{
  user_id: string;
  challengeOne: string;
  challengeTwo: string;
  challengeThree: string;
  rerolled: number;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

const initializeIntermediateChallengeCard = (sequelize: Sequelize) => {
  IntermediateChallengeCard.init(
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
      rerolled: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'IntermediateChallengeCard',
      sequelize,
    },
  );
};

export { initializeIntermediateChallengeCard };

export default IntermediateChallengeCard;
