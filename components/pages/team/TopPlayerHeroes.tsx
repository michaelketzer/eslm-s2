import { ReactElement, useMemo } from "react";
import { PlayerHeroStats } from "../../gameParser";
import HeroAvatar from "../index/HeroAvatar";
import { heroIdMap } from "../index/Heroes";


export default function TopPlayerHeroes({stats}: {stats: PlayerHeroStats[0]}): ReactElement {
    const top3Heroes = useMemo(() => {
        return Object.entries(stats)
                     .map(([id, value]) => ({id, ...value}))
                     .sort(({won: a}, {won: b}) => b - a)
                     .slice(0, 3);
    }, [stats]);
    return <div className={'top3Heroes'}>
        {top3Heroes.map(({id, games, won}) => <div className={'heroAvatar'} key={id} title={`${won}/${games} (${Math.round((won * 100) / games)}%)`}>
            <HeroAvatar heroClass={heroIdMap[id]} prefix={'h'}/>
        </div>)}

        <style jsx>{`
            .top3Heroes {
                display: flex;
                align-items: center;
                margin-top: .25rem;
            }

            .heroAvatar {
                width: 2rem;
                margin-right: .5rem;
            }
        `}</style>
    </div>;
}