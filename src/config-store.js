import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import newsListReducers from './news-list';
import newsBodyReducers from './news-body';
import { devTools, persistState} from 'redux-devtools';


const reducers = combineReducers({
    newsList: newsListReducers,
    newsBody: newsBodyReducers
});

//const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const createStoreWithMiddleware = compose(
    applyMiddleware(thunk),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

export default createStoreWithMiddleware(reducers);
