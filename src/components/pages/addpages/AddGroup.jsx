import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  setDoc,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../setup/firebase/firebase";
import { useNavigate } from "react-router-dom";

const AddGroup = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  async function addGroup(e) {
    e.preventDefault();
    const theRef = doc(db, "groups", `${name}`);
    await setDoc(
      theRef,
      {
        students: arrayUnion({}),
      },
      { merge: true },
    );
    navigate(`/groups/groups/${name}`);
  }

  return (
    <div className="chart-progress relative font-normal text-[#34395e] dark:bg-[#353C48] dark:text-[#EEE8CC]">
      <form className="input-box" onSubmit={addGroup}>
        <div className="name">
          <div className="relative left-[90%] mb-5 mt-5 text-2xl">
            gurux nomi
          </div>
          <input
            type="text"
            placeholder="gurux nomi"
            className="relative left-[50%] dark:border dark:bg-[#353C48]"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button className="absolute bottom-3 right-5 rounded-sm border px-5 py-2">
          send
        </button>
      </form>
    </div>
  );
};

export default AddGroup;
