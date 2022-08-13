import {createSlice} from '@reduxjs/toolkit';

const initialState = []

const pruchases = createSlice({
    name: 'pruchases',
    initialState,
    reducers: {
        pruchaseAdd(state, action){
            return state.concat(action.payload)
        }
    }
})

export const { pruchaseAdd } = pruchases.actions

export default pruchases.reducer