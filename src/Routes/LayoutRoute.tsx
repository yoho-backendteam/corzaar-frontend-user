import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import Courses from '../Pages/Courses';
// import Institutes from '../pages/Institutes';
import OfferPage from '../Pages/OfferPage';
// import Queries from '../Pages/Queries';
import Navbar from '../NavBar/Navbar';
import CartPage from '../Pages/CartPage';
// import NotificationPage from '../Pages/NotificationPage';
import ProfilePage from '../Pages/ProfilePage';
import { Settingprofile } from '../Pages/Settingprofile';
import { Portfolio } from '../Components/profile/Tabpages/Portfolio/PortfolioPage';
import SignIn from '../Components/Authentication/SignIn';
import StudentRegistration from '../Components/StudentVerfication/StudentRegistration';
import ExploreInstitutes from '../Component/Institutes/ExploreInstitutes';
import InstituteDetails from '../Component/Institutes/InstituteDetails';
import ContactPage from '../Components/Queries/Querypage';
import NotificationPage from '../Pages/NotificationPage';

const LayoutRoute: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<SignIn />} />
        <Route path="/student-register" element={<StudentRegistration />} />
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Courses" element={<Courses />} />
                <Route path="/Institutes" element={<ExploreInstitutes />} />
                <Route path="/institute/:id" element={<InstituteDetails />} />
                {/* <Route path="/Institutes" element={<Institutes />} /> */}
                <Route path="/Offers" element={<OfferPage />} />
                <Route path="/cartPage" element={<CartPage />} />
                <Route path="/notificationPage" element={<NotificationPage />} />
                <Route path="/profilePage" element={<ProfilePage />} />
                <Route path="/Queries" element={<ContactPage />} />
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