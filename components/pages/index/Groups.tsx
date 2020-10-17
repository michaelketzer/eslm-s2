import { ReactElement, useMemo } from "react";
import { Team } from "../../../pages";
import { Stats } from "../../gameParser";
import TeamGroup from "./TeamGroup";

interface Props {
    teams: Team[];
    gameData: Stats;
}

export default function Groups({teams, gameData}: Props): ReactElement {
    const decorateTeams = useMemo(() => teams
        .map((team) => ({...team, ...gameData.teams[+team.teamId]}))
        .sort(({change: aC = 0, points: a}, {change: bC = 0, points: b}) => ((b || 0) + bC) - ((a || 0) + aC)
    ), [teams, gameData])
    const groupA = useMemo(() => decorateTeams.filter(({group}) => group === 'a'), [teams]);
    const groupB = useMemo(() => decorateTeams.filter(({group}) => group === 'b'), [teams]);

    return <div className={'groups'}>
        <div className={'group'}>
            <TeamGroup teams={groupA} identifier={'a'} />
        </div>
        <div className={'group'}>
            <TeamGroup teams={groupB} identifier={'b'} />
        </div>

        <style jsx>{`
            .groups {
                display: flex;
                align-items: flex-start;
                flex-wrap: wrap;
                justify-content: center;
                margin: -1rem;
            }    

            .group {
                width: 100%;
                max-width: 25rem;
                padding: 1rem;
            }
        `}</style>
    </div>;
}