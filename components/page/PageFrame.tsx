import { ReactElement, ReactNode } from "react";
import Head from "next/head";

interface Props {
    children: ReactNode;
}

export default function PageFrame({children}: Props): ReactElement {
    return <div className={'pageFrame'}>
        <Head>
            <meta charSet="UTF-8" />
            <meta name="google" content="notranslate" />
            <meta httpEquiv="Content-Language" content="de" />
            <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />

            <meta property="og:site_name" content="StreamDota - Your toolbox for streaming dota"/>
            <meta property="og:title" content={'Dota bot, overlays, stats & more'}/>
            <meta property="og:description" content={'Your toolbox for streaming dota2 | Dota Win Loss Overlay | Bet System | Roshan Timer | Live Stats of Picks & Bans | and much more...'}/>
            <meta property="og:image" content={'/shared/share.png'}/>
            <meta property="og:url" content="https://streamdota.com/"/>
            <meta property="og:type" content="website"/>
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="description" content="Your toolbox for streaming dota2 | Dota Win Loss Overlay | Bet System | Roshan Timer | Live Stats of Picks & Bans | and much more..."/>

            <title>ESL Meisterschaft Season 2 - streamdota.com</title>
            <link rel="apple-touch-icon" sizes="180x180" href="/shared/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/shared/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/shared/favicon-16x16.png" />
            <link rel="manifest" href="/shared/site.webmanifest" />
            <link rel="mask-icon" href="/shared/safari-pinned-tab.svg" color="#5bbad5" />
            <link rel="shortcut icon" href="/shared/favicon.ico" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="msapplication-config" content="/shared/browserconfig.xml" />
            <meta name="theme-color" content="#ffffff" />
        </Head>
        
        {children}

        <div className={'footer'}>
            Diese Webseite steht in keinem offiziellen Zusammenhang mit der ESL Meisterschaft. Alle Rechte liegen bei der ESL. 
            <a className={'link'} href={'https://pro.eslgaming.com/deutschland/dota2/'} target={'_blank'}>Offizelle ESLM Dota2 Website</a>
            <a className={'link weak'} href={'https://app.streamdota.com/imprint'} target={'_blank'}>Impressum</a>
            <a className={'link weak'} href={'https://app.streamdota.com/dataPolicy'} target={'_blank'}>Datenschutz</a>
        </div>

        <style jsx>{`
            .pageFrame {
                padding: 1rem 1.5rem;
                min-height: 100vh;
            }

            .footer {
                background-color: rgba(0,0,0,.5);
                padding: .5rem 2rem;
                text-align: center;
                margin: 2.5rem -1.5rem -1rem -1.5rem;
                font-size: .7rem;
            }

            .link {
                color: var(--yellow-accent);
                margin-right: .5rem;
            }

            .link:not(.weak) {
                margin-left: 1rem;
            }

            .weak {
                color: #999;
            }
        `}</style>

        <style jsx global>{`
            body, html {
                padding: 0;
                margin: 0;
                background: var(--page-bg);
                color: var(--page-font);
                font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
                font-size: 20px;
            }

            @media screen and (max-width: 600px) { 
                body, html {
                    font-size: 14px;
                }
            }

            * {
                box-sizing: border-box;
            }

            :root {
                --page-bg: #2a3441;
                --page-font: #EFEFEF;
                --yellow-accent: #fecd00;
                --red-accent: #cc1626;
            }

        `}</style>
    </div>
}
