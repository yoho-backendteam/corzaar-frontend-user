import { Provider } from 'react-redux'
import './App.css'

import store from './store/store'
import LayoutRoute from './Routes/LayoutRoute'




function App() {

  return (
    <>
    
    <Provider store={store}>
       <LayoutRoute/>
    </Provider>
    </>
  )
}

export default App
