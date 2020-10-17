import { ReactElement } from "react";
import { GroupMatch, Team } from "../../../pages";
import { Stats } from "../../gameParser";
import MatchDay from "./MatchDay";

interface Props {
    teams: Team[]; 
    matchData: GroupMatch[]
    gameData: Stats;
}
export default function MatchDays({gameData, matchData, teams}: Props): ReactElement {
    return <div>
        <div className={'days'}>
            <div className={'day'}><MatchDay matchData={matchData} day={1} teams={teams} gameData={gameData} /></div>
            <div className={'day'}><MatchDay matchData={matchData} day={2} teams={teams} gameData={gameData} /></div>
            <div className={'day'}><MatchDay matchData={matchData} day={3} teams={teams} gameData={gameData} /></div>
            <div className={'day'}><MatchDay matchData={matchData} day={4} teams={teams} gameData={gameData} /></div>
            <div className={'day'}><MatchDay matchData={matchData} day={5} teams={teams} gameData={gameData} /></div>
            <div className={'day'}><MatchDay matchData={matchData} day={6} teams={teams} gameData={gameData} /></div>
            <div className={'day'}><MatchDay matchData={matchData} day={7} teams={teams} gameData={gameData} /></div>
            <div className={'day'}><MatchDay matchData={matchData} day={8} teams={teams} gameData={gameData} /></div>
            <div className={'day'}><MatchDay matchData={matchData} day={9} teams={teams} gameData={gameData} /></div>
            <div className={'day'}><MatchDay matchData={matchData} day={10} teams={teams} gameData={gameData} /></div>
        </div>

        <style jsx>{`
            .days {
                display: flex;
                align-items: flex-start;
                flex-wrap: wrap;
                justify-content: center;
                margin: -1rem;
                margin-top: 4rem;
            }    

            .day {
                width: 100%;
                max-width: 25rem;
                padding: 1rem;
            }
        `}</style>
    </div>;

}