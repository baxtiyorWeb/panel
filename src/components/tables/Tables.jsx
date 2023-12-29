/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
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
import { BiSort } from "react-icons/bi";

const Tables = ({ search }) => {
  let [searchParams, setSearchParams] = useSearchParams();

  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [id, setId] = useState();
  const [activeId, setActiveId] = useState();
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState();
  const [order, setOrder] = useState("ASC")
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
      sortTable()
      setLoading(false);
    })();
  }, [deleteId, activeId, id, order]);

  //  delete user
  const handleDeletingTicket = async (id) => {
    await deleteDoc(doc(db, "users", id));
    setDeleteId(id);
    notifyDelete();
  };
  // delete user function success end

  // active or no-active

  const emailStatus = async (id) => {
    // setSearchParams({ userEditId: id });
    // setTimeout(() => {
    //   setToggle(!toggle);
    // }, 100);
    // setLoading(true)
    // await updateDoc(doc(db, "users", id), {
    //   active: toggle ? notifyActive() && false : notifyNoActive() && true
    // });
    // setLoading(false)

    const userRef = doc(db, "users", id)
    const userSnapshot = await getDoc(userRef)

    if (userSnapshot.exists()) {
      setLoading(true)
      const data = userSnapshot.data()
      setTimeout((async () => {
        const response = data.active
        await updateDoc(doc(db, "users", id), {
          active: !response
        });
      }), 100);
      setId(response)
      setLoading(false)


    }

  };
  const userIds = searchParams.get("user");
  const openModal = (id) => {
    setOpen(!open);
    setSearchParams({ user: id });
    setUserId(id);
    // nc(col) => {
    //   let sortedProducts = [...user];
    //   sortedProducts.sort((a, b) => {
    //     if (a[col] < b[col]) {
    //       return col === 'ascending' ? -1 : 1;
    //     }
    //     if (a[col] > b[col]) {
    //       return col === 'ascending' ? 1 : -1;
    //     }
    //     return 0;
    //   });
    // }
  }
  const sortTable = async () => {
    const userCol = collection(db, "users");
    const userDocs = await getDocs(userCol);

    let userData = [];
    userDocs.forEach((doc) => {
      userData.push({ id: doc.id, ...doc.data() });
    });

    userData.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return order === "ASC" ? comparison : -comparison;
    });

    setUser(userData);
  }

  const toggleOrder = () => {
    setOrder(order === "ASC" ? "DESC" : "ASC");
  };

  // one user getData function
  return (
    <>

      <div className="sortable">
        <div className="border border-slate-400 w-10 h-10 flex justify-center items-center cursor-pointer rounded-md">
          <BiSort onClick={() => toggleOrder()} />
        </div>
      </div>
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
                <th >email</th>
                <th >mobile</th>
                <th >CNIC</th>
                <th >For Course</th>
                <th >Pref Time</th>
                <th >Email status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {user
                .filter((users) => users.name.toLowerCase().includes(search))
                .map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className={
                        "even-class  font-normal text-[#398dc9]  dark:bg-[#353C48] dark:text-[#EEE8CC] even:dark:bg-[#313843] dark:hover:bg-[#353C48]"
                      }
                    >
                      <>
                        <td>{index + 1}</td>

                        <td
                          className="cursor-pointer select-none"
                          onClick={() => openModal(item.id)}
                        >
                          {item.name}
                        </td>
                        <td ></td>
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
                              ""
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
    </>
  );
};

export default Tables;
