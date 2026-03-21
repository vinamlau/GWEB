import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import EdgeComputing from './pages/business/EdgeComputing'
import PaymentFinance from './pages/business/PaymentFinance'
import Ecommerce from './pages/business/Ecommerce'
import About from './pages/About'
import News from './pages/News'
import Contact from './pages/Contact'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/business/edge-computing" element={<EdgeComputing />} />
          <Route path="/business/payment-finance" element={<PaymentFinance />} />
          <Route path="/business/ecommerce" element={<Ecommerce />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
