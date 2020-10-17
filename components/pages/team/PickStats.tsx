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

export default function PickStats({pickBanStats}: Props): ReactElement | null {
    const picks = useMemo(() => Object.entries(pickBanStats).map(([key, value]) => ({id: key, ...value.picks})), [pickBanStats]);
    const topPicks = useMemo(() => {
        return picks.filter(({games}) => games > 0).sort(({games: a}, {games: b}) => b - a).slice(0, 15);
    }, [picks]);

    const topWinRate = useMemo(() => {
        return picks.filter(({games}) => games > 0)
                    .sort(({games: gA, won: wA}, {games: gB, won: wB}) => (gB > 3 && gA > 3 ? wB/gB - wA/gA : gB - gA) || gB - gA).slice(0, 10);
    }, [picks]);

    const topPicksFirstPhase = useMemo(() => {
        return picks.filter(({phase1}) => phase1 > 0).sort(({phase1: a, games: gA}, {phase1: b, games: gB}) => b - a || gB - gA).slice(0, 5);
    }, [topPicks]);

    const topPicksSecondPhase = useMemo(() => {
        return picks.filter(({phase2}) => phase2 > 0).sort(({phase2: a, games: gA}, {phase2: b, games: gB}) => b - a || gB - gA).slice(0, 5);
    }, [topPicks]);
    

    const topPicksThirdPhase = useMemo(() => {
        return picks.filter(({phase3}) => phase3 > 0).sort(({phase3: a, games: gA}, {phase3: b, games: gB}) => b - a || gB - gA).slice(0, 5);
    }, [topPicks]);

    if(picks.length > 0) {
        return <>
            <div className={'spacer'} />
            <SectionHeader center title={'Pick-Statistiken'} />
            <div className={'dualColumnGrid'}>
                <div className={'column'}>
                    <HeroStatsTile
                        title={'Am häufigsten gepickt'}
                        content={<div className={'stats'}>
                            {topPicks.map(({id, games}, idx) => <Fragment key={id}>
                                <HeroRow id={id} key={id} pos={idx + 1} addition={<div className={'right'}>{games} {games === 1 ? 'Spiel' : 'Spiele'}</div>}/>
                            </Fragment>)}
                        </div>}
                    />
                </div>
                <div className={'column'}>
                    <HeroStatsTile
                        title={'Höchste Win Rate'}
                        content={<div className={'stats'}>
                            {topWinRate.map(({id, won, games}, idx) => <Fragment key={id}>
                                <HeroRow id={id} key={id} pos={idx + 1} addition={<div className={'right'}>{Math.floor(won*100/games)}% in {games}</div>}/>
                            </Fragment>)}
                        </div>}
                    />
                </div>
            </div>
            <SectionHeader center title={'Pick-Phasen'} />
            <div className={'threeColumnGrid'}>
                <div className={'column'}>
                    <HeroStatsTile
                        title={'Am häufigsten in der 1. Phase'}
                        content={<div className={'stats'}>
                            {topPicksFirstPhase.map(({id, phase1, games}, idx) => <Fragment key={id}>
                                <HeroRow id={id} key={id} pos={idx + 1} addition={<div className={'right'}>{phase1} aus {games}</div>}/>
                            </Fragment>)}
                        </div>}
                    />
                </div>
                <div className={'column'}>
                    <HeroStatsTile
                        title={'Am häufigsten in der 2. Phase'}
                        content={<div className={'stats'}>
                            {topPicksSecondPhase.map(({id, phase2, games}, idx) => <Fragment key={id}>
                                <HeroRow id={id} key={id} pos={idx + 1} addition={<div className={'right'}>{phase2} aus {games}</div>}/>
                            </Fragment>)}
                        </div>}
                    />
                </div>
                <div className={'column'}>
                    <HeroStatsTile
                        title={'Am häufigsten in der 3. Phase'}
                        content={<div className={'stats'}>
                            {topPicksThirdPhase.map(({id, phase3, games}, idx) => <Fragment key={id}>
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