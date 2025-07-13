
import Header from '@/components/shared/Header/Header';
import { Outlet } from 'react-router';
import { Toaster } from 'sonner';

const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Toaster position='top-right' />
            <h1>Footer</h1>
        </>
    );
};

export default MainLayout;