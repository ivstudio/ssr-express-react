import { Link } from 'react-router-dom';

import Menu, { MenuItem } from '@/components/Menu';

const menuItems: MenuItem[] = [
    {
        name: 'home',
        url: '/',
    },
    {
        name: 'blog',
        url: '/blog',
    },
    {
        name: 'about',
        url: '/about',
    },
];

const AppBar = () => (
    <header aria-label="Main Navigation" className="sticky top-0">
        <div className="flex h-16 flex-row items-center justify-between bg-neutral-950 px-4">
            <Link
                aria-label="Home"
                className="text-lg font-bold text-gray-100"
                title="ssr react express boilerplate"
                to="/"
            >
                SSR Express React
            </Link>
            <Menu data={menuItems} />
        </div>
    </header>
);

export default AppBar;
