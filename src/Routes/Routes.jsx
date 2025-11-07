import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home/Home";
import Registration from "../pages/Registration/Registration";
import Login from "../pages/Login/Login";
import AllModels from "../pages/AllModels/AllModels";
import AddModel from "../pages/AddModel/AddModel";
import ModelDetails from "../pages/ModelDetails/ModelDetails";
import MyModels from "../pages/MyModels/MyModels";
import MyDownloads from "../pages/MyDownloads/MyDownloads";
import MyProfile from "../pages/MyProfile/MyProfile";
import UpdateModel from "../pages/UpdateModel/UpdateModel";
import ForgetPassword from "../pages/ForgetPassword/ForgetPassword";
import PrivateRoute from "./PrivateRoute";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch("http://localhost:3000/latest-model"),
      },
      {
        path: "/all-models",
        element: <AllModels />,
        loader: () => fetch("http://localhost:3000/model"),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-model",
        element: (
          <PrivateRoute>
            <AddModel />
          </PrivateRoute>
        ),
      },
      {
        path: "/model-details/:id",
        element: (
          <PrivateRoute>
            <ModelDetails />
          </PrivateRoute>
        ),
      },

       {
        path: "/my-models",
        element: (
          <PrivateRoute>
            <MyModels />
          </PrivateRoute>
        ),
      },

       {
        path: "/my-downloads",
        element: (
          <PrivateRoute>
            <MyDownloads />
          </PrivateRoute>
        ),
      },

        {
        path: "/update-model/:id",
        element: (
          <PrivateRoute>
            <UpdateModel />
          </PrivateRoute>
        ),
           loader: ({ params }) => fetch(`http://localhost:3000/model/${params.id}`)
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Registration />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />
      }
    ],
  },
]);