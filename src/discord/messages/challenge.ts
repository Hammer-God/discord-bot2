import { MessageEmbed } from 'discord.js';

import { getChallengeCount } from '../../challenges';
import { Challenge, ChallengeDifficulty } from '../../database';

type GetChallengeCardMessageParams = {
  difficulty: ChallengeDifficulty;
  userDisplayName: string;
  challenges: Challenge[];
};

const getChallengeCardMessage = ({
  difficulty,
  userDisplayName,
  challenges,
}: GetChallengeCardMessageParams): MessageEmbed => {
  const embedColour = getEmbedColour(difficulty);
  const challengeCount = getChallengeCount(difficulty);

  return new MessageEmbed()
    .setColor(embedColour)
    .setTitle(`Sage's ${difficulty} Challenge Card for ${userDisplayName}`)
    .setDescription(
      challenges
        .slice(0, challengeCount)
        .map(
          (challenge, index) =>
            `**Challenge ${index + 1}:**\n${challenge.description}`,
        )
        .join('\n\n'),
    );
};

/**
 * Determines the embed color based on difficulty.
 * @param difficulty - The difficulty tier.
 * @returns The color code.
 */
function getEmbedColour(difficulty: ChallengeDifficulty): number {
  switch (difficulty) {
    case ChallengeDifficulty.NOVICE:
      return 0x00ff00; // Green
    case ChallengeDifficulty.INTERMEDIATE:
      return 0xffff00; // Yellow
    case ChallengeDifficulty.EXPERIENCED:
      return 0xffa500; // Orange
    case ChallengeDifficulty.MASTER:
      return 0xff0000; // Red
    case ChallengeDifficulty.GRANDMASTER:
      return 0x800080; // Purple
    default:
      return 0x00ff00; // Default to green
  }
}

export default getChallengeCardMessage;
