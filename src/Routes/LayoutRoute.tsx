import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Courses from '../pages/Courses';
import Institutes from '../pages/Institutes';
import OfferPage from '../pages/OfferPage';
import Queries from '../pages/Queries';
import Navbar from '../NavBar/Navbar';
import CartPage from '../pages/CartPage';
import NotificationPage from '../pages/NotificationPage';
import ProfilePage from '../pages/ProfilePage';
import { Settingprofile } from '../pages/Settingprofile';
import { Portfolio } from '../components/profile/Tabpages/Portfolio/Portfolio';
import SignIn from '../components/Authentication/SignIn';
import StudentRegistration from '../components/StudentVerfication/StudentRegistration';

const LayoutRoute: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<SignIn />} />
        <Route path="/student-register" element={<StudentRegistration />} />

       
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/Home" element={<Home />} />
                <Route path="/Courses" element={<Courses />} />
                <Route path="/Institutes" element={<Institutes />} />
                <Route path="/Offers" element={<OfferPage />} />
                <Route path="/cartPage" element={<CartPage />} />
                <Route path="/notificationPage" element={<NotificationPage />} />
                <Route path="/profilePage" element={<ProfilePage />} />
                <Route path="/Queries" element={<Queries />} />
                <Route path="/settingprofile" element={<Settingprofile />} />
                <Route path="/Portfolio" element={<Portfolio />} />
                <Route path="/Mycourse" element={<CartPage />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default LayoutRoute;
