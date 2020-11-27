import classNames from "classnames";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { ReactElement, useMemo, useState } from "react";
import { GroupMatch, Team } from "../../../pages";
import { Stats } from "../../gameParser";
import MatchDetails from "./MatchDetails";

interface Props {
    gameData: Stats;
    match: GroupMatch;
    teams: Team[];
}

const container = {
    hide: {height: '0px', transition: {duration: .24}},
    show: {height: '100%', transition: {duration: .24}},
}

export default function Match({gameData, match, teams}: Props): ReactElement {
    const game1 = match.match_1 && gameData.matches[match.match_1] ? gameData.matches[match.match_1] : null;
    const game2 = match.match_2 && gameData.matches[match.match_2] ? gameData.matches[match.match_2] : null;
    const teamA = teams.find(({teamId}) => teamId === match.teamA); 
    const teamB = teams.find(({teamId}) => teamId === match.teamB);

    const teamAAsRadiantInGame1 = game1?.radiantTeamId === +match.teamA;
    const teamAAsRadiantInGame2 = game2?.radiantTeamId === +match.teamA;

    const teamAWonGame1 = !match.disqualifiedTeam ? game1?.winner === +match.teamA : match.disqualifiedTeam === match.teamB;
    const teamAWonGame2 = !match.disqualifiedTeam ? game2?.winner === +match.teamA : match.disqualifiedTeam === match.teamB;

    const teamAWon = (teamAWonGame1 ? 1 : 0) +  (teamAWonGame2 ? 1 : 0);
    const teamBWon = (game1 && game2 ? 2 : ((game1 || game2) ? 1 : 0)) - teamAWon;
    const date = dayjs(match.date);
    const isToday = useMemo(() => !game2 && date.isSame(dayjs(), 'day'), [date, game1, game2]);
    const [showDetails, setShowDetails] = useState(false);
    
    return <motion.div onTap={() => setShowDetails((s) => !s)} whileHover={{scale: (game1 || game2) ? 1.05 : 1}}>
        <div className={classNames('series', {isToday: isToday && !match.disbanded, disqualifiedTeam: !!match.disqualifiedTeam, canExpand: game1 || game2})}>
            <div className={classNames('matchRow', {hasStanding: game1 || game2, disbanded: match.disbanded})} >
                <div className={'team teamA'}>{teamA.shortHand}</div>
                <div className={'teamLogo teamALogo'}>
                    <img className={'logo'} src={'/teams/' + teamA.avatarUrl} />
                </div>
                <div className={'standing teamA'}>{teamAWon}</div>
                <div className={'date'}>
                    <div className={'day'}>{date.format('DD.MM')}</div>
                    <div className={'time'}>{date.format('HH:mm')}</div>
                </div>
                <div className={'standing teamB'}>{teamBWon}</div>
                <div className={'teamLogo teamBLogo'}>
                    <img className={'logo'} src={'/teams/' + teamB.avatarUrl} />
                </div>
                <div className={'team teamB'}>{teamB.shortHand}</div>
            </div>

            <AnimatePresence>
                {showDetails && <motion.div initial={'hide'} animate={'show'} exit={'hide'} variants={container}>
                    {game1 && <MatchDetails game={game1} winner={teamAWonGame1 ? 'a' : 'b'} reversedTeams={!teamAAsRadiantInGame1} matchId={match.match_1} match={1}/>}
                    {game2 && <MatchDetails game={game2} winner={teamAWonGame2 ? 'a' : 'b'} reversedTeams={!teamAAsRadiantInGame2} matchId={match.match_2} match={2} />}
                </motion.div>}
            </AnimatePresence>

        </div>


        <style jsx>{`
            .series {
                background: var(--page-bg);
                margin-bottom: 15px;
                box-shadow: 2px 2px 10px 0 rgba(0,0,0,.5);
                overflow: hidden;
            }

            .canExpand {
                cursor: pointer;
            }

            .matchRow {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 5px 10px;
            }

            .date {
                flex-shrink: 0;
                margin: 0 1rem;
                text-align: center;
                font-size: .8rem;
                color: #CCC;
            }

            .day {
                margin-bottom: 5px;
            }

            .time {
                font-size: .7rem;
            }

            .teamLogo {
                width: 1.5rem;
                margin: 0 .5rem;
                flex-shrink: 0;
            }

            .logo {
                object-fit: cover;
                width: 1.5rem;
            }

            .standing {
                width: 1rem;
                flex-shrink: 0;
                text-align: center;
                color: #888;
            }

            .hasStanding .standing {
                color: var(--yellow-accent);
            }

            .disqualifiedTeam .hasStanding .standing {
                color: var(--red-accent);
            }

            .team {
                width: 100%;
            }
            .teamA {
                text-align: right;
            }

            .disbanded {
                text-decoration: line-through;
                color: #777;
            }

            .disbanded .teamLogo {
                filter: grayscale(0.8);
            }

            .isToday:not(.disbanded) {
                animation: boxGrow 3s ease-in-out infinite;
            }

            @keyframes boxGrow {
                0%, 100% {box-shadow: 0 0 5px 0 rgba(254,205,0,.5); }
                50% {box-shadow: 0 0 10px 0 rgba(254,205,0,.5); }
            }
        `}</style>
    </motion.div>
}
