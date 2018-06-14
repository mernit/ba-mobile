import { createStore } from 'redux';
import RootReducer from '../reducers/RootReducer';
import thunkMiddleware from 'redux-thunk';
import { applyMiddleware } from 'redux';
export default function configureStore() {
    return createStore(RootReducer, applyMiddleware(thunkMiddleware));
}
//# sourceMappingURL=ConfigureStore.js.map