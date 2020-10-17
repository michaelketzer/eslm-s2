import dayjs from "dayjs";
import { ReactElement } from "react";
import { Team } from "../../../pages";
import { Stats } from "../../gameParser";
import Heroes from "../index/Heroes";
import { secondsToTime } from "../index/MatchDetails";


interface Props {
    match: number;
    teams: Team[];
    teamId: string;
    matchCount: number;
    gameData: Stats;
    disqualifiedTeam?: string;
}

export default function RecentMatch({gameData, match, teams, teamId, matchCount, disqualifiedTeam}: Props): ReactElement | null {
    //@ts-ignore
    if(match === 'x') {
        return null;
    }
    const game = gameData.matches[match];
    const teamA = teams.find(({teamId: id}) => +id === game.radiantTeamId); 
    const teamB = teams.find(({teamId: id}) => +id === game.direTeamId);
    const isRadiant = game.radiantTeamId === +teamId;
    const won = !disqualifiedTeam ? game.winner === +teamId : disqualifiedTeam !== teamId;

    return <div className={'recentMatch'}>
        {disqualifiedTeam && <div className={'disqInfo'}>Geändert aufgrund von Disqualifizierung eines Teams</div>}
        <div className={'header'}>
            {won && <div className={'won'}>GEWONNEN</div>}
            {!won && <div className={'lost'}>VERLOREN</div>}
            

            <div className={'date'}>
                {game.date && <>{dayjs.unix(game.date).format('DD.MM. HH:mm')}, </>} Match {matchCount}, {secondsToTime(game.duration)}
            </div>

            <div className={'statsPages'}>
                <a href={'https://stratz.com/matches/' + match} target={'_blank'} title={'Stratz'}>
                    <img src={'/icons/Stratz-icon.png'} className={'statsPageIcon'} />
                </a>
                <a href={'https://dotabuff.com/matches/' + match} target={'_blank'} title={'Dotabuff'}>
                    <img src={'/icons/DOTABUFF-icon.png'} className={'statsPageIcon'} />
                </a>
            </div>
        </div>

        <div className={'row'}>
            <div className={'teamLogo teamALogo'}>
                <img className={'logo'} src={'/teams/' + (isRadiant ? teamA.avatarUrl : teamB.avatarUrl)} />
            </div>
            <Heroes heroes={isRadiant ? game.teamA : game.teamB} bigger />
            <div className={'points'}>{isRadiant ? game.pointsA : game.pointsB}</div>
            <div className={'vs'}>vs</div>
            <div className={'points'}>{!isRadiant ? game.pointsA : game.pointsB}</div>
            <Heroes heroes={!isRadiant ? game.teamA : game.teamB} bigger />
            <div className={'teamLogo teamBLogo'}>
                <img className={'logo'} src={'/teams/' + (!isRadiant ? teamA.avatarUrl : teamB.avatarUrl)} />
            </div>
        </div>


        <style jsx>{`
            .recentMatch {
                padding: .5rem 1rem;
                background: var(--page-bg);
                margin-bottom: .75rem;
                box-shadow: 2px 2px 10px 0 rgba(0,0,0,.5);
            } 

            .row {
                display: flex;
                align-items: center;
                margin: .8rem 0;
            }

            .header {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            
            @media screen and (max-width: 600px) { 
                .row {
                    flex-direction: column;
                }
            }

            .teamLogo {
                height: 3rem;
                width: 3rem;
                flex-shrink: 0;
                margin: 1rem;
            }

            .logo {
                width: 100%;
                object-fit: cover;
                height: 100%;
            }

            .won {
                color: #00db19;
                font-weight: bold;
                font-size: .7rem;
            }

            .lost {
                color: #f93d4d;
                font-weight: bold;
                font-size: .7rem;
            }

            .vs {
                color: #999;
                margin: .5rem;
                font-size: 1rem;
            }

            .points {
                font-size: 1.2rem;
                color: var(--yellow-accent);
                margin: 0 1rem;
            }

            .date {
                color: #999;
                font-size: .8rem;
            }

            .statsPageIcon {
                height: 1.5rem;
                width: 1.5rem;
                margin-right: .5rem;
            }

            .statsPageIcon:last-item {
                margin-right: 0;
            }

            .disqInfo {
                font-size: .8rem;
                color: #999;
            }
        `}</style>
    </div>;
}