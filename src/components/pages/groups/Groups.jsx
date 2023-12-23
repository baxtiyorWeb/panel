import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../../../setup/firebase/firebase";
import { ClipLoader } from "react-spinners";
// import { Loading } from "../../Loading";
const Groups = () => {
  const param = useParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    setLoading(true);
    const getAllData = async () => {
      const docRef = doc(db, "groups", param.id);
      const targetDoc = await getDoc(docRef);
      console.log(targetDoc.data()?.students);
      return { user: setUser(targetDoc.data()) };
    };

    setTimeout(() => {
      getAllData();
      setLoading(false);
    }, 1000);
  }, [param.id]);

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
                  </tr>
                </thead>
                <tbody>
                  {user.students?.map((item, index) => (
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
                      <td>{item.date}</td>
                      <td>{item.date1}</td>
                      <td>{item.semester}</td>
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
