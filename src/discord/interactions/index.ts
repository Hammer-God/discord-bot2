import { handleButtonInteraction } from '../listeners';
import { handleCommandInteraction } from './commands';
import { handleSelectMenuInteraction } from './selectMenus';

const interactions = [
  handleCommandInteraction,
  handleSelectMenuInteraction,
  handleButtonInteraction,
];

export default interactions;
