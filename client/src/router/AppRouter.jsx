import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Menu from "../../src/components/Menu";
import Sidebar from "../../src/components/Sidebar/Sidebar";
import Student from "../page/Student/Student.jsx";
import UnassignStudent from "../page/Student/UnassignStudent.jsx";
import Attendance from "../page/Student/Attendance.jsx";
// import LeaveRequest from "../page/Student/LeaveRequest.jsx";
import IdCard from "../page/Student/IdCard.jsx";
import ManageLogin from "../page/Student/ManageLogin.jsx";
import Promote from "../page/Student/Promote.jsx";
import Performance from "../page/Student/Performance.jsx";
import Dashboard from "../page/Dashboard/Dashboard.jsx";
import AllStaff from "../page/Staffs/AllStaff.jsx";
import StaffAttendance from "../page/Staffs/StaffAttendance.jsx";
import StaffLeaveRequest from "../page/Staffs/staffLeaveRequest.jsx";
import StaffIdCard from "../page/Staffs/StaffIdCard.jsx";
import StaffManageLogin from "../page/Staffs/SatffManageLogin.jsx";
import Rooms from "../page/Academic/Rooms.jsx";
import ClassAndSection from "../page/Academic/ClassAndSection.jsx";
import Subject from "../page/Academic/Subjects.jsx";
import Timetable from "../page/Academic/Timetable.jsx";
import AcademicPerformance from "../page/Academic/AcademicPerformance.jsx";
import AcademicExam from "../page/Academic/AcademicExam.jsx";
import AcademicResult from "../page/Academic/AcademicResult.jsx";
import AccountStatement from "../page/Finance/Account/AccountStatement.jsx";
import FeeManagement from "../page/Finance/FeeManagement.jsx";
import Payroll from "../page/Finance/Payroll/Payroll.jsx";
import Report from "../page/Finance/Report.jsx";
import AllStudents from "../page/Admission/AllStudents.jsx";
import AdmissionAttendance from "../page/Admission/AdmissionAttendance.jsx";
import AdmisionLR from "../page/Admission/AdmisionLR.jsx";
import AdmisionPerformance from "../page/Admission/AdmisionPerfromace.jsx";
import AdmissionID from "../page/Admission/AdmisionID.jsx";
import AdmissionManageLogin from "../page/Admission/AdmisionManageLogin.jsx";
import AdmissionPromote from "../page/Admission/AdmisionPromote.jsx";
import Library from "../page/Resources/Library.jsx";
// import Transport from "../page/Resources/Transport.jsx";
import Calendar from "../page/Events&Calender/Calender.jsx";
import Events from "../page/Events&Calender/Events.jsx";
import UpcomingEvents from "../page/Events&Calender/UpcomingEvents.jsx";
import Notice from "../page/Notice/Notice.jsx";
import Messages from "../page/Message/Messages.jsx";
import ReportAndAnalytics from "../page/Report&Analytics/ReportAndAnalytics.jsx";
import Settings from "../page/Settings/Settings.jsx";
import DigitalSignaturePage from "../page/Settings/DigitalSignature/DigitalSignaturePage.jsx";
import BookList from "../page/Library/BookList.jsx";
import IssueReturnBook from "../page/Library/IssueReturnBook.jsx";
import StudentDetails from "../page/Student/StudentDetails.jsx";
import AddStaff from "../page/Staffs/AddStaff.jsx";
import EditStaff from "../page/Staffs/EditStaff.jsx";
import StaffDetails from "../page/Staffs/StaffDetails.jsx";
import AddStudent from "../page/Student/AddStudent.jsx";
import AddmissionLetter from "../page/Student/Admission.jsx";
import EditStudent from "../page/Student/EditStudent.jsx";
import JobLetter from "../page/Staffs/JobLetter.jsx";
import StdudentMaterial from "../page/StudyMaterial/StdudentMaterial.jsx";
import AddHomeWork from "../page/HomeWork/AddHomeWork.jsx";
import HomeWorkList from "../page/HomeWork/HomeWorkList.jsx";
import HomeworkReport from "../page/HomeWork/HomeworkReport.jsx";
import Transport from "../page/Resources/transport.jsx";
import Facility from "../page/Resources/Facility.jsx";
// import ExamScheduled from "../page/OnlineTest/ExamScheduled.jsx";
// import ExamPaper from "../page/OnlineTest/ExamPaper.jsx";
// import QuestionBank from "../page/OnlineTest/QuestionBank.jsx";

import EditClass from "../page/OnlineClass/Modals/EditClass.jsx";
import ClassDetails from "../page/OnlineClass/Modals/ClassDetails.jsx";
import PastClass from "../page/OnlineClass/PastClass.jsx";
import BonafideCertificate from "../page/Certificate/BonafideCertificate.jsx";
import BonafideCertificatePreview from "../page/Certificate/BonafideCertificatePreview.jsx";
import DobCertificate from "../page/Certificate/DobCertificate.jsx";
import DobCertificatePreview from "../page/Certificate/DobCertificatePreview.jsx";
import CharacterCertificate from "../page/Certificate/CharacterCertificate.jsx";
import CharacterCertificatePreview from "../page/Certificate/CharacterCertificatePreview.jsx";
import TransferCertificate from "../page/Certificate/TransferCertificate.jsx";
import TransferCertificateCreate from "../page/Certificate/TransferCertificateCreate.jsx";
import TransferCertificateSearch from "../page/Certificate/TransferCertificateSearch.jsx";
import TransferCertificatePreview from "../page/Certificate/TransferCertificatePreview.jsx";
import ParticipationCertificate from "../page/Certificate/ParticipationCertificate.jsx";
import ParticipationCertificatePreview from "../page/Certificate/ParticipationCertificatePreview.jsx";
import Receipt from "../page/Student/Fee/Receipt.jsx";
import CreateSection from "../page/Academic/CreateSection.jsx";
import CreateStream from "../page/Academic/CreateStream.jsx";
import ConcessionType from "../page/Finance/ConcessionType.jsx";
import Concession from "../page/Finance/Concession.jsx";
import SalaryStructure from "../page/Finance/Payroll/SalaryStructure.jsx";
import Allowance from "../page/Finance/Payroll/Allowance.jsx";
import Deduction from "../page/Finance/Payroll/Deduction.jsx";
import AddNewDeduction from "../page/Finance/Payroll/AddNewDeduction.jsx";
import Expenses from "../page/Finance/Account/Expenses.jsx";
import AddExpenses from "../page/Finance/Account/AddExpenses.jsx";
import Account from "../page/Finance/Account/AccountStatement.jsx";
import AddRevenue from "../page/Finance/Account/AddRevenue.jsx";
import Revenue from "../page/Finance/Account/Revenue.jsx";
import Login from "../components/Sigin/Login.jsx";
import Forget from "../components/Sigin/Forget.jsx";
import Register from "../components/Sigin/Register.jsx";
import Payment from "../components/Sigin/Payment.jsx";
import AccountReview from "../components/Sigin/AccountReview.jsx";
import ContactSupport from "../components/Sigin/ContactSupport.jsx";
import TrackRegistration from "../components/Sigin/TrackRegistration.jsx";
import TwoStepVerification from "../page/TwoStepVerification/TwoStepVerification.jsx"; // ✅ Add this import
import PrivateRoute from "../components/utils/PrivateRoute.jsx"; // ✅ Add this
import PublicRoute from "../components/utils/PublicRoute.jsx"; // ✅ Add this
import RoleList from "../page/Role/RoleList.jsx";
import UserRole from "../page/ManagementUnit/UserRole.jsx";
import EditManagementRole from "../page/ManagementUnit/EditManagementRole.jsx";
import UserRolePermissions from "../page/ManagementUnit/UserRolePermissions.jsx";
import Designation from "../page/ManagementUnit/Designation.jsx";
import Department from "../page/ManagementUnit/Department.jsx";
import CreateRole from "../components/Role/CreateRole.jsx";
import EditRole from "../components/Role/EditRole.jsx";
import RoleForm from "../components/Role/RoleForm.jsx";
import PermissionPanel from "../components/Role/PermissionPanel.jsx";
import RolePermissions from "../components/Role/RolePermissions.jsx";
import ActiveStudentView from "../page/Dashboard/ActiveStudentView.jsx";
import ActiveEmployeeView from "../page/Dashboard/ActiveEmployeeView.jsx";
import PerformanceOverview from "../page/Dashboard/PerformanceOverview.jsx";
import NoticeBoardView from "../page/Dashboard/NoticeBoardView.jsx";
import EventCalendarView from "../page/Dashboard/EventCalendarView.jsx";
import CreateRoomType from "../page/Academic/CreateRoomType.jsx";
import BulkImportRoom from "../page/Academic/BulkImportRoom.jsx";
import AddRoom from "../page/Academic/AddRoom.jsx";
import TeacherDashboard from "../page/Dashboard/TeacherDashboard.jsx";
{
  /* Online Test Pages */
}
import TestPaper from "../page/OnlineTest/TestPaper.jsx";
import Result from "../page/OnlineTest/Result.jsx";
import QuestionBank from "../page/OnlineTest/QuestionBank.jsx";
import CreateQuestion from "../page/OnlineTest/CreateQuestion.jsx";
import CreateTest from "../page/OnlineTest/CreateTest.jsx";
import QuestionReview from "../page/OnlineTest/QuestionReview.jsx";
import Online_ClassDashboard from "../page/OnlineClass/Online_ClassDashboard.jsx";
import ScheduleClasses from "../page/OnlineClass/ScheduleClasses.jsx";
import ScheduleNewClass from "../page/OnlineClass/Modals/ScheduleNewClass.jsx";
import VisionRegister from "../page/FrontDesk/VisitorRegister.jsx";
import AdmissionEnquiries from "../page/FrontDesk/AdmissionEnquiries.jsx";
import GatePass from "../page/FrontDesk/GatePass.jsx";
import VisitorRegister from "../page/FrontDesk/VisitorRegister.jsx";
import AddVisitor from "../page/FrontDesk/AddVisitor.jsx";
import FollowUpAdmissionQuery from "../page/FrontDesk/FollowUpAdmissionQuery.jsx";
import AddAdmissionEnquiry from "../page/FrontDesk/AddAdmissionEnquiry.jsx";
import IssueGatePass from "../page/FrontDesk/IssueGatePass.jsx";

import EditStudyMaterial from "../page/StudyMaterial/EditStudyMaterial.jsx";
import AddMaterial from "../page/StudyMaterial/AddMaterial.jsx";

import EditHomework from "../page/HomeWork/EditHomework.jsx";
import HomeworkSubmission from "../page/HomeWork/HomeworkSubmission.jsx";

{
  /* online Test */
}
import TestQuestion from "../page/OnlineTest/TestQuestion.jsx";
import ClassTimetable from "../page/Academic/ClassTimetable.jsx";
import TeacherTimetable from "../page/Academic/TeacherTimetable.jsx";
import Substitution from "../page/Academic/Substitution.jsx";
import TimetableSettings from "../page/Academic/TimetableSettings.jsx";

{
  /* Fees */
}
import CollectedFee from "../page/Student/Fee/CollectedFee.jsx";
import My_attendance from "../page/Attendance/My_attendance.jsx";
import FeeReceipt from "../page/Student/Fee/FeeReceipt.jsx";
import PendingFee from "../page/Student/Fee/PendingFees.jsx";
import FeeParticular from "../page/Student/Fee/FeeParticulars.jsx";
import PendingReturnBook from "../page/Library/PendingReturnBook.jsx";
import LibraryCardManagement from "../page/Library/LibraryCardManagement.jsx";
import BookFine from "../page/Library/BookFine.jsx";
import FeeStructure from "../page/Student/Fee/FeeStructure.jsx";
import FeeDiscount from "../page/Student/Fee/FeeDiscount.jsx";
import TransportFare from "../page/Student/Fee/TransportFare.jsx";

{
  /* Attendance */
}
import Today_Attendance from "../page/Attendance/Today_Attendance.jsx";
import View_attendance from "../page/Attendance/View_attendance.jsx";
import Staff_Attendance from "../page/Attendance/Staff_Attendance.jsx";
import UpdateAttendance from "../page/Attendance/Update-attendance.jsx";
import NCNS_Sandwich from "../page/Attendance/NCNS_&_sandwich.jsx";
import SalaryComp from "../page/Salary/SalaryComp.jsx";
import ApprovedLeaves from "../page/Leave/ApprovedLeaves.jsx";
import RejectedLeaves from "../page/Leave/RejectedLeaves.jsx";
import LeaveRegister from "../page/Leave/LeaveRegister.jsx";
import UpdateLeave from "../page/Leave/UpdateLeave.jsx";
import LeaveAssign from "../page/Leave/LeaveAssign.jsx";
import LeaveRequest from "../page/Leave/Leaverequest.jsx";
import ShiftManagement from "../page/Shift/ShiftManagement.jsx";
import EmployeeShiftHistory from "../page/Shift/EmployeeShiftHistory.jsx"
import ScheduleShift from "../page/Shift/ScheduleShift.jsx"
import ScheduleShiftList from "../page//Shift/ScheduleShiftList.jsx"
import StudentDashboard from "../page/Dashboard/StudentDashboard.jsx";








// teacher section-----------------------------------------------------

import TeacherAddHomework from "../page/TeacherDashboard/Homework/TeacherAddHomework.jsx";
import TeacherHomeworkList from "../page/TeacherDashboard/Homework/TeacherHomeworkList.jsx";

import StudentAttendance from "../page/TeacherDashboard/Attendance/StudentAttendance.jsx";
import MyAttendance from "../page/TeacherDashboard/Attendance/MyAttendance.jsx";
import MyStudent from "../page/TeacherDashboard/My Students/MyStudent.jsx";
import MyStudentDetails from "../page/TeacherDashboard/My Students/MyStudentDetails.jsx";
import EditMyStudent from "../page/TeacherDashboard/My Students/EditMyStudent.jsx";
import TeacherOnlineDashboard from "../page/TeacherDashboard/Online Class/TeacherOnlineDashboard.jsx";
import TeacherScheduleClass from "../page/TeacherDashboard/Online Class/TeacherScheduleClass.jsx";
import TeacherPastClass from "../page/TeacherDashboard/Online Class/TeacherPastClass.jsx";
import MyLeaveRequest from "../page/TeacherDashboard/Leave Request/MyLeaveRequest.jsx";

function AppRouter() {
  const location = useLocation();

  return (
    <>
      <Routes>
        {/* Public Routes */}
        {/* <===============--------- Log In ------------=================> */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/otp"
          element={
            <PublicRoute>
              <TwoStepVerification />
            </PublicRoute>
          }
        />
        <Route
          path="/forget"
          element={
            <PublicRoute>
              <Forget />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <PublicRoute>
              <Payment />
            </PublicRoute>
          }
        />
        <Route
          path="/account-review"
          element={
            <PublicRoute>
              <AccountReview />
            </PublicRoute>
          }
        />
        <Route
          path="/contact-support"
          element={
            <PublicRoute>
              <ContactSupport />
            </PublicRoute>
          }
        />
        <Route
          path="/track-registration"
          element={
            <PublicRoute>
              <TrackRegistration />
            </PublicRoute>
          }
        />

        {/* Protected Routes - Authentication required */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Menu />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="student" element={<StudentDashboard />} />
          <Route path="teacher" element={<TeacherDashboard/>} />
          {/* ActiveStudentView */}
          <Route path="active-student-view" element={<ActiveStudentView />} />
          {/* ActiveEmployeeView */}
          <Route path="active-employee-view" element={<ActiveEmployeeView />} />
          {/* PerformanceOverview */}
          <Route
            path="performance-overview"
            element={<PerformanceOverview />}
          />
          {/* NoticeBoardView */}
          <Route path="notice-boardview" element={<NoticeBoardView />} />
          <Route path="eventcalendar-view" element={<EventCalendarView />} />
          <Route path="/study-material" element={<StdudentMaterial />} />
          <Route
            path="/edit-study-material/:id"
            element={<EditStudyMaterial />}
          />
          <Route path="/add-material" element={<AddMaterial />} />
          {/* // student routes */}
          <Route path="students" element={<Student />} />
          <Route path="Studentdetails/:id" element={<StudentDetails />} />
          <Route path="unassign-students" element={<UnassignStudent />} />
          <Route path="attendance" element={<Attendance />} />
          {/* <Route path="leave-request" element={<LeaveRequest />} /> */}
          <Route path="perfromances" element={<Performance />} />
          <Route path="id-card" element={<IdCard />} />
          <Route path="manage-login" element={<ManageLogin />} />
          <Route path="promote" element={<Promote />} />
          <Route path="addStudent" element={<AddStudent />} />
          <Route path="editStudent/:id" element={<EditStudent />} />
          <Route path="admissionLetter" element={<AddmissionLetter />} /> // for
          testing only later we remove it
          <Route path="admissionLetter/:id" element={<AddmissionLetter />} />

          {/* Fee */}
          <Route path="collectdFee" element={<CollectedFee />} />
          <Route path="fee-Receipt" element={<FeeReceipt />} />
          <Route path="fee-Receipt/:id" element={<FeeReceipt />} />
          <Route path="pending-fee" element={<PendingFee />} />
          <Route path="fee-particular" element={<FeeParticular />} />
          <Route path="fee-structure" element={<FeeStructure />} />
          <Route path="fee-discount" element={<FeeDiscount />} />
          <Route path="transport-fare" element={<TransportFare />} />



          {/* // staffs  */}
          <Route path="all-staffs" element={<AllStaff />} />
          <Route path="add-staffs" element={<AddStaff />} />
          <Route path="edit-staffs/:id" element={<EditStaff />} />
          <Route path="staffDetails/:id" element={<StaffDetails />} />
          <Route path="staff-attendance" element={<StaffAttendance />} />
          <Route path="staffLeave-request" element={<StaffLeaveRequest />} />
          {/* Attendance routes new*/}
          <Route path="/my_attendance" element={<My_attendance />} />
          <Route path="/todays-attendance" element={<Today_Attendance />} />
          <Route path="/view_attendance" element={<View_attendance />} />
          <Route path="/attendance_register" element={<Staff_Attendance />} />
          <Route path="/update-attendance" element={<UpdateAttendance />} />
          <Route path="/NCNS_&_sandwich" element={<NCNS_Sandwich />} />

            {/* Leave section */}
          <Route path="leave_request" element={<LeaveRequest />} />
          <Route path="approved-leaves" element={<ApprovedLeaves />} />
          <Route path="rejected_Leaves" element={<RejectedLeaves />} />
          <Route path="leave_register" element={<LeaveRegister />} />
          <Route path="update_leave" element={<UpdateLeave />} />
          <Route path="leave_assign" element={<LeaveAssign />} />

          {/* Shift Section */}
          <Route path="shift_management" element={<ShiftManagement/>} />
          <Route path="schedule_shift" element={<ScheduleShift/>} />
          <Route path="employee_shift_history" element={<EmployeeShiftHistory/>} />
          <Route path="Schedule_Shift_List" element={<ScheduleShiftList/>} />
{/*  */}

          <Route path="staff-id" element={<StaffIdCard />} />
          <Route path="staff-manageLogin" element={<StaffManageLogin />} />
          <Route path="job-letter/:id" element={<JobLetter />} />
          {/* // Academic */}
          <Route path="academic-rooms" element={<Rooms />} />
          <Route path="class-section" element={<ClassAndSection />} />
          <Route path="academic-subject" element={<Subject />} />
          {/* table */}
          <Route path="academic-timetable" element={<Timetable />}>
            <Route index element={<Navigate to="class" replace />} />

            <Route path="class" element={<ClassTimetable />} />
            <Route path="teacher" element={<TeacherTimetable />} />
            <Route path="substitution" element={<Substitution />} />
            <Route path="settings" element={<TimetableSettings />} />
          </Route>
          <Route path="academic-performace" element={<AcademicPerformance />} />
          {/* salary single comp */}
          <Route path="salary" element={<SalaryComp />} />
        
          {/*  */}

          {/*  */}
          {/* <Route path="academic-exam" element={<AcademicExam />} /> */}
          {/* <Route path="academic-result" element={<AcademicResult />} /> */}
          <Route path="create-section" element={<CreateSection />} />
          <Route path="create-stream" element={<CreateStream />} />
          <Route path="create-room-type" element={<CreateRoomType />} />
          <Route path="bulk-import-room" element={<BulkImportRoom />} />
          {/* <Route path="/edit-room" element={<AddRoom />} /> */}
          {/* <Route path="/edit-room/:id" element={<AddRoom />} /> */}
          {/* // HomeWork */}
          <Route path="add-homework" element={<AddHomeWork />} />
          <Route path="homework-list" element={<HomeWorkList />} />
          <Route path="/homework-report/:id" element={<HomeworkReport />} />
          <Route path="edit-homework/:id" element={<EditHomework />} />
          <Route path="homework-submission" element={<HomeworkSubmission />} />
          <Route
            path="homework-submission/:id"
            element={<HomeworkSubmission />}
          />
          {/* // Online Test */}
          {/* 
          <Route path="exam-scheduled" element={<ExamScheduled />} />
          <Route path="exam-paper" element={<ExamPaper />} /> */}
          <Route path="question-bank" element={<QuestionBank />} />
          <Route path="result" element={<Result />} />
          <Route path="test-paper" element={<TestPaper />} />
          <Route path="create-question" element={<CreateQuestion />} />
          <Route path="create-test" element={<CreateTest />} />
          <Route path="question-review" element={<QuestionReview />} />
          {/* // Online Class */}
          {/* Matches "Dashboard Classes" section */}
          <Route
            path="online-class-dashbord"
            element={<Online_ClassDashboard />}
          />
          <Route path="schedule-class" element={<ScheduleClasses />} />
          <Route path="add-schedule-class" element={<ScheduleNewClass />} />
          <Route path="edit-schedule-class/:id" element={<EditClass />} />
          <Route path="class-details/:id" element={<ClassDetails />} />
          <Route path="past-class" element={<PastClass />} />
          {/* // Admission */}
          <Route path="admission-allStudent" element={<AllStudents />} />
          <Route
            path="admission-attendance"
            element={<AdmissionAttendance />}
          />
          <Route path="admission-leave-request" element={<AdmisionLR />} />
          <Route
            path="admission-performance"
            element={<AdmisionPerformance />}
          />
          <Route path="admission-id-card" element={<AdmissionID />} />
          <Route
            path="admission-manage-login"
            element={<AdmissionManageLogin />}
          />
          <Route path="admission-promote" element={<AdmissionPromote />} />
          {/* // Resources */}
          <Route path="library" element={<Library />} />
          <Route path="book_list" element={<BookList />} />
          <Route path="issue/return_book" element={<IssueReturnBook />} />
          <Route path="/pending_return_book" element={<PendingReturnBook/>}/>
          <Route path="/library_card" element={<LibraryCardManagement/>}/>
          <Route path="/book_fine" element={<BookFine/>}/>
          <Route path="transport" element={<Transport />} />
          <Route path="facility" element={<Facility />} />
          {/* // Finance */}
          <Route path="account-statement" element={<AccountStatement />} />
          <Route path="fee-management" element={<FeeManagement />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="report" element={<Report />} />
          <Route path="certificate/bonafide" element={<BonafideCertificate />} />
          <Route
            path="certificate/bonafide/:id"
            element={<BonafideCertificatePreview />}
          />
          <Route path="certificate/dob_Certificate" element={<DobCertificate />} />
          <Route
            path="certificate/dob_Certificate/:id"
            element={<DobCertificatePreview />}
          />
          <Route
            path="certificate/character_Certificate"
            element={<CharacterCertificate />}
          />
          <Route
            path="certificate/character_Certificate/:id"
            element={<CharacterCertificatePreview />}
          />
          <Route
            path="certificate/participation_Certificate"
            element={
              <ParticipationCertificate
                certificateType="participation"
                pageTitle="Participation Certificate"
                previewPath="/certificate/participation_Certificate"
                certificateSubtitle="OF PARTICIPATION"
              />
            }
          />
          <Route
            path="certificate/participation_Certificate/:studentId"
            element={
              <ParticipationCertificatePreview
                backPath="/certificate/participation_Certificate"
                certificateLabel="Participation Certificate"
                certificateSubtitle="OF PARTICIPATION"
                pdfNamePrefix="Participation-Certificate"
              />
            }
          />
          <Route
            path="certificate/appreciation_Certificate"
            element={
              <ParticipationCertificate
                certificateType="appreciation"
                pageTitle="Appreciation Certificate"
                previewPath="/certificate/appreciation_Certificate"
                certificateSubtitle="OF APPRECIATION"
              />
            }
          />
          <Route
            path="certificate/appreciation_Certificate/:studentId"
            element={
              <ParticipationCertificatePreview
                backPath="/certificate/appreciation_Certificate"
                certificateLabel="Appreciation Certificate"
                certificateSubtitle="OF APPRECIATION"
                pdfNamePrefix="Appreciation-Certificate"
              />
            }
          />
          <Route
            path="certificate/achievement_Certificate"
            element={
              <ParticipationCertificate
                certificateType="achievement"
                pageTitle="Achievement Certificate"
                previewPath="/certificate/achievement_Certificate"
                certificateSubtitle="OF ACHIEVEMENT"
              />
            }
          />
          <Route
            path="certificate/achievement_Certificate/:studentId"
            element={
              <ParticipationCertificatePreview
                backPath="/certificate/achievement_Certificate"
                certificateLabel="Achievement Certificate"
                certificateSubtitle="OF ACHIEVEMENT"
                pdfNamePrefix="Achievement-Certificate"
              />
            }
          />
          <Route
            path="certificate/transfer_Certificate"
            element={<TransferCertificate />}
          />
          <Route
            path="certificate/transfer_Certificate/create"
            element={<TransferCertificateCreate />}
          />
          <Route
            path="certificate/transfer_Certificate/search"
            element={<TransferCertificateSearch />}
          />
          <Route
            path="certificate/transfer_Certificate/:studentId"
            element={<TransferCertificatePreview />}
          />
          <Route path="receipt" element={<Receipt />} />
          <Route path="concessiontype" element={<ConcessionType />} />
          <Route path="deduction" element={<Deduction />} />
          <Route path="concession" element={<Concession />} />
          {/* --- Front Desk Section --- */}
          <Route path="frontdesk">
            {/* This handles the base /frontdesk URL by redirecting to the first sub-item */}
            <Route index element={<Navigate to="visitor_register" replace />} />

            <Route path="visitor_register" element={<VisitorRegister />} />
            <Route path="add_visitor" element={<AddVisitor />} />
            <Route
              path="admission_enquiries"
              element={<AdmissionEnquiries />}
            />
            <Route
              path="follow_up_admission_enquiry/:id"
              element={<FollowUpAdmissionQuery />}
            />

            <Route path="gate_pass" element={<GatePass />} />
            <Route
              path="add_admission_enquiry"
              element={<AddAdmissionEnquiry />}
            />
            <Route path="issue_gate_pass" element={<IssueGatePass />} />
          </Route>
          {/* 
          <Route path="exam-scheduled" element={<ExamScheduled />} />
          <Route path="exam-paper" element={<ExamPaper />} /> */}
          <Route path="question-bank" element={<QuestionBank />} />
          <Route path="result" element={<Result />} />
          <Route path="test-paper" element={<TestPaper />} />
          <Route path="create-question" element={<CreateQuestion />} />
          <Route path="/create-question/:id" element={<CreateQuestion />} />
          <Route path="/create-test/:id" element={<CreateTest />} />
          <Route path="create-test" element={<CreateTest />} />
          <Route path="question-review" element={<QuestionReview />} />
          <Route path="test-question" element={<TestQuestion />} />
          {/*salary structure */}
          <Route path="salary-structure" element={<SalaryStructure />} />
          <Route path="allowance" element={<Allowance />} />
          <Route path="add-deduction" element={<AddNewDeduction />} />
          {/* Account */}
          <Route path="expenses" element={<Expenses />} />
          <Route path="add-expenses" element={<AddExpenses />} />
          <Route path="revenue" element={<Revenue />} />
          <Route path="add-revenue" element={<AddRevenue />} />
          {/* Events & Calendar */}
          <Route path="calender" element={<Calendar />} />
          <Route path="events" element={<Events />} />
          <Route path="upcoming-events" element={<UpcomingEvents />} />
          {/* Notices */}
          <Route path="notice" element={<Notice />} />
          {/* Messages */}
          <Route path="messages" element={<Messages />} />
          {/* Reports & Analytics */}
          <Route path="reports-analytics" element={<ReportAndAnalytics />} />
          {/* User Role*/}
          <Route path="roles" element={<RoleList />} />
          <Route path="/management_unit/user&role" element={<UserRole />} />
          <Route
            path="/management_unit/user&role/edit/:roleName"
            element={<EditManagementRole />}
          />
          <Route
            path="/management_unit/user&role/user-edit/:userId"
            element={<UserRolePermissions />}
          />
          <Route
            path="/management_unit/user&role/edit/new"
            element={<EditManagementRole />}
          />
          <Route
            path="/management_unit/designation"
            element={<Designation />}
          />
          <Route path="/management_unit/department" element={<Department />} />
          <Route path="user-role" element={<UserRole />} />
          <Route path="settings" element={<Settings />} />
          <Route path="settings/digital_signature" element={<DigitalSignaturePage />} />














    {/* ==================== TEACHER SECTION ROUTES ==================== */}





{/* Teacher Attendance */}
{/* Attendance */}
<Route path="/teacher-attendance/student" element={<StudentAttendance/>}/>

<Route path="/teacher-attendance/my" element={<MyAttendance/>}/> 
     
     
     
     
     {/* My Students */}
      <Route path="/teacher-mystudents" element={<MyStudent/>}/>
         <Route path="/MyStudentdetails/:id" element={<MyStudentDetails/>}/>

      <Route path="/editMyStudent/:id" element={<EditMyStudent/>}/>
       {/* HOmework */}
          <Route path="teacher-homework/add" element={<TeacherAddHomework />} />
           <Route path="teacher-homework-list" element={<TeacherHomeworkList />} />
        

 {/* online class dashboard */}
      <Route path="/teacher-onlineclassdashboard" element={<TeacherOnlineDashboard />} />
          <Route path="/teacher-scheduleclass" element={<TeacherScheduleClass />} />
          <Route path="teacher-pastclass" element={<TeacherPastClass />} />  


{/* Leave Request */}
  <Route path="/teacher-leave/request" element={<StudentLeaveRequest/>} />
    <Route path="/teacher-myleave" element={<MyLeaveRequest/>} />


{/* events and calendar */}
    {/* <Route path="/teacher-calender" element={<Calendar />} />
          <Route path="/teach-erevents" element={<Events />} />
          <Route path="teacher-upcoming-events" element={<UpcomingEvents />} /> */}

        </Route>
      </Routes>
    </>
  );
}

export default AppRouter;
