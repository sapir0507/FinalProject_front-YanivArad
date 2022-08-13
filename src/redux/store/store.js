import { configureStore } from '@reduxjs/toolkit'
import pruchases from '../reducerSlices/purchases/pruchases';
import customers from '../reducerSlices/customers/customers';
import products from '../reducerSlices/products/products';


const store = configureStore({
  reducer: {
    products: products,
    customers: customers,
    purchases: pruchases
  }
})

export default store
