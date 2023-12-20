import { addDoc, collection } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../../setup/firebase/firebase";
import { useState } from "react";

const AddTeachers = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    cnic: "",
    mobile: Number,
    department: "",
    semester: "",
    courses: "",
  });
  const addTeacher = async () => {
    const teachersRef = collection(db, "teachers");
    let res = await addDoc(teachersRef, {
      name: form.name,
      email: form.email,
      cnic: form.cnic,
      mobile: form.mobile,
      department: form.department,
      semester: form.semester,
      courses: form.courses,
    });
    if (res) {
      navigate("/teachers/teachers");
    }
  };

  return (
    <div className="chart-progress relative font-normal text-[#34395e] dark:bg-[#353C48] dark:text-[#EEE8CC]">
      <div className="add-link">
        <button>delete</button>
        <h1 className="font-normal">Enquiry Form</h1>
        <Link to="/enquiries">Enquiries list</Link>
      </div>
      <div className="input-box">
        <div className="name">
          <span>Name</span>
          <input
            type="text"
            placeholder="name"
            className="dark:border dark:bg-[#353C48]"
            id="newNotes"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="name">
          <span>Email</span>
          <input
            type="text"
            placeholder="abc@gmail.com"
            className="dark:border dark:bg-[#353C48]"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div className="name">
          <span>CNIC</span>
          <input
            type="text"
            placeholder="33100-0000000-0"
            className="dark:border dark:bg-[#353C48]"
            onChange={(e) => setForm({ ...form, cnic: e.target.value })}
          />
        </div>
        <div className="name">
          <span>Mobile</span>
          <input
            type="text"
            placeholder="+998 xx xxx xx xx"
            className="dark:border dark:bg-[#353C48]"
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          />
        </div>
        <div className="name">
          <span>Department</span>
          <select
            name=""
            id="selection"
            className="cursor-pointer p-3 text-[16px] dark:border dark:border-[1px_solid_green] dark:bg-[#353C48] dark:text-[#fff] "
            onChange={(e) => setForm({ ...form, department: e.target.value })}
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
            onChange={(e) => setForm({ ...form, semester: e.target.value })}
          >
            <option value="Other" disabled>
              select semester
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
          <span>Course</span>
          <select
            name=""
            id="selection"
            className="p-3 text-[16px] dark:border  dark:border-[1px_solid_green] dark:bg-[#353C48] dark:text-[#fff] "
            onChange={(e) => setForm({ ...form, courses: e.target.value })}
          >
            <option> </option>
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
      </div>
      <button
        type="submit"
        style={{
          width: "80px",
          height: "30px",
          backgroundColor: "#6777ef",
          borderColor: "transparent",
          color: "#fff",
          padding: "0.1rem 0.4rem",
          fontSize: "12px",
          cursor: "pointer",
          borderRadius: "3px",
          position: "absolute",
          right: "0px",
          bottom: "5px",
        }}
        onClick={addTeacher}
      ></button>
    </div>
  );
};

export default AddTeachers;
