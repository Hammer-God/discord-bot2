import { HexColorString } from 'discord.js';
import {
  ShatteredRelicsLeague,
  TrailblazerLeague,
  TrailblazerReloadedLeague,
  TwistedLeague,
} from './database/models';
import DiscordUser from './database/models/DiscordUser';
import { LeagueAttributes } from './database/models/League/League';
import { Attributes, UpsertOptions } from 'sequelize';

export const CURRENT_LEAGUE: League = 'trailblazer_reloaded';

export enum Rank {
  BRONZE = 'bronze',
  IRON = 'iron',
  STEEL = 'steel',
  MITHRIL = 'mithril',
  ADAMANT = 'adamant',
  RUNE = 'rune',
  DRAGON = 'dragon',
}

export type League =
  | 'twisted'
  | 'trailblazer'
  | 'shattered_relics'
  | 'trailblazer_reloaded';

export type PointRankings = { [key in Rank]: number };

export type Leagues = { [key in League]: PointRankings };

const LeagueRankings: Leagues = {
  twisted: {
    bronze: 10,
    iron: 80,
    steel: 510,
    mithril: 1770,
    adamant: 5270,
    rune: 10820,
    dragon: 20830,
  },
  trailblazer: {
    bronze: 100,
    iron: 510,
    steel: 2000,
    mithril: 6480,
    adamant: 18720,
    rune: 35680,
    dragon: 56310,
  },
  shattered_relics: {
    bronze: 100,
    iron: 480,
    steel: 1660,
    mithril: 5475,
    adamant: 15575,
    rune: 31980,
    dragon: 52545,
  },
  trailblazer_reloaded: {
    bronze: 2500,
    iron: 5000,
    steel: 10000,
    mithril: 18000,
    adamant: 28000,
    rune: 42000,
    dragon: 56000,
  },
};

const LeagueNames: { [key in League]: string } = {
  twisted: 'Twisted',
  trailblazer: 'Trailblazer',
  shattered_relics: 'Shattered Relics',
  trailblazer_reloaded: 'Trailblazer Reloaded',
};

const RankNames: { [key in Rank]: string } = {
  bronze: 'Bronze',
  iron: 'Iron',
  steel: 'Steel',
  mithril: 'Mithril',
  adamant: 'Adamant',
  rune: 'Rune',
  dragon: 'Dragon',
};

const RankColors: { [key in Rank]: HexColorString } = {
  bronze: '#795d38',
  iron: '#8f8f8f',
  steel: '#adadad',
  mithril: '#6f70a0',
  adamant: '#588658',
  rune: '#3d93bb',
  dragon: '#d81d06',
};

const LeagueDiscordColumn: { [key in League]: keyof DiscordUser } = {
  twisted: 'twisted_name',
  trailblazer: 'trailblazer_name',
  shattered_relics: 'shattered_relics_name',
  trailblazer_reloaded: 'trailblazer_reloaded_name',
};

export const getRank = (points: number, league: League): Rank => {
  const rankings: PointRankings = LeagueRankings[league];
  if (points >= rankings.dragon) return Rank.DRAGON;
  else if (points >= rankings.rune) return Rank.RUNE;
  else if (points >= rankings.adamant) return Rank.ADAMANT;
  else if (points >= rankings.mithril) return Rank.MITHRIL;
  else if (points >= rankings.steel) return Rank.STEEL;
  else if (points >= rankings.iron) return Rank.IRON;
  else return Rank.BRONZE;
};

export const getRankName = (rank: Rank) => {
  return RankNames[rank];
};

export const getRankColor = (rank: Rank) => {
  return RankColors[rank];
};

export const getLeagueName = (league?: League) => {
  return LeagueNames[league ?? CURRENT_LEAGUE];
};

export const getLeagueAttributes = async (
  league: League,
  username: string,
): Promise<LeagueAttributes> => {
  switch (league) {
    case 'twisted':
      return await TwistedLeague.findByPk(username);
    case 'trailblazer':
      return await TrailblazerLeague.findByPk(username);
    case 'shattered_relics':
      return await ShatteredRelicsLeague.findByPk(username);
    case 'trailblazer_reloaded':
      return await TrailblazerReloadedLeague.findByPk(username);
  }
};

export const insertLeagueName = async (
  league: League,
  username: string,
  points: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: UpsertOptions<Attributes<any>>,
) => {
  switch (league) {
    case 'twisted':
      return await TwistedLeague.upsert(
        {
          name: username,
          points: points,
        },
        options,
      );
    case 'trailblazer':
      return await TrailblazerLeague.upsert(
        {
          name: username,
          points: points,
        },
        options,
      );
    case 'shattered_relics':
      return await ShatteredRelicsLeague.upsert(
        {
          name: username,
          points: points,
        },
        options,
      );
    case 'trailblazer_reloaded':
      return await TrailblazerReloadedLeague.upsert(
        {
          name: username,
          points: points,
        },
        options,
      );
  }
};

export const getLeagueDiscordColumn = (league?: League) => {
  return LeagueDiscordColumn[league ?? CURRENT_LEAGUE];
};

export const setLeagueStandings = (
  pointRankings: PointRankings,
  league?: League,
) => {
  LeagueRankings[league ?? CURRENT_LEAGUE] = pointRankings;
};

export default LeagueRankings;
