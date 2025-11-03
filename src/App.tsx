import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import StudentCourse from './Components/StudentCourse/StudentCourse'
import { Provider } from 'react-redux'
import store from './store/store'
import OfferPage from './pages/OfferPage'


function App() {

  return (
    <Provider store={store}>


      <BrowserRouter>
        <Routes>
          <Route path='/' element={<StudentCourse />} />
          <Route path='/offer' element={<OfferPage />} />

        </Routes>

      </BrowserRouter>
    </Provider>

    // <StudentCourse/>

  )
}

export default App
