import { useQuery } from 'react-query';
import { fetchTodo } from '../../../core/apis/todo';
import ITodo from '../../../models/todo/ITodo';


const initTodo: ITodo = { id: -1, content: '', title: ''};

interface IProps {
  todoId: number;
}

function TodoDetail({ todoId }: IProps) {
    const { data = initTodo, isLoading, error } = useQuery<ITodo>(['todoDetail', todoId], () => fetchTodo(todoId));

    if (isLoading) {
      return <div>로딩중 입니다.</div>
    }

    if (error) {
      return <div>에러 발생</div>
    }

    if (data.id === initTodo.id) {
      return null;
    }

    return (
        <div>
          <p>제목: {data.title}</p>
          <p>내용: {data.content}</p>
        </div>
    );
}

export default TodoDetail;
