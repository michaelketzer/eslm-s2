import { motion } from "framer-motion";
import { ReactElement } from "react";
import { GroupMatch, Team } from "../../../pages";
import SectionHeader from "../../page/SectionHeader";
import VsMatch from "./VsMatch";
import { useRouter } from 'next/router';

interface Props {
    matches: GroupMatch[];
    teams: Team[];
    teamId: string;
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


export default function UpcomingMatches({matches, teams, teamId}: Props): ReactElement {
    const router = useRouter();
    const sorted = [...matches].sort(({date: a}, {date: b}) => b > a ? -1 : 1);
    return <div className={'upcomingMatches'}>
        <SectionHeader title={'Anstehende Spiele'} />

        <motion.div variants={container} initial={'hidden'} animate={'show'}>
            <div className={'matches'}>
                {sorted.map((match) => <motion.div key={match.date} variants={item} whileHover={{scale: 1.05}} onTap={() => router.push('/team/' + (match.teamA === teamId ? match.teamB : match.teamA)).then(() => window.scrollTo(0, 0))}>
                    <VsMatch match={match} teams={teams} opponentTeam={match.teamA === teamId ? match.teamB : match.teamA}/>
                </motion.div>)}
            </div>
        </motion.div>


        <style jsx>{`
            .matches {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            }    

            .upcomingMatches {
                max-width: 1200px;
                margin: 0 auto;
                margin-top: 10rem;
            }
            
        `}</style>
    </div>;
}
