import React from 'react'
import { useRoutes, Navigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import SignUp from '../../pages/SignUp'
import Login from '../../pages/Login'
import Home from '../../pages/Home';
import Main from '../../pages/Main';
import Admin from '../../pages/Admin';
import User from '../../pages/User';

import QuestionsList from '../../pages/QuestionsList';
import EditQuestion from '../../pages/EditQuestion';

import './index.css';
import TeachersList from '../TeacherList';
import AddNewTeacherList from '../AddNewTeacherList';
import EditTeacher from '../EditTeacher';

import UserQuestions from '../UserQuestions';
import UserInfo from '../UserInfo';

import DivisionList from '../DivisionList';
import AddNewDivision from '../AddNewDivision';
import EditDivision from '../EditDivision';

import ExamsList from '../../pages/ExamList';
import CreateExam from '../../pages/CreateExam';
import ExamPreview from '../../pages/ExamPreview';
import EditExam from '../../pages/EditExam';

import CreateCourse from '../../pages/CreateCourse';
import CourseList from '../../pages/CourseList';

import Test from '../../pages/Test';
import Test2 from '../../pages/Test2';
import Test3 from '../../pages/Test3';


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
      path: '/User',
      element: (
        <>
          {/* 添加导航链接到 Admin 组件 */}
          <Link to="/User"></Link>
          <User />
        </>
      ),
      children:[
        {
          path: 'MyQuestions',
          element: <UserQuestions />,
        },
        {
          path: 'UserInfo',
          element: <UserInfo />,  
        },
        // {
        //   path: 'addnewteacher',
        //   element: <AddNewTeacherList />,  
        // },
      ]
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
      children:[
        {
          path: 'teachersList',
          element: <TeachersList />,
        },
        {
          path: 'addnewteacher',
          element: <AddNewTeacherList />,  
        },
        {
          path: 'editteacher',
          element: <EditTeacher />,  
        },

        {
          path: 'divisionList',
          element: <DivisionList />,
        },
        {
          path: 'addnewdivision',
          element: <AddNewDivision />,  
        },
        {
          path: 'editdivision',
          element: <EditDivision />,  
        },
      ]
    },
    {
      path: '/question/view',
      element: <QuestionsList />, 
    },
    {
      path: '/question/edit',
      element: <EditQuestion />,
    },
    {
      path: '/exam/view',
      element: <ExamsList />,
    },
    {
      path: '/exam/new',
      element: <CreateExam />,
    },
    {
      path: '/exam/preview',
      element: <ExamPreview />,
    },
    {
      path: '/exam/edit',
      element: <EditExam />,
    },
   
    {
      path: '/course/view',
      element: <CourseList />,
    },
    {
      path: '/course/new',
      element: <CreateCourse />,
    },

    {
      path: '/Test',
      element: <Test />,
    },

    {
      path: '/Test2',
      element: <Test2 />,
    },

    {
      path: '/Test3',
      element: <Test3 />,
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

