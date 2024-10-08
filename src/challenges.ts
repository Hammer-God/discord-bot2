import {
  ChallengeMain,
  NoviceChallengeCard,
  IntermediateChallengeCard,
  ExperiencedChallengeCard,
  MasterChallengeCard,
  GrandmasterChallengeCard,
} from '../src/database/models';
import { ChallengeCardBase } from '../src/database/models/Challenge/ChallengeCard';
import * as challengesData from '../src/challengeList/challenges.json';

/**
 * // Counts the number of region roles the user has for challenge eligibility
 * @param userRoles - Discord roles the user has.
 * @returns - Number of region roles the user has.
 */
export function getRegionRoleCount(userRoles: string[]): number {
  const regionRoles = [
    'Asgarnia',
    'Kandarin',
    'Fremennik',
    'Desert',
    'Morytania',
    'Tirannwn',
    'Wilderness',
    'Kourend',
    'Varlamore',
  ];
  return userRoles.filter((role) => regionRoles.includes(role)).length;
}

/**
 * Counts the number of region roles required to generate a new challenge card at the given difficulty.
 * @param difficulty - The difficulty tier.
 * @returns - The number of roles required.
 */
export function getChallengeCardEligibility(difficulty: string): number {
  return difficulty === 'Novice' ? 1 : difficulty === 'Intermediate' ? 2 : 3; // Experienced, Master, and Grandmaster require 3
}

/**
 * Retrieves the appropriate ChallengeCard model based on difficulty.
 * @param difficulty - The difficulty tier.
 * @returns The corresponding ChallengeCard model or null if invalid.
 */
export function getChallengeCardModel(
  difficulty: string,
):
  | typeof NoviceChallengeCard
  | typeof IntermediateChallengeCard
  | typeof ExperiencedChallengeCard
  | typeof MasterChallengeCard
  | typeof GrandmasterChallengeCard
  | null {
  switch (difficulty) {
    case 'Novice':
      return NoviceChallengeCard;
    case 'Intermediate':
      return IntermediateChallengeCard;
    case 'Experienced':
      return ExperiencedChallengeCard;
    case 'Master':
      return MasterChallengeCard;
    case 'Grandmaster':
      return GrandmasterChallengeCard;
    default:
      return null;
  }
}

/**
 * Loads the ChallengeMain record for a given user.
 * @param userId - The user's ID.
 * @returns The ChallengeMain record or null if not found.
 */
export async function loadChallengeMain(
  userId: string,
): Promise<ChallengeMain | null> {
  return await ChallengeMain.findOne({ where: { user_id: userId } });
}

/**
 * Updates the ChallengeMain record for a given user.
 * @param userId - The user's ID.
 * @param updateData - The data to update.
 */
export async function updateChallengeMain(
  userId: string,
  updateData: Partial<ChallengeMain>,
): Promise<void> {
  const challengeMain = await loadChallengeMain(userId);
  if (challengeMain) {
    await challengeMain.update(updateData);
  } else {
    throw new Error(`ChallengeMain record not found for user ID: ${userId}`);
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
  difficulty: string,
): Promise<ChallengeCardBase | null> {
  const ChallengeCardModel = getChallengeCardModel(difficulty);
  if (!ChallengeCardModel) {
    throw new Error(`Invalid difficulty tier: ${difficulty}`);
  }
  return (await ChallengeCardModel.findOne({
    where: { user_id: userId },
  })) as ChallengeCardBase | null;
}

/**
 * Saves or updates the ChallengeCard for a user.
 * @param difficulty - The difficulty tier.
 * @param userId - The user's ID.
 * @param challenges - An array of challenge descriptions.
 */
export async function saveChallengeCard(
  userId: string,
  difficulty: string,
  challenges: string[],
  rerolled: number,
): Promise<void> {
  const ChallengeCardModel = getChallengeCardModel(difficulty);
  if (!ChallengeCardModel) {
    throw new Error(`Invalid difficulty tier: ${difficulty}`);
  }

  const challengeData: any = {
    user_id: userId,
    challengeOne: challenges[0],
    challengeTwo: challenges[1],
    challengeThree: challenges[2],
    rerolled: rerolled,
  };

  if (difficulty === 'Experienced' || difficulty === 'Master') {
    challengeData.challengeFour = challenges[3];
  } else if (difficulty === 'Grandmaster') {
    challengeData.challengeFour = challenges[3];
    challengeData.challengeFive = challenges[4];
  }

  // Upsert the challenge card (create or update)
  await ChallengeCardModel.upsert(challengeData);
}

export function existingChallengesToList(
  existingChallenges: ChallengeCardBase,
  difficulty: string,
): string[] {
  const challengeList: string[] = [];
  challengeList[0] = existingChallenges.challengeOne;
  challengeList[1] = existingChallenges.challengeTwo;
  challengeList[2] = existingChallenges.challengeThree;

  if (difficulty === 'Experienced' || difficulty === 'Master') {
    challengeList[3] = existingChallenges.challengeFour;
  } else if (difficulty === 'Grandmaster') {
    challengeList[3] = existingChallenges.challengeFour;
    challengeList[4] = existingChallenges.challengeFive;
  }
  return challengeList;
}

/**
 * Determines the next difficulty tier.
 * @param currentTier - The current difficulty tier.
 * @returns The next difficulty tier.
 */
export function getNextDifficultyTier(currentTier: string): string {
  const tiers = [
    'Novice',
    'Intermediate',
    'Experienced',
    'Master',
    'Grandmaster',
  ];
  const currentIndex = tiers.indexOf(currentTier);
  return currentIndex < tiers.length - 1
    ? tiers[currentIndex + 1]
    : 'Grandmaster';
}

/**
 * Generates new challenges based on difficulty and user roles.
 * @param difficulty - The difficulty tier.
 * @param userRoles - An array of user's role names.
 * @returns An array of newly generated challenge descriptions.
 */
export function generateNewChallenges(
  difficulty: string,
  userRoles: string[],
): string[] {
  const allChallenges = getEligibleChallenges(difficulty, userRoles);
  return getRandomChallenges(allChallenges, getChallengeCount(difficulty));
}

/**
 * Retrieves eligible challenges based on difficulty and user roles.
 * @param difficulty - The difficulty tier.
 * @param userRoles - An array of user's role names.
 * @returns An array of eligible challenge descriptions.
 */
function getEligibleChallenges(
  difficulty: string,
  userRoles: string[],
): string[] {
  return challengesData.challenges
    .filter(
      (challenge: {
        difficulty: string;
        region1: string;
        region2?: string;
      }) => {
        if (challenge.difficulty !== difficulty) {
          return false;
        }
        if (challenge.region1 === 'General') {
          return true;
        }
        if (challenge.region2) {
          return (
            userRoles.includes(challenge.region1) &&
            userRoles.includes(challenge.region2)
          );
        }
        return userRoles.includes(challenge.region1);
      },
    )
    .map((challenge: { description: string }) => challenge.description);
}

/**
 * Shuffles and selects a random subset of challenges.
 * @param challenges - An array of challenge descriptions.
 * @param count - Number of challenges to select.
 * @returns An array of selected challenge descriptions.
 */
function getRandomChallenges(challenges: string[], count: number): string[] {
  const shuffled = challenges.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

/**
 * Determines the number of challenges based on difficulty.
 * @param difficulty - The difficulty tier.
 * @returns The number of challenges.
 */
export function getChallengeCount(difficulty: string): number {
  switch (difficulty) {
    case 'Novice':
    case 'Intermediate':
      return 3;
    case 'Experienced':
    case 'Master':
      return 4;
    case 'Grandmaster':
      return 5;
    default:
      return 3;
  }
}
