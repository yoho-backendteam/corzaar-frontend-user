import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import LayoutRoute from './Routes/LayoutRoute'




function App() {
  return (
    <>
      <LayoutRoute />
      <ToastContainer position="top-right" autoClose={3000} />
    </>

  )
}

export default App;
