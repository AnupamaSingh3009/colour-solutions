import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {LoginComponent} from './auth/login'
import WithHeaderAndFooter from './layout/with-header-footer';
import { RequireAuth } from './auth/require-auth';
import { AuthProvider } from "./auth/use-auth";
import AdminCategory from './admin/category';
import { HeaderAndFooter } from './admin/header-and-footer';
import './interceptor'
import { AdminPage } from './admin/page';
import {AdminProducts} from './admin/products';
import {Page} from "./page";
import {Category} from "./category";
import {ProductDetail} from "./product";
import {AboutUs} from "./aboutus";
import {Contactus} from "./contactus";
import {ViewCart} from "./cart";
import {ViewOrder} from "./order";
import {ToastContainer} from "react-bootstrap";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
        <AuthProvider>
        <Routes>
          <Route path="/" element={<WithHeaderAndFooter><App/></WithHeaderAndFooter>} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/admin/category" element={<RequireAuth><HeaderAndFooter><AdminCategory /></HeaderAndFooter></RequireAuth>} />
          <Route path="/admin/page" element={<RequireAuth><HeaderAndFooter><AdminPage /></HeaderAndFooter></RequireAuth>} />
          <Route path="/admin/products" element={<RequireAuth><HeaderAndFooter><AdminProducts /></HeaderAndFooter></RequireAuth>} />
          <Route path="/category/:name" element={<WithHeaderAndFooter><Category/></WithHeaderAndFooter>} />
          <Route path="/product/:id" element={<WithHeaderAndFooter><ProductDetail/></WithHeaderAndFooter>} />
          <Route path="/about-us" element={<WithHeaderAndFooter><AboutUs/></WithHeaderAndFooter>} />
          <Route path="/contact-us" element={<WithHeaderAndFooter><Contactus/></WithHeaderAndFooter>} />
          <Route path="/view-cart" element={<WithHeaderAndFooter><ViewCart/></WithHeaderAndFooter>} />
          <Route path="/order" element={<WithHeaderAndFooter><ViewOrder/></WithHeaderAndFooter>} />
        </Routes>
        </AuthProvider>
     </Router>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
