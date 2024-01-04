/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Enquiries.css";
import "react-toastify/dist/ReactToastify.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../setup/firebase/firebase";
import ClipLoader from "react-spinners/ClipLoader";
import { DatePicker, TimePicker } from "antd";
import dayjs from "dayjs";
import useRealTimeDatabase from "../../hooks/useRealTimeDatabase";
// eslint-disable-next-line react/prop-types
const AddForm = () => {
  const [name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [cninc, setCninc] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Course, setCourse] = useState("");
  const [loading, setLoading] = useState(false);
  const [dateBirth, setDateBirth] = useState("");
  const [jobs, setJobs] = useState("");
  const navigate = useNavigate();
  const userCollectionRef = collection(db, "users");
  const [time, setTime] = useState("");
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const user_about = useRealTimeDatabase();
  const [study, setStudy] = useState("");
  const { RangePicker } = DatePicker;
  const [dates, setDates] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  async function sendForm(e) {
    e.preventDefault();
    setLoading(true);
    await addDoc(userCollectionRef, {
      name: name,
      Email: Email,
      cninc: cninc,
      Mobile: Mobile,
      Course: Course,
      jobs: jobs,
      date: dates,
      edit: "LiaEdit",
      delete: "MdDelete",
      dateBirth: dateBirth,
      PrefferedTime: time,
      // study: study,
      selectedDays: selectedDays,
      created: false,
    });
    setLoading(false);
    navigate("/enquiries");

    await user_about.writeUserData(name);
  }

  const format = "HH:mm";

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      // If the day is already selected, remove it from the array
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== day),
      );
    } else {
      // If the day is not selected, add it to the array
      setSelectedDays([...selectedDays, day]);
    }
  };

  return (
    <div>
      <div className="chart-progress relative font-normal text-[#34395e] dark:bg-[#353C48] dark:text-[#EEE8CC]">
        <form onSubmit={sendForm}>
          <div className="add-link">
            <h1 className="font-normal">so'rovlar </h1>
            <Link to="/enquiries">so'rovlar ro'yxati</Link>
          </div>
          <div className="input-box">
            <div className="name">
              <span>F.I.O</span>
              <input
                type="text"
                placeholder="name"
                className="dark:border dark:bg-[#353C48]"
                id="newNotes"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="name">
              <span>Otasining yoki onasining ismi sharifi</span>
              <input
                type="text"
                placeholder="Father Name"
                className="dark:border dark:bg-[#353C48]"
                required
              />
            </div>
            <div className="name">
              <span>tug'ilgan sanasi </span>
              <DatePicker
                onChange={(e) => setDateBirth(e.format("DD/MM/YYYY"))}
                className="bg-transparent"
                aria-required
              />
            </div>
            <div className="name">
              <span>telegramm raqami</span>
              <input
                type="text"
                placeholder="telegram raqami"
                className="dark:border dark:bg-[#353C48]"
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              />
            </div>
            <div className="name">
              <span>CNIC</span>
              <input
                type="text"
                placeholder="33100-0000000-0"
                className="dark:border dark:bg-[#353C48]"
                onChange={(e) => setCninc(e.target.value)}
                required={true}
              />
            </div>
            <div className="name">
              <span>ma'lumoti</span>
              <input
                type="text"
                placeholder="masalan o'rta maxsus yoki oliy ma'lumotli"
                className="dark:border dark:bg-[#353C48]"
                onChange={(e) => setJobs(e.target.value)}
                required={true}
              />
            </div>
            <div className="name">
              <span>Mobile</span>
              <input
                type="text"
                placeholder="+998 xx xxx xx xx"
                className="dark:border dark:bg-[#353C48]"
                onChange={(e) => setMobile(e.target.value)}
                required={true}
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
                required={true}
                className="bg-transparent"
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
            <div className="name flex items-center  pt-9">
              <RangePicker
                size="large"
                onChange={(values) => {
                  setDates(
                    values.map((item) => {
                      console.log(dayjs(item).format("DD-MM-YYYY"));
                      return dayjs(item).format("DD-MM-YYYY");
                    }),
                  );
                }}
                className="bg-transparent"
              />
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
                <option value={"Modern Web App Development"}>
                  Modern Web App Development
                </option>
                <option value={"Android Application Development"}>
                  Android Application Development
                </option>
                <option value={"Advanced Graphics Designing"}>
                  Advanced Graphics Designing
                </option>
                <option value={"Microsoft Office Professional"}>
                  Microsoft Office Professional
                </option>
                <option value={"Adobe Illustrator"}>Adobe Illustrator</option>
                <option value={"Testing MT 2"}>Testing MT 2</option>
                <option value={"Bootcamp"}>Bootcamp</option>
                <option value={"Android Test"}>Android Test</option>
                <option value={"digital marketing"}>digital marketing</option>
                <option value={"Front end"}>Front end</option>
                <option value={"Back end"}>Back end</option>
              </select>
            </div>
            <div className="name ">
              <span>Semester</span>
              <div className="check-name">
                {weekdays.map((day, index) => (
                  <label key={index}>
                    <input
                      type="checkbox"
                      className="check-box"
                      checked={selectedDays.includes(day)}
                      onChange={() => toggleDay(day)}
                    />
                    {day}
                  </label>
                ))}
              </div>
              <span>Selected days: </span>
              <p className="selected-days">{selectedDays.join(", ")}</p>
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
          >
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
        </form>
      </div>
    </div>
  );
};
export default AddForm;
