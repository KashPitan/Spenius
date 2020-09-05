import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./redux/reducers";
import SongStateReducer from "./redux/reducers/SongStateReducer";
import rootSaga from "./redux/sagas/sagas";

const initialState = {};
const sagaMiddleware = createSagaMiddleware();
const middleware = [thunk, sagaMiddleware];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);

export default store;
