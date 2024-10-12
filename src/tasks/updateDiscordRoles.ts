import { DiscordUser } from '../database/models';
import { Task } from '.';
import { client } from '../discord';
import { setLeagueRole } from '../discord/actions';
import {
  CURRENT_LEAGUE,
  getLeagueAttributes,
  getLeagueDiscordColumn,
  getLeagueName,
  getRank,
} from '../leagues';
import config from '../config';
import { Op } from 'sequelize';

const updateDiscordRoles: Task<undefined, number> = {
  execute: async () => {
    console.log('Updating all discord roles to latest ranks...');
    try {
      const guild = client.guilds.cache.get(config.guild_id);
      if (guild) {
        let amountUpdated = 0;
        const leagueNameIdentifier = getLeagueDiscordColumn(CURRENT_LEAGUE);
        const discordUsers = await DiscordUser.findAll({
          where: { [leagueNameIdentifier]: { [Op.ne]: null } },
        });
        for (const discordUser of discordUsers) {
          if (discordUser) {
            const guildMember = guild.members.cache.get(discordUser.user_id);
            if (guildMember) {
              const leagueUser = await getLeagueAttributes(
                CURRENT_LEAGUE,
                discordUser.get(leagueNameIdentifier) as string,
              );
              if (leagueUser) {
                const rank = getRank(leagueUser.points, CURRENT_LEAGUE);
                await setLeagueRole({
                  league: CURRENT_LEAGUE,
                  rank: rank,
                  member: guildMember,
                  guild: guild,
                });
                amountUpdated++;
              }
            }
          }
        }
        console.log(
          `Updated ${amountUpdated} discord user's ${getLeagueName(
            CURRENT_LEAGUE,
          )}.`,
        );
        return amountUpdated;
      } else {
        console.error(`Unable to find guild: ${config.guild_id}`);
        return 0;
      }
    } catch (error) {
      console.error('Error running updateDiscordRoles task.', error);
      return 0;
    }
  },
};

export default updateDiscordRoles;
