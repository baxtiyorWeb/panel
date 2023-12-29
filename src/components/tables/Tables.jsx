/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../setup/firebase/firebase";
import { LiaEdit } from "react-icons/lia";
import { MdDelete, MdOutlineClose } from "react-icons/md";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import UserModal from "../modal/UserModal";
import Overlay from "../overlay/overlay";

const Tables = ({ search }) => {
  let [searchParams, setSearchParams] = useSearchParams();

  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [toggle, setToggle] = useState(false);
  const [activeId, setActiveId] = useState();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState();
  // get user about
  const notifyActive = () =>
    toast.success("user active!", { position: "top-right" });
  const notifyNoActive = () =>
    toast.success("user no active", { position: "top-right" });
  const notifyDelete = () =>
    toast.success("user delete", { position: "top-right" });
  useEffect(() => {
    (async () => {
      setLoading(true);
      const colRef = collection(db, "users");
      const snapshots = await getDocs(colRef);
      const docs = snapshots.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setUser(docs);
      setLoading(false);
    })();
  }, [deleteId, activeId]);

  //  delete user
  const handleDeletingTicket = async (id) => {
    await deleteDoc(doc(db, "users", id));
    setDeleteId(id);
    notifyDelete();
  };
  // delete user function success end

  // active or no-active

  const emailStatus = async (id) => {
    setSearchParams({ userEditId: id });
    setTimeout(() => {
      setToggle(toggle ? notifyNoActive() && false : notifyActive() && true);
    }, 100);
    await updateDoc(doc(db, "users", id), {
      active: toggle,
    });

    setActiveId(id);
  };
  const userIds = searchParams.get("user");
  const openModal = (id) => {
    setOpen(!open);
    setSearchParams({ user: id });
    setUserId(id);
  };

  // one user getData function
  return (
    <>
      {open ? (
        <UserModal open={open} setOpen={setOpen} userId={userId}>
          {loading ? (
            `Loading`
          ) : (
            <>
              <button onClick={() => setOpen(!open)}>
                <MdOutlineClose className="absolute right-1 top-1 text-[25px] text-white" />
              </button>
              <div>
                <h1>{user.name} </h1>
              </div>
            </>
          )}
        </UserModal>
      ) : false}
      {open ? <Overlay open={open} setOpen={setOpen} /> : false}
      {loading ? (
        <div className="flex items-center justify-center">
          {" "}
          <ClipLoader
            loading={loading}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
            color="#7e7f81"
          />
        </div>
      ) : (
        <div>
          {user.length === 0 ? (
            <h2
              style={{
                textAlign: "center",
                color: "#ccc",
                fontSize: "20px",
              }}
            >
              empty data
            </h2>
          ) : (
            <table id="table" className="table-hover table ">
              <thead>
                <tr>
                  <th>id</th>
                  <th>name</th>
                  <th>email</th>
                  <th>mobile</th>
                  <th>CNIC</th>
                  <th>For Course</th>
                  <th>Pref Time</th>
                  <th>Email status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {user
                  .filter((users) => users.name.toLowerCase().includes(search))
                  .map((item, index) => {
                    return (
                      <tr
                        key={item.id}
                        className={
                          "even-class  font-normal text-[#398dc9] even:hover:bg-[#E7E9EB] dark:bg-[#353C48] dark:text-[#EEE8CC] even:dark:bg-[#313843] dark:hover:bg-[#353C48]"
                        }
                      >
                        <>
                          <td>{index}</td>
                          <td
                            className="cursor-pointer select-none"
                            onClick={() => openModal(item.id)}
                          >
                            {item.name}
                          </td>
                          <td>{item.Email}</td>
                          <td>{item.Mobile}</td>
                          <td>{item.cninc}</td>
                          <td>{item.Course}</td>
                          <td>{item.PrefferedTime}</td>
                          <td>
                            <span
                              className="cursor-pointer "
                              onClick={() => emailStatus(item.id)}
                            >
                              {loading ? (
                                <ClipLoader
                                  loading={loading}
                                  size={20}
                                  aria-label="Loading Spinner"
                                  data-testid="loader"
                                  color="#7e7f81"
                                />
                              ) : item.active ? (
                                "active"
                              ) : (
                                "no active"
                              )}
                              {/* */}
                            </span>
                          </td>
                          <td className="td_flex">
                            <span className="icons">
                              <Link to={`/users-form/${item.id}`}>
                                <LiaEdit />
                              </Link>
                            </span>
                            <span className="icons">
                              {
                                <MdDelete
                                  onClick={() => handleDeletingTicket(item.id)}
                                />
                              }
                            </span>
                          </td>
                        </>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  );
};

export default Tables;
