import { motion } from "framer-motion";
import { ReactElement } from "react";
import { Team } from "../../../pages";
import SectionHeader from "../../page/SectionHeader";
import { useRouter } from 'next/router';

export interface DecoratedTeam extends Team {
    points: number;
    total: number;
    won: number;
}

interface Props {
    teams: DecoratedTeam[];
    identifier: 'a' | 'b';
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05
        }
    }
};
const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
}


export default function TeamGroup({identifier, teams}: Props): ReactElement {
    const router = useRouter();

    return <div>
        <SectionHeader title={'Gruppe ' + identifier.toUpperCase()} center/>

        <div className={'teamGrid'}>
            <motion.div variants={container} initial={'hidden'} animate={'show'}>
                {teams.map((team) => <motion.div key={team.teamId} variants={item} whileHover={{scale: 1.05}} onTap={() => router.push('/team/' + team.teamId).then(() => window.scrollTo(0, 0))}>
                    <div className={'teamRow'}>
                        <div className={'teamAvatar'}>
                            <img src={'/teams/' + team.avatarUrl} className={'avatar'}/>
                        </div>
                        <div className={'teamInfo'}>
                            <div className={'name'}><span className={'shortName'}>[{team.shortHand}]</span> {team.name}</div>
                            {team.twitter.length > 0 && <a target={'_blank'} className={'twitter'} href={'https://twitter.com/' + team.twitter.substring(1)}>{team.twitter}</a>}
                        </div>

                        <div className={'teamPoints'}>
                            {team.change ? team.points + team.change : team.points || 0}
                            {team.change && <span className={'change'}>{team.change > 0 ? '+' + team.change : team.change}</span>}
                        </div>
                    </div>
                </motion.div>)}
            </motion.div>
        </div>


        <style jsx>{`
            .teamRow {
                display: flex;
                align-items: center;
                padding: 1rem;
                background-color: var(--page-bg);
                box-shadow: 2px 2px 10px 0 rgba(0,0,0,0.4);
                margin-bottom: .5rem;
                cursor: pointer;
                height: 85px;
            }

            .teamAvatar {
                height: 2rem;
                width: 2rem;
                margin-right: 1rem;
                flex-shrink: 0;
            }

            .avatar {
                height: 100%;
                object-fit: cover;
            }

            .teamInfo {
                flex-grow: 1;
            }

            .teamPoints {
                justify-self: flex-end;
                flex-shrink: 0;
                font-size: 1.5rem;
                color: var(--yellow-accent);
            }

            .shortName {
                color: #999;
            }

            .twitter {
                color: var(--yellow-accent);
                font-size: .7rem;
            }

            .change {
                font-size: .8rem;
                color: var(--red-accent);
                line-height: 1rem;
            }
        `}</style>
    </div>;

}
