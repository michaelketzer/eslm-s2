import { ReactElement } from "react";
import { Stats } from "../../gameParser";
import Heroes from "./Heroes";

interface Props {
    game: Stats['matches'][0];
    winner: 'a' | 'b';
    reversedTeams?: boolean;
    matchId: number;
    match: number;
}

export function secondsToTime(seconds: number): string {
    if(seconds > 0) {
        const min = Math.floor(seconds / 60);
        let sec: number | string = seconds % 60;
        sec = sec < 10  ? '0' + sec : sec;
        return `${min}m ${sec}s`;
    }
    return '';
}


export default function MatchDetails({game, winner, reversedTeams = false, matchId, match = 1}: Props): ReactElement {
    const teamANetPerc = ((reversedTeams ? game.netTeamB : game.netTeamA) * 100 ) / (game.netTeamB + game.netTeamA);

    return <div className={'matchDetails'}>
        <div className={'details'}>
            <div className={'row'}>
                <div className={'name'}>Match {match}</div>
                <div className={'duration'}>{secondsToTime(game.duration)}</div>
            </div>

            <div className={'statsPages'}>
                <a href={'https://stratz.com/matches/' + matchId} target={'_blank'} title={'Stratz'}>
                    <img src={'/icons/Stratz-icon.png'} className={'statsPageIcon'} />
                </a>
                <a href={'https://dotabuff.com/matches/' + matchId} target={'_blank'} title={'Dotabuff'}>
                    <img src={'/icons/DOTABUFF-icon.png'} className={'statsPageIcon'} />
                </a>
            </div>
        </div>
        <div className={'picks'}>
            <div className={'winnerFlag'}>
                {winner === 'a' && <div className={'flag'} />}
            </div>
            <Heroes heroes={reversedTeams ? game.teamB : game.teamA} />
            <div className={'vs'}>vs</div>
            <Heroes heroes={reversedTeams ? game.teamA : game.teamB} />
            <div className={'winnerFlag'}>
                {winner === 'b' && <div className={'flag'} />}
            </div>
        </div>

        <style jsx>{`
            .details, .row, .picks, .statsPages {
                display: flex;
                align-items: center;
            }

            .statsPageIcon {
                height: 1rem;
                width: 1rem;
                margin-right: .25rem;
            }

            .statsPageIcon:last-item {
                margin-right: 0;
            }

            .matchDetails {
                padding: .2rem .5rem;
            }    

            .details {
                font-size: .7rem;
                margin-bottom: .2rem;
                justify-content: space-between;
            }

            .picks {
                justify-content: center;
            }

            .winnerFlag {
                width: 1rem;
                height: 1rem;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }

            .flag {
                height: .5rem;
                width: .5rem;
                border-radius: .25rem;
                background-color: var(--yellow-accent);
            }

            .duration {
                font-size: .7rem;
                color: #999;
                margin-left: .5rem;
            }

            .vs {
                color: #999;
                margin: 0 .2rem;
                font-size: .7rem;
            }

            .netCompareGraph {
                height: 3px;
                width: calc(100% - 2rem);
                background-color: #666;
                margin: 0 1rem;
                margin-top: 2px;
            }
            .teamANet {
                background-color: var(--yellow-accent);
                height: 3px;
                width: 0;
                transition: width: 120ms ease-in-out;
            }
        `}</style>
    </div>

}