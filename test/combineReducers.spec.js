import expect from 'expect';
import {combineReducers} from '../src';

const noop = () => {};

describe('combineReducers():', function() {
  it('should return a function', function() {
    expect(combineReducers({})).toBeA(Function);
  });

  describe('the returned function', function() {
    it('should return an object with the reducers keys and states.', function() {
      let reducer = combineReducers({
        reducerA: function() {
          return {
            stateA: true
          };
        },
        reducerB: function() {
          return {
            stateB: true
          };
        }
      });

      let currentState = reducer({});

      expect(currentState.reducerA.stateA).toBe(true);
      expect(currentState.reducerB.stateB).toBe(true);
    });

    it('should call all the reducers with the current state and the action', function() {
      let reducerA = expect.createSpy(noop);
      let reducerB = expect.createSpy(noop);

      let reducer = combineReducers({
        reducerA,
        reducerB
      });

      let state = {
        reducerA: {},
        reducerB: {}
      };

      let action = {
        type: 'TESTING'
      };

      reducer(state, action);

      expect(reducerA).toHaveBeenCalledWith(state.reducerA, action);
      expect(reducerB).toHaveBeenCalledWith(state.reducerB, action);
    });

    context('when passing an undefined state', function() {
      it('should not throw an error', function() {
        expect(function() {
          let reducer = combineReducers({
            reducerA: noop
          });

          reducer();
        }).toNotThrow();
      });
    });
  });
});