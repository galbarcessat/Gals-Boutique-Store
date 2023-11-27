
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './assets/styles/main.scss'

import { HomePage } from './pages/HomePage'
import { ProductDetails } from './cmps/ProductDetails'
import { ProductsPage } from './pages/ProductsPage'
import { HomeNavBar } from './cmps/HomeNavBar'
import { Footer } from './cmps/Footer'
import { useState } from 'react'
import { ShoppingCart } from './cmps/ShoppingCart'

export function App() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <Provider store={store}>
      <Router>
        <HomeNavBar setIsCartOpen={setIsCartOpen} />
        <Routes>

          <Route element={<HomePage />} path="/" />
          <Route element={<ProductsPage />} path="/product" />
          <Route element={<ProductDetails />} path="/product/:productId" />

          {/* <Route path="/auth">
          <Route path="login" element={<LoginSignup />} />
          <Route path="sign-up" element={<LoginSignup />} />
        </Route> */}

        </Routes>
        <Footer />

        <ShoppingCart setIsCartOpen={setIsCartOpen} isCartOpen={isCartOpen}/>
      </Router>
    </Provider>
  )
}

