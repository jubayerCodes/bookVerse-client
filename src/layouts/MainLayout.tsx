
import Footer from '@/components/shared/Footer/Footer';
import Header from '@/components/shared/Header/Header';
import { Outlet } from 'react-router';
import { Toaster } from 'sonner';

const MainLayout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Toaster position='top-right' />
            <Footer />
        </>
    );
};

export default MainLayout;