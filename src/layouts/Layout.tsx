import { Outlet } from 'react-router';
import { Footer } from '@/layouts/Footer/Footer.tsx';
import { Header } from './Header/Header';

function Layout() {
  return (
    <>
      <Header isAuthorized={true} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
