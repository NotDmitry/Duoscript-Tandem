import { Route, Routes } from 'react-router';
import Dashboard from '@pages/Dashboard';
import Home from '@pages/Home';
import About from '@pages/About';
import Library from '@pages/Library';
import NotFound from '@pages/NotFound';
import Profile from '@pages/Profile';
import Layout from '@layouts/Layout';
import Login from '@pages/Login';
import Register from '@pages/Register';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={'dashboard'} element={<Dashboard />} />
        <Route path={'about'} element={<About />} />
        <Route path={'library'} element={<Library />} />
        <Route path={'profile'} element={<Profile />} />
        <Route path={'login'} element={<Login />} />
        <Route path={'register'} element={<Register />} />
      </Route>

      <Route path={'*'} element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
