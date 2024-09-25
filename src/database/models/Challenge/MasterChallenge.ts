import { DataTypes, Sequelize, Model } from 'sequelize';
import { ChallengeCardBase } from './ChallengeCard';

class MasterChallengeCard
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

const initializeMasterChallengeCard = (sequelize: Sequelize) => {
  MasterChallengeCard.init(
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
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'MasterChallengeCard',
      sequelize,
    },
  );
};

export { initializeMasterChallengeCard };

export default MasterChallengeCard;