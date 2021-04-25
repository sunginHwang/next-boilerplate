import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import todo from './todo';


const store = configureStore({
    reducer: {
        todo: todo.reducer,
    },
    middleware: [thunk]
});

// redux 타입 정의
export type RootState = ReturnType<typeof store.getState>

export default store
