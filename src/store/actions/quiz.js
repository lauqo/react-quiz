import axios from '../../axios/axios'
import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZZES_ERROR, FETCH_QUIZZES_START,
    FETCH_QUIZZES_SUCCESS,
    QUIZ_CHANGE_STATE,
    QUIZ_FINISHED,
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY
} from './actionTypes'

export function fetchQuizzes() {
    return async dispatch => {
        dispatch(fetchQuizzesStart());
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

export function fetchQuizzesStart() {
    return {
        type: FETCH_QUIZZES_START
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

export function fetchQuiz(quizId) {
    return async dispatch => {
        dispatch(fetchQuizzesStart());
        try {
            const response = await axios.get(`/quizzes/${quizId}.json`);
            const quiz = response.data;
            dispatch(fetchQuizSuccess(quiz))
        } catch (e) {
            dispatch(fetchQuizzesError(e))
        }
    }
}

export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function retryQuiz() {
    return {
        type: QUIZ_RETRY
    }
}

export function onAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz;
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0];
            if (state.answerState[key] === 'success') {
                return
            }
        }
        const question = state.quiz[state.activeQuestion];
        const results = state.results;
        if (answerId === question.rightAnswerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            dispatch(changeQuizState({[answerId]: 'success'}, results));
            const timeOut = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishQuiz());
                } else {
                    dispatch(getNextQuestion(state.activeQuestion + 1));
                }
                window.clearTimeout(timeOut)
            }, 1000)
        } else {
            results[question.id] = 'error';
            dispatch(changeQuizState({[answerId]: 'error'}, results));
        }
    }
}

export function changeQuizState(answerState, results) {
    return  {
        type: QUIZ_CHANGE_STATE,
        answerState, results
    }
}

export function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length
}

export function finishQuiz() {
    return  {
        type: QUIZ_FINISHED
    }
}

export function getNextQuestion(activeQuestion) {
    return  {
        type: QUIZ_NEXT_QUESTION,
        activeQuestion
    }
}