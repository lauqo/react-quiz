import {
    FETCH_QUIZZES_ERROR,
    FETCH_QUIZZES_SUCCESS
} from '../actions/actionTypes'

const initialState = {
    loading: true,
    quizzes: [],
    error: null
};

export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUIZZES_SUCCESS:
            return {
                ...state, quizzes: action.quizzes, loading: false
            };
        case FETCH_QUIZZES_ERROR:
            return {
                ...state, error: action.error
            };
        default:
            return state;
    }
}