import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../pagination/Pagination";
import { useBatchHook } from "../../../hooks/useBatchHook";
import { LiaEdit } from "react-icons/lia";
import { BiLike } from "react-icons/bi";
import { useGetUser } from "../../../hooks/useGetUser.js";
import { ClipLoader } from "react-spinners";

const Batches = () => {
  const [search, setSearch] = useState("");
  const [page, setPages] = useState(1);
  const [limit, setlimit] = useState(5);
  const batches = useBatchHook();
  let totalPage = Math.ceil(getLength() / limit);
  console.log(setlimit);
  function handlePageChange(value) {
    if (value === "&laquo;" || value === "... ") {
      setPages(1);
    } else if (value === "&lsaquo;") {
      if (page !== 1) {
        setPages(page - 1);
      }
    } else if (value === "&rsaquo;") {
      if (page !== totalPage) {
        setPages(page + 1);
      }
    } else if (value === "&raquo;" || value === " ...") {
      setPages(totalPage);
    } else {
      setPages(value);
    }
  }

  const userss = useGetUser();
  return (
    <>
      <div className="chart-progress  dark:bg-[#353C48] text-[#398dc9] dark:text-[#EEE8CC] font-normal">
        <div className="add-link">
          <h1>Batch List</h1>
          <Link to="/batches/addBatch">add batch</Link>
        </div>
        <div className="user_blew">
          <div className="user_blow">
            <h4>Show</h4>
            <select name="name" id="select" className={"dark:bg-transparent"}>
              <option className="one_more" value="name">
                10
              </option>
            </select>
            <h4>entries</h4>
          </div>
          <div className="user_input">
            <h4>Search:</h4>
            <input
              type="text"
              className={"dark:bg-[#353C48] border border-cyan-600"}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div id="demo">
          <div>
            {batches.loading ? (
              <ClipLoader
                loading={batches.loading}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
                color="#7e7f81"
              />
            ) : batches.user.length === 0 ? (
              <h2
                style={{
                  textAlign: "center",
                  color: "#ccc",
                  fontSize: "20px",
                }}
              >
                empty data
              </h2>
            ) : (
              <div className="table-responsive-vertical shadow-z-1">
                <table
                  id="table"
                  className="table table-hover table-mc-light-blue"
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Course</th>
                      <th>Batch Time</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Faculty</th>
                      <th>Faculty %</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userss.user
                      ? batches.user
                        .filter((users) =>
                          users.batch_title.toLowerCase().includes(search)
                        )
                        .map((item, index) => {
                          return (
                            <tr
                              key={index}
                              className={
                                "even:dark:bg-[#313843] even-class dark:hover:bg-[#353C48]"
                              }
                            >
                              <td>{index}</td>
                              <td>
                                <Link
                                  to={"#"}
                                  className="text-[#6777EF] uppercase"
                                >
                                  {item.batch_title}
                                </Link>
                              </td>
                              <td>{item.course}</td>
                              <td>{item.batch_time}</td>
                              <td>{item.date[0]}</td>
                              <td>{item.date[1]}</td>
                              <td>{item.faculty}</td>
                              <td>{item.faculty_agreed_fee} %</td>
                              <td className={"td_flex"}>
                                <span className="icons">
                                  <Link to={`/batches/batch-form/${item.id}`}>
                                    {<LiaEdit />}
                                  </Link>
                                </span>
                                <span
                                  className="icons"
                                  onClick={() =>
                                    batches.likeHandleTicket(item.id)
                                  }
                                >
                                  <BiLike
                                    style={{
                                      color: !item.like ? "white" : "green",
                                    }}
                                  />
                                </span>
                              </td>
                            </tr>
                          );
                        })
                      : userss.navigate("/login")}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center ">
          <Pagination
            totalPage={totalPage}
            page={page}
            limit={limit}
            sibling={1}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};
export default Batches;
