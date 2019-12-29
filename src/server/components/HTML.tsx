import React from 'react';
import parse from 'html-react-parser';

type Props = {
    children: any;
    css: string[];
    scripts: string[];
    helmetContext: any;
    state: string;
    loadableScriptTags: string;
    loadableStyleTags: string;
    browserHistory: string;
};

// Default CSS and JS injection disabled since Loadable loads all style tags and js tags
const shouldInjectDefaultCss = false;
const shouldInjectDefaultJs = false;

const HTML = ({
    children,
    css = [],
    scripts = [],
    loadableScriptTags = '',
    loadableStyleTags = '',
    state = '{}',
    browserHistory = '{}',
    helmetContext: { helmet },
}: Props) => {
    return (
        <html lang="">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {helmet.base.toComponent()}
                {helmet.title.toComponent()}
                {helmet.meta.toComponent()}
                {helmet.link.toComponent()}
                {helmet.script.toComponent()}
                {shouldInjectDefaultCss &&
                    css
                        .filter(Boolean)
                        .map((href) => <link key={href} rel="stylesheet" href={href} />)}
                {parse(loadableStyleTags)}
                <script
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                        // TODO: Add jsesc/stringify here
                        // see: https://twitter.com/HenrikJoreteg/status/1143953338284703744
                        __html: `
                            window.__PRELOADED_STATE__ = ${state};
                            window.browserHistory = ${browserHistory};
                        `,
                    }}
                />
            </head>
            <body>
                {/* eslint-disable-next-line react/no-danger */}
                <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
                {parse(loadableScriptTags)}
                {shouldInjectDefaultJs &&
                    scripts.filter(Boolean).map((src) => <script key={src} src={src} />)}
            </body>
        </html>
    );
};

export default HTML;
