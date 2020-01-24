import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const rootReducer = combineReducers({
	...reducers,
});

const composeEnhancers = compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;