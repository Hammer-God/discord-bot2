import { CreationOptional, DataTypes, Sequelize } from 'sequelize';
import { InitializableModel } from '../types';

class ChallengeMain extends InitializableModel<ChallengeMain> {
  declare user_id: string;
  declare currentDifficultyTier: string;
  declare currentChallengeStatus: string;
  declare numberOfRerolls: number;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;

  static initialize = (sequelize: Sequelize) => {
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
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        tableName: 'ChallengeMain',
        sequelize,
      },
    );
  };

  static initializeAssociations() {}
}

export default ChallengeMain;
