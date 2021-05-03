import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTodoList } from '../../core/apis/todo';
import ITodo from '../../models/todo/ITodo';
import { IAsyncState } from '../../models/IAsyncState';

// 1. reducer 네임을 정의합니다. 이름은 폴더명과 동일하게 구성하고 상위 depth가 있을경우 상위depth/폴더명 의 형식으로 구성합니다.
const name = 'todo';

// 2. 비동기 핸들링이 필요한 경우 createAsyncThunk 를 사용하여 처리합니다.
export const getTodoList = createAsyncThunk(
  `${name}/getTodoList`, // name은 reducer이름  + / + 함수명으로 구성합니다.
  async () => {
    return await fetchTodoList();
  },
);

// 3. 스토어 타입을 정의합니다. xxxState의 네이밍으로 통일하여 구성합니다.
export interface ITodoState {
  todoList: IAsyncState<ITodo[]>;
}

// 4. reducer 초기값을 정의합니다.
const initialState: ITodoState = {
  todoList: {
    loading: false,
    data: [],
  },
};

// 5. slice를 export 시켜주도록 합니다.
const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: {
    [getTodoList.pending.type]: state => {
      state.todoList.loading = true;
    },
    [getTodoList.fulfilled.type]: (state, action: PayloadAction<ITodo[]>) => {
      state.todoList.loading = false;
      state.todoList.data = action.payload;
    },
  },
});

export default todoSlice;
