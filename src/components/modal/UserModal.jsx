/* eslint-disable react/prop-types */
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useParams } from "react-router-dom";
import { db, realTimeDatabase } from "../../setup/firebase/firebase";
import Comment from "../Comment/Comment";
import { useComment } from "../../hooks/useComment";
import { onValue, ref } from "firebase/database";

const UserModal = ({ open, setOpen, userId }) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState([]);
  const comment = useComment();
  const [user, setUser] = useState([]);
  useEffect(() => {
    setLoading(true);
    const getAllData = async () => {
      const docRef = doc(db, "users", userId);
      const targetDoc = await getDoc(docRef);
      return { user: setUser(targetDoc.data()) };
    };
    getAllData();
    setLoading(false);
  }, [params, userId, comment.isLoading]);

  // get data

  useEffect(() => {
    onValue(ref(realTimeDatabase), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((message) => {
          setMessage((prev) => [...prev, message]);
        });
      }
    });
  }, []);

  return (
    <>
      <div className="fixed w-[50%] h-[50vh] top-[23%] left-[30%] bg-[#fff] dark:bg-[#3B4452] rounded-md shadow-2xl text-[#fff]">
        {loading ? (
          `Loading`
        ) : (
          <>
            <button onClick={() => setOpen(!open)}>
              <MdOutlineClose className="text-[25px] text-white absolute right-1 top-1" />
            </button>
            <div className="text-[20px] flex justify-center  flex-col  items-center text-[#fff]">
              <h1>{user.name} ga xabar yozing </h1>
            </div>
            <div>
              <Comment name={user.name} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserModal;
