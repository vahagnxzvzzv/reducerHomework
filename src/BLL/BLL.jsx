import React, { useReducer, useEffect } from 'react';
import classes from './BLL.module.css';

const initialState = {
  loading: true,
  todos: [],
  error: null,
};


const actionTypes = {
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAILURE: 'FETCH_FAILURE',
};


const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: action.payload,
        error: null,
      };
    case actionTypes.FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        todos: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const BLL = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Fetch data from the API
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((data) => {
       
        dispatch({
          type: actionTypes.FETCH_SUCCESS,
          payload: data,
        });
      })
      .catch((error) => {
       
        dispatch({
          type: actionTypes.FETCH_FAILURE,
          payload: error.message,
        });
      });
  }, []);

  return (
    <div>
      {state.loading ? (
        <p>Loading...</p>
      ) : state.error ? (
        <p>Error: {state.error}</p>
      ) : (
        <ul>
          {state.todos.map((todo) => (
            <div className={classes.todoCard}>
            <p>{todo.id}</p>
            <h2 key={todo.id}>{todo.title}</h2>
            
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BLL;