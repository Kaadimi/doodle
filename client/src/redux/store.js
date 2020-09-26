import { createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import CanvasReducer from './reducers/CanvasReducer'
import RoomReducer from './reducers/RoomReducers'

const rootReducer = combineReducers({
    canvas: CanvasReducer,
    room: RoomReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;