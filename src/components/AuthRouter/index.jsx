import React from 'react'
import { useRoutes, Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import SignUp from '../../pages/SignUp'
import Login from '../../pages/Login'
import Home from '../../pages/Home';
import Main from '../../pages/Main';
import Admin from '../../pages/Admin';
import './index.css';
import TeachersList from '../TeacherList';
import EditTeacherList from '../EditTeacherList';
import Test from '../../pages/Test'

const requireAuth = (component, isAuthenticated) => {
  return isAuthenticated ? component : <Navigate to="/login" replace />;
};

function AuthRouter ({ isAuthenticated }) {
  const routes = useRoutes([
    {
      path: '/',
      element: <Navigate to="/Main" replace />,
    },
    {
      path: '/Home',
      element: <Home />,
    },
    {
        path: '/signUp',
        element: <SignUp />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
      path: '/Main',
      element: <Main />,
    },
    {
      path: '/Admin',
      element: (
        <>
          {/* 添加导航链接到 Admin 组件 */}
          <Link to="/Admin"></Link>
          <Admin />
        </>
      ),
    },
    {
      path: '/TeachersList',
      element: <TeachersList />,
    },
    {
      path: '/EditTeacherList',
      element: <EditTeacherList />,  
    },


    {
      path: '/Test',
      element: <Test />,
    },


    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ]);

  return  (
    <div className='router-box'>
        {routes}
    </div>
  );
};

export default AuthRouter;

