import { ReactElement } from "react";
import Link from 'next/link'


export default function BackToOverview(): ReactElement {
    return <>
        <Link href="/">
            <div className={'btn'}>
                Zurück zur Übersicht
            </div>
        </Link>

            
        <style jsx>{`
            .btn {
                padding: 10px 20px;
                color: #222;
                background-color: var(--yellow-accent);
                display: inline-flex;
                cursor: pointer;
            }    
        `}</style>
    </>;
}