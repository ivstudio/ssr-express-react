import type { RouteObject } from 'react-router-dom';

import Layout from '@/components/Layout';

import Article, { articleLoader } from './pages/Article';
import BlogRoll, { blogLoader } from './pages/BlogRoll';
import Home from './pages/Home';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'blog',
                element: <BlogRoll />,
                loader: blogLoader,
            },
            {
                path: 'blog/:id',
                element: <Article />,
                loader: articleLoader,
            },
            {
                path: 'About',
                lazy: () => import('./pages/About/About'),
            },
        ],
    },
];
