import './App.css'
import { Provider } from 'react-redux'
import store from './store/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import LayoutRoute from './Routes/LayoutRoute'




function App() {
  return (
    <>

      <Provider store={store}>

        <LayoutRoute />
        <ToastContainer position="top-right" autoClose={3000} />
      </Provider>
    </>

  )
}

export default App;
