import { ReactElement } from "react";
import { Team } from "../../../pages";
import SectionHeader from "../../page/SectionHeader";
interface Props {
    team: Team;
}

export default function PostGameInterviews({team}: Props): ReactElement | null {
    if(team.interview) {
        return <div className={'interviewContainer'}>
            <SectionHeader title={'Post Match Interview'} center />

            <div className={'interviewGrid'}>
                {team.interview.map((interview) => <div className={'container'} key={interview}>
                    <div className={'interview'}>
                        <div className={'videoContainer'}>
                            <video width="100%" height="100%" controls>
                                <source src={'https://api.streamdota.com/static/videos/' + interview} type="video/mp4" />
                            </video>
                        </div>
                    </div>
                </div>)}
            </div>
            

            <style jsx>{`
                .interviewContainer {
                    max-width: 1200px;
                    margin: 0 auto;
                    margin-top: 10rem;
                }    

                .interviewGrid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, min(400px, 100%));
                    grid-gap: 2rem;
                    justify-content: center;
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