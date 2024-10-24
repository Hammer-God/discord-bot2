import DiscordUser from './DiscordUser';
import ShatteredRelicsLeague from './League/ShatteredRelicsLeague';
import TrailblazerLeague from './League/TrailblazerLeague';
import TrailblazerReloadedLeague from './League/TrailblazerReloadedLeague';
import TwistedLeague from './League/TwistedLeague';
import Challenge from './Challenge/Challenge';
import ChallengeCard from './Challenge/ChallengeCard';
import Region from './Region';

const models = [
  Challenge,
  ChallengeCard,
  DiscordUser,
  ShatteredRelicsLeague,
  TrailblazerLeague,
  TrailblazerReloadedLeague,
  TwistedLeague,
  Region,
];

export {
  Challenge,
  ChallengeCard,
  DiscordUser,
  ShatteredRelicsLeague,
  TrailblazerLeague,
  TrailblazerReloadedLeague,
  TwistedLeague,
  Region,
};

export * from './Challenge';
export * from './types';

export default models;
