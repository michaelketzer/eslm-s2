import { ReactElement, ReactNode } from "react";

interface Props {
    title: string;
    additional?: ReactNode;
    content: ReactNode;
}

export default function HeroStatsTile({additional, content, title}: Props): ReactElement {
    return <div className={'tile'}>
        <div className={'tileHeader'}>
            <div className={'title'}>{title}</div>
            <div>
                {additional}
            </div>
        </div>

        <div className={'tileContent'}>
            {content}
        </div>

        <style jsx>{`
            .tile {
                padding: .5rem;
                background: var(--page-bg);
                margin-bottom: .75rem;
                margin-right: .75rem;
                box-shadow: 2px 2px 10px 0 rgba(0,0,0,.5);
            }    

            .tileHeader {
                font-weight: normal;
                color: var(--yellow-accent);
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: .5rem 0 1.25rem 0;
            }
        `}</style>
    </div>
}