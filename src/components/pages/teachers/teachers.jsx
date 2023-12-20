import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../setup/firebase/firebase";
import { useNavigate } from "react-router-dom";

const Teachers = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      setLoading(true);
      const colRef = collection(db, "teachers");
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
  return (
    <div>
      {loading ? (
        "loading"
      ) : user.length === 0 ? (
        navigate("/teachers/teachers-form")
      ) : (
        <div>
          {user.map((item, index) => (
            <div key={index}>
              <div>{item.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Teachers;
