import { Outlet, useNavigation } from "react-router";
import { Toaster } from "react-hot-toast";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import Loading from "../components/Loading/Loading";

const MainLayout = () => {
  const navigation = useNavigation()
  return (
    <div>
      <div className="max-w-7xl mx-auto flex flex-col min-h-screen">
        <NavBar />
        <div className="mt-30 md:mt-20 flex-1">
          {
            navigation?.state === "loading" ? <Loading></Loading>
              : <Outlet />
          }

        </div>
        <Footer />
      </div>

      <Toaster />
    </div>
  );
};

export default MainLayout;