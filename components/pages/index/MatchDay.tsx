import { motion } from "framer-motion";
import { ReactElement } from "react";
import { GroupMatch, Team } from "../../../pages";
import { Stats } from "../../gameParser";
import SectionHeader from "../../page/SectionHeader";
import Match from "./Match";


interface Props {
    teams: Team[]; 
    matchData: GroupMatch[];
    day: number;
    gameData: Stats;
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


export default function MatchDay({day, gameData, matchData, teams}: Props): ReactElement {
    const relvantMatches = matchData.filter(({day: matchDay}) => matchDay === day).sort(({date: a}, {date: b}) => b < a ? 1 : -1);
    return <motion.div variants={container} initial={'hidden'} animate={'show'}>
        <SectionHeader title={'Spieltag ' + day} lessSpacing center />

        {relvantMatches.map((match, idx) => <motion.div key={match.date + idx} variants={item}>
            <Match match={match}  teams={teams} gameData={gameData}/>
        </motion.div>)}

    </motion.div>;
}
