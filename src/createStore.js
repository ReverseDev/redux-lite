export default function createStore(reducer, initialState) {
  let currentState;
  let currentReducer;
  let listeners = [];

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
      return dispatch(action({dispatch, getState}));
    }

    currentReducer(currentState, action);

    listeners.forEach((listener) => listener());
  }

  function subscribe(listener) {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }

  return {
    getState,
    dispatch,
    subscribe
  };
}