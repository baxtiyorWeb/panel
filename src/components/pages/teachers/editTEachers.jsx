import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../setup/firebase/firebase";
import { useParams } from "react-router-dom";

const EditTEachers = () => {
  const params = useParams();
  const [user, setUser] = useState([]);
  const [edit, setEdit] = useState({
    cnic: "",
    courses: "",
    department: "",
    email: "",
    mobile: "",
    name: "",
    edits: "",
    loading: false,
  });
  useEffect(() => {
    setEdit(true);
    const getAllData = async () => {
      const docRef = doc(db, "teachers", params.id);
      const targetDoc = await getDoc(docRef);
      return { user: setUser(targetDoc.data()) };
    };
    setEdit(false);
    getAllData();
    console.log(user.name);
  }, []);

  useEffect(() => {
    setEdit(user.name);
    setEdit(user.email);
    setEdit(user.cnic);
    setEdit(user.mobile);
    setEdit(user.courses);
  }, [user]);

  const editFunction = async (userId) => {
    setEdit(true);
    await updateDoc(doc(db, "users", params.id), {
      name: edit.name,
      email: edit.email,
      mobile: edit.mobile,
      cnic: edit.cnic,
      course: edit.courses,
    });
    setEdit(userId);
    setEdit(false);
  };
  return (
    <div>
      <div className="chart-progress relative font-normal text-[#34395e] dark:bg-[#353C48] dark:text-[#EEE8CC]">
        <div className="input-box">
          <div className="name">
            <input
              type="text"
              className="dark:border dark:bg-[#353C48]"
              onChange={(e) => setEdit({ ...edit, name: e.target.value })}
              value={user.name || ""}
            />
          </div>
          <div className="name">
            <input type="text" className="dark:border dark:bg-[#353C48]" />
          </div>
          <div className="name">
            <input type="text" className="dark:border dark:bg-[#353C48]" />
          </div>
          <div className="name">
            <input type="text" className="dark:border dark:bg-[#353C48]" />
          </div>
        </div>
        <button onClick={editFunction}>editFunction</button>
      </div>
    </div>
  );
};

export default EditTEachers;
