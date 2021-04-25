import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';

import todo, { ITodoState } from './todo';

const initStore = () => {
    return configureStore({
        reducer: {
          todo: todo.reducer,
        },
        middleware: [thunk]
    });
};

export interface IRootState {
    todo: ITodoState;
}

export default initStore;
