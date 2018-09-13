import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
// import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducers'
import { getAllData } from './actions/index'
import App from './components/App.jsx'

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  const createLogger = function ({ dispatch, getState }) {
    return function(next) {
      // console.log('logMiddleware action received:', next)
        return function (action) {
            console.log('logMiddleware action received:', action)
            return next(action)
        }
    }
};

  middleware.push(createLogger);
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

store.dispatch(getAllData());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
