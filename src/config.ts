import * as dotenv from 'dotenv';
import { League, Rank } from './leagues';

dotenv.config();

export type Environment = 'test' | 'development' | 'stage' | 'production';

export type BotConfig = {
  discord_bot: {
    application_id: string;
    token: string;
  };
  database: {
    database: string;
    host: string;
    password: string;
    username: string;
  };
  environment: Environment;
  guild_id: string;
  imp_spotting_time: number;
  channels: {
    statistics: string;
  };
  ranks: {
    [key in League]: {
      [key in Rank]: string;
    };
  };
};

const config: BotConfig = {
  discord_bot: {
    application_id: process.env.APPLICATION_ID,
    token: process.env.TOKEN,
  },
  database: {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  environment: process.env.NODE_ENV as Environment,
  guild_id: process.env.GUILD_ID,
  imp_spotting_time: parseInt(process.env.IMP_SPOTTING_TIME ?? '1'),
  channels: {
    statistics: process.env.STATISTICS_ID,
  },
  ranks: {
    twisted: {
      bronze: process.env.TWISTED_BRONZE,
      iron: process.env.TWISTED_IRON,
      steel: process.env.TWISTED_STEEL,
      mithril: process.env.TWISTED_MITHRIL,
      adamant: process.env.TWISTED_ADAMANT,
      rune: process.env.TWISTED_RUNE,
      dragon: process.env.TWISTED_DRAGON,
    },
    trailblazer: {
      bronze: process.env.TRAILBLAZER_BRONZE,
      iron: process.env.TRAILBLAZER_IRON,
      steel: process.env.TRAILBLAZER_STEEL,
      mithril: process.env.TRAILBLAZER_MITHRIL,
      adamant: process.env.TRAILBLAZER_ADAMANT,
      rune: process.env.TRAILBLAZER_RUNE,
      dragon: process.env.TRAILBLAZER_DRAGON,
    },
    shattered_relics: {
      bronze: process.env.SHATTERED_RELICS_BRONZE,
      iron: process.env.SHATTERED_RELICS_IRON,
      steel: process.env.SHATTERED_RELICS_STEEL,
      mithril: process.env.SHATTERED_RELICS_MITHRIL,
      adamant: process.env.SHATTERED_RELICS_ADAMANT,
      rune: process.env.SHATTERED_RELICS_RUNE,
      dragon: process.env.SHATTERED_RELICS_DRAGON,
    },
    trailblazer_reloaded: {
      bronze: process.env.TRAILBLAZER_RELOADED_BRONZE,
      iron: process.env.TRAILBLAZER_RELOADED_IRON,
      steel: process.env.TRAILBLAZER_RELOADED_STEEL,
      mithril: process.env.TRAILBLAZER_RELOADED_MITHRIL,
      adamant: process.env.TRAILBLAZER_RELOADED_ADAMANT,
      rune: process.env.TRAILBLAZER_RELOADED_RUNE,
      dragon: process.env.TRAILBLAZER_RELOADED_DRAGON,
    },
  },
};

export default config;
