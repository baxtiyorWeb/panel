/* eslint-disable no-undef */
import { Link, Outlet } from "react-router-dom";
import Container from "../shared/Container";

// eslint-disable-next-line react/prop-types
export const CoursesLayout = () => {
  return (
    <Container>
      <div className="chart-progress bg-[#F3F7F9] dark:bg-[#353C48]">
        <Outlet />
      </div>
    </Container>
  );
};
