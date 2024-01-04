import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../setup/firebase/firebase";
import { ClipLoader } from "react-spinners";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { uid } from "uid";
import { Loading } from "../../Loading";

const AddStudentInGroup = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [id, setId] = useState();
  const param = useParams();
  const uiid = uid();
  const notify = () =>
    toast.success(`bu o'quvchi ${param.id} guruxiga qo'shildi`, {
      position: "top-right",
    });

  const warning = () =>
    toast.warning(`bu o'quvchi ${param.id} guruxida mavjud `, {
      position: "top-right",
    });

  useEffect(() => {
    setLoading(true);
    const getAllData = async () => {
      setLoading(true);
      const colRef = collection(db, "new-students");
      const snapshots = await getDocs(colRef);
      const docs = snapshots.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setUser(docs);
      setLoading(false);
    };

    setTimeout(() => {
      getAllData();
      setLoading(false);
    }, 1000);
  }, []);

  const addGroup = async (id) => {
    const groupRef = collection(db, "groups", param.id, "students");
    const students = doc(db, "new-students", id);
    const studentSnapshot = await getDoc(students);
    const studentWithGetId = studentSnapshot.data();
    const newStudentData = {
      // ... your new student data
      ...studentWithGetId,
      students: [
        {
          isPresent: true,
        },
      ],
      id: id,
    };

    const querySnapshot = await getDocs(groupRef);

    let studentAlreadyExists = false;

    querySnapshot.forEach((doc) => {
      const existingStudent = doc.data();
      if (existingStudent.id === newStudentData.id) {
        studentAlreadyExists = true;
        console.log(existingStudent.name);
      }
    });

    if (!studentAlreadyExists) {
      // If the student doesn't exist, add them
      const newStudentRef = await addDoc(groupRef, newStudentData);
      notify();
    } else {
      warning();
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center">
          {" "}
          <Loading />
        </div>
      ) : (
        <div>
          {user === 0 ? (
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
            "loading"
          ) : (
            <div>
              <table id="table" className="table-hover table">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Course</th>
                    <th>Age</th>
                    <th>Mobile</th>
                    <th>Cnic</th>
                    <th>start date</th>
                    <th>end date</th>
                    <th>Semester</th>
                    <th>group name</th>
                    <th>add group</th>
                  </tr>
                </thead>
                <tbody>
                  {user.map((item, index) => (
                    <tr
                      key={item.name}
                      className="even-class  font-normal text-[#398dc9] even:hover:bg-[#E7E9EB] dark:bg-[#353C48] dark:text-[#EEE8CC] even:dark:bg-[#313843] dark:hover:bg-[#353C48]"
                    >
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.Course}</td>
                      <td>{item.age}</td>
                      <td>{item.Mobile}</td>
                      <td>{item.cninc}</td>
                      <td>{item.date[0]}</td>
                      <td>{item.date[1]}</td>
                      <td>{item.semester}</td>
                      <td className="group-name">{item.group}</td>
                      <td className="td_flex">
                        <span
                          className="icons"
                          onClick={() =>
                            addGroup(
                              item.id,
                              item.name,
                              item.Course,
                              item.age,
                              item.Mobile,
                              item.cninc,
                              item.date,
                              item.semester,
                            )
                          }
                        >
                          <FaPlus />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddStudentInGroup;
