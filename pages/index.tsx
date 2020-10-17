import {promises as fs} from 'fs';
import { parseGames, Stats } from '../components/gameParser';
import PageFrame from '../components/page/PageFrame';
import Groups from '../components/pages/index/Groups';
import PageHeader from '../components/pages/index/Header';
import MatchDays from '../components/pages/index/MatchDays';
import QuestionRounds from '../components/pages/index/QuestionRounds';

//#region <interfaces>
export interface TeamPlayer {
  steamId: string;
  pos: number;
  name: string;
  type: 'captain' | 'player' | 'standin';
  code: string;
  social: string;
}

export interface Team {
  teamId: string;
  twitter: string;
  name: string;
  avatarUrl: string;
  shortHand: string;
  group: 'a' | 'b';
  players: TeamPlayer[];
  video: string;
  interview: string[];
  change?: number;
}

export interface TeamsData {
  teams: Team[];
}

export interface GroupMatch {
  day: number;
  date: string;
  teamA: string;
  teamB: string;
  group: 'a' | 'b';
  match_1: number | null;
  match_2: number | null;
  disbanded: boolean;
  disqualifiedTeam: string;
}
//#endregion

const Home = ({teamsData: {teams}, matchData, gameData}: {teamsData: TeamsData; matchData:GroupMatch[]; gameData: Stats}) => {
  return <PageFrame>
    <PageHeader />
    <Groups teams={teams} gameData={gameData}/>
    <MatchDays matchData={matchData} teams={teams} gameData={gameData}/>
    <QuestionRounds />
  </PageFrame>;
}

export async function getStaticProps() {
  const rawData = await fs.readFile('./data/teams.json');
  const teamsData: TeamsData = JSON.parse(rawData as unknown as string);
  const matchesRawData = await fs.readFile('./data/matches.json');
  const matchData: GroupMatch[] = JSON.parse(matchesRawData as unknown as string);
  const gameData = await parseGames();
  return {
    props: {
      teamsData,
      matchData,
      gameData
    },
  }
}

export default Home;
