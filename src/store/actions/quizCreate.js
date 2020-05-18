import {QUIZ_ADD_ITEM, QUIZ_CREATE_ERROR, QUIZ_RESET} from './actionTypes'
import axios from '../../axios/axios'

export function addQuizItem(item) {
    return {
        type: QUIZ_ADD_ITEM,
        item
    }
}

export function createQuiz() {
    return async (dispatch, getState) => {
        try {
            await axios.post('/quizzes.json', getState().quizCreator.quiz);
            dispatch(resetQuiz())
        } catch (e) {
            dispatch(quizCreateError(e))
        }
    }
}

export function resetQuiz() {
    return {
        type: QUIZ_RESET
    }
}

export function quizCreateError(error) {
    return {
        type: QUIZ_CREATE_ERROR,
        error
    }
}