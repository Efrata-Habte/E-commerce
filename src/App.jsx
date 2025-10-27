import { Routes, Route} from 'react-router-dom';
import './App.css'
import Header from './Components/Header'
import Home from './pages/Home'
import Tracking from './pages/Tracking';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';

function App() {  

  return (
    <>
      <Header >
        <div className='pt-16'>
          <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/orders' element={<Orders/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
        </Routes>
        </div>
      </Header>
        
      
    </>
  )
}

export default App
