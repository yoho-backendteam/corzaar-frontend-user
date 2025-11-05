import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Courses from '../pages/Courses'
import Institutes from '../pages/Institutes'
import OfferPage from '../pages/OfferPage'
import Queries from '../pages/Queries'
import Navbar from '../NavBar/Navbar'
import CartPage from '../pages/CartPage'
import NotificationPage from '../pages/NotificationPage'
import ProfilePage from '../pages/ProfilePage'
import StudentHome from '../Student/page/StudentHome'
import StudentCourse from '../components/StudentCourse/StudentCourse'
import { Settingprofile } from '../pages/Settingprofile'
import { Portfolio } from '../components/profile/Tabpages/Portfolio/Portfolio'


const LayoutRoute : React.FC = () => {
  return (
    <div>
        <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/Courses' element={<Courses/>}/>
            <Route path='/Institutes' element={<Institutes/>}/>
            <Route path='/Offers' element={<OfferPage/>}/>
            <Route path='/cartPage' element={<CartPage/>}/>
            <Route path='/notificationPage' element={<NotificationPage/>} />
            <Route path='/profilePage' element={<ProfilePage/>} />
            <Route path='/' element={<StudentHome />} />
          <Route path='/course' element={<StudentCourse />} />
          <Route path='/offer' element={<OfferPage />} />
          <Route path='/Queries' element={<Queries />} />
          <Route path='/settingprofile' element={<Settingprofile/>} />
          <Route path='/Portfolio' element={<Portfolio/>} />

        </Routes>
        
        </BrowserRouter>
    </div>
  )
}

export default LayoutRoute