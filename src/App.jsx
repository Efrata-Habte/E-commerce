import { Routes, Route} from 'react-router-dom';
import './App.css'
import Header from './Components/Header'
import Home from './pages/Home'
import Tracking from './pages/Tracking';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import { CartProvider } from './contexts/CartContext';

function App() {

  return (
    <CartProvider>
      <Header >
        <div className='pt-16'>
          <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/orders' element={<Orders/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/tracking/:orderId' element={<Tracking/>}/>
        </Routes>
        </div>
      </Header>
    </CartProvider>
  )
}

export default App
