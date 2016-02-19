import expect from 'expect';
import {createStore} from '../src';

const noop = function() {};

describe('createStore():', function() {
  it('should export the API', function() {
    let store = createStore(noop);

    expect(store.dispatch).toExist();
    expect(store.subscribe).toExist();
    expect(store.getState).toExist();
  });

  context('when the reducer is not an function', function() {
    it('should throw an error', function() {
      expect(function() {
        createStore();
      }).toThrow('The reducer need to be a function.');
    });
  });

  context('when passed an initial state', function() {
    it('should return the initial state', function() {
      let initialState = {};

      let store = createStore(noop, initialState);

      expect(store.getState()).toBe(initialState);
    });
  });

  describe('dispatch()', function() {
    context('when the action is a function', function() {
      it('should call the function action with a store lite object', function() {
        let store;
        store = createStore(noop);
        let action = expect.createSpy(noop);

        store.dispatch(action);

        expect(action).toHaveBeenCalledWith({
          dispatch: store.dispatch,
          getState: store.getState
        });
      });
    });

    context('when the action is an object', function() {
      it('should execute the current reducer passing the current state and the current action', function() {
        let reducerSpy = expect.createSpy(noop);
        let store = createStore(reducerSpy);

        let action = {
          type: 'TESTING'
        };

        var state = store.getState();

        store.dispatch(action);

        expect(reducerSpy).toHaveBeenCalledWith(state, action);
      });
    });

    it('should call all the current listeners', function() {
      let store = createStore(noop);

      let listenerA = expect.createSpy(noop);
      let listenerB = expect.createSpy(noop);

      let action = {
        type: 'TESTING'
      };

      store.subscribe(listenerA);
      store.subscribe(listenerB);

      store.dispatch(action);

      expect(listenerA.calls.length).toBe(1);
      expect(listenerB.calls.length).toBe(1);
    });
  });

  describe('subscribe()', function() {
    let store;

    beforeEach(function() {
      store = createStore(noop);
    });

    it('should return an unsubscribe function', function() {
      let listener = noop;

      expect(store.subscribe(listener)).toBeA(Function);
    });

    describe('=> unsubscribe():', function() {
      it('should unsubscribe a listener', function() {
        let listener = expect.createSpy(noop);
        let action = {
          type: 'TESTING'
        };

        let unsubscribe = store.subscribe(listener);
        store.dispatch(action);
        expect(listener.calls.length).toBe(1);

        unsubscribe();

        store.dispatch(action);
        expect(listener.calls.length).toBe(1);
      });
    });
  });

  describe('getState()', function() {
    it('should return the current state', function() {
      let initialState = {
        todos: []
      };

      let store = createStore(noop, initialState);

      expect(store.getState()).toEqual(initialState);
    });
  });
});