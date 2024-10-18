import { postLeagueRankings } from '../../tasks';
import { Job } from '../types';

const postLeagueRankingsJob: Job = {
  enabled: false,
  interval: {
    test: undefined,
    development: '*/1 * * * *', //'* * * * *',
    stage: '*/10 * * * *',
    production: '0 */6 * * *',
  },
  runOnStart: false,
  execute: () => {
    try {
      postLeagueRankings.execute();
    } catch (error) {
      console.error('Error executing postLeagueRankingsJob.', error);
    }
  },
};

export default postLeagueRankingsJob;
