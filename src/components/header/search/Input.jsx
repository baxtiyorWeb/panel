import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../setup/firebase/firebase.jsx";
import { Link } from "react-router-dom";
import Overlay from "../../overlay/overlay.jsx";
import { LiaSearchSolid } from "react-icons/lia";

export const Input = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (search) {
      (async () => {
        const colRef = collection(db, "students");
        const snapshots = await getDocs(colRef);
        const docs = snapshots.docs.map((doc) => {
          const data = doc.data();
          data.id = doc.id;
          return data;
        });
        setUser(docs);
      })();
    }
    setLoading(false);
  }, [loading, search]);

  function searchInputEvent(e) {
    setSearch(e.target.value);
    console.log(search);
  }

  return (
    <div className="search-box">
      <div className="search-box">
        <input
          type="text"
          className="input-type rounded-[5px] text-[18px] font-medium outline-none dark:border dark:border-gray-600 dark:bg-transparent"
          placeholder="Search ..."
          onChange={searchInputEvent}
        />
        <button onClick={() => setOpen(!open)} className="outline-none">
          <LiaSearchSolid />
        </button>
      </div>
      {open ? <Overlay open={open} setOpen={setOpen} /> : false}

      {open
        ? search && (
            <ul
              className={
                "dark:shadow-3xl absolute top-[65px] z-10 h-[350px] w-[200px] rounded-md border bg-[#e2e2e2] shadow-2xl dark:border-transparent dark:bg-[#3B4452]"
              }
            >
              {loading
                ? "loading ..."
                : search &&
                  user
                    .filter((item) => {
                      const searchTerm = search.toLowerCase();
                      const fullName = item.name.toLowerCase();

                      return (
                        searchTerm &&
                        fullName.startsWith(searchTerm) &&
                        fullName !== searchTerm
                      );
                    })
                    .map((item, index) => {
                      return (
                        <li
                          key={index}
                          className={
                            "flex w-full justify-center border-b border-slate-500 dark:hover:bg-[#475569]"
                          }
                        >
                          <Link
                            to={`profile/${item.id}`}
                            className="h-full w-full p-3"
                            onClick={() => setOpen(!open)}
                          >
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
            </ul>
          )
        : false}
    </div>
  );
};
