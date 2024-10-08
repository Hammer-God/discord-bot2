import { Message } from 'discord.js';

export type ChannelListener = {
  channels: string[];
  excludedRoles?: string[];
  onChannelMessage: (message: Message) => void;
};
