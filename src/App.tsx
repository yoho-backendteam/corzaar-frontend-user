import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import StudentCourse from './Components/StudentCourse/StudentCourse'
import { Provider } from 'react-redux'
import store from './store/store'
import OfferPage from './pages/OfferPage'
import Queries from "../src/Pages/Queries.tsx";
import StudentHome from './Student/page/StudentHome'

function App() {

  return (
    <Provider store={store}>


      <BrowserRouter>
        <Routes>
          <Route path='/' element={<StudentHome />} />
          <Route path='/course' element={<StudentCourse />} />
          <Route path='/offer' element={<OfferPage />} />
          <Route path='/query' element={<Queries />} />
        </Routes>

      </BrowserRouter>
    </Provider>

    // <StudentCourse/>

  )
}

export default App
