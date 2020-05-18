import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZZES_ERROR, FETCH_QUIZZES_START,
    FETCH_QUIZZES_SUCCESS,
    QUIZ_CHANGE_STATE,
    QUIZ_FINISHED,
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY
} from '../actions/actionTypes'

const initialState = {
    loading: false,
    quizzes: [],
    error: null,
    isFinished: false,
    results: [],
    activeQuestion: 0,
    answerState: null,
    quiz: null
};

export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUIZZES_START:
            return {
                ...state, loading: true
            };
        case FETCH_QUIZZES_SUCCESS:
            return {
                ...state, quizzes: action.quizzes, loading: false
            };
        case FETCH_QUIZZES_ERROR:
            return {
                ...state, error: action.error
            };
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state, quiz: action.quiz, loading: false
            };
        case QUIZ_RETRY:
            return {
                ...state, isFinished: false, results: [], activeQuestion: 0, answerState: null,
            };
        case QUIZ_CHANGE_STATE:
            return {
                ...state, answerState: action.answerState, results: action.results
            };
        case QUIZ_FINISHED:
            return {
                ...state, isFinished: true
            };
        case QUIZ_NEXT_QUESTION:
            return {
                ...state, activeQuestion: action.activeQuestion, answerState: null
            };
        default:
            return state;
    }
}