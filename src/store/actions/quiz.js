import axios from '../../axios/axios'
import {
    FETCH_QUIZZES_ERROR,
    FETCH_QUIZZES_SUCCESS
} from './actionTypes'

export function fetchQuizzes() {
    return async dispatch => {
        try {
            const response = await axios.get('/quizzes.json');
            const quizzes = [];
            Object.keys(response.data).forEach((key, index) => {
                quizzes.push({
                    id: key, name: `Тест №${index + 1}`
                })
            });
            dispatch(fetchQuizzesSuccess(quizzes));
        } catch (e) {
            dispatch(fetchQuizzesError(e))
        }
    }
}

export function fetchQuizzesSuccess(quizzes) {
    return {
        type: FETCH_QUIZZES_SUCCESS,
        quizzes
    }
}

export function fetchQuizzesError(error) {
    return {
        type: FETCH_QUIZZES_ERROR,
        error
    }
}