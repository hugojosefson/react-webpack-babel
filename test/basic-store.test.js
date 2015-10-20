import expect from 'expect';

describe.only('reducers', () => {
    describe('simple reducer', () => {
        function isLoadingReducer(state = false, action) {
            return action.type === 'REQUEST_NEWS_HEADERS' ? true : state;
        }

        it('sets isLoading to true for REQUEST_NEWS_HEADERS', () => {
            var action = {type: 'REQUEST_NEWS_HEADERS'};
            var oldState = undefined;
            var newState = isLoadingReducer(oldState, action);
            expect(newState).toEqual(true);
        });

        it('sets isLoading to false for REQUEST_NEWS_HEADERS_SUCCESS', () => {
            var action = {type: 'REQUEST_NEWS_HEADERS_SUCCESS'};
            var oldState = undefined;
            var newState = isLoadingReducer(oldState, action);
            expect(newState).toEqual(false);
        });

        it('does not change state for unknown actions', () => {
            var action = {type: 'UNKNOWN_ACTION'};
            var oldState = 'old state';
            var newState = isLoadingReducer(oldState, action);
            expect(newState).toEqual('old state');
        });

        it('does not modify the original state', () => {
            var action = {type: 'REQUEST_NEWS_HEADERS'};
            var oldState = {foo: 123};
            var newState = isLoadingReducer(oldState, action);
            expect(oldState).toEqual({foo: 123});
        });
    });

    describe('simpleCombineReducers', () => {

        var valueUpdater = (type, initialValue) =>
            (state = initialValue, action) => action.type === type ? action.value : state;

        var reducers = {
            a: valueUpdater('A', 'initial a'),
            b: valueUpdater('B', 123)
        };

        // Notice the redux combineReducers does not work like this
        function simpleCombineReducers(state, action) {
            return Object.assign({}, state, {
                a: reducers['a'](state['a'], action),
                b: reducers['b'](state['b'], action)
            });
        }

        it('combines two reducers', () => {
            const state = {foo: 'bar'};
            const action = {type: 'A', value: 'value a'};
            const expectedState = {foo: 'bar', a: 'value a', b: 123};
            expect(simpleCombineReducers(state, action)).toEqual(expectedState);
        });

        it('does not modify the original state', () => {
            const state = {foo: 'bar'};
            const action = {type: 'A', value: 'value a'};
            simpleCombineReducers(state, action);
            expect(state).toEqual({foo: 'bar'});
        });
    })

});

// TODO write your own tests for the redux store

//describe('basic store', () => {
//  it('can dispatch actions', () => {
//    const store = createStore(someReducer);
//    store.dispatch({type: 'REQUEST_NEWS_HEADERS'});
//    expect(store.getState()).toEqual(expectedState);
//  });
//});
//
//describe('middleware', () => {
//
//});
