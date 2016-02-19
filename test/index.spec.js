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
  })
});
