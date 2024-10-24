import { ButtonInteraction, Message, GuildMember } from 'discord.js';
import * as challenges from '../../../challenges';
import getChallengeCardMessage from '../../messages/challenge';
import { Button } from './types';
import {
  Challenge,
  ChallengeCardStatus,
  ChallengeDifficulty,
} from '../../../database';

const challengeRerollButton: Button = {
  buttons: ['reroll'],
  onButtonInteraction: async (interaction: ButtonInteraction) => {
    const { customId } = interaction;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_action, userId, _difficultyTier] = customId.split(' ');

    // Check if the interaction is from a guild and if the button presser is the owner of the challenge card attempting to be rerolled
    if (
      !(interaction.member instanceof GuildMember) ||
      interaction.member.user.id !== userId
    ) {
      return; // Do nothing if the button presser does not match the challenge card owner attempting to be rerolled
    }
    try {
      const member = interaction.member as GuildMember;
      const userRoles = member.roles.cache.map((role) => role.name);
      const userDisplayName = member.displayName;

      // Fetch user's challenge main record
      const challengeMain = await challenges.loadChallengeMain(userId);
      let currentDifficultyTier: ChallengeDifficulty;
      let currentChallengeStatus: ChallengeCardStatus;
      let numberOfRerolls: number;
      let challengeList: Challenge[] = [];
      if (challengeMain) {
        currentDifficultyTier = challengeMain.difficulty;
        currentChallengeStatus = challengeMain.status;
        numberOfRerolls = challengeMain.rerollsRemaining;
        if (numberOfRerolls <= 0) {
          await interaction.reply({
            content: `You do not have any rerolls remaining.`,
            ephemeral: true,
          });
          return;
        }
        if (currentChallengeStatus === ChallengeCardStatus.STARTED) {
          const existingChallenges = await challenges.loadChallengeCard(
            userId,
            currentDifficultyTier,
          );
          if (existingChallenges) {
            if (existingChallenges.rerollsRemaining === 0) {
              // Region role requirement check based on difficulty
              const regionRoleCount = challenges.getRegionRoleCount(userRoles);
              const requiredRegionRoles =
                challenges.getChallengeCardEligibility(currentDifficultyTier);

              if (regionRoleCount < requiredRegionRoles) {
                await interaction.reply({
                  content: `You need at least ${requiredRegionRoles} region role(s) to reroll challenges for ${currentDifficultyTier} difficulty. Please acquire the necessary region roles and try again.`,
                  ephemeral: true,
                });
                return;
              }

              // Reroll challenges
              challengeList = challenges.generateNewChallenges(
                currentDifficultyTier,
                userRoles,
              );

              // Save rerolled challenge card
              await challenges.saveChallengeCard(
                userId,
                currentDifficultyTier,
                challengeList,
                1,
              );

              // Decrement number of rerolls remaining
              --numberOfRerolls;

              // Update challengeMain's number of rerolls remaining
              await challenges.updateChallengeMain(userId, {
                rerollsRemaining: numberOfRerolls,
              });

              const challengeEmbed = getChallengeCardMessage({
                difficulty: currentDifficultyTier,
                userDisplayName: userDisplayName,
                challenges: challengeList,
              });

              await interaction.reply({ embeds: [challengeEmbed] });

              // Remove the buttons from the original message
              if (interaction.message instanceof Message) {
                await interaction.message.edit({ components: [] });
              }
            } else {
              await interaction.reply({
                content: `You have already rerolled a challenge card for the ${currentDifficultyTier} tier. You can only reroll a challenge card once per difficulty tier.`,
                ephemeral: true,
              });
              return;
            }
          } else {
            throw new Error(
              `Couldn't find challenge card attempting to be rerolled for: ${userId}`,
            );
          }
        } else {
          await interaction.reply({
            content: `You cannot reroll challenge cards that are completed or pending approval`,
            ephemeral: true,
          });
          return;
        }
      }
    } catch (error) {
      console.error('Error in Challenge Reroll Button listener: ', error);
      await interaction.reply({
        content: 'An error occurred while processing your request.',
        ephemeral: true,
      });
    }
  },
};

export default challengeRerollButton;
