export default function newsListReducers(state = {}, action) {
    return {
        isLoading: reduceIsLoading(state.isLoading, action),
        headers: reduceHeaders(state.headers, action)
    }
}

function reduceIsLoading(state = false, action) {
    switch (action.type) {
        case 'LOAD_HEADERS':
            return true;
        case 'LOAD_HEADERS_SUCCESS':
            return false;
        case 'LOAD_HEADERS_FAIL':
            return false;
        default:
            return state;
    }
}

function reduceHeaders(state = [], action) {
    return action.type === 'LOAD_HEADERS_SUCCESS' ? action.headers : state;
}