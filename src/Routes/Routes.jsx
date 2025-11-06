import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home/Home";
import Registration from "../pages/Registration/Registration";
import Login from "../pages/Login/Login";
import AllModels from "../pages/AllModels/AllModels";
import AddModel from "../pages/AddModel/AddModel";
import ModelDetails from "../pages/ModelDetails/ModelDetails";
// import Profile from "../Pages/Profile/Profile";
// import PrivateRoute from "./PrivateRoute";
// import UpdateModel from "../Pages/UpdateModel/UpdateModel";
// import MyModels from "../Pages/MyModels/MyModels";
// import MyDownloads from "../Pages/MyDownloads/MyDownloads";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch("http://localhost:3000/latest-model"),
        // loader: () => fetch('https://3d-model-server.vercel.app/latest-models')
      },
      {
        path: "/all-models",
        element: <AllModels />,
        loader: () => fetch("http://localhost:3000/model"),
        // loader: () => fetch('https://3d-model-server.vercel.app/models')
      },
    //   {
    //     path: "/profile",
    //     element: (
    //       <PrivateRoute>
    //         <Profile />
    //       </PrivateRoute>
    //     ),
    //   },
      {
        path: "/add-model",
        element: (
          // <PrivateRoute>
            <AddModel />
          // </PrivateRoute>
        ),
      },
      {
        path: "/model-details/:id",
        element: (
          // <PrivateRoute>
            <ModelDetails />
          // </PrivateRoute>
        ),
      },

    //    {
    //     path: "/my-models",
    //     element: (
    //       <PrivateRoute>
    //         <MyModels />
    //       </PrivateRoute>
    //     ),
    //   },

    //    {
    //     path: "/my-downloads",
    //     element: (
    //       <PrivateRoute>
    //         <MyDownloads />
    //       </PrivateRoute>
    //     ),
    //   },

        // {
        // path: "/update-model/:id",
        // element: (
        //   <PrivateRoute>
        //     <UpdateModel />
        //   </PrivateRoute>
        // ),
        //   loader: ({params}) => fetch(`https://3d-model-server.vercel.app/models/${params.id}`)
    //   },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Registration />,
      },
    ],
  },
]);