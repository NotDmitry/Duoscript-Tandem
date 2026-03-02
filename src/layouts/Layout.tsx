import { Outlet } from 'react-router';
import { Footer } from '@/layouts/Footer/Footer.tsx';

function Layout() {
  return (
    <>
      <header>Insert Header here</header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
