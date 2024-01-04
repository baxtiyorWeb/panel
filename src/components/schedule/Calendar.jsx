// Calendar.js
import React, { useEffect, useState } from "react";
import "./calendar.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../setup/firebase/firebase";
const Calendar = ({ test }) => {
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [boolenTest, setBoolenTest] = useState(null);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const colRef = collection(db, "attendies");
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
  // Function to toggle attendance for a specific date
  const toggleAttendance = (date) => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [date]: !prevAttendance[date],
    }));
  };
  // Render the calendar
  const renderCalendar = () => {
    // You can customize the number of days and start date based on your requirements
    const numberOfDays = 30;
    const startDate = new Date(); // use your desired start date

    const calendarDays = Array.from({ length: numberOfDays }, (_, index) => {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + index);

      const dateString = currentDate.toISOString();

      return (
        <div
          key={dateString}
          className={`day ${attendance[dateString] ? "present" : "absent"}`}
          onClick={() => toggleAttendance(dateString)}
        >
          {currentDate.getDate()}
        </div>
      );
    });

    return <div className="calendar">{calendarDays}</div>;
  };

  return (
    <div id="demo">
      <table className="table">
        <thead>
          <tr>
            <th>name</th>
            <th>{renderCalendar()}</th>
          </tr>
        </thead>
        <tbody>
          {user?.map((item) => (
            <tr key={item.id} className="even-class">
              <td className="border border-slate-500">{item.name}</td>
              <td>
                {item.students.map((item) =>
                  item.isPresent ? (
                    <span className="mr-5 text-lg text-green-500">P</span>
                  ) : (
                    <span className="mr-6 text-lg text-red-600">A</span>
                  ),
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
