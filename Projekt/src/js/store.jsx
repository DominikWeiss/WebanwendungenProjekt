import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';
import { reducer as api, setAxiosConfig } from 'redux-json-api';

const reducer = combineReducers({ // configures the Redux JSONAPI reducer to be available via the api key in the store
    api
});

const store = createStore(reducer, applyMiddleware(thunk)); // thunk provides the necessary functionality to have asynchronous external AJAX requests

store.dispatch(setAxiosConfig({ 
    baseURL: 'https://mht.uzi.uni-halle.de/client-seitige-web-anwendungen/api/anhjz'
}));

export default store;