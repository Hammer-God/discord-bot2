import { QueryInterface } from 'sequelize';
import * as challengesData from '../../challengeList/challenges.json';
import { Region } from '../models';

const challengeDifficultyToNumber = (difficulty: string) => {
  switch (difficulty) {
    case 'Novice':
      return 1;
    case 'Intermediate':
      return 2;
    case 'Experienced':
      return 3;
    case 'Master':
      return 4;
    case 'Grandmaster':
      return 5;
  }
};

module.exports = {
  async up(queryInterface: QueryInterface) {
    const regions = await queryInterface.sequelize.query(
      'SELECT * FROM "Region"',
    );
    const regionMap = regions[0].reduce<Record<string, number>>(
      (acc: Record<string, number>, region: Region) => {
        acc[region.name] = region.id;
        return acc;
      },
      {},
    );
    const challengeRecords = challengesData.challenges.map((challenge) => ({
      description: challenge.description,
      difficulty: challengeDifficultyToNumber(challenge.difficulty),
      regionOneId: regionMap[challenge.region1],
      regionTwoId: regionMap[challenge.region2],
    }));

    await queryInterface.bulkInsert('Challenge', challengeRecords);
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('Challenge', null, {});
  },
};
