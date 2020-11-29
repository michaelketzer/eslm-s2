import { HeroListStats, overallHeroStats } from "../components/gameParser";
import PageFrame from "../components/page/PageFrame";
import HeroStatsList from "../components/pages/heroes/HeroStatsList";
import BackToOverview from "../components/pages/team/BackToOverview";


interface Props {
    list: HeroListStats[];
}

const Heroes = ({list}: Props) => {

    return <PageFrame>
        <BackToOverview />

        <div className={'title'}>
            <div className={'mainTitle'}>
                <h1>Hero Stats</h1>
            </div>
        </div>

        <HeroStatsList list={list} />


        <style jsx>{`
            h1 {
                text-align: center;
                font-size: 2rem;
            }    
        `}</style>
    </PageFrame>

}

export async function getStaticProps() {
    const list = await overallHeroStats();

    return {
        props: {
            list, 
        },
    }
}

export default Heroes;
