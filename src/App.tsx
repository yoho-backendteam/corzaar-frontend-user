import { Provider } from 'react-redux'
import './App.css'
import StudentHome from './Student/page/StudentHome'
import store from './store/store'

function App() {

  return (
    <>
    <Provider store={store}>
    <StudentHome />
  
  </Provider>
   
    </>
  )
}

export default App
