import { addDoc, collection } from "firebase/firestore";
import "../Enquiries.css";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { db } from "../../../setup/firebase/firebase";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [cninc, setCninc] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Course, setCourse] = useState("");
  const [fatherName, setfatherName] = useState("");
  const [department, setDepartment] = useState("");
  const [semestr, setSemestr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userCollectionRef = collection(db, "students");
  const date = new Date().getTime();

  async function sendForm() {
    setLoading(true);
    await addDoc(userCollectionRef, {
      name: name,
      fatherName: fatherName,
      Email: Email,
      cninc: cninc,
      Mobile: Mobile,
      Course: Course,
      PrefferedTime: "",
      date: date,
      department: department,
      semestr: semestr,
      img: "",
    });
    setLoading(false);
    navigate("/students/students");
  }

  return (
    <div>
      <div className="chart-progress relative bg-[#F3F7F9] font-normal text-[#34395e] dark:bg-[#353C48] dark:text-[#EEE8CC]">
        <form>
          <div className="add-link">
            <h1>Student Form</h1>
            <Link to="/students/students">talabalar ro'yxati</Link>
          </div>
          <div className="input-box ">
            <div className="input-group relative rounded-md bg-white shadow-lg dark:border dark:bg-[#353C48]">
              <div className="name">
                <span>Name</span>
                <input
                  type="text"
                  placeholder="name"
                  className="dark:border dark:bg-[#353C48]"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="name">
                <span>Father Name</span>
                <input
                  type="text"
                  placeholder="Father Name"
                  className="dark:border dark:bg-[#353C48]"
                  onChange={(e) => setfatherName(e.target.value)}
                />
              </div>
              <div className="name">
                <span>Date of Birth</span>
                <input
                  type="date"
                  placeholder="name"
                  className="dark:border dark:bg-[#353C48]"
                />
              </div>
              <div className="name">
                <span>Email</span>
                <input
                  type="text"
                  placeholder="abc@gmail.com"
                  className="dark:border dark:bg-[#353C48]"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="name">
                <span>CNIC</span>
                <input
                  type="text"
                  placeholder="33100-0000000-0"
                  className="dark:border dark:bg-[#353C48]"
                  onChange={(e) => setCninc(e.target.value)}
                />
              </div>
              <div className="name">
                <span>Mobile</span>
                <input
                  type="text"
                  placeholder="+998 xx xxx xx xx"
                  className="dark:border dark:bg-[#353C48]"
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              <div className="name">
                <span>Gender</span>
                <div>
                  <input
                    type="radio"
                    id="Male"
                    className="!not-sr-only h-1 w-1"
                    name="gender"
                  />
                  <label htmlFor="Male" className="ml-1 mr-5">
                    Male
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="Female"
                    className="!not-sr-only h-1 w-1"
                    name="gender"
                  />
                  <label htmlFor="Female" className="ml-1 mr-5">
                    Female
                  </label>
                </div>
              </div>

              <div className="name">
                <span>Department</span>
                <select
                  name=""
                  id="selection"
                  className="cursor-pointer p-3 text-[16px] dark:border dark:border-[1px_solid_green] dark:bg-[#353C48] dark:text-[#fff] "
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="Other" disabled>
                    Select department
                  </option>
                  <option value="Other" id="options">
                    Other1
                  </option>
                  <option value="Other" id="options">
                    Other2
                  </option>
                  <option value="Other" id="options">
                    Other3
                  </option>
                  <option value="Other" id="options">
                    Other4
                  </option>
                </select>
              </div>
              <div className="name">
                <span>Semester</span>
                <select
                  name=""
                  id="selection"
                  className="cursor-pointer p-3 text-[16px] dark:border dark:border-[1px_solid_green] dark:bg-[#353C48] dark:text-[#fff] "
                  onChange={(e) => setSemestr(e.target.value)}
                >
                  <option value="Other" disabled>
                    select semester
                  </option>
                  <option value="1st" id="options">
                    1st
                  </option>
                  <option value="2nd" id="options">
                    2nd
                  </option>
                  <option value="3rd" id="options">
                    3rd
                  </option>
                  <option value="4th" id="options">
                    4th
                  </option>
                  <option value="5th" id="options">
                    5th
                  </option>
                  <option value="6th" id="options">
                    6th
                  </option>
                  <option value="7th" id="options">
                    7th
                  </option>
                  <option value="8th" id="options">
                    8th
                  </option>
                </select>
              </div>

              <div className="name">
                <span>Course</span>
                <select
                  name=""
                  id="selection"
                  className="p-3 text-[16px] dark:border  dark:border-[1px_solid_green] dark:bg-[#353C48] dark:text-[#fff] "
                  onChange={(e) => setCourse(e.target.value)}
                  value={Course}
                >
                  <option></option>
                  <option>Modern Web App Development</option>
                  <option>Android Application Development</option>
                  <option>Advanced Graphics Designing</option>
                  <option>Microsoft Office Professional</option>
                  <option>Adobe Illustrator</option>
                  <option>Testing MT 2</option>
                  <option>Bootcamp</option>
                  <option>Android Test</option>
                  <option>digital marketing</option>
                  <option>Front end</option>
                  <option>Back end</option>
                </select>
              </div>
              <div className="name">
                <span>Course free</span>
                <input type="text" className="dark:border dark:bg-[#353C48]" />
              </div>
              <div className="name">
                <span>Student Agreed Fee</span>
                <input type="text" className="dark:border dark:bg-[#353C48]" />
              </div>
              <button type="submit" onClick={sendForm} className={"-g-button"}>
                {loading ? (
                  <ClipLoader
                    loading={loading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    color="#fff"
                  />
                ) : (
                  "send"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddStudent;
