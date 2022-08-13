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
            return state.concat(action.payload)
        },
        customerUpdate(state, action){
            let a = [...state]
            a = a.map(b=>{
                if(Number(b.ID)===Number(action.payload.ID))
                    return action.payload
                else return b
            })
            return a
        },
        customerDelete(state, action){
            const start = [...state.slice(0,action.payload-1)]
            const a =  [...state.slice(action.payload )]

            return start.concat(a)
            
            
        }
    }
})

export const { customerAdd, customerUpdate, customerDelete } = customers.actions

export default customers.reducer