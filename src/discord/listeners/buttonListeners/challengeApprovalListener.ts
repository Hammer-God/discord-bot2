import { ButtonInteraction, Message, GuildMember } from 'discord.js';
import * as challenges from '../../../challenges';
import { ButtonListener } from '../types';

const challengeApprovalButtonListener : ButtonListener = {
    buttons: ['approve', 'reject'],
    onButtonInteraction: async (interaction: ButtonInteraction) => {
        const { customId } = interaction;
        const [action, userId, difficultyTier] = customId.split(' ');

        // Check if the interaction is from a guild and if the member is an admin
        if (!(interaction.member instanceof GuildMember) /*|| !interaction.member.permissions.has('ADMINISTRATOR')*/) {
            return; // Do nothing if the user is not an admin
        }
        try {
            if (action === 'approve') {
                let challengeMain = await challenges.loadChallengeMain(userId);
                if (challengeMain) {
                    challengeMain.currentChallengeStatus = 'Completed';
                    await challenges.updateChallengeMain(userId, { currentChallengeStatus: 'Completed' });

                    // Send a DM to the user
                    const targetUser = await interaction.client.users.fetch(userId);
                    await targetUser.send(`Your challenge card has been approved for the difficulty tier: ${difficultyTier}. Congratulations!`);

                    // Remove the buttons from the original message
                    if (interaction.message instanceof Message) {
                        await interaction.message.edit({ components: [] });
                    }
                    await interaction.reply({ content: 'Challenge approved and user notified.', ephemeral: true });
                }
            } 
            else if (action === 'reject') {
                let challengeMain = await challenges.loadChallengeMain(userId);
                if (challengeMain) {
                    challengeMain.currentChallengeStatus = 'Started';
                    await challenges.updateChallengeMain(userId, { currentChallengeStatus: 'Completed' });
                    // Standard rejection reason
                    const standardReason = 'Your evidence did not meet the requirements for the challenges set in your Challenge Card.';

                    // Send a DM to the user with the standard rejection reason
                    const targetUser = await interaction.client.users.fetch(userId);
                    await targetUser.send(`Your challenge card has been rejected for the difficulty tier: ${difficultyTier}. Reason: ${standardReason}`);

                    // Remove the buttons from the original message
                    if (interaction.message instanceof Message) {
                        await interaction.message.edit({ components: [] });
                    }
                    await interaction.reply({ content: 'Challenge rejected and user notified.', ephemeral: true });
                }
            }
        } 
        catch (error) {
            console.error('Error in Challenge Approval Button listener: ', error);
            await interaction.reply({ content: 'An error occurred while processing your request.', ephemeral: true });
        }
    },
};

export default challengeApprovalButtonListener;