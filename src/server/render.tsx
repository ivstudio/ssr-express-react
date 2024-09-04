import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import {
    createStaticHandler,
    createStaticRouter,
    StaticRouterProvider,
} from 'react-router-dom/server';

import type * as express from 'express';

import { routes } from '../routes';

function createFetchRequest(
    req: express.Request,
    res: express.Response
): Request {
    const origin = `${req.protocol}://${req.get('host')}`;
    // Note: This had to take originalUrl into account for presumably vite's proxying
    const url = new URL(req.originalUrl || req.url, origin);

    const controller = new AbortController();
    res.on('close', () => controller.abort());

    const headers = new Headers();

    for (const [key, values] of Object.entries(req.headers)) {
        if (values) {
            if (Array.isArray(values)) {
                for (const value of values) {
                    headers.append(key, value);
                }
            } else {
                headers.set(key, values);
            }
        }
    }

    const init: RequestInit = {
        method: req.method,
        headers,
        signal: controller.signal,
    };

    if (req.method !== 'GET' && req.method !== 'HEAD') {
        init.body = req.body;
    }

    return new Request(url.href, init);
}

export async function render(
    request: express.Request,
    response: express.Response
) {
    const { query, dataRoutes } = createStaticHandler(routes);
    const remixRequest = createFetchRequest(request, response);
    const context = await query(remixRequest);

    if (context instanceof Response) {
        throw context;
    }

    const router = createStaticRouter(dataRoutes, context);
    const appHtml = ReactDOMServer.renderToString(
        <React.StrictMode>
            <StaticRouterProvider
                context={context}
                nonce="the-nonce"
                router={router}
            />
        </React.StrictMode>
    );

    return `
        <!DOCTYPE html>
            <html lang="en">
                <head>
                    <title>SSR</title>
                    ${response.locals.CSSBundles}
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body>
                    <div id="root">${appHtml}</div>
                    ${response.locals.JSBundles}
                </body>
            </html>
    `;
}
