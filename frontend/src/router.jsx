// router.js
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Createtask from './pages/Createtask';
import Detailtask from './pages/Detailtask';
import Updateuser from './pages/Updateuser';
import Authlayout from './components/Authlayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: (
          <Authlayout>
            <Home />
          </Authlayout>
        ),
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'createtask',
        element: (
          <Authlayout>
            <Createtask />
          </Authlayout>
        ),
      },
      {
        path: 'detailtask/:id',
        element: (
          <Authlayout>
            <Detailtask />
          </Authlayout>
        ),
      },
      {
        path: 'updateuser',
        element: (
          <Authlayout role="ADMIN">
            <Updateuser />
          </Authlayout>
        ),
      },
    ],
  },
]);

export default router;
