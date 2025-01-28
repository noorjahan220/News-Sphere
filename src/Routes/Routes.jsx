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
import Dashboard from "../Layout/Dashboard";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddArticle from "../Pages/AddArticlePage/AddArticle";
import AdminRoute from "./AdminRoute";
import AddPublisher from "../Pages/AddPublisher/AddPublisher";
import AllArticlesAdmin from "../Pages/AllArticlesAdmin/AllArticlesAdmin";
import MyArticlePage from "../Pages/MyArticlePage/MyArticlePage";
import Subscription from "../Pages/subscription/Subscription";
import PaymentPage from "../Pages/subscription/PaymentPage";
import MyProfilePage from './../Pages/MyProfilePage/MyProfilePage';
import PremiumArticles from "../Pages/PremiumArticles/PremiumArticles";
import UpdateArticles from "../Pages/MyArticlePage/UpdateArticles";
import AdminHome from "../Pages/Dashboard/AllUsers/AdminHome/AdminHome";

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
        path: 'myArticles',
        element: <PrivateRoute><MyArticlePage /></PrivateRoute>
      },
      {
        path: 'myProfile',
        element: <PrivateRoute><MyProfilePage /></PrivateRoute>
      },
      {
        path: 'subscription',
        element: <PrivateRoute><Subscription /></PrivateRoute>
      },
      {
        path: 'payment',
        element: <PaymentPage />
      },
      {
        path: 'Update/:id',
        element: <UpdateArticles />
      },
      {
        path: 'details/:id',
        element: (
          <PrivateRoute>
            <Details />
          </PrivateRoute>
        ),

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
      {
        path: "addArticle",
        element: <PrivateRoute><AddArticle /></PrivateRoute>
      },
      {
        path: "premium",
        element: <PrivateRoute><PremiumArticles /></PrivateRoute>
      },
    ]
  },
  {
    path: 'dashboard',
    element: <AdminRoute><Dashboard /></AdminRoute>,
    children: [
      {
        path: 'allUsers',
        element: <AllUsers />
      },
      {
        path: 'addPublisher',
        element: <AddPublisher />
      },
      {
        path: 'allArticlesAdmin',
        element: <AllArticlesAdmin />
      },
      {
        path: 'adminHome',
        element: <AdminHome />
      },
      {
        path: "*",
        element: <Error />
      },
    ]
  }
]);