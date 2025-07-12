
import Header from '@/components/shared/Header/Header';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <h1>Footer</h1>
        </>
    );
};

export default MainLayout;