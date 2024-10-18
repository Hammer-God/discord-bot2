import { CreationOptional, DataTypes } from 'sequelize';
import { InitializableModel } from '../types';

export type ChallengeDifficulity =
  | 'novice'
  | 'intermediate'
  | 'experienced'
  | 'master'
  | 'grandmaster';

export type ChallengeRegion =
  | 'asgarnia'
  | 'desert'
  | 'kandarin'
  | 'kourend'
  | 'misthalin'
  | 'morytania'
  | 'fremennik'
  | 'desert'
  | 'tirannwn'
  | 'varlamore'
  | 'wilderness';

class Challenge extends InitializableModel<Challenge> {
  declare difficulty: ChallengeDifficulity;
  declare description: string;
  declare region_one: ChallengeRegion;
  declare region_two: ChallengeRegion;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly id: CreationOptional<number>;
  declare readonly updatedAt: CreationOptional<Date>;

  static initialize = (sequelize: any) => {
    Challenge.init(
      {
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
      },
      {
        tableName: 'Challenge',
        sequelize,
      },
    );
  };

  static initializeAssociations() {}
}
export default Challenge;
