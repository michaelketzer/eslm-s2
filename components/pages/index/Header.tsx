import { ReactElement } from "react";


export default function PageHeader(): ReactElement {
    return <div className={'header'}>
        <div className={'logoWrapper'}>
            <img className={'logo'} src={'/eslm_logo.png'} />
        </div>

        <div className={'title'}>
            <div className={'mainTitle'}>
                <h1>ESL Meisterschaft <span className={'nobr'}>Dota 2</span></h1>
            </div>
            <div className={'subTitle'}>
                <h2>Season 2</h2>
            </div>
        </div>
        

        <style jsx>{`
            .header {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                align-items: center;
                padding: 1rem 0;
            }

            .logoWrapper {
                height: 10rem;
                overflow: hidden;
            }

            .logo {
                width: 10rem;
                margin: 0 2rem 1rem 2.5rem;
                object-fit: cover;
            }

            .title {
                text-transform: uppercase;
                max-width: 30rem;
                text-align: center;
            }

            h1 {
                font-size: 2rem;
            }

            h2 {
                font-size: 1.5rem;
                color: var(--yellow-accent);
            }

            .nobr {
                white-space: nowrap;
            }
        `}</style>
    </div>
}