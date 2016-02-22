'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createStore;
function createStore(reducer, initialState) {
  var currentState = undefined;
  var currentReducer = undefined;
  var listeners = [];

  if (!reducer || typeof reducer !== 'function') {
    throw new Error('The reducer need to be a function.');
  }

  currentState = initialState;
  currentReducer = reducer;

  function getState() {
    return currentState;
  }

  function dispatch(action) {
    if (typeof action === 'function') {
      return action({ dispatch: dispatch, getState: getState });
    }

    currentState = currentReducer(currentState, action);

    listeners.forEach(function (listener) {
      return listener();
    });

    return action;
  }

  function subscribe(listener) {
    listeners.push(listener);

    return function () {
      listeners = listeners.filter(function (l) {
        return l !== listener;
      });
    };
  }

  return {
    getState: getState,
    dispatch: dispatch,
    subscribe: subscribe
  };
}