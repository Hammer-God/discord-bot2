import { QueryInterface } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert(
      'Region',
      [
        {
          name: 'Asgarnia',
        },
        {
          name: 'Desert',
        },
        {
          name: 'Kandarin',
        },
        {
          name: 'Kourend',
        },
        {
          name: 'Misthalin',
        },
        {
          name: 'Morytania',
        },
        {
          name: 'Fremennik',
        },
        {
          name: 'Tiarannwn',
        },
        {
          name: 'Varlamore',
        },
        {
          name: 'Wilderness',
        },
      ],
      {},
    );
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('Region', null, {});
  },
};
