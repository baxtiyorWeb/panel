import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../setup/firebase/firebase";
import { Loading } from "../../Loading";
import { toast } from "react-toastify";

const AddTeacherinGroup = () => {
  const params = useParams();
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);

  const notify = async () => {
    const groupsCollection = doc(db, "teachers", params.id);
    const groupsSnapshot = await getDoc(groupsCollection);
    if (groupsSnapshot.exists()) {
      const teacherName = groupsSnapshot.data();
      console.log(teacherName);
      toast.success(` ${id} guruxi ${teacherName.name} ga yo'naltirildi`, {
        position: "top-right",
      });
    }
  };
  useEffect(() => {
    (async () => {
      setLoading(true);
      const colRef = collection(db, "groups");
      const snapshots = await getDocs(colRef);
      const docs = snapshots.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setUser(docs);
      console.log(docs);
      setLoading(false);
    })();
  }, []);

  const addPostData = async () => {
    try {
      setLoading(true);
      const groupsCollection = doc(db, "groups", id);
      const groupsSnapshot = await getDoc(groupsCollection);
      if (groupsSnapshot.exists()) {
        const data = groupsSnapshot.data();
        const postRef = doc(db, "teachers", params.id);
        await setDoc(
          postRef,
          {
            groups: arrayUnion(data),
          },
          { merge: true },
        );
      }
      notify();
    } catch (error) {
      toast.error("qanaqadir xatolik chiqdi", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div className="chart-progress relative font-normal text-[#34395e] dark:bg-[#353C48] dark:text-[#EEE8CC]">
          <div className="name flex flex-col justify-start">
            <div className="ml-1 text-[18px]">select group</div>
            <select
              className="mt-5 w-[10%] text-[16px] dark:bg-transparent"
              onChange={(e) => setId(e.target.value)}
            >
              <option value="#">guruxni tanlang</option>
              {user?.map((item) => (
                <option value={item.id} key={item.id} className="w-[100%]">
                  {item?.id}
                </option>
              ))}
            </select>
          </div>
          <button
            style={{
              width: "80px",
              height: "30px",
              backgroundColor: "rgb(103, 119, 239)",
              borderColor: "transparent",
              color: "rgb(255, 255, 255)",
              padding: "1px 4px",
              fontSize: "12px",
              cursor: "pointer",
              borderRadius: "3px",
              position: "absolute",
              right: "0px",
              bottom: "5px",
            }}
            onClick={addPostData}
          >
            send
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTeacherinGroup;
