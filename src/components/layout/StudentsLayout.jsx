/* eslint-disable no-undef */
// import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Container from "../shared/Container";
// import { enqueryList } from "../progress/data";

// eslint-disable-next-line react/prop-types
// chart-progress relative  bg-white font-normal text-[#34395e] dark:bg-[#353C48] dark:text-[#EEE8CC
export const StudentsLayout = () => {
  return (
    <Container>
      <div className="chart-progress bg-[#F3F7F9] text-[#000] dark:bg-[#353C48]">
        <Outlet />
      </div>
    </Container>
  );
};
