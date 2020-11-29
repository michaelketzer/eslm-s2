import { ReactElement } from "react";
import Link from 'next/link'


export default function ViewHeroes(): ReactElement {
    return <>
        <Link href="/heroes">
            <div className={'btn'}>
                Heroe Stats
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