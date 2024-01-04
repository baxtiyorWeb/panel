import { useEffect, useState } from "react";
import Container from "../shared/Container";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../setup/firebase/firebase";
import { Loading } from "../Loading";
import { Link } from "react-router-dom";
import { LiaEdit } from "react-icons/lia";
import { MdDelete } from "react-icons/md";
import Schedule from "../schedule/Schedule";

const Attendies = () => {
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState("");
  const [id, setId] = useState([]);
  const [updateId, setUpdateId] = useState();
  const [ids, setIds] = useState();
  const [open, setOpen] = useState(false);
  const [bool, setBool] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5);

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  let currentStudents = user.slice(indexOfFirstStudent, indexOfLastStudent);

  const groupsChange = async (e) => {
    setLoading(true);
    const docRef = collection(db, "groups", e.target.value, "students");
    const targetDoc = await getDocs(docRef);
    const userDataArray = targetDoc.docs.map((item) => {
      return item.data();
    });
    setUser(userDataArray);
    setLoading(false);
  };

  const groupName = () => {
    (async () => {
      setLoading(true);
      const colRef = collection(db, "groups");
      const snapshots = await getDocs(colRef);
      const docs = snapshots.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setId(docs);
      setLoading(false);
    })();
  };

  useEffect(() => {
    groupName();
  }, [updateId]);

  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setSearch(debouncedSearch);
      currentStudents = 0;
    }, 100);

    return () => clearTimeout(debounceTimeout);
  }, [debouncedSearch]);

  const handleButtonClick = async (id) => {
    setUpdateId(id);
    try {
      setLoading(true);
      const docRef = collection(db, "groups", ids, "students");
      const querySnapshot = await getDocs(docRef);

      const today = new Date();
      const todayStr = today.toISOString().split("T")[0];

      querySnapshot.forEach(async (docs) => {
        const existingStudent = docs.data();
        const tests = existingStudent.students.forEach(
          (item) => item.isPresent,
        );
        setBool(tests);
        if (existingStudent.id === id) {
          const studentDocRef = doc(db, "groups", ids, "students", docs.id); // Create DocumentReference
          const AttendiesRef = collection(db, "attendies");
          const AttendiesRefs = collection(db, "attendies");

          // async function tester() {
          //   const querySnapshot = await getDocs(AttendiesRef);
          //   let studentAlreadyExists = false;
          //   let existingStudent;

          //   querySnapshot.forEach((doc) => {
          //     const studentData = doc.data();
          //     if (studentData.id === id) {
          //       studentAlreadyExists = true;
          //       existingStudent = studentData;
          //       console.log(existingStudent.name);
          //     }
          //   });

          //   if (!studentAlreadyExists) {
          //     // If the student doesn't exist, add them
          //     const newStudentRef = await addDoc(AttendiesRefs, {
          //       ...existingStudent,
          //       date: todayStr,
          //       id: id, // Assuming id is a variable declared somewhere
          //       isPresent: bool,
          //     });
          //     console.log(newStudentRef);
          //   } else {
          //     console.log("bor ekan");
          //   }
          // }

          // tester();

          const attenDanceStudentCalendar = async () => {
            const attenDanceRef = collection(db, "attendies");

            await addDoc(attenDanceRef, {
              ...existingStudent,
              students: arrayUnion({
                date: todayStr,
                id: docs.id,
                isPresent: true,
              }),
            });
          };

          attenDanceStudentCalendar();

          try {
            await setDoc(
              studentDocRef,
              {
                // Toggle the value of 'dates'
                ...existingStudent,
                students: arrayUnion({
                  date: todayStr,
                  id: docs.id,
                  isPresent: true,
                }),
              },
              { merge: true },
            );

            console.log("Update successful");
          } catch (updateError) {
            console.error("Update error", updateError);
          }
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div>
        {!open ? <h1>select course</h1> : <h1>kalendar</h1>}
        <div className="input-box">
          <div className="name">
            <span>Course</span>
            <select
              name=""
              id="selection"
              className="p-3 text-[16px]   dark:border dark:border-[1px_solid_green]  dark:border-slate-300 dark:bg-[#353C48] dark:text-[#fff] "
              onChange={(e) => groupsChange(e) && setIds(e.target.value)}
              // onChange={(e) => setCourse(e.target.value)}
              // value={Course}
            >
              <option></option>

              {id.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.id}
                </option>
              ))}
            </select>
          </div>
          <div className="name">
            <span>o'quvchilar ichidan qidiring</span>
            <input
              type="text"
              className="dark:border dark:border-[#1A1EA4] dark:bg-[#343C48]"
              onChange={(e) =>
                setDebouncedSearch(e.target.value) || setOpen(false)
              }
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => setOpen(!open)}
            className="rounded-md border border-slate-500 px-5 py-3"
          >
            kalendarni ko'rish
          </button>
        </div>
        {open ? (
          <Schedule user={user} search={debouncedSearch} ids={ids} />
        ) : loading ? (
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
              {currentStudents
                .filter(
                  (users) =>
                    users.name.toLowerCase().includes(search) ||
                    users.Course.toLowerCase().includes(search),
                )
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

                        <td className="cursor-pointer select-none">
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
                        <td className="td_flex" key={item.id}>
                          <span className="icons">
                            <Link to={`/users-form/`}>
                              <LiaEdit />
                            </Link>
                          </span>
                          <span className="icons">
                            {
                              <MdDelete
                              // onClick={() => handleDeletingTicket(item.id)}
                              />
                            }
                          </span>

                          {item.students.map((items) => (
                            <span
                              key={items.isPresent}
                              className="icons mr-6 text-lg text-red-600"
                              onClick={() => handleButtonClick(item.id)}
                            >
                              {item.isPresent ? "A" : "P"}
                            </span>
                          ))}
                        </td>
                      </>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="current-pages">
            {currentPage} {" / "} {user.length / 3}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={
              currentStudents.length <= user.length > 4 ? user.length / 3 : 1
            }
          >
            Next
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Attendies;
