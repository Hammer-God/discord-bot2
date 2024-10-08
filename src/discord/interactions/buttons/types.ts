import { ButtonInteraction } from 'discord.js';

export interface Button {
  buttons: string[]; // Array of button custom IDs or prefixes to listen for
  onButtonInteraction: (interaction: ButtonInteraction) => Promise<void>; // The handler function
}
