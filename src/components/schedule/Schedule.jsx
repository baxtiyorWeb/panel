import React, { useEffect, useState } from "react";
import { db } from "../../setup/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import "./calendar.css";
import Calendar from "./Calendar";
const Schedule = ({ ids }) => {
  const [test, setTest] = useState([]);
  const [isGreen, setIsGreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [boolenTest, setBoolenTest] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const studentsCollection = collection(db, "groups", ids, "students");
      const studentSnapshot = await getDocs(studentsCollection);
      const studentData = studentSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTest(studentData);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const Boolens = () => {
    test.map((item) => {
      item.students.forEach((item) => setBoolenTest(item.isPresent));
    });
    return <>{boolenTest ? "A" : "P"}</>;
  };
  return (
    <>
      <Calendar Boolens={<Boolens />} test={test} />
    </>
  );
};

export default Schedule;
