import DiscordUser, { initializeDiscordUser } from './DiscordUser';
import ShatteredRelicsLeague, {
  initializeShatteredRelicsLeague,
} from './League/ShatteredRelicsLeague';
import TrailblazerLeague, {
  initializeTrailblazerLeague,
} from './League/TrailblazerLeague';
import TrailblazerReloadedLeague, {
  initializeTrailblazerReloadedLeague,
} from './League/TrailblazerReloadedLeague';
import TwistedLeague, { initializeTwistedLeague } from './League/TwistedLeague';
import ChallengeMain, {
  initializeChallengeMain,
} from './Challenge/ChallengeMain';
import NoviceChallengeCard, {
  initializeNoviceChallengeCard,
} from './Challenge/NoviceChallenge';
import IntermediateChallengeCard, {
  initializeIntermediateChallengeCard,
} from './Challenge/IntermediateChallenge';
import ExperiencedChallengeCard, {
  initializeExperiencedChallengeCard,
} from './Challenge/ExperiencedChallenge';
import MasterChallengeCard, {
  initializeMasterChallengeCard,
} from './Challenge/MasterChallenge';
import GrandmasterChallengeCard, {
  initializeGrandmasterChallengeCard,
} from './Challenge/GrandmasterChallenge';

const initializeModels = [
  initializeDiscordUser,
  initializeShatteredRelicsLeague,
  initializeTrailblazerLeague,
  initializeTrailblazerReloadedLeague,
  initializeTwistedLeague,
  initializeChallengeMain,
  initializeNoviceChallengeCard,
  initializeIntermediateChallengeCard,
  initializeExperiencedChallengeCard,
  initializeMasterChallengeCard,
  initializeGrandmasterChallengeCard,
];

export {
  DiscordUser,
  ShatteredRelicsLeague,
  TrailblazerLeague,
  TrailblazerReloadedLeague,
  TwistedLeague,
  ChallengeMain,
  NoviceChallengeCard,
  IntermediateChallengeCard,
  ExperiencedChallengeCard,
  MasterChallengeCard,
  GrandmasterChallengeCard,
};

export default initializeModels;
