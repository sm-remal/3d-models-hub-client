import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";

const MainLayout = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <NavBar />
        <div className="mt-4">
          <Outlet />
        </div>
        <Footer/>
      </div>

      <Toaster/>
    </div>
  );
};

export default MainLayout;