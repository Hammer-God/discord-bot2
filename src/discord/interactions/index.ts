import { handleButtonInteraction } from './buttons';
import { handleCommandInteraction } from './commands';
import { handleSelectMenuInteraction } from './selectMenus';

const interactions = [
  handleCommandInteraction,
  handleSelectMenuInteraction,
  handleButtonInteraction,
];

export default interactions;
