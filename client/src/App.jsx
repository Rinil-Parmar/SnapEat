import './App.css'
import React, { useState, useEffect } from "react";
import Home from "./components/Home/Home";
import PageNotFound from "./components/Home/PageNotFound";
import About from "./components/Home/About";
import Logout from './components/Admin/Logout';
import Register from './components/Admin/User/Register';
import Users from './components/Admin/User/Users';
import Cart from './components/Cart/Cart';
import Dashboard from './components/Admin/Dashboard';
import Order from './components/Admin/Order';
import Orders from './components/Admin/Orders';
import Products from './components/Admin/Products';
import AddFood from './components/Admin/AddFood';
import UpdateFood from './components/Admin/UpdateFood';
import { BrowserRouter as Router, Route, NavLink, Routes, Navigate, } from "react-router-dom";
import { FaShoppingCart } from 'react-icons/fa'
import { Toaster } from 'react-hot-toast';
import { COMPANY } from './utils/auth';
import LOGO from './logo/SnapEat.png'
import { useUserContext, } from "./context/userContext";
import Login from './components/Admin/Login';

const App = () => {
  // const isLoggedIn = localStorage.getItem('token') ? true : false;
  const { isLoggedIn } = useUserContext();
  
  useEffect(()=>{}, [isLoggedIn]);

  return (
    <Router>
      <Toaster position="top-right" reverseOrder={true} />
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
          <NavLink className="navbar-brand" to={`/table/${localStorage.getItem('table')}`}><img src={LOGO} alt="LOGO" style={{ height: "80px", width: "200px" }} /></NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="nav navbar-nav mr-auto">
              {!isLoggedIn ? <li className="nav-item active">
                <NavLink className="nav-link" to={`/table/${localStorage.getItem('table')}`}>Home</NavLink>
              </li>
                :
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin/">Dashboard</NavLink>
                </li>}

              {
                isLoggedIn &&
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/admin/addfood">Add Food</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/admin/user/register">Register new</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/admin/user/all">Users</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/admin/orders">Orders</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/admin/products">Products</NavLink>
                  </li>
                </>
              }
            </ul>
            <ul className="nav navbar-nav float-right">
              <li className="nav-item float-right">
                <NavLink className="nav-link navbar-text" to="/about">About</NavLink>
              </li>
              <li className="nav-item float-right">
                <NavLink className="nav-link navbar-text" to="/cart"> Cart</NavLink>
              </li>
              {
                isLoggedIn && <li className="nav-item">
                  <NavLink className="nav-link d-inline-flex navbar-text" to="/admin/logout">Logout</NavLink>
                </li>
              }
            </ul>
          </div>
        </nav>
        <Routes>
          <Route exact path="/table/:tableId" element={<Home />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/about" element={<About />} />
          <Route path="admin/login" element={<Login />} />
          <Route exact path='/admin'>
            {isLoggedIn ? <>
              <Route index element={<Dashboard />} />
              <Route path="addfood" element={<AddFood />} />
              <Route path="food/update/:id" element={<UpdateFood />} />
              <Route path="logout" element={<Logout />} />
              <Route path="orders" element={<Orders />} />
              <Route path="products" element={<Products />} />
              <Route exact path="user" >
                <Route path="register" element={<Register />} />
                <Route path="all" element={<Users />} />
              </Route>
              <Route path="order/:id" element={<Order />} />
            </>
              :
              <Route index element={<PageNotFound/>} />
            }
          </Route>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;