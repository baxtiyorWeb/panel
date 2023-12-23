/* eslint-disable react/prop-types */
import Container from "../shared/Container";
import { Link, useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../setup/firebase/firebase";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import { toast } from "react-toastify";

export const EditForm = () => {
  const params = useParams("userId");
  const navigate = useNavigate();

  function timeOut() {
    setTimeout(() => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      navigate("/enquiries");
    }, 500);
  }

  const [user, setUser] = useState([]);
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [DateBirth, setDateBirth] = useState("");
  const [Email, setEmail] = useState("");
  const [cninc, setCninc] = useState("");
  const [Mobile, setMobile] = useState("");
  const [time, setTime] = useState("");
  const [Course, setCourse] = useState("");
  const [EditedId, setEditedId] = useState();
  const [loading, setLoading] = useState(false);

  // time picker format

  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const format = "HH:mm";
  const notify = () => toast.success("edit form!", { position: "top-right" });
  useEffect(() => {
    setLoading(true);
    const getAllData = async () => {
      const docRef = doc(db, "users", params.userId);
      const targetDoc = await getDoc(docRef);
      return { user: setUser(targetDoc.data()) };
    };
    setLoading(false);
    getAllData();
  }, [params]);

  useEffect(() => {
    setName(user.name);
    setEmail(user.Email);
    setCninc(user.cninc);
    setMobile(user.Mobile);
    setTime(user.PrefferedTime);
    setCourse(user.Course);
  }, [user, EditedId]);

  const editFunction = async (userId) => {
    setLoading(true);
    await updateDoc(doc(db, "users", params.userId), {
      name: name,
      Email: Email,
      Mobile: Mobile,
      DateBirth: DateBirth,
      cninc: cninc,
      Course: Course,
      PrefferedTime: time,
    });
    notify();
    setEditedId(userId);
    setLoading(false);
  };

  return (
    <Container>
      <div>
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
                onChange={(e) => setName(e.target.value)}
                value={name || ""}
              />
            </div>
            <div className="name">
              <span>Father Name</span>
              <input
                type="text"
                placeholder="Father Name"
                className="dark:border dark:bg-[#353C48]"
                onChange={(e) => setFatherName(e.target.value)}
                value={fatherName || ""}
              />
            </div>
            <div className="name">
              <span>Date of Birth</span>
              <input
                type="date"
                placeholder="name"
                className="dark:border dark:bg-[#353C48]"
                onChange={(e) => setDateBirth(e.target.value)}
                value={DateBirth || ""}
              />
            </div>
            <div className="name">
              <span>Email</span>
              <input
                type="text"
                placeholder="abc@gmail.com"
                className="dark:border dark:bg-[#353C48]"
                onChange={(e) => setEmail(e.target.value)}
                value={Email || ""}
              />
            </div>
            <div className="name">
              <span>CNIC</span>
              <input
                type="text"
                placeholder="33100-0000000-0"
                className="dark:border dark:bg-[#353C48]"
                onChange={(e) => setCninc(e.target.value)}
                value={cninc || ""}
              />
            </div>
            <div className="name">
              <span>Mobile</span>
              <input
                type="text"
                placeholder="+998 xx xxx xx xx"
                className="dark:border dark:bg-[#353C48]"
                onChange={(e) => setMobile(e.target.value)}
                value={Mobile || ""}
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
              <span>Preferred Time</span>
              <TimePicker
                defaultValue={dayjs(`${hours}: ${minutes}`, format)}
                format={format}
                onChange={(e) => setTime(e.format("HH:mm A"))}
              />
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
            onClick={() => editFunction(params.userId && timeOut())}
          >
            {loading ? "loading..." : "edited"}
          </button>
        </div>
      </div>
    </Container>
  );
};
