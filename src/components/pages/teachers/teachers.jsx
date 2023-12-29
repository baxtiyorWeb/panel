import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../setup/firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { Button } from "antd";
import { LiaEdit } from "react-icons/lia";
import { Loading } from "../../Loading";
import { useGetUser } from "../../../hooks/useGetUser";
import { FaEye, FaPlus } from "react-icons/fa";

const Teachers = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const userss = useGetUser();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      setLoading(true);
      const colRef = collection(db, "teachers");
      const snapshots = await getDocs(colRef);
      const docs = snapshots.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setUser(docs);
      setLoading(false);
    })();
  }, []);

  const getId = (id) => {
    console.log(id);
  };

  function getID(id) {
    navigate(`/teachers/add-group/${id}`);
  }
  return (
    <div>
      <div className="flex items-center justify-end ">
        <Link
          to={"/teachers/teachers-form/"}
          className="rounded-md border border-gray-500 px-5 py-3"
        >
          o{"'"}qituvchi qo{"'"}shish
        </Link>
      </div>
      {loading ? (
        <Loading loading={loading} />
      ) : user.length === 0 ? (
        navigate("/teachers/teachers-form")
      ) : (
        <div className="table-responsive-vertical shadow-z-1">
          {userss.user ? (
            user.length === 0 ? (
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
              <table
                id="table"
                className="table-hover table-mc-light-blue table"
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Teacher Name</th>
                    <th>Groups</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>CNIC</th>
                    <th>Course</th>
                    <th>Semester</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {user?.map((item, index) => {
                    return (
                      <tr
                        key={item.id}
                        className={
                          "even-class even:dark:bg-[#313843] dark:hover:bg-[#353C48]"
                        }
                      >
                        <td>{index + 1}</td>
                        <td>
                          <Link to={`/teachers/add-group/${item.id}`}>
                            {item.name}
                          </Link>
                        </td>
                        <td>{item.groups?.length}</td>
                        <td>{item.email}</td>
                        <td>{item.mobile}</td>
                        <td>{item.cnic}</td>
                        <td>{item.courses}</td>
                        <td>{item.semester}</td>
                        <td className={"td_flex"}>
                          <span className="icons">
                            <LiaEdit onClick={() => getId(item.id)} />
                          </span>

                          <span className="icons">
                            <MdDelete />
                          </span>
                          <span className="icons">
                            <FaEye />
                          </span>
                          <span
                            className="icons"
                            onClick={() => getID(item.id)}
                          >
                            <FaPlus />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )
          ) : (
            <div className={"flex justify-center"}>
              <Button className={"dark:text-[#fff]"}>login</Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Teachers;
