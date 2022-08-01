import {createSlice} from '@reduxjs/toolkit';

const initialState = [
    {
        ID: '1', 
        FirstName: 'Sapir',
        LastName: 'Shahar',
        City: 'Holon'
    },
    {
        ID: '2', 
        FirstName: 'Yaniv',
        LastName: 'Arad',
        City: 'Tel Aviv'
    }
]

const customers = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        customerAdd(state, action){
            state.push(action.payload)
        }
    }
})

export const { productAdd } = customers.actions

export default customers.reducer