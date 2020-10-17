import { ReactElement } from "react";
import SectionHeader from "../../page/SectionHeader";
import YouTube from 'react-youtube';

const videos = [
    'kys4JaHN0OM',
]

export default function QuestionRounds(): ReactElement {
    return <div className={'questionRoundsContainer'}>
        <SectionHeader title={'Fragerunden'} center/>


        <div className={'videoGrid'}>
            {videos.map((vid) => <div className={'videoContainer'} key={vid}>
                <div className={'video'}>
                    <YouTube
                        containerClassName={'youtubeVideoContainer'}
                        videoId={vid}
                        opts={{height: '100%', width: '100%'}}
                    />
                </div>
            </div>)}
        </div>


        <style jsx global>{`
            .youtubeVideoContainer {
                height: 100%;
                width: 100%;
            }    
        `}</style>

        <style jsx>{`
            .questionRoundsContainer {
                max-width: 1200px;
                margin: 0 auto;
                margin-top: 10rem;
            }     

            .videoGrid {
                display: grid;
                grid-template-columns: repeat(auto-fill, min(400px, 100%));
                grid-gap: 2rem;
                justify-content: center;
            }

            .videoContainer {
                position: relative;
                width: 100%;
                padding-top: 56.25%;
                height: 0;
                box-shadow: 2px 2px 15px 0 rgba(0,0,0,.5);
            }

            .video {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
            }   
        `}</style>
    </div>;
}