import { Sequelize } from 'sequelize';

import databaseConfig from './config';
import models from './models';

const sequelize = new Sequelize(databaseConfig);

export const initializeDatabase = async () => {
  console.log('Connecting to OSRS Leagues database...');
  try {
    await sequelize.authenticate();
    console.log('Connected to OSRS Leagues database.');

    Object.values(models).forEach((model) => model.initialize(sequelize));
    Object.values(models).forEach((model) => model.initializeAssociations());
    console.log('Initialized sequelize models.');
  } catch (error) {
    console.error('Unable to connect to the OSRS Leagues database:', error);
  }
};

export * from './models';

export default sequelize;
