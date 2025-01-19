import {
  createBrowserRouter,

} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import AllArticles from "../Pages/AllArticlesPage/AllArticles";
import Details from "../Pages/DetailsPage/Details";
import Login from "../Pages/Login/Login";
import Signup from './../Pages/signup/Signup';
import PrivateRoute from "./PrivateRoute";

import Error from "../Pages/ErrorPage/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'allArticles',
        element: <AllArticles />
      },
      {
        path: 'details/:id',
        element:<PrivateRoute> <Details /></PrivateRoute>
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <Signup />
      },
      {
        path: "*",
        element: <Error />
      },
    ]
  },
]);