import { SlashCommandBuilder } from '@discordjs/builders';
import { GuildMember, MessageActionRow, MessageButton } from 'discord.js';
import { Command } from './types';
import { channelGroups } from '../../Channel';
import { ChallengeMain } from '../../../database/models';
import * as challenges from '../../../challenges';
import getChallengeCardMessage from '../../messages/challenge';

const challengeCommand: Command = {
  channels: channelGroups.SAGE_CHALLENGE,
  data: new SlashCommandBuilder()
    .setName('challenge')
    .setDescription("Creates and displays the Sage's Challenge Card!"),

  execute: async (interaction) => {
    try {
      const member = interaction.member as GuildMember;
      const userId = member.id;
      const userDisplayName = member.displayName;
      const userRoles = member.roles.cache.map((role) => role.name);
      let rerolled = 0;

      // Fetch user's challenge main record
      let challengeMain = await challenges.loadChallengeMain(userId);
      let currentDifficultyTier = 'Novice';
      let currentChallengeStatus = 'Started';
      let challengeList: string[] = [];
      let numberOfRerolls = 0;

      if (challengeMain) {
        currentDifficultyTier = challengeMain.currentDifficultyTier;
        currentChallengeStatus = challengeMain.currentChallengeStatus;
        numberOfRerolls = challengeMain.numberOfRerolls;

        // Check if user has completed Grandmaster
        if (currentDifficultyTier === 'Grandmaster' && currentChallengeStatus === 'Completed') {
          await interaction.reply({
            content: "You have completed the Sage's Challenge event! There's nothing left to do.",
            ephemeral: true,
          });
          return;
        }
        if (currentChallengeStatus === 'Started' || currentChallengeStatus === 'Approval') {
          // Load existing challenges
          const existingChallenges = await challenges.loadChallengeCard(userId, currentDifficultyTier);
          rerolled = existingChallenges.rerolled;
          if (existingChallenges) {
            challengeList = challenges.existingChallengesToList(existingChallenges, currentDifficultyTier);
          }
        } 
        else if (currentChallengeStatus === 'Completed') {
          // Promote to next tier
          const nextTier = challenges.getNextDifficultyTier(currentDifficultyTier);
          currentDifficultyTier = nextTier;
          currentChallengeStatus = 'Started';

          // Region role requirement check based on difficulty
          const regionRoleCount = challenges.getRegionRoleCount(userRoles);
          const requiredRegionRoles = challenges.getChallengeCardEligibility(currentDifficultyTier);

          if (regionRoleCount < requiredRegionRoles) {
            await interaction.reply({content: `You need at least ${requiredRegionRoles} region role(s) to generate challenges for ${currentDifficultyTier} difficulty. Please acquire the necessary region roles and try again.`, ephemeral: true});
            return;
          }

          // Generate new challenges for the next tier
          challengeList = challenges.generateNewChallenges(currentDifficultyTier, userRoles);

          // Save new challenges
          await challenges.saveChallengeCard(userId, currentDifficultyTier, challengeList, rerolled);
          
          // Update ChallengeMain with new tier and status
          await challenges.updateChallengeMain(userId, {currentDifficultyTier, currentChallengeStatus});
        }
      } 
      else {

        // Region role requirement check based on difficulty
        const regionRoleCount = challenges.getRegionRoleCount(userRoles);
        const requiredRegionRoles = challenges.getChallengeCardEligibility('Novice');

        if (regionRoleCount < requiredRegionRoles) {
          await interaction.reply({content: `You need at least ${requiredRegionRoles} region role(s) to generate challenges for Novice difficulty. Please acquire the necessary region roles and try again.`, ephemeral: true});
          return;
        }
        // New user: Create Novice challenges and ChallengeMain entry
        challengeList = challenges.generateNewChallenges('Novice', userRoles);

        // Create ChallengeMain entry
        challengeMain = await ChallengeMain.create({user_id: userId, currentDifficultyTier: 'Novice', currentChallengeStatus: 'Started', numberOfRerolls: 2});

        // Save Novice challenges
        await challenges.saveChallengeCard(userId, 'Novice', challengeList, rerolled);
      }

      // Create and send the embedded challenge card message
      const challengeEmbed = getChallengeCardMessage({difficulty: currentDifficultyTier, userDisplayName: userDisplayName, challenges: challengeList})

      // Add "Reroll" button if rerolls are available and not already rerolled
      if (challengeMain.numberOfRerolls > 0 && !rerolled) {
        const rerollButton = new MessageButton().setCustomId(`reroll ${userId} ${currentDifficultyTier}`).setLabel(`Reroll (${challengeMain.numberOfRerolls} remaining)`).setStyle('PRIMARY');
        const row = new MessageActionRow().addComponents(rerollButton);

        await interaction.reply({ embeds: [challengeEmbed], components: [row] });
      }
      else {
        await interaction.reply({ embeds: [challengeEmbed]});
      }
    } 
    catch (error) {
      console.error('Error executing challenge command: ', error);
      await interaction.reply({content: 'There was an error processing your challenge. Please try again later.', ephemeral: true});
    }
  },
};

export default challengeCommand;