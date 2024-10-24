import { Message, MessageActionRow, MessageButton } from 'discord.js';
import * as challenges from '../../../challenges';
import { ChannelListener } from '../types';
import { setMessageExpiration } from '../utils';
import getChallengeCardMessage from '../../messages/challenge';
import { ChallengeCardStatus, ChallengeDifficulty } from '../../../database';

/**
 * Set error message to expire after 1 minute.
 */
const ERROR_LIFESPAN = 60 * 1000;

/**
 * This listener is for the #challenge-approval channel.
 */
const challengeApprovalMessageListener: ChannelListener = {
  channels: [
    /**
     * OSRS Leagues bot
     */
    '1292966146894467177',
    /**
     * Bot Testing Server
     */
    '1287884980386529300',
  ],
  onChannelMessage: async (message: Message) => {
    if (message.author.bot) {
      return;
    }
    const userId = message.author.id;
    const userDisplayName = message.author.username;
    try {
      const challengeMain = await challenges.loadChallengeMain(userId);
      if (challengeMain) {
        const currentDifficultyTier = challengeMain.difficulty;
        let currentChallengeStatus = challengeMain.status;
        if (currentChallengeStatus === ChallengeCardStatus.STARTED) {
          const existingChallenges = await challenges.loadChallengeCard(
            userId,
            currentDifficultyTier,
          );
          if (existingChallenges) {
            const challengeList = challenges.existingChallengesToList(
              existingChallenges,
              currentDifficultyTier,
            );
            const challengeEmbed = getChallengeCardMessage({
              difficulty: currentDifficultyTier,
              userDisplayName: userDisplayName,
              challenges: challengeList,
            });

            const approveButton = new MessageButton()
              .setCustomId(`approve ${userId} ${currentDifficultyTier}`)
              .setLabel('Approve')
              .setStyle('SUCCESS'); // Green button

            const rejectButton = new MessageButton()
              .setCustomId(`reject ${userId} ${currentDifficultyTier}`)
              .setLabel('Reject')
              .setStyle('DANGER'); // Red button

            const row = new MessageActionRow().addComponents(
              approveButton,
              rejectButton,
            );

            currentChallengeStatus = ChallengeCardStatus.APPROVAL;
            await challenges.updateChallengeMain(userId, {
              status: currentChallengeStatus,
            });
            await message.channel.send({
              embeds: [challengeEmbed],
              components: [row],
            });
          }
        } else if (currentChallengeStatus === ChallengeCardStatus.APPROVAL) {
          const response = await message.reply(
            'Your Challenge Card is already awaiting approval. Please wait for a decision.',
          );
          setMessageExpiration(message, 100);
          setMessageExpiration(response, ERROR_LIFESPAN);
          return;
        } else if (currentChallengeStatus === ChallengeCardStatus.COMPLETED) {
          if (currentDifficultyTier !== ChallengeDifficulty.GRANDMASTER) {
            const response = await message.reply(
              'Your Challenge Card has already been approved. Please generate a new Challenge Card in the Challenge Bot Commands channel.',
            );
            setMessageExpiration(message, 100);
            setMessageExpiration(response, ERROR_LIFESPAN);
            return;
          } else {
            const response = await message.reply(
              'You have completed all of the Challenge Cards for this event. There is nothing else left for you to do.',
            );
            setMessageExpiration(message, 100);
            setMessageExpiration(response, ERROR_LIFESPAN);
            return;
          }
        } else {
          const response = await message.reply(
            'You have not yet generated a Challenge Card. Please do so in the Challenge Bot Commands channel.',
          );
          setMessageExpiration(message, 100);
          setMessageExpiration(response, ERROR_LIFESPAN);
          return;
        }
      }
    } catch (error) {
      console.error('Error in challenge approval listener: ', error);
      const response = await message.reply(
        'There was an error processing your challenge approval request. Please try again later.',
      );
      setMessageExpiration(message, 100);
      setMessageExpiration(response, ERROR_LIFESPAN);
    }
  },
};

export default challengeApprovalMessageListener;
