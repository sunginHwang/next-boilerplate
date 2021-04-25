import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/Home.module.css'
import { RootState } from '../store';
import { useEffect } from 'react';
import { getTodoList } from '../store/todo';
import TodoDetail from '../components/todo/TodoDetail';

function Home() {
  const todoListState = useSelector((root: RootState) => root.todo.todoList);
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(getTodoList());
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h2>redux 컴포넌트 샘플</h2>
        <div className={styles.grid}>
          { todoListState.loading && <div>로딩중 입니다.</div>}
          { !todoListState.loading && todoListState.data.map((todo, index) => {
            return (
                <div className={styles.card} key={index}>
                  <h3>{todo.title}</h3>
                  <p>{todo.content}</p>
                </div>
            )
          })}
        </div>
        <section>
          <h2>useQuery 컴포넌트 샘플</h2>
          <TodoDetail todoId={1} />
        </section>
      </main>
    </div>
  )
}

export default Home;
