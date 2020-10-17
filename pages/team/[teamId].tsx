import {promises as fs} from 'fs';
import { GroupMatch, Team as TeamData, TeamsData } from '..';
import { HeroStats, parseGames, PlayerHeroStats, playerTopHeroesForTeam, Stats, topPickBansParser } from '../../components/gameParser';
import PageFrame from '../../components/page/PageFrame';
import BackToOverview from '../../components/pages/team/BackToOverview';
import BanStats from '../../components/pages/team/BanStats';
import Header from '../../components/pages/team/Header';
import Interview from '../../components/pages/team/Interview';
import PickStats from '../../components/pages/team/PickStats';
import Players from '../../components/pages/team/Players';
import PostGameInterviews from '../../components/pages/team/PostGameInterviews';
import RecentMatches from '../../components/pages/team/RecentMatches';
import TeamStats from '../../components/pages/team/TeamStats';
import TwitterFeed from '../../components/pages/team/TwitterFeed';
import UpcomingMatches from '../../components/pages/team/UpcomingMatches';

interface Props {
  gameData: Stats;
  team: TeamData;
  teamsData: TeamsData;
  matches: GroupMatch[];
  pickBanStats: {
    [x: string]: HeroStats;
  };
  playerTeamStats: PlayerHeroStats;
}

const Team = ({gameData, team, teamsData, matches, pickBanStats, playerTeamStats}: Props) => {
  return <PageFrame>
      <BackToOverview />
      <Header team={team} />
      <TeamStats stats={gameData.teams[+team.teamId]!} />
      <Players team={team} playerTeamStats={playerTeamStats} />
      <PickStats pickBanStats={pickBanStats}/>
      <BanStats pickBanStats={pickBanStats} />
      <RecentMatches matches={matches.filter(({match_1, match_2}) => match_1 || match_2)} teams={teamsData.teams} teamId={team.teamId} gameData={gameData} />
      <UpcomingMatches matches={matches.filter(({match_1, match_2}) => !match_1 || !match_2)} teams={teamsData.teams} teamId={team.teamId} />
      <Interview team={team} />
      {team.interview && team.interview.length > 0 && <PostGameInterviews team={team} />}
      {team.twitter && team.twitter.length > 0 && <TwitterFeed team={team} />}
  </PageFrame>;
}

export async function getStaticProps({params: {teamId}}) {
  const rawData = await fs.readFile('./data/teams.json');
  const teamsData: TeamsData = JSON.parse(rawData as unknown as string);
  const matchesRawData = await fs.readFile('./data/matches.json');
  const matchData: GroupMatch[] = JSON.parse(matchesRawData as unknown as string);

  const team = teamsData.teams.find(({teamId: id}) => id === teamId);
  const relevantMatches = matchData.filter(({teamA, teamB}) => teamA === teamId || teamB === teamId);
  const gameData = await parseGames();
  const pickBanStats = topPickBansParser(relevantMatches, +teamId);
  const playerTeamStats = playerTopHeroesForTeam(relevantMatches, +teamId);

  return {
    props: {
      gameData,
      pickBanStats,
      playerTeamStats,
      team,
      teamsData,
      matches: relevantMatches,
    },
  }
}

export async function getStaticPaths() {
    const rawTeams = await fs.readFile('./data/teams.json');
    const response: TeamsData = JSON.parse(rawTeams as unknown as string);
    const teamIds = response.teams.map(({teamId}) => teamId);

  return {
    paths: teamIds.map((teamId) => ({params: {teamId}})),
    fallback: false,
  };
}


export default Team;
