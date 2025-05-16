import Home from './components/Home';
import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterMentored from './components/RegisterMentored';
import MainMentored from './components/MainMentored';
import Login from './components/Login';
import LoginPage from './components/LoginPage';
import ScheduleMentoring from './components/ScheduleMentoring';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './AuthContext';
import Unauthorized from './components/Unauthorized';
import MainSupport from './components/MainSupport';
import SupportMentoredList from './components/SupportMentoredList';
import SupportSupportList from './components/SupportSupportList';
import AddSupport from './components/AddSupport';
import AddMentor from './components/AddMentor';
import AddMentored from './components/AddMentored';
import SupportMentorList from './components/SupportMentorList';
import MentoringsList from './components/MentoringsList';
import NavbarSupport from './components/NavbarSupport';
import AddMentoring from './components/AddMentoring'

AOS.init();

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<RegisterMentored />} />
          <Route path='/login' element={<Login />} />
          <Route path='/login-page' element={<LoginPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route 
            path='/schedule-mentoring' 
            element={
              <ProtectedRoute allowedRoles={["Mentorado"]}>
                <ScheduleMentoring />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/users-mentored' 
            element={
              <ProtectedRoute allowedRoles={["Mentorado"]}>
                <MainMentored />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/users-support' 
            element={
              <ProtectedRoute allowedRoles={["Suporte"]}>
                <MainSupport />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/users/mentored' 
            element={
              <ProtectedRoute allowedRoles={["Suporte"]}>
                <SupportMentoredList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/users/mentor' 
            element={
              <ProtectedRoute allowedRoles={["Suporte"]}>
                <SupportMentorList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/users/support' 
            element={
              <ProtectedRoute allowedRoles={["Suporte"]}>
                <SupportSupportList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/users/add-support' 
            element={
              <ProtectedRoute allowedRoles={["Suporte"]}>
                <AddSupport />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/users/add-mentor' 
            element={
              <ProtectedRoute allowedRoles={["Suporte"]}>
                <AddMentor />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/users/edit-mentor/:id' 
            element={
              <ProtectedRoute allowedRoles={["Suporte"]}>
                <AddMentor />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/users/edit-support/:id' 
            element={
              <ProtectedRoute allowedRoles={["Suporte"]}>
                <AddSupport />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/users/edit-mentored/:id' 
            element={
              <ProtectedRoute allowedRoles={["Suporte"]}>
                <AddMentored />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/users/add-mentored' 
            element={
              <ProtectedRoute allowedRoles={["Suporte"]}>
                <AddMentored />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/mentorings' 
            element={
              <ProtectedRoute allowedRoles={["Suporte"]}>
                <NavbarSupport />
                <MentoringsList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/mentorings/add-mentoring' 
            element={
              <ProtectedRoute allowedRoles={["Suporte"]}>
                <NavbarSupport />
                <AddMentoring />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/mentorings/edit-mentoring/:id' 
            element={
              <ProtectedRoute allowedRoles={["Suporte"]}>
                <NavbarSupport />
                <AddMentoring />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
