import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import Students from "./components/pages/Student";
import EnqueiriesLayout from "./components/layout/enqueiriesLayout";
import AddForm from "./components/pages/addEnqueries";
import { StudentsLayout } from "./components/layout/StudentsLayout";
import { BatchesLayout } from "./components/layout/BatchesLayout";
import Batches from "./components/pages/batches/Batches";
import Courses from "./components/pages/Courses";
import Attendies from "./components/pages/Attendies";
import MasterLayout from "./components/layout/MastersLayout";
import CourseCategory from "./components/pages/masters/CourseCategory";
import Department from "./components/pages/masters/Department";
import Designation from "./components/pages/masters/Designation";
import EnquiereStatus from "./components/pages/masters/EnquiereStatus";
import ExpenseCategory from "./components/pages/masters/ExpenseCategory";
import Guestst from "./components/pages/masters/Guestst";
import CollectFree from "./components/pages/CollectFee";
import Payroll from "./components/pages/Payroll";
import Expenses from "./components/pages/Expenses";
import Reportslayout from "./components/layout/ReportsLayout";
import { FeeReports } from "./components/pages/reports/FeeReports";
import { ExpensesReports } from "./components/pages/reports/ExpenseReports";
import SettingsLayout from "./components/layout/SettingsLayout";
import Currency from "./components/pages/settings/setting/Currency";
import { Users } from "./components/pages/settings/setting/Users";
import WebSettingsLayout from "./components/layout/WebSettingsLayout";
import Profile from "./components/pages/profile/Profile.jsx";
import Main from "./components/main/Main.jsx";
import Enqueries from "./components/pages/Enqueries.jsx";
import AddStudent from "./components/pages/addpages/AddStudent";
import AddBatch from "./components/pages/addpages/Addbatch";
import { CoursesLayout } from "./components/layout/CoursesLayout";
import WebSettingsUsers from "./components/pages/settings/web/Currency";
import WebSettingsCurrensy from "./components/pages/settings/web/Currency";
import { EditForm } from "./components/pages/EditForm";
import { StudentForm } from "./components/pages/students/studend-form";
import Active from "./components/pages/students/Active";
import { BatchForm } from "./components/pages/batches/batch-form";
import AddCourse from "./components/pages/addpages/addCourses.jsx";
import { Login } from "./components/Login.jsx";
import AddExpenses from "./components/pages/addpages/addExpenses.jsx";
import EditCoursePage from "./components/editPages/EditCoursePage.jsx";
import AddFeeReports from "./components/pages/addpages/AddFeeReports.jsx";
import { NewStudents } from "./components/pages/students/newStudents.jsx";
import AddNewStudents from "./components/pages/addpages/AddNewStudents.jsx";
import NewStudentsAbout from "./components/pages/students/newStudentsAbout.jsx";
import ViewStudents from "./components/pages/students/viewStudents.jsx";
import Groupslayout from "./components/layout/groupslayout.jsx";
import "../src/response.css";
import Groups from "./components/pages/groups/Groups.jsx";
import TeachersLayout from "./components/layout/TeachersLayout.jsx";
import Teachers from "./components/pages/teachers/teachers.jsx";
import AddTeachers from "./components/pages/addpages/AddTeachers.jsx";
import AddGroup from "./components/pages/addpages/AddGroup.jsx";
import AddStudentInGroup from "./components/pages/addpages/AddStudentInGroup.jsx";
import AddTeacherinGroup from "./components/pages/teachers/addTeacherinGroup.jsx";
import EditTEachers from "./components/pages/teachers/editTEachers.jsx";
import GroupsEdit from "./components/pages/groups/groupsEdit.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/details/:newId" element={<NewStudentsAbout />} />
      <Route path="/" element={<Layout />}>
        <Route exact path={"login"} element={<Login />} />
        <Route path="/users-form/:userId" element={<EditForm />} />
        <Route path="/" element={<Main />} />
        <Route path="/enquiries" element={<Enqueries />} />
        <Route path="/layout" element={<EnqueiriesLayout />}>
          <Route path="/layout/addform" element={<AddForm />} />
        </Route>
        <Route path="/students/" element={<StudentsLayout />}>
          <Route path="/students/students" element={<Students />} />
          <Route
            path="/students/view-students/:id"
            element={<ViewStudents />}
          />
          <Route
            path="/students/students-form/:userId"
            element={<StudentForm />}
          />
          <Route path="/students/addStudent" element={<AddStudent />} />
          <Route
            path="/students/add-new-student-form"
            element={<AddNewStudents />}
          />
          <Route path="/students/active" element={<Active />} />
          <Route path="/students/new-students" element={<NewStudents />} />
        </Route>

        <Route path="/batches/" element={<BatchesLayout />}>
          <Route path="/batches/batch" element={<Batches />} />
          <Route path="/batches/addBatch" element={<AddBatch />} />
          <Route path="/batches/batch-form/:userId" element={<BatchForm />} />
        </Route>
        <Route path="teachers" element={<TeachersLayout />}>
          <Route path="/teachers/teachers/" element={<Teachers />} />
          <Route path="/teachers/teachers-form" element={<AddTeachers />} />
          <Route path="/teachers/edit-form/:id" element={<EditTEachers />} />
          <Route
            path="/teachers/add-group/:id"
            element={<AddTeacherinGroup />}
          />
        </Route>
        <Route path="/courses" element={<CoursesLayout />}>
          <Route path="/courses/courses" element={<Courses />} />
          <Route path="/courses/add-course" element={<AddCourse />} />
          <Route path="/courses/edit/:id" element={<EditCoursePage />} />
        </Route>
        <Route path="/Attendance" element={<Attendies />} />
        <Route path="/master" element={<MasterLayout />}>
          <Route path="/master/courses-category" element={<CourseCategory />} />
          <Route path="/master/department" element={<Department />} />
          <Route path="/master/designation" element={<Designation />} />
          <Route path="/master/enquierStatus" element={<EnquiereStatus />} />
          <Route
            path="/master/Expense-category"
            element={<ExpenseCategory />}
          />
          <Route path="/master/Guests" element={<Guestst />} />
        </Route>
        <Route path={"/expenses-form"} element={<AddExpenses />} />
        <Route path="/collect" element={<CollectFree open={open} />} />
        <Route path="/payroll" element={<Payroll open={open} />} />
        <Route path="/expenses" element={<Expenses open={open} />} />
        <Route path="/reports" element={<Reportslayout />}>
          <Route path="/reports/fee-reports" element={<FeeReports />} />
          <Route path="/reports/addReports-form" element={<AddFeeReports />} />
          <Route
            path="/reports/experence-reports"
            element={<ExpensesReports />}
          />
        </Route>
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/settings" element={<SettingsLayout />}>
          <Route path="/settings/currency" element={<Currency />} />
          <Route path="/settings/users" element={<Users />} />
        </Route>
        <Route path="/websettings" element={<WebSettingsLayout />}>
          <Route
            path="/websettings/currency"
            element={<WebSettingsCurrensy />}
          />
          <Route path="/websettings/users" element={<WebSettingsUsers />} />
        </Route>
        <Route path="/groups" element={<Groupslayout />}>
          <Route path="/groups/groups-form/" element={<AddGroup />} />
          <Route path="/groups/groups/:id" element={<Groups />} />
          <Route path="/groups/groups-edit/:id" element={<GroupsEdit />} />
          <Route
            path="/groups/add-student/:id"
            element={<AddStudentInGroup />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
