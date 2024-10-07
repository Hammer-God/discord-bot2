import { ButtonInteraction, Message } from 'discord.js';
import impSpottingListener from './messageListeners/impSpottingListener';
import challengeApprovalMessageListener from './messageListeners/challengeApprovalListener';
import challengeApprovalButtonListener from './buttonListeners/challengeApprovalListener';
import challengeRerollButtonListener from './buttonListeners/challengeRerollListener';

const messageListeners = [impSpottingListener, challengeApprovalMessageListener];
const buttonListeners = [challengeApprovalButtonListener, challengeRerollButtonListener];

export const handleMessageCreate = (message: Message) => {
  const validChannels = messageListeners.filter((listener) =>
    listener.channels.includes(message.channelId),
  );
  validChannels.forEach((channel) => channel.onChannelMessage(message));
};

export const handleButtonInteraction = async (interaction: ButtonInteraction) => {
  if (!interaction.customId) 
  {
    return;
  }

  // Filter listeners that start with the button customId
  const validListeners = buttonListeners.filter((listener) =>
    listener.buttons.some((buttonId) => interaction.customId.startsWith(buttonId)),
  );

  // Trigger the valid listeners' handler functions
  await Promise.all(validListeners.map((listener) => listener.onButtonInteraction(interaction)));
};
