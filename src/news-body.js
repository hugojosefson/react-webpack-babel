export default function newsBodyReducers(state = {}, action) {
    return {
        isLoading: reduceIsLoading(state.isLoading, action),
        body: reduceBody(state.body, action)
    }
}

function reduceIsLoading(state = false, action) {
    switch (action.type) {
        case 'LOAD_BODY':
            return true;
        case 'LOAD_BODY_SUCCESS':
            return false;
        case 'LOAD_BODY_FAIL':
            return false;
        default:
            return state;
    }
}

function reduceBody(state = [], action) {
    return action.type === 'LOAD_BODY_SUCCESS' ? action.body : state;
}