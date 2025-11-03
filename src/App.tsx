import { Provider } from 'react-redux'
import './App.css'
import FeaturedDeals from './components/FeatureDeals'
import store from './store/store'
import CoursesOnSale from './components/CoursesOnSale'
import { COLORS } from './Constants/uiconstants'

function App() {

  return (
    <>
    <Provider store={store}>
    <div className="min-h-screen" style={{ backgroundColor: COLORS.primary_yellow }}>

         <div className="max-w-7xl mx-auto">
          <FeaturedDeals/>
          <CoursesOnSale/>
         </div>
       </div>
     
    
    </Provider>
    </>
  )
}

export default App
