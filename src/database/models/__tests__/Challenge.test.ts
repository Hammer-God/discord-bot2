import Challenge, { ChallengeDifficulty } from '../Challenge/Challenge';

describe('Challenge', () => {
  test('seed should populate', async () => {
    const challenges = await Challenge.findAll({
      where: { difficulty: ChallengeDifficulty.NOVICE },
    });
    expect(challenges.length).toBe(5);
  });
});
