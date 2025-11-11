import './App.css'
import { Provider } from 'react-redux'
import store from './store/store'
import LayoutRoute from './Routes/LayoutRoute'
import { Toaster } from 'react-hot-toast'
function App() {
  return (
    <>

      <Provider store={store}>
        <Toaster position="top-right" reverseOrder={false} />

        <LayoutRoute />
      </Provider>
    </>

  )
}

export default App;
