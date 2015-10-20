import api from './api';

export var loadHeaders = () => dispatch => {
    dispatch({type: 'LOAD_HEADERS'});
    api.getHeaders().then(
        headers => dispatch({type: 'LOAD_HEADERS_SUCCESS', headers}),
        reason => dispatch({type: 'LOAD_HEADERS_FAIL', reason})
    );
};

export var loadBody = id => dispatch => {
    dispatch({type: 'LOAD_BODY'});
    api.getBody(id).then(
        body => dispatch({type: 'LOAD_BODY_SUCCESS', body}),
        reason => dispatch({type: 'LOAD_BODY_FAIL', reason})
    );
};