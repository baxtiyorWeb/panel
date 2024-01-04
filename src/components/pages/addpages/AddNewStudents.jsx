import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  setDoc,
} from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { db } from "../../../setup/firebase/firebase";
import { DatePicker } from "antd";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;
const AddNewStudents = () => {
  const [name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [cninc, setCninc] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [semester, setSemester] = useState("");
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");

  const navigate = useNavigate();
  const userCollectionRef = collection(db, "new-students");

  const groupAdded = async (e) => {
    e.preventDefault();

    setLoading(true);
    await addDoc(userCollectionRef, {
      name: name,
      fatherName: fatherName,
      age: age,
      Email: Email,
      cninc: cninc,
      Mobile: Mobile,
      Course: Course,
      PrefferedTime: "",
      date: date,
      gender: gender,
      semester: semester,
      created: false,
    });

    const coursesRef = collection(db, "courses");

    await setDoc(
      doc(coursesRef, Course),
      {
        students: arrayUnion({
          name: name,
          fatherName: fatherName,
          age: age,
          Email: Email,
          cninc: cninc,
          Mobile: Mobile,
          Course: Course,
          PrefferedTime: "",
          date: date,
          gender: gender,
          semester: semester,
          created: false,
        }),
      },
      { merge: true },
    );
    navigate("/students/new-students");

    setLoading(false);
  };

  return (
    <div>
      <div className="chart-progress bg-[#F3F7F9] font-normal text-[#34395e] dark:bg-[#353C48] dark:text-[#EEE8CC]">
        <div className="add-link">
          <h1>Student Form</h1>
          <Link to="/students/students">Students list</Link>
        </div>
        <form action="" onSubmit={groupAdded}>
          <div className="input-box bg-white">
            <div className="input-group relative">
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
                  onChange={(e) => setFatherName(e.target.value)}
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
                <span>your age</span>
                <input
                  type="number"
                  placeholder="enter your age"
                  className="dark:border dark:bg-[#353C48]"
                  onChange={(e) => setAge(e.target.value)}
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
                    onChange={() => setGender("male")}
                  />
                  <label htmlFor="Male" className="ml-1 mr-5">
                    Erkak
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="Female"
                    className="!not-sr-only h-1 w-1"
                    name="gender"
                    onChange={() => setGender("female")}
                  />
                  <label htmlFor="Female" className="ml-1 mr-5">
                    Ayol
                  </label>
                </div>
              </div>

              <div className="name">
                <span>Department</span>
                <select
                  name=""
                  id="selection"
                  className="cursor-pointer p-3 text-[16px] dark:border dark:border-[1px_solid_green] dark:bg-[#353C48] dark:text-[#fff] "
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
                  onChange={(e) => setSemester(e.target.value)}
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
              <div className="name flex items-center  pt-9">
                <RangePicker
                  size="large"
                  className="bg-transparent"
                  onChange={(values) => {
                    setDate(
                      values.map((item) => {
                        console.log(dayjs(item).format("DD-MM-YYYY"));
                        return dayjs(item).format("DD-MM-YYYY");
                      }),
                    );
                  }}
                />
              </div>
              <button type="submit" className={"-g-button"}>
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

export default AddNewStudents;
