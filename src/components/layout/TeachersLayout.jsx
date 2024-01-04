import { Link, Outlet } from "react-router-dom";
import Container from "../shared/Container";

const TeachersLayout = () => {
  return (
    <Container>
      <div className="chart-progress font-normal  text-[#398dc9] dark:bg-[#353C48] dark:text-[#EEE8CC]">
        <Outlet />
      </div>
    </Container>
  );
};

export default TeachersLayout;
