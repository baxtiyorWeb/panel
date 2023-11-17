import { FaDesktop } from "react-icons/fa";
import { BiEnvelope } from "react-icons/bi";
import UseTheme from "../../context/ThemeToggle.jsx";
import { useEffect, useState } from "react";
import { auth } from "../../../setup/firebase/firebase.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Overlay from "../../overlay/overlay.jsx";
import { LiaCogSolid } from "react-icons/lia";
import { useLogin } from "../../../hooks/useLogin.js";

export const UserAbout = () => {
  // const user = useGetUser()
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = auth.currentUser;
  useEffect(() => {
    try {
      setLoading(true);
      if (user !== null) {
        // The user object has basic properties such as display name, email, etc.\
        onAuthStateChanged(auth, (user) => {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          setUsers((prev) => [...prev, user]);
        });
      } else {
        // User is signed out
        // ...
        navigate("/login");
      }
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  }, [user, loading, error, navigate]);

  return (
    <>
      {open ? <Overlay open={open} setOpen={setOpen} /> : false}
      <div className="user-block">
        {users && (
          <>
            <div className="dark-light">
              <UseTheme />
            </div>
            <div
              className="desktop-icon dark:focus:bg-[#3B4452]
        rounded-[100%]
        dark:hover:bg-[#3B4452]
        dark:focus:ring-offset-1
        dark:active:bg-[#353C48]"
            >
              <FaDesktop />
            </div>
            <div
              className="envelope-icon dark:focus:bg-[#3B4452]
        rounded-[100%]
        dark:hover:bg-[#3B4452]
        dark:focus:ring-offset-1
        dark:active:bg-[#353C48]"
            >
              <BiEnvelope />
            </div>
            <div className="user-icon relative cursor-auto">
              <img
                src={
                  `${user}` &&
                  `${"https://www.shutterstock.com/image-illustration/user-sign-flat-style-icon-260nw-384122167.jpg"}`
                }
                alt=""
                className={
                  "w-[30px] h-[30px] rounded-[100%] cursor-pointer bg-transparent"
                }
                onClick={() => (user ? setOpen(!open) : navigate("/login"))}
              />

              {open && (
                <div
                  className={
                    "w-[224px] h-[304px] absolute top-[55px] right-[5px] z-10 dark:bg-[#374151] bg-[#fff] rounded-5 shadow-lg "
                  }
                >
                  <p
                    className={
                      "text-[18px] w-full text-center mt-[5px] cursor-pointer border-b border-b-[gray]"
                    }
                  >
                    {user.email}
                  </p>
                  <Link>
                    <span className="flex justify-start items-center">
                      <LiaCogSolid className="mr-3 m-3" />
                      settings
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};
