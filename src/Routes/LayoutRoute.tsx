import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Courses from "../Pages/Courses";
// import Institutes from '../pages/Institutes';
import OfferPage from "../Pages/offersPages";
// import Queries from '../Pages/Queries';
import Navbar from "../NavBar/Navbar";
import CartPage from "../Pages/CartPage";
// import NotificationPage from '../Pages/NotificationPage';
import ProfilePage from "../Pages/ProfilePage";
import { Settingprofile } from "../Pages/Settingprofile";
import { Portfolio } from "../Components/profile/Tabpages/Portfolio/PortfolioPage";
import SignIn from "../Components/Authentication/SignIn";
import StudentRegistration from "../Components/StudentVerfication/StudentRegistration";
import ExploreInstitutes from "../Component/Institutes/ExploreInstitutes";
import InstituteDetails from "../Component/Institutes/InstituteDetails";
import ContactPage from "../Components/Queries/Querypage";
import NotificationPage from "../Pages/NotificationPage";
import Checkout from "../Pages/Student_Cart/Checkout";

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
                <Route path="/courses" element={<Courses />} />
                <Route path="/institutes" element={<ExploreInstitutes />} />
                <Route path="/institute/:id" element={<InstituteDetails />} />
                {/* <Route path="/Institutes" element={<Institutes />} /> */}
                <Route path="/offers" element={<OfferPage />} />
                <Route path="/queries" element={<ContactPage />} />

                <Route path="/notification" element={<NotificationPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/setting" element={<Settingprofile />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/mycourse" element={<CartPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default LayoutRoute;
