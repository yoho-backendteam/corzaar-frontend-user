import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Course from '../pages/Course';
// import Institutes from '../pages/Institutes';
import OfferPages from '../pages/OfferPages';
import Querie from '../pages/Querie';
import Navbar from '../NavBar/Navbar';
import CartPage from '../pages/CartPage';
import NotificationPages from '../pages/NotificationPages';
import ProfilePage from '../pages/ProfilePage';
import { Settingprofile } from '../pages/Settingprofiles';
import { Portfolio } from '../Components/profile/Tabpages/Portfolio/Portfolio';
import SignIn from '../Components/Authentication/SignIn';
import StudentRegistration from '../Components/StudentVerfication/StudentRegistration';
import ExploreInstitutes from '../Components/Institutes/ExploreInstitutes';
import InstituteDetails from '../Components/Institutes/InstituteDetails';

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
                <Route path="/Courses" element={<Course />} />
                <Route path="/Institutes" element={<ExploreInstitutes />} />
                <Route path="/institute/:id" element={<InstituteDetails />} />
                {/* <Route path="/Institutes" element={<Institutes />} /> */}
                <Route path="/Offers" element={<OfferPages />} />
                <Route path="/cartPage" element={<CartPage />} />
                <Route path="/notificationPage" element={<NotificationPages />} />
                <Route path="/profilePage" element={<ProfilePage />} />
                <Route path="/Queries" element={<Querie />} />
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
