import { Outlet, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import SideBar from "../sidebar/SideBar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../setup/firebase/firebase";

// eslint-disable-next-line react/prop-types
const Layout = () => {
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user

      // ...
    } else {
      // User is signed out
      // ...
      navigate("/login");
    }
  });

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-[#E5E5E5] dark:bg-[#3B4452]">
      <Header />
      <SideBar />
      <div className="grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
