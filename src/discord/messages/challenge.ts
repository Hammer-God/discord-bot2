import { MessageEmbed } from "discord.js";

import {
    getChallengeCount
  } from '../../challenges';
  
  type GetChallengeCardMessageParams = {
    difficulty: string;
    userDisplayName: string;
    challenges: string[];
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
          .map((challenge, index) => `**Challenge ${index + 1}:**\n${challenge}`)
          .join('\n\n'),
      );
  }

  /**
   * Determines the embed color based on difficulty.
   * @param difficulty - The difficulty tier.
   * @returns The color code.
   */
function getEmbedColour(difficulty: string): number {
    switch (difficulty) {
      case 'Novice':
        return 0x00ff00; // Green
      case 'Intermediate':
        return 0xffff00; // Yellow
      case 'Experienced':
        return 0xffa500; // Orange
      case 'Master':
        return 0xff0000; // Red
      case 'Grandmaster':
        return 0x800080; // Purple
      default:
        return 0x00ff00; // Default to green
    }
  }
  
  export default getChallengeCardMessage;