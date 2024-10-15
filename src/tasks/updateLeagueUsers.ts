import { fetchHiscoreUser } from '.';
import sequelize from '../database';
import { DiscordUser } from '../database/models';
import {
  CURRENT_LEAGUE,
  getLeagueDiscordColumn,
  getLeagueName,
  insertLeagueName,
} from '../leagues';
import { Task } from './types';

const updateLeagueUsers: Task = {
  execute: async () => {
    console.log(`Running league users update task...`);
    try {
      const leagueNameIdentifier = getLeagueDiscordColumn(CURRENT_LEAGUE);
      const discordUsers = await DiscordUser.findAll();
      console.log(
        `Attempting hiscores point fetch on ${
          discordUsers.length
        } ${getLeagueName()} usernames.`,
      );

      const updatedUsers: { name: string; points: number }[] = [];
      for (const discordUser of discordUsers) {
        const leagueUserName = discordUser[leagueNameIdentifier] as string;
        if (leagueUserName?.length > 0) {
          try {
            const hiscoreResult = await fetchHiscoreUser.execute({
              username: leagueUserName,
            });
            if (hiscoreResult) {
              updatedUsers.push({
                name: leagueUserName,
                points: hiscoreResult.league_points,
              });
            }
          } catch (error) {
            console.error(
              `Error fetching hiscores for ${discordUser.trailblazer_reloaded_name}: `,
              error,
            );
          }
        }
      }
      if (updatedUsers.length > 0) {
        const updateTransaction = await sequelize.transaction();
        for (const user of updatedUsers) {
          await insertLeagueName(CURRENT_LEAGUE, user.name, user.points, {
            transaction: updateTransaction,
          });
        }
        await updateTransaction.commit();
      }
      console.log(
        `Fetched ${
          updatedUsers.length
        } ${getLeagueName()} user's league points.`,
      );
      return true;
    } catch (error) {
      console.error('Error running updateLeagueUsers task.', error);
      return false;
    }
  },
};

export default updateLeagueUsers;
