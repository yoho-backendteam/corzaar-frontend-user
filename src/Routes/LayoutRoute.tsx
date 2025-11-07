import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../context/context';
import ProtectedRoute from './ProtectRoutes';
import ExploreInstitutes from '../Component/Institutes/ExploreInstitutes';
import InstituteDetails from '../Component/Institutes/InstituteDetails';
import SignIn from '../Components/Authentication/SignIn';
import StudentRegistration from '../Components/StudentVerfication/StudentRegistration';
import Navbar from '../NavBar/Navbar';
import Home from '../Pages/Home';
import Courses from '../Pages/Courses';
import OfferPage from '../Pages/OfferPage';
import CartPage from '../Pages/CartPage';
import NotificationPage from '../Pages/NotificationPage';
import ProfilePage from '../Pages/ProfilePage';
import Queries from '../Pages/Queries';
import { Settingprofile } from '../Pages/Settingprofile';
import { Portfolio } from '../components/profile/Tabpages/Portfolio/Portfolio';

const LayoutRoute: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* SignIn route - accessible without protection */}
          <Route path="/" element={<SignIn />} />
          <Route path="/student-register" element={<StudentRegistration />} />
          
          {/* All other routes are protected */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
                  <Routes>
                    <Route path="/Home" element={<Home />} />
                    <Route path="/Courses" element={<Courses />} />
                    <Route path="/Institutes" element={<ExploreInstitutes />} />
                    <Route path="/institute/:id" element={<InstituteDetails />} />
                    <Route path="/Offers" element={<OfferPage />} />
                    <Route path="/cartPage" element={<CartPage />} />
                    <Route path="/notificationPage" element={<NotificationPage />} />
                    <Route path="/profilePage" element={<ProfilePage />} />
                    <Route path="/Queries" element={<Queries />} />
                    <Route path="/settingprofile" element={<Settingprofile />} />
                    <Route path="/Portfolio" element={<Portfolio />} />
                    <Route path="/Mycourse" element={<CartPage />} />
                    
                    {/* Default protected route */}
                    <Route path="/" element={<Home />} />
                  </Routes>
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default LayoutRoute;