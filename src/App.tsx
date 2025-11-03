import { Provider } from 'react-redux'
import './App.css'

import store from './store/store'
import OfferPage from './pages/OfferPage'


function App() {

  return (
    <>
    <Provider store={store}>
      <OfferPage />   
    </Provider>
    </>
  )
}

export default App
