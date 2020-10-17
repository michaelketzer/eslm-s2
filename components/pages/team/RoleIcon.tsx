import { ReactElement } from "react";

interface Props {
    pos: number | number[];
}

const roles = {
    1: 'Carry',
    2: 'Mitte',
    3: 'Offlane',
    4: 'Soft Support',
    5: 'Hard Support'
}

export default function RoleIcon({pos}: Props): ReactElement {

    if(Array.isArray(pos)) {
        return <div className={'roleIcon'} title={pos.map((id) => roles[id]).join(' / ')}>
            <img className={'icon icon1'} src={`/icons/${pos[0]}.svg`} />
            <img className={'icon icon2'} src={`/icons/${pos[1]}.svg`} />


            <style jsx>{`
                .roleIcon {
                    width: 2rem;
                    height: 2rem;
                    margin-right: 1rem;
                    text-align: center;
                    position: relative;
                }

                .icon {
                    width: 1rem;
                    position: absolute;
                }   

                .icon1 {
                    top: 0;
                    left: 0;
                }

                .icon2 {
                    bottom: 0;
                    right: 0;
                }
            `}</style>
        </div>
    }

    return <div className={'roleIcon'} title={roles[pos]}>
        <img className={'icon'} src={`/icons/${pos}.svg`} />

        <style jsx>{`
            .roleIcon {
                width: 2rem;
                margin-right: 1rem;
                text-align: center;
            }

            .icon {
                width: 1.5rem;
            }   
        `}</style>
    </div>
}