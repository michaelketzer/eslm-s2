import classNames from "classnames";
import dayjs from "dayjs";
import { ReactElement } from "react";
import { GroupMatch, Team } from "../../../pages";

interface Props {
    match: GroupMatch;
    teams: Team[];
    opponentTeam: string;
}

export default function VsMatch({match, teams, opponentTeam}: Props): ReactElement {
    const vsTeam = teams.find(({teamId}) => teamId === opponentTeam);
    const date = dayjs(match.date);

    return <div className={classNames('matchRow', {disbanded: match.disbanded})}>

        <div className={'header'}>
            <div className={'teamLogo'}>
                <img src={'/teams/' + vsTeam.avatarUrl} className={'logo'}/>
            </div>
            <div className={'name'}>
                {vsTeam.name}
            </div>
        </div>

        <div className={'date'}>
            <div className={'dayTime'}>{date.format('DD.MM. HH:mm')}</div>
            <div className={'day'}>Spieltag {match.day}</div>
        </div>

        <style jsx>{`
            .matchRow {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                padding: .5rem;
                background: var(--page-bg);
                margin-bottom: .75rem;
                margin-right: .75rem;
                box-shadow: 2px 2px 10px 0 rgba(0,0,0,.5);
                cursor: pointer;
            }

            .disbanded {
                box-shadow: none;
                color: #999;
                text-decoration: line-through;
            }

            .header {
                display: flex;
                align-items: center;
                margin-bottom: 1rem;
            }

            .teamLogo {
                height: 3rem;
                width: 3rem;
                margin-right: 1rem;
            }

            .logo {
                width: 100%;
                object-fit: cover;
            }

            .disbanded .logo {
                filter: grayscale(.8);
            }

            .date {
                font-size: .9rem;
                text-align: center;
                color: #CCC;
                margin-bottom: .75rem;
            }

            .day {
                font-size: .8rem;
                color: #999
            }
        `}</style>
    </div>

}
