import classNames from "classnames";
import { ReactElement } from "react";

interface Props {
    title: string;
    lessSpacing?: boolean;
    center?: boolean;
}

export default function SectionHeader({lessSpacing, center, title}: Props): ReactElement {
    return <div className={classNames('header', {center, lessSpacing})}>
        <h3>{title}</h3>

        <style jsx>{`
            .header {
                margin-top: 4rem;
            }

            .center {
                text-align: center;
            }

            .lessSpacing {
                margin-top: 2rem;
            }

            h3 {
                font-weight: normal;
                color: var(--yellow-accent);
            }
        `}</style>
    </div>
}