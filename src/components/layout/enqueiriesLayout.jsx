import { Outlet } from "react-router-dom";
import Container from "../shared/Container";

// eslint-disable-next-line react/prop-types
const EnqueiriesLayout = () => {
  return (
    <Container>
      <div className="chart-progress bg-[#F3F7F9] text-[#000] dark:bg-[#353C48]">
        <Outlet />
      </div>
    </Container>
  );
};
export default EnqueiriesLayout;
