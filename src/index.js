import React from "react";
import './styles/tailwind.css';
import ReactDOM from "react-dom";
import App from "./App.js";
import * as serviceWorker from './serviceWorker';
import stats_reducer from './store/reducers/statsReducer'
import generic_reducer from './store/reducers/genericReducer'
import { Provider } from 'react-redux';
import {createStore, combineReducers} from 'redux'

const rootReducer = combineReducers({
  stats: stats_reducer,
  generic: generic_reducer
})

const store = createStore(rootReducer)

ReactDOM.render(
	<Provider store={store}>
   	<App/>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();

