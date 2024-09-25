import { Client, Intents, Interaction } from 'discord.js';

import config from '../config';
import { handleButtonInteraction, handleMessageCreate } from './listeners/';
import buttonListener from './listeners/buttonListeners/challengeApprovalListener'; 
import interactions from './interactions';

export const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

export const initializeDiscord = (callback?: () => void) => {
  client.once('ready', () => {
    console.log('Started OSRS Leagues Bot!');
    callback?.();
  });

  // Handle messageCreate event
  client.on('messageCreate', handleMessageCreate);

  // Handle button interactions
  client.on('interactionCreate', async (interaction: Interaction) => {
    if (interaction.isButton()) {
      await handleButtonInteraction(interaction)
    }
  });

  // Initialize other interaction handlers
  interactions.forEach((interactionHandler) => {
    client.on('interactionCreate', interactionHandler);
  });

  client.login(config.discord_bot.token);
};
