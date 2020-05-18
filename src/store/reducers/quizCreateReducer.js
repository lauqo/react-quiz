import {QUIZ_ADD_ITEM, QUIZ_CREATE_ERROR, QUIZ_RESET} from '../actions/actionTypes'

const initialState = {
    quiz: [],
    error: null
};

export default function quizCreateReducer(state = initialState, action) {
    switch (action.type) {
        case QUIZ_ADD_ITEM:
            return {
                ...state, quiz: [...state.quiz, action.item]
            };
        case QUIZ_RESET:
            return {
                ...state, quiz: []
            };
        case QUIZ_CREATE_ERROR:
            return {
                ...state, error: action.error
            };
        default:
            return state
    }
}