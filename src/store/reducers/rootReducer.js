import {combineReducers} from 'redux'
import quizReducer from './quizReducer'
import quizCreateReducer from './quizCreateReducer'

export default combineReducers({
    quiz: quizReducer,
    quizCreator: quizCreateReducer
})