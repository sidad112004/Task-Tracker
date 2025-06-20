import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Createtask from './pages/Createtask';
import Detailtask from './pages/Detailtask';
import Updateuser from './pages/Updateuser';
import Alltask from './pages/Alltask';
import Completedtask from './pages/Completedtask';
import Notcompletedtask from './pages/Notcompletedtask';
import Todotask from './pages/Todotask';
import Authlayout from './components/Authlayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
    
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },

      {
        path: '',
        element: (
          <Authlayout>
            <Home />
          </Authlayout>
        ),
      },
      {
        path: 'detailtask/:id',
        element: (
          
            <Detailtask />
         
        ),
      },

      
      {
        path: 'createtask',
        element: (
          <Authlayout role="USER">
            <Createtask />
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
      {
        path: 'alltask',
        element: (
          <Authlayout role="ADMIN">
            <Alltask />
          </Authlayout>
        ),
      },
      {
        path: 'notcompletedtask',
        element: (
          <Authlayout role="ADMIN">
            <Notcompletedtask />
          </Authlayout>
        ),
      },

      {
        path: 'completedtask',
        element: (
          <Authlayout role="EXPERT">
            <Completedtask />
          </Authlayout>
        ),
      },
      {
        path: 'todotask',
        element: (
          <Authlayout role="EXPERT">
            <Todotask />
          </Authlayout>
        ),
      },
    ],
  },
]);

export default router;
