import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../../setup/firebase/firebase";
import { Loading } from "../../Loading";
import { toast } from "react-toastify";
import { LiaEdit } from "react-icons/lia";
import { MdDelete } from "react-icons/md";

const AddTeacherinGroup = () => {
  const params = useParams();
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [selection, setSelection] = useState();

  const notify = async () => {
    const groupsCollection = doc(db, "teachers", params.id);
    const groupsSnapshot = await getDoc(groupsCollection);
    if (groupsSnapshot.exists()) {
      const teacherName = groupsSnapshot.data();
      toast.success(` ${id} guruxi ${teacherName.name} ga yo'naltirildi`, {
        position: "top-right",
      });
    }
  };

  const groupsChange = async (e) => {
    setLoading(true);
    const docRef = collection(db, "groups", e.target.value, "students");
    const targetDoc = await getDocs(docRef);
    const userDataArray = targetDoc.docs.map((item) => {
      return item.data();
    });
    setSelection(userDataArray);

    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      const colRef = collection(db, "groups");
      const snapshots = await getDocs(colRef);
      const docs = snapshots.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setUser(docs);
    })();
    setLoading(false);
  }, [id, selection]);

  const addPostData = async () => {
    try {
      setLoading(true);
      const groupsCollection = collection(db, "groups", id, "students");
      const groupsSnapshot = await getDocs(groupsCollection);
      const datas = groupsSnapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      setUser(datas);
      const postRef = doc(db, "teachers", params.id);
      await setDoc(
        postRef,
        {
          groups: arrayUnion(...datas),
        },
        { merge: true },
      );
      notify();
    } catch (error) {
      toast.error("qanaqadir xatolik chiqdi", {
        position: "top-right",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletingTicket = async (id) => {
    setId(id);
    try {
      setLoading(true);
      const docRef = collection(db, "groups", id, "students");
      const querySnapshot = await getDocs(docRef);

      querySnapshot.forEach(async (docs) => {
        const existingStudent = docs.data();

        if (existingStudent.id === id) {
          const studentDocRef = doc(db, "groups", id, "students", docs.id); // Create DocumentReference
          try {
            await deleteDoc(studentDocRef); // Delete the document
            console.log("delete success");
          } catch (deleteError) {
            console.log("delete error");
          }
        }
      });
    } catch (error) {
      errorDelete();
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="chart-progress relative font-normal text-[#34395e] dark:bg-[#353C48] dark:text-[#EEE8CC]">
        <div className="name flex flex-col justify-start">
          <div className="ml-1 text-[18px]">select group</div>
          <select
            className="mt-5 w-[10%] text-[16px] dark:bg-transparent"
            onChange={(e) => setId(e.target.value) || groupsChange(e)}
          >
            <option value="#">guruxni tanlang</option>
            {user?.map((item) => (
              <option value={item.id} key={item.id} className="w-[100%]">
                {item?.id}
              </option>
            ))}
          </select>
          <>
            {loading ? (
              <Loading loading={loading} />
            ) : user.length === 0 ? (
              <h2
                style={{
                  textAlign: "center",
                  color: "#ccc",
                  fontSize: "20px",
                }}
              >
                empty data
              </h2>
            ) : loading ? (
              <Loading loading={loading} />
            ) : (
              <table id="table" className="table-hover table ">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Course</th>
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
                  {selection?.map((item, index) => {
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
                            // onClick={() => openModal(item?.id)}
                          >
                            {item?.name}
                          </td>
                          <td>{item?.Course}</td>
                          <td>{item?.Mobile}</td>
                          <td>{item?.cninc}</td>
                          <td>{item?.Course}</td>
                          <td>{item?.PrefferedTime}</td>
                          <td>
                            <span
                              className="cursor-pointer "
                              // onClick={() => emailStatus(item.id)}
                            >
                              {loading
                                ? ""
                                : item.active
                                  ? "active"
                                  : "no active"}
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
          </>
        </div>
        <button
          style={{
            width: "80px",
            height: "30px",
            backgroundColor: "rgb(103, 119, 239)",
            borderColor: "transparent",
            color: "rgb(255, 255, 255)",
            padding: "1px 4px",
            fontSize: "12px",
            cursor: "pointer",
            borderRadius: "3px",
            position: "absolute",
            right: "0px",
            bottom: "5px",
          }}
          onClick={addPostData}
        >
          send
        </button>
      </div>
    </div>
  );
};

export default AddTeacherinGroup;
