import expect from 'expect';
import {combineReducers, createStore} from '../src';

describe('Testing real app', function() {
  it('should looks good', function() {
    function todos(state=[], action) {
      switch(action.type) {
        case 'ADD_TODO':
          return [
            ...state,
            {
              id: 42,
              completed: false,
              text: action.text
            }
          ];
        default:
          return state;
      }
    }

    function filter(state='', action) {
      switch(action.type) {
        case 'SHOW_ALL_FILTERS':
          return 'ALL_FILTERS';
        default:
          return state;
      }
    }

    var store = createStore(
      combineReducers({
        todos,
        filter
      })
    );

    store.dispatch({
      type: 'NULL'
    });
    expect(store.getState().todos).toEqual([]);
    expect(store.getState().filter).toEqual('');


    store.dispatch({
      type: 'ADD_TODO',
      text: 'New todo'
    });
    expect(store.getState().todos).toEqual([{
      id: 42,
      completed: false,
      text: 'New todo'
    }]);
    expect(store.getState().filter).toEqual('');


    store.dispatch({
      type: 'SHOW_ALL_FILTERS'
    });
    expect(store.getState().todos).toEqual([{
      id: 42,
      completed: false,
      text: 'New todo'
    }]);
    expect(store.getState().filter).toEqual('ALL_FILTERS');
  });
});

describe('Testing asyn app', function() {
  it('should looks good', function() {
    function requestTodo(text) {
      return {
        type: 'REQUEST_TODO',
        text: text
      };
    }
    function resolveTodo(todo) {
      return {
        type: 'RESOLVE_TODO',
        todo: todo
      };
    }

    function postTodo(text) {
      return function({dispatch, getState}) {
        dispatch(requestTodo(text));
        setTimeout(function() {
          let todo = {
            id: 42,
            text: text,
            completed: false
          };

          dispatch(resolveTodo(todo));
        }, 300);
      }
    }

    function reducer(state={}, action) {
      switch(action.type) {
        case 'REQUEST_TODO':
          console.log(`Posting Todo: ${action.text}...`);
          return {
            text: action.text,
            completed: false
          };
        case 'RESOLVE_TODO':
          console.log(`Todo ${action.todo.id} received!`);
          return action.todo;
        default:
          return state;
      }
    }

    let store = createStore(reducer);

    store.dispatch(postTodo('New Todo'));
  });
});
