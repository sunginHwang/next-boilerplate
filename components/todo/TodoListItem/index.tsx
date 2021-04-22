import {useQuery} from "react-query";
import {useForm} from "react-hook-form";
import cloneDeep from 'lodash-es/cloneDeep';
import { addDays } from 'date-fns';
const test = async () => {
    return await 1;
}

function TodoListIndex() {
  const q = useQuery('test', test);
  const a = useForm();

  return (
    <div>12</div>
  );
}

export default TodoListIndex;
