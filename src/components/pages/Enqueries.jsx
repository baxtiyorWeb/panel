import { useState } from "react";
import Container from "../shared/Container";
import { Link, useNavigate } from "react-router-dom";
import { getLength, getUsers } from "../progress/data";
import "./Enquiries.css";
import Pagination from "../pagination/Pagination";
import Tables from "../tables/Tables";

const Enqueries = () => {
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

  return (<Container>
      <div className="dashboard-user">
        <div
          className="fruit"
          style={{
            marginTop: "10px"
          }}
        >
          <h2 className={"text-[25px] dark:text-[#96a2b4]"}>Enquiries</h2>
        </div>
        <div className="fruit-user dark:bg-[#353C48]">
          <Link to={"#"}>Dashboard</Link>/<Link to={"#"}>Dashboard</Link>/
          <Link to={"#"}>Home</Link>
        </div>
      </div>
      <div className="chart-progress font-normal text-[#398dc9] dark:bg-[#353C48] dark:text-[#EEE8CC]">
        <div className="add-link">
          <h1 className="dark:text-[#fff]">Enquiries</h1>
          <Link to="/layout/addform">add enquirie</Link>
        </div>
        <div className="user_blew">
          <div className="user_blow">
            <h4 className="dark:text-[#fff]">Show</h4>
            <select
              name="name"
              id="select"
              className={"dark:bg-transparent dark:text-[#fff]"}
              onChange={(e) => setlimit(e.target.value)}
            >
              <option className="one_more bg-current" value="5">
                5
              </option>
              <option className="one_more" value="10">
                10
              </option>
              <option className="one_more" value="15">
                15
              </option>
              <option className="one_more" value="20">
                20
              </option>
            </select>
            <h4 className="dark:text-[#fff]">entries</h4>
          </div>
          <div className="user_input">
            <h4>Search:</h4>
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              className={"border border-cyan-600 dark:border dark:bg-[#3B4452]"}
            />
          </div>
        </div>

        <div id="demo">
          <div>
            <div className="table-responsive-vertical shadow-z-1">
              <Tables
                search={search}
                setSearch={setSearch}
                users={getUsers(page, limit)}
              />
            </div>
          </div>
        </div>
        <div className="ic flex justify-center">
          <Pagination
            totalPage={totalPage}
            page={page}
            limit={limit}
            sibling={1}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </Container>);
};

export default Enqueries;
