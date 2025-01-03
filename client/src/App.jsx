import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Login from './pages/Login'
import HeroSection from './pages/student/HeroSection'
import Courses from './pages/student/Courses'
import Gradient from './pages/student/Gradient'
import MyLearning from './pages/student/MyLearning'
import Profile from './pages/student/Profile'
import ModernSidebar from './pages/admin/ModernSidebar'
import CourseTable from './pages/admin/course/CourseTable'
import AddCourse from './pages/admin/course/AddCourse'
import EditCourse from './pages/admin/course/EditCourse'
import CreateLecture from './pages/admin/lecture/createLecture'
import EditLecture from './pages/admin/lecture/EditLecture'
import CourseDetail from './pages/student/CourseDetail'


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <>
          <HeroSection />
          <Courses />
          <Gradient />
        </>
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/My-Learning',
        element: <MyLearning />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/course-detail/:courseId',
        element: <CourseDetail />
      },
      {
        path: '/admin',
        element: <ModernSidebar />,
        children: [
          {
            path: 'dashboard',
            element: <h1>Dashboard</h1>
          },
          {
            path: 'course',
            element: <CourseTable />
          },
          {
            path: 'course/create',
            element: <AddCourse />
          },
          {
            path: 'course/:courseId',
            element: <EditCourse />
          },
          {
            path: 'course/:courseId/lecture',
            element: <CreateLecture />
          },
          {
            path: 'course/:courseId/lecture/:lectureId',
            element: <EditLecture />
          }
        ]
      }
    ]
  }
])
function App() {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  )
}

export default App