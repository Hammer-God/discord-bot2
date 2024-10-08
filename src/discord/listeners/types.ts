import { ButtonInteraction, Message } from 'discord.js';

export type ChannelListener = {
  channels: string[];
  excludedRoles?: string[];
  onChannelMessage: (message: Message) => void;
};

export interface ButtonListener {
  buttons: string[]; // Array of button custom IDs or prefixes to listen for
  onButtonInteraction: (interaction: ButtonInteraction) => Promise<void>; // The handler function
}
