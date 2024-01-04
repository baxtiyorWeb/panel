import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../../setup/firebase/firebase";
import { ClipLoader } from "react-spinners";
import { MdDelete } from "react-icons/md";
import { LiaEdit } from "react-icons/lia";
import { toast } from "react-toastify";
import { Loading } from "../../Loading";
const Groups = () => {
  const param = useParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [id, setId] = useState();

  const successDelete = () => {
    toast.success(`bu o'quvchi ${param.id} guruxidan o'chirildi`, {
      position: "top-right",
    });
  };
  const errorDelete = () => {
    toast.error(`o'chirishda xatolik`, {
      position: "top-right",
    });
  };
  useEffect(() => {
    setLoading(true);
    const getAllData = async () => {
      const docRef = collection(db, "groups", param.id, "students");
      const targetDoc = await getDocs(docRef);
      const userDataArray = targetDoc.docs.map((item) => {
        return item.data();
      });
      setUser(userDataArray);
    };

    setTimeout(() => {
      getAllData();
      setLoading(false);
    }, 1000);
  }, [param.id, id]);
  const deleteUser = async (id) => {
    setId(id);
    try {
      setLoading(true);
      const docRef = collection(db, "groups", param.id, "students");
      const querySnapshot = await getDocs(docRef);

      querySnapshot.forEach(async (docs) => {
        const existingStudent = docs.data();

        if (existingStudent.id === id) {
          const studentDocRef = doc(
            db,
            "groups",
            param.id,
            "students",
            docs.id,
          ); // Create DocumentReference
          try {
            await deleteDoc(studentDocRef); // Delete the document
            successDelete();
          } catch (deleteError) {
            errorDelete();
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
      <div className="flex items-center justify-between ">
        <h1 className="text-xl">{param.id}</h1>
        <div>
          <Link
            to={"/groups/groups-form/"}
            className="rounded-md border border-gray-500 px-5 py-3"
          >
            Gurux qo{"'"}shish
          </Link>
          <Link
            to={`/groups/add-student/${param.id}`}
            className="my-3 ml-3 mr-2 rounded-md border border-gray-500 px-5 py-3"
          >
            o{"'"}quvchi kiritish
          </Link>
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center">
          {" "}
          <Loading loading={loading} />
        </div>
      ) : (
        <div>
          {user?.length === 0 ? (
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {user?.map((item, index) => (
                    <tr
                      key={index}
                      className="even-class  font-normal text-[#398dc9] even:hover:bg-[#E7E9EB] dark:bg-[#353C48] dark:text-[#EEE8CC] even:dark:bg-[#313843] dark:hover:bg-[#353C48]"
                    >
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.Course}</td>
                      <td>{item.age}</td>
                      <td>{item.Mobile}</td>
                      <td>{item.cninc}</td>
                      <td>{item?.date[0]}</td>
                      <td>{item?.date[1]}</td>
                      <td>{item.semester}</td>
                      <td className="td_flex">
                        <span
                          className="icons"
                          onClick={() => deleteUser(item.id)}
                        >
                          <MdDelete />
                        </span>
                        <div className="icons">
                          <LiaEdit />
                        </div>
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

export default Groups;
