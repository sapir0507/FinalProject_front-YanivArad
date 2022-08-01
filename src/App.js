import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet
} from 'react-router-dom'
import './App.css';
import BuyProductsComp from './components/buyProducts/buyProducts';
import CustomersComp from './components/customers/customers';
import EditCustomersComp from './components/editCustomers/editCustomers';
import EditProductsComp from './components/editProducts/editProducts';
import MainComp from './components/main/main';
import NavbarComp from './components/navbar/navbar';
import ProductsComp from './components/products/products';

function App() {
  return (
    <Router>
      <NavbarComp></NavbarComp>
      <Outlet></Outlet>
      <Routes>
        <Route
          exact
          path='/'
          element={<MainComp></MainComp>}
        />
        <Route
          exact
          path='/Products'
          element={<ProductsComp></ProductsComp>}
        />
        <Route
          exact
          path='/EditProducts/:id'
          element={<EditProductsComp></EditProductsComp>}
        />
        <Route
          exact
          path='/EditCustomers/:id'
          element={<EditCustomersComp></EditCustomersComp>}
        />
        <Route
          exact
          path='/BuyProduct/:id'
          element={<BuyProductsComp></BuyProductsComp>}
        />
        <Route
          exact
          path='/Customers'
          element={<CustomersComp></CustomersComp>}
        />
        <Route
          exact
          path='/Purchases'
          element={<MainComp></MainComp>}
        />
      </Routes>
    </Router>
  );
}

export default App;
