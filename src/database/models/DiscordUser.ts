import { DataTypes, Sequelize, Model, CreationOptional } from 'sequelize';
import { InitializableModel } from './types';

class DiscordUser extends InitializableModel<DiscordUser> {
  declare user_id: string;
  declare twisted_name?: CreationOptional<string>;
  declare trailblazer_name?: CreationOptional<string>;
  declare shattered_relics_name?: CreationOptional<string>;
  declare trailblazer_reloaded_name?: CreationOptional<string>;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;

  static initialize = (sequelize: Sequelize) => {
    DiscordUser.init(
      {
        user_id: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
          unique: true,
        },
        twisted_name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        trailblazer_name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        shattered_relics_name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        trailblazer_reloaded_name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        tableName: 'DiscordUser',
        sequelize,
      },
    );
  };

  static initializeAssociations() {}
}

export default DiscordUser;
