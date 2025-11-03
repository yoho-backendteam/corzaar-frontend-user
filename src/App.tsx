import { BrowserRouter, Routes,Route } from 'react-router-dom'
import './App.css'
import  StudentCourse  from './Components/StudentCourse/StudentCourse'
import { Provider } from 'react-redux'
import store from './store/store'

function App() {

  return (
    <Provider store={store}>


    <BrowserRouter>
    <Routes>
<Route path='/' element={<StudentCourse/>}/>

    </Routes>
    
    </BrowserRouter>
    </Provider>
    
    // <StudentCourse/>
    
  )
}

export default App
