import { fetchLeaguePointRankings } from '../../tasks';
import { Job } from '../types';

const leaguePointRankingsJob: Job = {
  enabled: false,
  interval: {
    test: undefined,
    development: undefined, //'* * * * *',
    stage: '0 0 * * *',
    production: '0 */1 * * *',
  },
  runOnStart: true,
  execute: () => {
    try {
      fetchLeaguePointRankings.execute();
    } catch (error) {
      console.error('Error executing leaguePointRankingsJob.', error);
    }
  },
};

export default leaguePointRankingsJob;
