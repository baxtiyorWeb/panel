import Container from "../../shared/Container.jsx";
import "./Profile.css";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { BiLike } from "react-icons/bi";
import { LiaSpinnerSolid } from "react-icons/lia";
import { FaTelegram } from "react-icons/fa"
import useDeleteProfile from "../../../hooks/useDeleteProfile.js";
import { SharedModal } from "../../modal/sharedModal.jsx";
import Overlay from "../../overlay/overlay.jsx";
import { db } from "../../../setup/firebase/firebase.jsx";
import { Loading } from "./../../Loading.jsx"

// eslint-disable-next-line react/prop-types
const Profile = () => {
  const [tabItem, setTabItem] = useState(1);
  const [showPassword, setShowPassword] = useState(null);
  const [open, setOpen] = useState(false);
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);


  useEffect(() => {
    const getAllData = async () => {
      try {
        setLoading(true)
        const docRef = doc(db, "students", params.id);
        const targetDoc = await getDoc(docRef);
        return { user: setData(targetDoc.data()) };
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    };
    getAllData();
  }, []);



  const useEdit = useDeleteProfile();
  function showPass() {
    if (showPassword === "password") {
      setIcon(FaEye);
      setShowPassword("text");
    } else {
      setIcon(FaRegEye);
      setShowPassword("password");
    }
  }

  function toggleTab(index) {
    setTabItem(index);
  }

  return (
    <>

      <Container>
        <div className="title">
          <h1>Profile</h1>
        </div>
        <div className="profile-wrapper select-none dark:bg-[#353C48] ">
          <div className="side-profile">
            <div className="profile head dark:bg-[#353C48] relative">
              <div className="user ">
                <img src={data.img || "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"} alt="" />
                <div className={"overflow-hidden"}>
                  {loading ? <Loading loading={loading} /> : <input
                    type="file"
                    id="user-img"
                    className={"input-file"}
                    onChange={(e) => useEdit.setFile(e.target.files[0])}
                    disabled={useEdit.progress !== null && useEdit.progress < 100}
                  />}
                </div>

                <label
                  htmlFor="user-img"
                  className={"shadow-md pt-2 pb-1 px-3 cursor-pointer"}
                >
                  rasm kiritish{" "}
                </label>
                <div className={useEdit.progress !== null && useEdit.progress < 100 ? `border w-[150px] flex justify-between items-center` : "scale-0"}>
                  {useEdit.progress <= 100 ? <div style={{ width: `${useEdit.progress}%`, backgroundColor: "white", height: '3px' }}></div> : ""}
                </div>

                <div className={"title_top"}>{"student"}</div>
                <div>{data.Course}</div>
                <h3>Follow {data.name} On</h3>
                <button
                  onClick={() => setOpen(!open)}
                  className={
                    "absolute right-0 bottom-0 m-3 text-[25px] bg-red-500 text-gray-300 shadow-md rounded-md"
                  }
                >
                  {<MdDelete />}
                </button>
                {open && (
                  <SharedModal>
                    <h1
                      className={"bg-[#FEEFB3] text-[#CFA85B] text-[25px] p-1 "}
                    >
                      Are you sure you want to delete it?{" "}
                    </h1>

                    <input
                      type="text"
                      placeholder={useEdit.edit.name}
                      className={
                        "dark:bg-transparent p-3 border border-gray-500 m-5"
                      }
                      onChange={(e) => useEdit.setValue(e.target.value)}
                    />
                  </SharedModal>
                )}
                {open && <Overlay setOpen={setOpen} open={open} />}
                <div>
                  <Link to={"https://t.me//Hasan"}>
                    <FaTelegram />
                  </Link>
                </div>
              </div>
            </div>
            <div className="profile footer dark:bg-[#353C48]">
              <h3 className={"user_brain"}>Personal Details</h3>
              <div className={"user_brn"}>
                <h4>Birthday</h4>
                <h4>{data.DateBirth}</h4>
              </div>
              <div className={"user_brn"}>
                <h4>Phone</h4>
                <h4>{data.Mobile}</h4>
              </div>
              <div className={"user_brn"}>
                <h4>Mail</h4>
                <h4>{data.Email}</h4>
              </div>
            </div>
          </div>
          <div className="user-settings shadow-lg">
            <div className="tab-item">
              <div onClick={() => toggleTab(1)} className={"tab"}>
                About
              </div>
              <div onClick={() => toggleTab(2)} className={"tab"}>
                Settings
              </div>
            </div>
            <div className={"tabs"}>
              <div
                className={
                  tabItem === 1 ? "tab-item-block" : "tab-item-block-hide"
                }
              >
                <div className="chart-progress  dark:bg-[#353C48] text-[#34395e] dark:text-[#EEE8CC] font-normal">
                  <div className="add-link mb-10 ">
                    <h1>Add Course Form</h1>
                    <Link to="/courses/courses">Students list</Link>
                  </div>
                  <div className="text-[#000] text-[18px] dark:text-[#fef3b0] mt-5 mb-5">
                    Batch title
                  </div>

                  <div className="input-box">
                    <div className="name">
                      <span>course title</span>
                      <input
                        type="text"
                        placeholder="name"
                        className="dark:bg-[#353C48] dark:border"
                      />
                    </div>
                    <div className="name">
                      <span>last name</span>
                      <input
                        type="text"
                        placeholder="last name"
                        className="dark:bg-[#353C48] dark:border"
                      />
                    </div>
                    <div className="name">
                      <span>email</span>
                      <input
                        type="text"
                        placeholder="admin@gmal.com"
                        className="dark:bg-[#353C48] dark:border"
                      />
                    </div>
                    <div className="name relative">
                      <span>password</span>
                      <input
                        type={showPassword}
                        placeholder="password"
                        className="dark:bg-[#353C48] dark:border"
                      />
                      <div
                        className="absolute right-4 top-[55px] cursor-pointer z-10"
                        onClick={showPass}
                      >
                        {/* {icon} */}
                      </div>
                    </div>
                    <div className="name">
                      <span>Duration</span>
                      <input
                        type="text"
                        placeholder="name"
                        className="dark:bg-[#353C48] dark:border"
                      />
                    </div>
                    <div className="name">
                      <span>Duration type</span>
                    </div>
                  </div>

                </div>
              </div>
              <div
                className={
                  tabItem === 2
                    ? "tab-item-block "
                    : "tab-item-block-hide chart-progress  dark:bg-[#353C48] text-[#34395e] dark:text-[#EEE8CC] font-normal"
                }
              >
                <div className="chart-progress  dark:bg-[#353C48] text-[#34395e] dark:text-[#EEE8CC] font-normal">
                  {loading ? (
                    <Loading loading={loading} />
                  ) : (
                    <table
                      id="table"
                      className="table table-hover table-mc-light-blue"
                    >
                      <thead>
                        <tr>
                          <th>full name</th>
                          <th>Mobile</th>
                          <th>Email</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          key={data.id}
                          className={
                            "even:dark:bg-[#313843]  even:hover:bg-[#E7E9EB] dark:bg-[#353C48] text-[#398dc9] dark:text-[#EEE8CC] font-normal"
                          }
                        >
                          <td>{data.name}</td>
                          <td>{data.Mobile}</td>
                          <td>{data.Email}</td>
                          <td className={"td_flex"}>
                            <span
                              className="icons"
                            // onClick={() => likeHandleTicket(item.id)}
                            >
                              {loading && data.id ? (
                                <LiaSpinnerSolid />
                              ) : (
                                <BiLike
                                  style={{
                                    color: !data.like ? "white" : "green",
                                  }}
                                />
                              )}
                            </span>
                            <span
                              className="icons"
                              onClick={() =>
                                useEdit.handleDeletingTicket(data.id)
                              }
                            >
                              <MdDelete />
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;
