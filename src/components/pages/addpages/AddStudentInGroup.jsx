import {
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

const AddStudentInGroup = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [id, setId] = useState();
  const param = useParams();
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
      console.log(id);
      setLoading(false);
    };

    setTimeout(() => {
      getAllData();
      setLoading(false);
    }, 1000);
  }, []);

  const addGroup = async (
    id,
    name,
    Course,
    age,
    Mobile,
    cninc,
    date,
    date1,
    semester,
  ) => {
    try {
      const students = doc(db, "new-students", id);
      const studentSnapshot = await getDoc(students);

      if (studentSnapshot.exists()) {
        const studentData = studentSnapshot.data();

        // O'quvchini guruhga qo'shish uchun tekshirish
        const groupRef = doc(db, "groups", param.id);
        const groupSnapshot = await getDoc(groupRef);

        if (groupSnapshot.exists()) {
          const groupData = groupSnapshot.data();

          // O'quvchi groupda mavjud emasligini tekshirish
          const isStudentExistInGroup = groupData.students.find(
            (student) => student.name === studentData.name,
          );

          if (!isStudentExistInGroup) {
            // O'quvchi guruhda mavjud emasligi uchun uni qo'shish
            await setDoc(
              groupRef,
              {
                students: arrayUnion({
                  name: name,
                  Course: Course,
                  age: age,
                  Mobile: Mobile,
                  cninc: cninc,
                  date: date,
                  date1: date1,
                  semester: semester,
                  group: [
                    {
                      created: true,
                      name: param.id,
                    },
                  ],
                }),
              },
              { merge: true },
            );
            setId(id);
            notify();

            console.log("O'quvchi guruhga muvaffaqiyatli qo'shildi");
          } else {
            warning();
          }
        } else {
          console.log("Guruh topilmadi");
          // Agar guruh topilmagan bo'lsa kerakli harakatlar
        }
      } else {
        console.log("O'quvchi topilmadi");
        // Agar o'quvchi topilmagan bo'lsa kerakli harakatlar
      }
      // let groupRef = doc(db, "groups", param.id);
      setLoading(true);

      // await updateDoc(groupRef, {});

      // O'quvchini olish

      await updateDoc(doc(db, "new-students", id), {
        group: param.id,
      });

      console.log(id);
      setLoading(false);
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    }
  };

  return (
    <div>
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
                      <td className="group-name">
                        {loading ? "loading..." : item.group}
                      </td>
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
                              item.date[0],
                              item.date[1],
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
