import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export abstract class InitializableModel<
  T extends Model<any, any>,
  O = undefined,
> extends Model<InferAttributes<T, O>, InferCreationAttributes<T, O>> {
  static initialize(sequelize: Sequelize) {}
  static initializeAssociations() {}
}
