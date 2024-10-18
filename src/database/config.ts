import { Options } from 'sequelize';
import config from '../config';

const mysqlConfig: Options = {
  dialect: 'mysql',
  define: {
    freezeTableName: true,
  },
  logging: false,
  pool: { max: 40, min: 2, acquire: 20000, idle: 5000 },
  retry: { max: 10 },
  ...config.database,
};

const sqliteConfig: Options = {
  dialect: 'sqlite',
  storage: `./.sqlite/${config.environment}.db`,
};

const databaseConfig: Options =
  config.environment === 'development' || config.environment === 'test'
    ? sqliteConfig
    : mysqlConfig;

export default databaseConfig;
