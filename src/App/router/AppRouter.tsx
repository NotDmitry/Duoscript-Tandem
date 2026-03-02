import { Route, Routes } from 'react-router';
import Dashboard from '@/pages/Dashboard';
import Home from '@/pages/Home';
import About from '@/pages/About.tsx';
import Library from '@/pages/Library.tsx';
import NotFound from '@/pages/NotFound.tsx';
import Profile from '@/pages/Profile.tsx';
import Layout from '@/layouts/Layout.tsx';
import Login from '@/pages/Login';
import Register from '@/pages/Register.tsx';
import AuthLayout from '@/layouts/AuthLayout.tsx';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={'dashboard'} element={<Dashboard />} />
        <Route path={'about'} element={<About />} />
        <Route path={'library'} element={<Library />} />
        <Route path={'profile'} element={<Profile />} />

        <Route element={<AuthLayout />}>
          <Route path={'login'} element={<Login />} />
          <Route path={'register'} element={<Register />} />
        </Route>
      </Route>

      <Route path={'*'} element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
