import { HiOutlineLightBulb } from "react-icons/hi";
import { HiUsers } from "react-icons/hi2";
import {
  BsCurrencyDollar,
  BsFillBookFill,
  BsFillTagFill,
} from "react-icons/bs";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { BiCheck, BiHome, BiSolidCog, BiSolidPencil } from "react-icons/bi";
import { FaGraduationCap, FaSitemap } from "react-icons/fa";
import { AiFillFile, AiFillPlusCircle } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../setup/firebase/firebase";
import { Loading } from "../Loading";

// eslint-disable-next-line react/prop-types
export const SideBarLinks = ({ dark }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    (async () => {
      const colRef = collection(db, "groups");
      const snapshots = await getDocs(colRef);
      const docs = snapshots.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setData(docs);
    })();
    setLoading(false);
  }, []);

  return (
    <Sidebar
      style={{
        backgroundColor: dark,
        position: "fixed",
        background: "#F5F7FA",
        zIndex: "99999",
        height: "100vh",
      }}
      width={"16%"}
    >
      <Menu
        className={"fixed h-[100vh] w-[16%] dark:bg-[#353C48] "}
        style={{ overflow: "scroll" }}
      >
        <div className={"mb-24"}></div>

        <MenuItem
          className={"menus-style dark:text-cyan-50   hover:dark:bg-[#2A303A] "}
          component={<NavLink to={"/"}></NavLink>}
          icon={<BiHome />}
        >
          Boshqaruv paneli
        </MenuItem>
        <MenuItem
          icon={<HiOutlineLightBulb />}
          className={"menus-style dark:text-cyan-50  hover:dark:bg-[#2A303A]"}
          component={<NavLink to={"/enquiries"}></NavLink>}
        >
          {" "}
          So{"'"}rovlar{" "}
        </MenuItem>
        <SubMenu
          label="Talabalarni boshqarish"
          icon={<HiUsers />}
          className={"menus-style dark:text-cyan-50   hover:dark:bg-[#2A303A]"}
        >
          <MenuItem
            className="menus-style dark:bg-[#3B4452] dark:text-[#e2e6ec]"
            component={<NavLink to={"/students/students"}></NavLink>}
          >
            {" "}
            Talabalar
          </MenuItem>
          <MenuItem
            className="menus-style dark:bg-[#3B4452]  dark:text-[#e2e6ec] "
            component={<NavLink to={"/students/active"}></NavLink>}
          >
            Faol talabalar
          </MenuItem>
          <MenuItem
            className="menus-style dark:bg-[#3B4452]  dark:text-[#e2e6ec] "
            component={<NavLink to={"/students/new-students"}></NavLink>}
          >
            Yangi talabalar
          </MenuItem>
        </SubMenu>

        {loading ? (
          <Loading loading={loading} />
        ) : (
          <SubMenu
            label={`guruxlar ${data.length}`}
            icon={<BsFillBookFill />}
            className={
              "menus-style dark:text-cyan-50   hover:dark:bg-[#2A303A]"
            }
          >
            {loading ? (
              <Loading loading={loading} />
            ) : data.length === 0 ? (
              <div className="flex h-[50px] justify-center dark:bg-[#3B4452]">
                <Link
                  to={"/students/add-new-student-form"}
                  className="flex w-full flex-col justify-center pl-10 hover:bg-slate-500"
                >
                  <span>gurux qo{"'"}shmoqchimisiz</span>
                </Link>
              </div>
            ) : loading ? (
              <Loading loading={loading} />
            ) : (
              data.map((item) => (
                <MenuItem
                  key={item.id}
                  icon={<FaGraduationCap />}
                  className={
                    "menus-style dark:text-cyan-50   hover:dark:bg-[#2A303A]"
                  }
                  component={
                    <NavLink
                      to={`/groups/groups/${item.id}`}
                      className={"dark:bg-[#3B4452] dark:text-[#e2e6ec]"}
                    ></NavLink>
                  }
                >
                  {item.id}
                </MenuItem>
              ))
            )}
            <div className="flex h-[50px] justify-center dark:bg-[#3B4452]">
              <Link
                to={"/students/add-new-student-form"}
                className="flex w-full flex-col justify-center pl-10 hover:bg-slate-500"
              >
                <span className="flex items-center justify-center">
                  {" "}
                  <AiFillPlusCircle /> gurux qo{"'"}shmoqchimisiz
                </span>
              </Link>
            </div>
          </SubMenu>
        )}
        <SubMenu
          label="O'qituvchilar"
          icon={<BiSolidPencil />}
          className={"menus-style dark:text-cyan-50   hover:dark:bg-[#2A303A]"}
        >
          <MenuItem
            icon={<FaGraduationCap />}
            className={
              "menus-style dark:bg-[#3B4452] dark:text-cyan-50   hover:dark:bg-[#2A303A]"
            }
            component={<NavLink to={"/teachers/teachers/"}></NavLink>}
          >
            O{"'"}qituvchilar
          </MenuItem>
        </SubMenu>
        <MenuItem
          icon={<FaGraduationCap />}
          className={"menus-style dark:text-cyan-50   hover:dark:bg-[#2A303A]"}
          component={<NavLink to={"/courses/courses"}></NavLink>}
        >
          Kurslar
        </MenuItem>
        <MenuItem
          icon={<BiCheck />}
          className={"menus-style dark:text-cyan-50   hover:dark:bg-[#2A303A]"}
          component={<NavLink to={"/Attendance"}></NavLink>}
        >
          Davomat
        </MenuItem>
        <SubMenu
          label="Magistrlar"
          icon={<BiSolidPencil />}
          className={"menus-style dark:text-cyan-50   hover:dark:bg-[#2A303A]"}
        >
          <MenuItem
            className="dark:bg-[#3B4452] dark:text-[#e2e6ec]"
            component={<NavLink to={"/master/courses-category"}></NavLink>}
          >
            Kurs toifasi{" "}
          </MenuItem>
          <MenuItem
            className="dark:bg-[#3B4452] dark:text-[#e2e6ec]"
            component={<NavLink to={"/master/Expense-category"}></NavLink>}
          >
            Xarajatlar toifasi{" "}
          </MenuItem>
          <MenuItem
            className="dark:bg-[#3B4452] dark:text-[#e2e6ec]"
            component={<NavLink to={"/master/enquierStatus "}></NavLink>}
          >
            So{"'"}rov holati
          </MenuItem>
          <MenuItem
            className="dark:bg-[#3B4452] dark:text-[#e2e6ec]"
            component={<NavLink to={"/master/designation"}></NavLink>}
          >
            Belgilanish
          </MenuItem>
          <MenuItem
            className="dark:bg-[#3B4452] dark:text-[#e2e6ec]"
            component={<NavLink to={"/master/department"}></NavLink>}
          >
            Bo{"'"}lim
          </MenuItem>
          <MenuItem
            className="dark:bg-[#3B4452] dark:text-[#e2e6ec]"
            component={<NavLink to={"/master/Guests"}></NavLink>}
          >
            Mehmonlar
          </MenuItem>
        </SubMenu>
        <MenuItem
          icon={<BsFillTagFill />}
          component={<NavLink to={"/collect"}></NavLink>}
          className={"menus-style dark:text-cyan-50   hover:dark:bg-[#2A303A]"}
        >
          To{"'"}lovni yig{""}ish
        </MenuItem>

        <MenuItem
          icon={<BsCurrencyDollar />}
          className={"menus-style dark:text-cyan-50   hover:dark:bg-[#2A303A]"}
          component={<NavLink to={"/expenses"}></NavLink>}
        >
          Xarajatlar
        </MenuItem>
        <SubMenu
          label="Hisobotlar"
          icon={<AiFillFile />}
          className={"menus-style dark:text-cyan-50   hover:dark:bg-[#2A303A]"}
        >
          <MenuItem
            className="dark:bg-[#3B4452] dark:text-[#e2e6ec]"
            component={<NavLink to={"/reports/fee-reports"}></NavLink>}
          >
            To{"'"}lov hisoboti
          </MenuItem>
          <MenuItem
            className="dark:bg-[#3B4452] dark:text-[#e2e6ec]"
            component={<NavLink to={"/reports/experence-reports"}></NavLink>}
          >
            Xarajatlar hisoboti
          </MenuItem>
        </SubMenu>
        <SubMenu
          label="Sozlamalar"
          icon={<BiSolidCog />}
          className={"menus-style dark:text-cyan-50   hover:dark:bg-[#2A303A]"}
        >
          <MenuItem
            className="dark:bg-[#3B4452] dark:text-[#e2e6ec]"
            component={<NavLink to={"/settings/currency"}></NavLink>}
          >
            {" "}
            Valyuta{" "}
          </MenuItem>
          <MenuItem
            className="dark:bg-[#3B4452] dark:text-[#e2e6ec]"
            component={<NavLink to={"/settings/users"}></NavLink>}
          >
            {" "}
            Foydalanuvchilar{" "}
          </MenuItem>
        </SubMenu>

      </Menu>
    </Sidebar>
  );
};
