import { useEffect, useState } from "react";
// import * as admin from "firebase-admin";
import { db } from "../../../setup/firebase/firebase";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";

const NewStudentsAbout = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [data, setData] = useState([]);
  const params = useParams();
  const created = user.created;
  // const uiid = uid();

  useEffect(() => {
    const getAllData = async () => {
      const docRef = doc(db, "new-students", params.newId);
      const targetDoc = await getDoc(docRef);

      return { user: setUser(targetDoc.data()) };
    };
    getAllData();
  }, [params, created, loading]);

  const fetchData = async () => {
    try {
      const collectionRefs = collection(db, "Courses");
      const querySnapshot = await getDocs(collectionRefs);
      const dataArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(dataArray);
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Sa'yohat (render) amal bo'lishida yuklashni boshlaymiz
  }, []);

  fetchData();
  const userCollectionRef = collection(db, "students");

  const toStudentsSend = async () => {
    if (!user.created) {
      setLoading(true);
      await addDoc(userCollectionRef, {
        ...user,
        created: created,
      });
      const theRef = doc(db, "courses", user.Course);

      await setDoc(
        theRef,
        {
          students: arrayUnion({ name: user.name }),
        },
        { merge: true },
      );

      // Add a new document in collection "cities"
      // const studentRef = doc(addCourseStudentName, user.Course);

      // const q = query(studentRef, where("students", "in", user.Course));
      // const snapshot = await getDocs(q);

      // const data = snapshot.docs[0].data();
      // const newId = params.newId;
      // const ordersRef = collection(addCourseStudentName, user.Course);
      // const q = newId
      //   ? query(ordersRef, where("students", "array-contains", []))
      //   : ordersRef;
      // getDocs(q).then((resp) => {
      //   const newOrders = resp.docs.map((doc) => {
      //     return {
      //       id: doc.id,
      //       ...doc.data(q),
      //     };
      //   });
      //   setItems(newOrders);
      //   console.log(newOrders);
      // });

      // console.log(data);

      // // data.Students.push(user.name);

      // await setDoc(ordersRef, items);
      // console.log(data);

      // await setDoc(studentRef, {
      //   id: user.Course,
      //   Course: user.Course,
      //   Students: FieldValue.arrayUnion(items),
      //   duration: "duration",
      //   Mobile: user.Mobile,
      // });

      // await updateDoc(studentRef, {
      //   Students: arrayUnion(user.name),
      // });

      await updateDoc(doc(db, "new-students", params.newId), {
        created: true,
      });

      setLoading(false);
    } else {
      alert("bu o'quvchi kiritilgan");
    }
  };
  return (
    <div
      style={{
        width: "95.5%",
        transition: "0.3s ease",
        padding: "15px",
        margin: "0 auto",
      }}
    >
      {loading ? (
        "loading ..."
      ) : (
        <>
          <div className="h-[100vh] w-full border">
            <div className="about grid grid-cols-3 justify-items-center">
              <div className="m-5 flex  h-[80px] w-[400px] items-center justify-center border pl-3 text-start text-[16px] shadow-md">
                <h1>Ism Familiya: {user.name}</h1>
              </div>
              <div className="m-5 flex  h-[80px] w-[400px] items-center justify-center border pl-3 text-start text-[16px] shadow-md">
                <h1>tanglangan kurs: {user.Course}</h1>
              </div>
              <div className="m-5 flex  h-[80px] w-[400px] items-center justify-center border pl-3 text-start text-[16px] shadow-md">
                <h1>email: {user.Email}</h1>
              </div>
              <div className="m-5 flex  h-[80px] w-[400px] items-center justify-center border pl-3 text-start text-[16px] shadow-md">
                <h1>nomer: {user.Mobile}</h1>
              </div>
              <div className="m-5 flex  h-[80px] w-[400px] items-center justify-center border pl-3 text-start text-[16px] shadow-md">
                <h1>yosh: {user.age}</h1>
              </div>
              <div className="m-5 flex  h-[80px] w-[400px] items-center justify-center border pl-3 text-start text-[16px] shadow-md">
                <h1>time: {user.PrefferedTime}</h1>
              </div>
              <div className="m-5 flex  h-[80px] w-[400px] items-center justify-center border pl-3 text-start text-[16px] shadow-md">
                <h1>cnic: {user.cninc}</h1>
              </div>
              <div className="m-5 flex  h-[80px] w-[400px] items-center justify-center border pl-3 text-start text-[16px] shadow-md">
                <h1>otasining ismi: {user.fatherName}</h1>
              </div>
              <div className="m-5 flex  h-[80px] w-[400px] items-center justify-center border pl-3 text-start text-[16px] shadow-md">
                <h1>
                  action:{" "}
                  {user.created
                    ? "bu o'quchi kiritilgan"
                    : "bu o'quvchi kiritilmagan"}
                </h1>
              </div>
            </div>
            <div className="m-14 flex items-center justify-end">
              <button
                onClick={() => toStudentsSend()}
                className="w-[150px] rounded-md border p-3 shadow-xl active:scale-[0.9]"
              >
                {loading ? "loading ..." : "kursga qabul qilish"}
              </button>
            </div>
            <h1 className="text-center text-4xl ">
              {user.created
                ? "bu o'quchi talabalar ro'yxatiga  kiritilgan"
                : "bu o'quvchi talabalar ro'yxatiga kiritilmagan"}
            </h1>
          </div>
        </>
      )}
    </div>
  );
};

export default NewStudentsAbout;
