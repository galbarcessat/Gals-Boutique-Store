
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { useEffect } from 'react'
import './assets/styles/main.scss'

import Aos from 'aos'
import 'aos/dist/aos.css'

import { HomePage } from './pages/HomePage'
import { ProductDetails } from './cmps/ProductDetails'
import { ProductsPage } from './pages/ProductsPage'
import { HomeNavBar } from './cmps/HomeNavBar'
import { Footer } from './cmps/Footer'
import { ShoppingCart } from './cmps/ShoppingCart'
import { CheckoutPage } from './pages/CheckoutPage'

export function App() {

  useEffect(() => {
    Aos.init()
  }, [])


  return (
    <Provider store={store}>
      <Router>
        <HomeNavBar />

        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<ProductsPage />} path="/product" />
          <Route element={<ProductDetails />} path="/product/:productId" />
          <Route element={<CheckoutPage />} path="/checkout" />

          {/* <Route path="/auth">
          <Route path="login" element={<LoginSignup />} />
          <Route path="sign-up" element={<LoginSignup />} />
        </Route> */}
        </Routes>

        <Footer />
        <ShoppingCart />
      </Router>
    </Provider>
  )
}

