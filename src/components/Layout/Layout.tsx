import { Outlet } from 'react-router-dom';

import AppBar from '@/components/AppBar';

const Layout = () => {
    return (
        <>
            <AppBar />
            <Outlet />
        </>
    );
};

export default Layout;
