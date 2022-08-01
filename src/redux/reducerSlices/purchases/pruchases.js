import {createSlice} from '@reduxjs/toolkit';

const date = new Date()

const initialState = [    {
    ID: '1', 
    CustomerId: '1',
    ProductId: '1',
    Date: `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`
}]

const pruchases = createSlice({
    name: 'pruchases',
    initialState,
    reducers: {
        pruchaseAdd(state, action){
            state.push(action.payload)
        }
    }
})

export const { pruchaseAdd } = pruchases.actions

export default pruchases.reducer