import './App.css'
import { Provider } from 'react-redux'
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

export default App;
