import ITodo from '../../../models/todo/ITodo';
import delay from '../../utils/delay';

export async function fetchTodoList() {
  await delay(700);
  return [
    {
      id: 1,
      title: 'todo1',
      content: 'todo1Content',
    },
    {
      id: 2,
      title: 'todo2',
      content: 'todo1Content',
    },
  ] as ITodo[];
}

export async function fetchTodo(id: number) {
  await delay(700);
  return { id, title: `${id} title`, content: `${id} content` } as ITodo;
}
