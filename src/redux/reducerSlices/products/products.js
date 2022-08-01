import {createSlice} from '@reduxjs/toolkit';

const initialState = [
    {
        ID: '1', 
        Name: 'Oculus Quest 2',
        Price: 1329,
        Quantity: 50
    },
    {
        ID: '2', 
        Name: 'iPad Air',
        Price: 2629,
        Quantity: 10
    }
]

const products = createSlice({
    name: 'products',
    initialState,
    reducers: {
        productAdd(state, action){
            state.push(action.payload)
        }
    }
})

export const { productAdd } = products.actions

export default products.reducer