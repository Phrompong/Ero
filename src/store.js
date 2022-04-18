import { createStore, combineReducers } from 'redux'
import { createWrapper } from 'next-redux-wrapper'

import userReducer from './reducer/userReducer'

const reducers = combineReducers({
    user: userReducer
})

const store = createStore(reducers)

const makeStore = context => store

export default store
export const wrapper = createWrapper(makeStore)
