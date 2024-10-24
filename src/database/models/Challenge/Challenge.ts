import { CreationOptional, DataTypes, ForeignKey, Sequelize } from 'sequelize';
import { InitializableModel } from '../types';
import Region from '../Region';

export enum ChallengeDifficulty {
  NOVICE = 1,
  INTERMEDIATE = 2,
  EXPERIENCED = 3,
  MASTER = 4,
  GRANDMASTER = 5,
}

class Challenge extends InitializableModel<Challenge> {
  declare difficulty: ChallengeDifficulty;
  declare description: string;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly id: CreationOptional<number>;
  declare readonly regionOneId: ForeignKey<Region['id']>;
  declare readonly regionTwoId?: CreationOptional<ForeignKey<Region['id']>>;
  declare readonly updatedAt: CreationOptional<Date>;

  static initialize = (sequelize: Sequelize) => {
    Challenge.init(
      {
        difficulty: {
          type: DataTypes.NUMBER,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        regionOneId: {
          type: DataTypes.BIGINT,
          allowNull: false,
          references: {
            model: 'Region',
            key: 'id',
          },
        },
        regionTwoId: {
          type: DataTypes.BIGINT,
          allowNull: true,
          references: {
            model: 'Region',
            key: 'id',
          },
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

  static initializeAssociations() {
    Challenge.hasOne(Region, {
      foreignKey: 'regionOneId',
      as: 'regionOne',
    });
    Challenge.hasOne(Region, {
      foreignKey: 'regionTwoId',
      as: 'regionTwo',
    });
  }
}
export default Challenge;
