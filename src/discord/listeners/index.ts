import { Message } from 'discord.js';
import impSpottingListener from './messageListeners/impSpottingListener';
import challengeApprovalMessageListener from './messageListeners/challengeApprovalListener';

const messageListeners = [
  impSpottingListener,
  challengeApprovalMessageListener,
];

export const handleMessageCreate = (message: Message) => {
  const validChannels = messageListeners.filter((listener) =>
    listener.channels.includes(message.channelId),
  );
  validChannels.forEach((channel) => channel.onChannelMessage(message));
};
