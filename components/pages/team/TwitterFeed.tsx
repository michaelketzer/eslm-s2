import { ReactElement } from "react";
import { Team } from "../../../pages";
import SectionHeader from "../../page/SectionHeader";
import { TwitterTimelineEmbed } from 'react-twitter-embed';


export default function TwitterFeed({team}: {team: Team}): ReactElement {

    return <div className={'twitterFeed'}>
        <SectionHeader title={'Twitter Feed'} />

        <div className={'twitterContainer'}>
            <TwitterTimelineEmbed
                sourceType={'profile'}
                screenName={team.twitter.substring(1)}
                options={{height: 1000, width: '100%'}}
                theme={'dark'}
                transparent
            />
        </div>

        <style jsx>{`
            .twitterFeed {
                max-width: 1200px;
                margin: 0 auto;
            }    

            .twitterContainer {
                max-width: 600px;
            }
        `}</style>
    </div>;
}