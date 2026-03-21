import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import About from './pages/About'
import Ecommerce from './pages/business/Ecommerce'
import EdgeComputing from './pages/business/EdgeComputing'
import PaymentFinance from './pages/business/PaymentFinance'
import Contact from './pages/Contact'
import Home from './pages/Home'
import News from './pages/News'

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
