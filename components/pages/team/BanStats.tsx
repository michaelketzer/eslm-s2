import { Fragment, ReactElement, useMemo } from "react";
import { HeroStats } from "../../gameParser";
import SectionHeader from "../../page/SectionHeader";
import HeroRow from "./HeroRow";
import HeroStatsTile from "./HeroStatsTile";

interface Props {
  pickBanStats: {
    [x: string]: HeroStats;
  };
}

export default function BanStats({pickBanStats}: Props): ReactElement | null {
    const bans = useMemo(() => Object.entries(pickBanStats).map(([key, value]) => ({id: key, ...value.bans})), [pickBanStats]);
    const topBans = useMemo(() => {
        return bans.filter(({games}) => games > 0).sort(({games: a}, {games: b}) => b - a).slice(0, 15);
    }, [bans]);

    const topBansFirstPhase = useMemo(() => {
        return bans.filter(({phase1}) => phase1 > 0).sort(({phase1: a, games: gA}, {phase1: b, games: gB}) => b - a || gB - gA).slice(0, 5);
    }, [bans]);

    const topBansSecondPhase = useMemo(() => {
        return bans.filter(({phase2}) => phase2 > 0).sort(({phase2: a, games: gA}, {phase2: b, games: gB}) => b - a || gB - gA).slice(0, 5);
    }, [bans]);
    

    const topBansThirdPhase = useMemo(() => {
        return bans.filter(({phase3}) => phase3 > 0).sort(({phase3: a, games: gA}, {phase3: b, games: gB}) => b - a || gB - gA).slice(0, 5);
    }, [bans]);

    if(bans.length > 0) {
        return <>
            <div className={'spacer'} />
            <SectionHeader center title={'Ban-Statistiken gegen das Team'} />
            <div className={'dualColumnGrid'}>
                <div className={'column'}>
                    <HeroStatsTile
                        title={'Am häufigsten gebannt'}
                        content={<div className={'stats'}>
                            {topBans.map(({id, games}, idx) => <Fragment key={id}>
                                <HeroRow id={id} key={id} pos={idx + 1} addition={<div className={'right'}>{games} {games === 1 ? 'Spiel' : 'Spiele'}</div>}/>
                            </Fragment>)}
                        </div>}
                    />
                </div>
            </div>
            <SectionHeader center title={'Ban-Phasen'} />
            <div className={'threeColumnGrid'}>
                <div className={'column'}>
                    <HeroStatsTile
                        title={'Am häufigsten in der 1. Phase'}
                        content={<div className={'stats'}>
                            {topBansFirstPhase.map(({id, phase1, games}, idx) => <Fragment key={id}>
                                <HeroRow id={id} key={id} pos={idx + 1} addition={<div className={'right'}>{phase1} aus {games}</div>}/>
                            </Fragment>)}
                        </div>}
                    />
                </div>
                <div className={'column'}>
                    <HeroStatsTile
                        title={'Am häufigsten in der 2. Phase'}
                        content={<div className={'stats'}>
                            {topBansSecondPhase.map(({id, phase2, games}, idx) => <Fragment key={id}>
                                <HeroRow id={id} key={id} pos={idx + 1} addition={<div className={'right'}>{phase2} aus {games}</div>}/>
                            </Fragment>)}
                        </div>}
                    />
                </div>
                <div className={'column'}>
                    <HeroStatsTile
                        title={'Am häufigsten in der 3. Phase'}
                        content={<div className={'stats'}>
                            {topBansThirdPhase.map(({id, phase3, games}, idx) => <Fragment key={id}>
                                <HeroRow id={id} key={id} pos={idx + 1} addition={<div className={'right'}>{phase3} aus {games}</div>}/>
                            </Fragment>)}
                        </div>}
                    />
                </div>
                
            </div>

            <style jsx>{`
                .dualColumnGrid {
                    display: flex;
                    align-items: flex-start;
                    flex-wrap: wrap;
                    justify-content: center;
                    margin: -1rem;
                }    

                .threeColumnGrid {
                    display: flex;
                    align-items: flex-start;
                    flex-wrap: wrap;
                    justify-content: center;
                    margin: -1rem;
                }

                .column {
                    width: 100%;
                    max-width: 25rem;
                    padding: 1rem;
                }

                .stats {
                    display: grid;
                    grid-template-columns: max-content 56px max-content 1fr;
                    align-items: center;
                    grid-column-gap: 10px;
                    grid-row-gap: 5px;
                }

                .right {
                    text-align: right;
                    font-size: .8rem;
                }

                .spacer {
                    margin-top: 8rem;
                }
            `}</style>
        </>;
    }

    return null;
}