import { ReactElement } from "react";
import { Team } from "../../../pages";
import { PlayerHeroStats } from "../../gameParser";
import PlayerGroup from "./PlayerGroup";

interface Props {
    playerTeamStats: PlayerHeroStats;
    team: Team;
}

export default function Players({playerTeamStats, team}: Props): ReactElement {
    const base = team.players.filter(({type}) => type === 'captain' || type === 'player');
    const standIns = team.players.filter(({type}) => type === 'standin');

    return <div className={'players'}>
        <div className={'playerGroup'}>
            <PlayerGroup players={base} title={'Stammspieler'} playerTeamStats={playerTeamStats}/>
        </div>
        {standIns.length > 0 && <div className={'playerGroup'}>
            <PlayerGroup players={standIns} title={'Standins'} playerTeamStats={playerTeamStats}/>
        </div>}

        <style jsx>{`
            .players {
                display: flex;
                align-items: flex-start;
                flex-wrap: wrap;
                justify-content: center;
                margin: -1rem;
            }    

            .playerGroup {
                width: 100%;
                max-width: 25rem;
                padding: 1rem;
            }
        `}</style>
    </div>;
}