import { useState } from "react";
import { Link } from "react-router-dom";
import "./../../masters/master.css";
import Pagination from "../../../pagination/Pagination";

// eslint-disable-next-line react/prop-types
const Currency = () => {
  const [search, setSearch] = useState("");
  const [page, setpage] = useState(1);
  const [limit, setlimit] = useState(5);
  let totalPage = Math.ceil(getLength() / limit);

  function handlePageChange(value) {
    if (value === "&laquo;" || value === "... ") {
      setpage(1);
    } else if (value === "&lsaquo;") {
      if (page !== 1) {
        setpage(page - 1);
      }
    } else if (value === "&rsaquo;") {
      if (page !== totalPage) {
        setpage(page + 1);
      }
    } else if (value === "&raquo;" || value === " ...") {
      setpage(totalPage);
    } else {
      setpage(value);
    }
  }

  let emptyPage;
  if (page <= totalPage || page >= totalPage) {
    emptyPage = page;
  } else {
    setpage(emptyPage);
    emptyPage = page;
  }

  return (
    <>
      <div className="dashboard-user">
        <div
          className="fruit dark:text-[#96a2b4] text-[25px] font-light"
          style={{
            marginTop: "10px",
          }}
        >
          <h2>Enquiries</h2>
        </div>
        <div className="fruit-user dark:bg-[#3B4452]">
          <Link to={"#"}>Dashboard</Link>/<Link to={"#"}>Dashboard</Link>/
          <Link to={"#"}>Home</Link>
        </div>
      </div>
      <div className="chart-progress dark:bg-[#353c48]">
        <div className="add-link ">
          <h1>Enquiries</h1>
          <Link to="/layout/addform">add enquirie</Link>
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
              className={"dark:bg-[#3B4452] border border-cyan-600 "}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div id="demo">
          <div>
            <div className="table-responsive-vertical shadow-z-1">
              <table
                id="table"
                className="table table-hover table-mc-light-blue"
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>mobile</th>
                    <th>CNIC</th>
                    <th>For Course</th>
                    <th>Pref Time</th>
                    <th>Email status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {enqueryList
                    .filter((users) =>
                      users.names.toLowerCase().includes(search)
                    )
                    .map((item) => {
                      return (
                        <tr
                          key={item.id}
                          className={
                            "even:dark:bg-[#313843]  even:hover:bg-[#E7E9EB] dark:bg-[#353C48] text-[#398dc9] dark:text-[#EEE8CC] font-normal"
                          }
                        >
                          <td>{item.id}</td>
                          <td>
                            <Link to={"#"}>{item.names}</Link>
                          </td>
                          <td>{item.Email}</td>
                          <td>{item.Mobile}</td>
                          <td>{item.CNIC}</td>
                          <td>{item.FourCourse}</td>
                          <td>{item.PrefTime}</td>
                          <td>{item.EmailStatus}</td>
                          <td className="td_flex">
                            <span className="icons">{<item.Action />}</span>
                            <span className="icons">{<item.delete />}</span>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <div>
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
        </div>
      </div>
    </>
  );
};

export default Currency;
