import {
  CacheType,
  Collection,
  GuildMemberRoleManager,
  Interaction,
} from 'discord.js';

import pingCommand from './ping';
import fetchLeagueRanksCommand from './fetch_league_ranks';
import hiscoresCommand from './hiscores';
import leagueNameCommand from './league_name';
import leagueRanksCommand from './league_ranks';
import removeLeagueRolesCommand from './remove_league_roles';
import updateLeaguePointsCommand from './update_league_points';
import updateAllRolesCommand from './update_all_roles';
import { Command } from './types';
import leagueNameLocal from './leagueNameLocal';
import { CURRENT_LEAGUE } from '../../../leagues';
import regionCommand from './regions';
import removeRegionRoleCommand from './remove_region_role';
import leagueNameRemote from './leagueNameRemote';
import challengeCommand from './challenge';

const commandData = [
  pingCommand,
  fetchLeagueRanksCommand,
  hiscoresCommand,
  leagueNameCommand,
  leagueNameLocal('shattered_relics'),
  leagueNameLocal('trailblazer'),
  leagueNameLocal('twisted'),
  leagueNameRemote(CURRENT_LEAGUE),
  //leagueNameBronze(CURRENT_LEAGUE),
  leagueRanksCommand,
  regionCommand,
  removeLeagueRolesCommand,
  removeRegionRoleCommand,
  updateLeaguePointsCommand,
  updateAllRolesCommand,
  challengeCommand,
];

const commands = new Collection<string, Command>();
commandData.forEach((command) => {
  commands.set(command.data.name, command);
});

const handleCommandInteraction = async (
  interaction: Interaction<CacheType>,
) => {
  if (!interaction?.isCommand()) return;

  const command = commands.get(interaction.commandName);

  if (!command) return;

  if (
    command.channels?.length > 0 &&
    !command.channels.includes(interaction.channel.id)
  ) {
    return interaction.reply('You cannot use this command in this channel.');
  }
  if (command.roles?.length > 0) {
    let hasRole = false;
    const memberRoles = interaction.member.roles as GuildMemberRoleManager;
    for (const role of command.roles) {
      if (memberRoles.cache.has(role)) {
        hasRole = true;
        break;
      }
    }
    if (!hasRole) {
      return interaction.reply(
        'You do not have permission to use this command.',
      );
    }
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction) {
      return interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  }
};

export { commandData, commands, handleCommandInteraction };
