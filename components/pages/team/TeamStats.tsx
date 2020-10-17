import { ReactElement } from "react";

interface Props {
    stats: {
        won: number;
        total: number;
        points: number;
    };
}

export default function TeamStats({stats}: Props): ReactElement {
    return <div className={'statsContainer'}>
        <div className={'statsTile'}>
            <div className={'stats'}>{stats?.total || 0}</div>
            <div className={'label'}>Spiele</div>
        </div>
        <div className={'statsTile'}>
            <div className={'stats'}>{stats && stats.total > 0 ? Math.round((+stats.won * 100)/+stats.total) : 0}%</div>
            <div className={'label'}>Winrate</div>
        </div>

        <style jsx>{`
            .statsContainer {
                max-width: 1200px;
                margin: 2rem auto;
                display: flex;
                justify-content: center;
                align-items: center;
            }   

            .statsTile {
                padding: .5rem;
                background: var(--page-bg);
                margin-bottom: .75rem;
                margin-right: .75rem;
                box-shadow: 2px 2px 10px 0 rgba(0,0,0,.5);
                min-width: 8rem;
                height: 4rem;
                text-align: center;
            } 

            .stats {
                font-size: 1.5rem;
                color: var(--yellow-accent);
            }

            .label {
                font-size: .9rem;
                text-transform: uppercase;
                color: #BBB;
            }
        `}</style>
    </div>
}