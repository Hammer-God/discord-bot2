import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export abstract class InitializableModel<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Model<any, any>,
  O = undefined,
> extends Model<InferAttributes<T, O>, InferCreationAttributes<T, O>> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  static initialize(_sequelize: Sequelize) {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  static initializeAssociations() {}
}
