import { ReactElement } from "react";
import { Team } from "../../../pages";


export default function Header({team}: {team: Team}): ReactElement {
    return <div className={'header'}>
        <div className={'logoWrapper'}>
            <img className={'logo'} src={'/teams/' + team.avatarUrl} />
        </div>

        <div className={'title'}>
            <div className={'mainTitle'}>
                <h1><span className={'shortHand'}>[{team.shortHand}]</span> {team.name}</h1>
                <h5>{team.twitter.length > 0 && <a target={'_blank'} className={'twitter'} href={'https://twitter.com/' + team.twitter.substring(1)}>{team.twitter}</a>}</h5>
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
                max-height: 10rem;
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
                min-width: 30%;
            }

            h1 {
                font-size: 2rem;
            }

            h2 {
                font-size: 1.5rem;
                color: #999;
            }

            .nobr {
                white-space: nowrap;
            }

            .shortHand {
                color: #999;
            }

            .twitter {
                color: var(--yellow-accent);
                font-size: .7rem;
            }
        `}</style>
    </div>
}