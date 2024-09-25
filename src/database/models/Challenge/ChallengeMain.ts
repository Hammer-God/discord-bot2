import { DataTypes, Sequelize, Model } from 'sequelize';

interface ChallengeMainAttributes {
  user_id: string;
  currentDifficultyTier: string
  currentChallengeStatus: string;
  numberOfRerolls: number;
}

class ChallengeMain
  extends Model<ChallengeMainAttributes>
  implements ChallengeMainAttributes
{
    user_id: string;
    currentDifficultyTier: string
    currentChallengeStatus: string;
    numberOfRerolls: number;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

const initializeChallengeMain = (sequelize: Sequelize) => {
  ChallengeMain.init(
    {
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
      },
      currentDifficultyTier: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      currentChallengeStatus: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numberOfRerolls: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'ChallengeMain',
      sequelize,
    },
  );
};

export { ChallengeMainAttributes, initializeChallengeMain };

export default ChallengeMain;