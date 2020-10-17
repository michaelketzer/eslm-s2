import { ReactElement } from "react";
import { TeamPlayer } from "../../../pages";
import SectionHeader from "../../page/SectionHeader";
import ReactCountryFlag from "react-country-flag"
import RoleIcon from "./RoleIcon";
import { motion } from "framer-motion";
import { PlayerHeroStats } from "../../gameParser";
import TopPlayerHeroes from "./TopPlayerHeroes";

interface Props {
    players: TeamPlayer[];
    title: string;
    playerTeamStats: PlayerHeroStats;
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

function sortFn({pos: a}: TeamPlayer, {pos: b}: TeamPlayer): number {
    const tA = Array.isArray(a) ? a[0] : a;
    const tB = Array.isArray(b) ? b[0] : b;
    return tA - tB;
}

export default function PlayerGroup({players, title, playerTeamStats}: Props): ReactElement {
    const sorted = [...players].sort(sortFn);

    return <div>
        <SectionHeader title={title} center/>

        <motion.div variants={container} initial={'hidden'} animate={'show'}>
            {sorted.map((player) =>  <motion.div key={player.steamId} variants={item}>
                <div className={'playerRow'}>
                    <RoleIcon pos={player.pos} />

                    <div className={'playerInfo'}>
                        <div className={'player'}>
                            {player.code.length > 0 && <div className={'cf'}>
                                <ReactCountryFlag svg countryCode={player.code}/>
                            </div>}
                            {player.name}
                            <div className={'twitterTag'}>
                                {player.social.length > 0 && <a target={'_blank'} className={'twitter'} href={'https://twitter.com/' + player.social.substring(1)}>{player.social}</a>}
                            </div>
                        </div>
                        {playerTeamStats[player.steamId] && <TopPlayerHeroes stats={playerTeamStats[player.steamId]} />}
                    </div>
                </div>
            </motion.div>)}
        </motion.div>


        <style jsx>{`
            .playerRow {
                display: flex;
                align-items: center;
                padding: 1rem;
                background-color: var(--page-bg);
                box-shadow: 2px 2px 10px 0 rgba(0,0,0,0.4);
                margin-bottom: 10px;
                height: 85px;
            }    

            .player {
                display: flex;
                align-items: center;
            }

            .cf {
                margin-top: -5px;
                margin-right: .5rem;
            }

            .twitter {
                color: var(--yellow-accent);
                font-size: .7rem;
            }

            .twitterTag {
                margin-left: .5rem;
            }
        `}</style>
    </div>

}