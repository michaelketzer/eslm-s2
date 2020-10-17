import { ReactElement } from "react";
import { Team } from "../../../pages";
import SectionHeader from "../../page/SectionHeader";
import YouTube from 'react-youtube';

interface Props {
    team: Team;
}

export default function Interview({team}: Props): ReactElement | null {
    if(team.video) {
        return <div className={'interviewContainer'}>
            <SectionHeader title={'Team Interview'} />

            <div className={'interview'}>
                <div className={'videoContainer'}>
                    <YouTube
                        containerClassName={'interviewContainer'}
                        videoId={team.video}
                        opts={{height: '100%', width: '100%'}}
                    />
                </div>
            </div>

            <style jsx global>{`
                .interviewContainer {
                    height: 100%;
                    width: 100%;
                }    
            `}</style>
            <style jsx>{`
                .interviewContainer {
                    max-width: 1200px;
                    margin: 0 auto;
                margin-top: 10rem;
                }    

                .interview {
                    position: relative;
                    width: 100%;
                    padding-top: 56.25%;
                    height: 0;
                    box-shadow: 2px 2px 15px 0 rgba(0,0,0,.5);
                }

                .videoContainer {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                }
            `}</style>
        </div>;
    }

    return null;
}