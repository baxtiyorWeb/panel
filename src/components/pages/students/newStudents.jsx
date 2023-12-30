import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { LiaEdit, LiaEye, LiaQuestionSolid } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import { LiaCheckSolid } from "react-icons/lia";
import { Loading } from "../../Loading.jsx";
import Pagination from "../../pagination/Pagination.jsx";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../../setup/firebase/firebase.jsx";

export const NewStudents = () => {
  const [paramsQuery, setParamsQuery] = useSearchParams();
  const [search, setSearch] = useState("");
  const [newId, setNewId] = useState();
  const [detail, setDetail] = useState();
  const [userId, setUserId] = useState();

  const [page, setpage] = useState(1);

  const [limit, setlimit] = useState(5);

  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(false);

  let totalPage = Math.ceil(getLength() / limit);
  const navigate = useNavigate();

  function handlePageChange(value) {
    if (value === "&laquo;" || value === "... ") {
      setpage(1);
    } else if (value === "&lsaquo;") {
      if (page !== 1) {
        setpage(page - 1);
      }
    } else if (value === "&rsaquo;") {
      if (page !== totalPage) {
        setpage(page + 1);
      }
    } else if (value === "&raquo;" || value === " ...") {
      setpage(totalPage);
    } else {
      setpage(value);
    }
  }
  useEffect(() => {
    (async () => {
      setLoading(true);
      const colRef = collection(db, "new-students");
      const snapshots = await getDocs(colRef);
      const docs = snapshots.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setStudents(docs);
      setLoading(false);
    })();
  }, []);
  const param = paramsQuery.get("newId");
  const addedStudent = (id) => {
    setParamsQuery({ newId: newId });
    setNewId(id);
  };
  const seeDeatils = (id) => {
    setDetail(id);
    if (detail !== undefined) {
      navigate(`/details/${detail}`);
    }
  };

  const deleteNewStudent = async (id) => {
    setLoading(true)
    const newStudentRef = doc(db, "new-students", id)

    await deleteDoc(newStudentRef)
    setLoading(false)
  }
  return (
    <>
      <div className="chart-progress  font-normal text-[#398dc9] dark:bg-[#353C48] dark:text-[#EEE8CC]">
        <div className="add-link">
          <h1>Student List</h1>
          <Link to="/students/add-new-student-form">add Student</Link>
        </div>
        <div className="user_blew">
          <div className="user_blow">
            <h4>Show</h4>
            <select name="name" id="select" className="dark:bg-[#3B4452]">
              <option className="one_more" value="name">
                10
              </option>
            </select>
            <h4>entries</h4>
          </div>
          <div className="user_input">
            <h4>Search:</h4>
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              className="border border-cyan-600 dark:bg-[#3B4452]"
            />
          </div>
        </div>
        <div id="demo">
          <div>
            {loading ? (
              <Loading loading={loading} />
            ) : (
              <div className="table-responsive-vertical shadow-z-1 font-normal text-[#398dc9] dark:bg-[#353C48] dark:text-[#EEE8CC]">
                {students.length === 0 ? (
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
                  <div className="flex items-center justify-center">
                    {" "}
                    <Loading loading={loading} />
                  </div>
                ) : (
                  <table
                    id="table"
                    className="table-hover table-mc-light-blue table "
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Reg.No</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>CNIC</th>
                        <th>Course</th>
                        <th>Group</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students
                        .filter((users) =>
                          users.name.toLowerCase().includes(search),
                        )
                        .map((item, index) => {
                          return (
                            <tr
                              key={item.id}
                              className={
                                "even-class even:dark:bg-[#313843] dark:hover:bg-[#353C48]"
                              }
                            >
                              <td>{index}</td>
                              <td>
                                <Link>{item.name}</Link>
                              </td>
                              <td>{item.RegNo}</td>
                              <td>{item.Email}</td>
                              <td>{item.Mobile}</td>
                              <td>{item.cninc}</td>
                              <td className="">{item.Course}</td>
                              <td>{item.group}</td>
                              <td className={"td_flex"}>
                                <span className="icons">
                                  <Link
                                    to={`/students/students-form/${item.id}`}
                                  >
                                    <LiaEdit />
                                  </Link>
                                </span>

                                <span className="icons" onClick={() => deleteNewStudent(item.id)}>
                                  <MdDelete />
                                </span>
                                <span
                                  className="icons"
                                  onClick={() => addedStudent(item.id)}
                                >
                                  {item.created ? (
                                    <div className="created">
                                      <LiaCheckSolid />
                                    </div>
                                  ) : (
                                    <div className="disabled">
                                      <LiaQuestionSolid />
                                    </div>
                                  )}
                                </span>
                                <span
                                  className="icons tooltip"
                                  onClick={() => seeDeatils(item.id)}
                                >
                                  <LiaEye />
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
          <div></div>
        </div>
        <div className="flex justify-end">
          <Pagination
            totalPage={totalPage}
            page={page}
            limit={limit}
            sibling={1}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};
