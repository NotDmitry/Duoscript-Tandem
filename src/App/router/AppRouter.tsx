import { Route, Routes } from 'react-router';
import Dashboard from '@pages/Dashboard';
import Home from '@pages/Home';
import About from '@pages/About';
import Library from '@pages/Library';
import CourseLessons from '@pages/CourseLessons';
import Lesson from '@pages/Lesson';
import NotFound from '@pages/NotFound';
import Profile from '@pages/Profile';
import Layout from '@layouts/Layout';
import Login from '@pages/Login';
import Register from '@pages/Register';
import { PublicOnlyRoute } from '@/App/router/PublicOnlyRoute';
import { PrivateRoute } from '@/App/router/PrivateRoute';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={'about'} element={<About />} />

        <Route element={<PublicOnlyRoute />}>
          <Route path={'login'} element={<Login />} />
          <Route path={'register'} element={<Register />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path={'dashboard'} element={<Dashboard />} />
          <Route path={'library'} element={<Library />} />
          <Route path={'library/:courseId'} element={<CourseLessons />} />
          <Route
            path={'library/:courseId/lessons/:lessonId'}
            element={<Lesson />}
          />
          <Route path={'profile'} element={<Profile />} />
        </Route>
      </Route>

      <Route path={'*'} element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
