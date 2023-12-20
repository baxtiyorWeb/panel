import { Link, Outlet } from "react-router-dom";
import Container from "../shared/Container";

const TeachersLayout = () => {
  return (
    <Container>
      <div className="around_one">
        <div className="around_user  text-[25px] dark:text-[#96a2b4]">
          <h2>Teachers</h2>
        </div>
        <div className="around_of dark:bg-[#353C48] ">
          <Link to={"#"}>Dashboard</Link>/<Link to={"#"}>Dashboard</Link>/
          <Link>Home</Link>
        </div>
      </div>
      <div className="chart-progress font-normal text-[#398dc9] dark:bg-[#353C48] dark:text-[#EEE8CC]">
        <Outlet />
      </div>
    </Container>
  );
};

export default TeachersLayout;
