import expect from 'expect';
import React from 'react';
function isLoading(state = false, action) {
    return action.type === 'REQUEST_NEWS_HEADERS' ? true : state;
}

const originalState = {headlines: {}, isLoading: false, bodies: {}};
const expectedState = {headlines: {}, isLoading: true, bodies: {}};

function headlinesReducer(state = {}, action) {
    if (action.type === 'REQUEST_NEWS_HEADERS_SUCCESS') {
        return action.response;
    } else {
        return state;
    }
}


function combineReducers(state, action) {
    return {
        headlines: headlinesReducer(state.headlines, action),
        bodies: {},
        isLoading: isLoading(state.isLoading, action)
    }
}

function createStore(initialState, reducer) {
    let state = initialState;
    return ({
        getState: () => state,
        dispatch: function dispatch(action) {
            console.log('--> before action', action);
            state = reducer(state, action);

            if (action.promise && action.promise.then) {
                const success = (response) => {
                    dispatch({type: action.type + '_SUCCESS', response})
                };
                const failure = () => {
                };
                action.promise.then(success, failure)
            }
            console.log('--> after action', action);
        }
    });
}

const api = {
    get: () => ({
        then(cb) {
            cb('some data')
        }
    })
};

const action =
{
    type: 'REQUEST_NEWS_HEADERS',
    promise: api.get('news')
};


function applyMiddleware(store, middlewares) {
    middlewares = middlewares.slice();
    middlewares.reverse();

    let dispatch = store.dispatch;
    middlewares.forEach(middleware =>
        dispatch = middleware(store)(dispatch)
    );

    return Object.assign({}, store, {dispatch});
}

describe('Redux', () => {
    it('can resolve a promise', () => {
        const store = createStore(originalState, combineReducers);
        store.dispatch({type: 'REQUEST_NEWS_HEADERS', promise: api.get('news')});
        expect(store.getState()).toEqual({bodies: {}, headlines: 'some data', isLoading: true});
    });

    it('can combine reducers', () => {
        expect(combineReducers(originalState, {type: 'REQUEST_NEWS_HEADERS'})).toEqual(expectedState)
    });

    it('can dispatch actions', () => {
        const store = createStore(originalState, combineReducers);
        store.dispatch({type: 'REQUEST_NEWS_HEADERS'});
        expect(store.getState()).toEqual(expectedState);
    });

    it('works with middeware', () => {
        const store = createStore(originalState, combineReducers);
        const logger = store => next => action => {
            console.log('dispatching', action);
            let result = next(action);
            console.log('next state', store.getState());
            return result;
        };

        const store2 = applyMiddleware(store, [logger]);
        store2.dispatch({type: 'REQUEST_NEWS_HEADERS'});
    })
});





