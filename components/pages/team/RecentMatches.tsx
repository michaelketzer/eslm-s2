import { Fragment, ReactElement } from "react";
import { GroupMatch, Team } from "../../../pages";
import { Stats } from "../../gameParser";
import SectionHeader from "../../page/SectionHeader";
import RecentMatch from "./RecentMatch";

interface Props {
    matches: GroupMatch[];
    teams: Team[];
    teamId: string;
    gameData: Stats;
}

export default function RecentMatches({matches, teams, teamId, gameData}: Props): ReactElement | null {
    const relevantMatches = matches
        .filter(({match_1, match_2}) => match_1 || match_2)
        .sort(({date: a}, {date: b}) => b > a ? 1 : -1);

    //@ts-ignore
    if(relevantMatches.length > 0 || (relevantMatches.length === 1 && relevantMatches[0].match_1 !== 'x')) {
        return <div className={'upcomingMatches'}>
            <SectionHeader title={'Spiele'} />

            <div className={'recentMatchesGrid'}>
                {relevantMatches.map((match) => <Fragment key={match.date}>
                    {match.match_2 && <RecentMatch match={match.match_2} teams={teams} teamId={teamId} gameData={gameData} matchCount={2} disqualifiedTeam={match.disqualifiedTeam} />}
                    {match.match_1 && <RecentMatch match={match.match_1} teams={teams} teamId={teamId} gameData={gameData} matchCount={1} disqualifiedTeam={match.disqualifiedTeam}/>}
                </Fragment>)}
            </div>


            <style jsx>{`
                .matches {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                }    

                .upcomingMatches {
                    max-width: 1200px;
                    margin: 0 auto;
                    margin-top: 10rem;
                }
                
            `}</style>
        </div>;
    }

    return   null;
}
