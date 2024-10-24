import {
  Challenge,
  ChallengeCard,
  ChallengeDifficulty,
  Region,
} from '../src/database/models';

type ChallengeCache = {
  challenges: Challenge[];
  regions: Region[];
  regionNameMap: Record<number, string>;
};

export const challengeCache: ChallengeCache = {
  challenges: [],
  regions: [],
  regionNameMap: {},
};

export const loadChallengeCache = async () => {
  challengeCache.challenges = await Challenge.findAll();
  challengeCache.regions = await Region.findAll();
  challengeCache.regions.forEach((region) => {
    challengeCache.regionNameMap[region.id] = region.name;
  });
};

/**
 * // Counts the number of region roles the user has for challenge eligibility
 * @param userRoles - Discord roles the user has.
 * @returns - Number of region roles the user has.
 */
export function getRegionRoleCount(userRoles: string[]): number {
  const regionRoles = challengeCache.regions.map((region) => region.name);
  return userRoles.filter((role) => regionRoles.includes(role)).length;
}

/**
 * Counts the number of region roles required to generate a new challenge card at the given difficulty.
 * @param difficulty - The difficulty tier.
 * @returns - The number of roles required.
 */
export function getChallengeCardEligibility(
  difficulty: ChallengeDifficulty,
): number {
  return difficulty === ChallengeDifficulty.NOVICE
    ? 1
    : difficulty === ChallengeDifficulty.INTERMEDIATE
    ? 2
    : 3; // Experienced, Master, and Grandmaster require 3
}

/**
 * Loads the ChallengeMain record for a given user.
 * @param userId - The user's ID.
 * @returns The ChallengeMain record or null if not found.
 */
export async function loadChallengeMain(
  userId: string,
): Promise<ChallengeCard | null> {
  return await ChallengeCard.findOne({ where: { discordUserId: userId } });
}

/**
 * Updates the ChallengeMain record for a given user.
 * @param userId - The user's ID.
 * @param updateData - The data to update.
 */
export async function updateChallengeMain(
  userId: string,
  updateData: Partial<ChallengeCard>,
): Promise<void> {
  const challengeMain = await loadChallengeMain(userId);
  if (challengeMain) {
    await challengeMain.update(updateData);
  } else {
    throw new Error(`ChallengeCard record not found for user ID: ${userId}`);
  }
}

/**
 * Loads the ChallengeCard for a user based on difficulty.
 * @param difficulty - The difficulty tier.
 * @param userId - The user's ID.
 * @returns The ChallengeCard record or null if not found.
 */
export async function loadChallengeCard(
  userId: string,
  difficulty: ChallengeDifficulty,
): Promise<ChallengeCard | null> {
  return await ChallengeCard.findOne({
    where: { discordUserId: userId, difficulty: difficulty },
  });
}

/**
 * Saves or updates the ChallengeCard for a user.
 * @param difficulty - The difficulty tier.
 * @param userId - The user's ID.
 * @param challenges - An array of challenge descriptions.
 */
export async function saveChallengeCard(
  userId: string,
  difficulty: ChallengeDifficulty,
  challenges: Challenge[],
  rerolled: number,
): Promise<void> {
  const challengeOne = challenges[0];
  const challengeTwo = challenges[1];
  const challengeThree = challenges[2];
  let challengeFour = undefined;
  let challengeFive = undefined;

  if (
    difficulty === ChallengeDifficulty.EXPERIENCED ||
    difficulty === ChallengeDifficulty.MASTER
  ) {
    challengeFour = challenges[3];
  } else if (difficulty === ChallengeDifficulty.GRANDMASTER) {
    challengeFour = challenges[3];
    challengeFive = challenges[4];
  }

  // Upsert the challenge card (create or update)
  await ChallengeCard.upsert({
    discordUserId: userId,
    difficulty: difficulty,
    challengeOneId: challengeOne.id,
    challengeTwoId: challengeTwo.id,
    challengeThreeId: challengeThree.id,
    challengeFourId: challengeFour?.id,
    challengeFiveId: challengeFive?.id,
    rerollsRemaining: rerolled,
  });
}

export function existingChallengesToList(
  existingChallenges: ChallengeCard,
  difficulty: ChallengeDifficulty,
): Challenge[] {
  const challengeIdList: number[] = [];
  challengeIdList[0] = existingChallenges.challengeOneId;
  challengeIdList[1] = existingChallenges.challengeTwoId;
  challengeIdList[2] = existingChallenges.challengeThreeId;

  if (
    difficulty === ChallengeDifficulty.EXPERIENCED ||
    difficulty === ChallengeDifficulty.MASTER
  ) {
    challengeIdList[3] = existingChallenges.challengeFourId;
  } else if (difficulty === ChallengeDifficulty.GRANDMASTER) {
    challengeIdList[3] = existingChallenges.challengeFourId;
    challengeIdList[4] = existingChallenges.challengeFiveId;
  }

  return challengeIdList.map((id) =>
    challengeCache.challenges.find((c) => c.id === id),
  );
}

/**
 * Determines the next difficulty tier.
 * @param currentTier - The current difficulty tier.
 * @returns The next difficulty tier.
 */
export function getNextDifficultyTier(
  currentTier: ChallengeDifficulty,
): ChallengeDifficulty {
  const nextTier = currentTier + 1;
  return currentTier >= ChallengeDifficulty.GRANDMASTER
    ? ChallengeDifficulty.GRANDMASTER
    : nextTier;
}

/**
 * Generates new challenges based on difficulty and user roles.
 * @param difficulty - The difficulty tier.
 * @param userRoles - An array of user's role names.
 * @returns An array of newly generated challenge descriptions.
 */
export function generateNewChallenges(
  difficulty: ChallengeDifficulty,
  userRoles: string[],
): Challenge[] {
  const allChallenges = getEligibleChallenges(difficulty, userRoles);
  return getRandomChallenges(allChallenges, getChallengeCount(difficulty));
}

/**
 * Retrieves eligible challenges based on difficulty and user roles.
 * @param difficulty - The difficulty tier.
 * @param userRoles - An array of user's role names.
 * @returns An array of eligible challenge descriptions.
 */
const getEligibleChallenges = (
  difficulty: ChallengeDifficulty,
  userRoles: string[],
): Challenge[] => {
  return challengeCache.challenges.filter((challenge) => {
    const regionOneName = challengeCache.regionNameMap[challenge.regionOneId];
    const regionTwoName = challengeCache.regionNameMap[challenge.regionTwoId];
    if (challenge.difficulty !== difficulty) {
      return false;
    }
    if (regionOneName === 'General') {
      return true;
    }
    if (regionTwoName) {
      return (
        userRoles.includes(regionOneName) && userRoles.includes(regionTwoName)
      );
    }
    return userRoles.includes(regionOneName);
  });
};

/**
 * Shuffles and selects a random subset of challenges.
 * @param challenges - An array of challenge descriptions.
 * @param count - Number of challenges to select.
 * @returns An array of selected challenge descriptions.
 */
function getRandomChallenges(
  challenges: Challenge[],
  count: number,
): Challenge[] {
  const shuffled = challenges.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Determines the number of challenges based on difficulty.
 * @param difficulty - The difficulty tier.
 * @returns The number of challenges.
 */
export function getChallengeCount(difficulty: ChallengeDifficulty): number {
  switch (difficulty) {
    case ChallengeDifficulty.NOVICE:
    case ChallengeDifficulty.INTERMEDIATE:
      return 3;
    case ChallengeDifficulty.EXPERIENCED:
    case ChallengeDifficulty.MASTER:
      return 4;
    case ChallengeDifficulty.GRANDMASTER:
      return 5;
    default:
      return 3;
  }
}
