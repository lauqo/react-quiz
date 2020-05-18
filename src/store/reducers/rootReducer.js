import {combineReducers} from 'redux'
import quizReducer from './quizReducer'
import quizCreateReducer from './quizCreateReducer'
import authReducer from './auth'

export default combineReducers({
    quiz: quizReducer,
    quizCreator: quizCreateReducer,
    auth: authReducer
})