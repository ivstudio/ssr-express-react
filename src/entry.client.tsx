import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    matchRoutes,
    RouterProvider,
} from 'react-router-dom';

import { routes } from './routes';

import '@/styles/index.css';

async function hydrate() {
    // Determine if any of the initial routes are lazy
    const lazyMatches = matchRoutes(routes, window.location)?.filter(
        m => m.route.lazy
    );

    // Load the lazy matches and update the routes before creating your router
    // so we can hydrate the SSR-rendered content synchronously
    if (lazyMatches && lazyMatches?.length > 0) {
        await Promise.all(
            lazyMatches.map(async m => {
                const routeModule = await m.route.lazy!();
                Object.assign(m.route, { ...routeModule, lazy: undefined });
            })
        );
    }

    const router = createBrowserRouter(routes);

    ReactDOM.hydrateRoot(
        document.getElementById('root')!,
        <React.StrictMode>
            <RouterProvider fallbackElement={null} router={router} />
        </React.StrictMode>
    );
}

hydrate();
