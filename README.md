
# nextjs 보일러 플레이트 구성

## 보일러플레이트의 목적
해당 boilerPlate 구조는 `비동기 데이터 처리`, `페이징 라우팅`, `전역상태관리` 등의 여러 큰 요소에 있어 최대한 검증되고 사용하는 방법에 있어 명확한 컨벤션과 관련 문서가 있는 검증된 library들을 조합하여 다른 프로젝트 구성원이 해당 프로젝트를 처음 보더라도 각 **library들의 공식 문서 참고만으로도 어느정도 프로젝트의 구성과 작성 방법에 대해 통일화 시키는 취지**로 작성되었습니다.
 
## 프로젝트 큰 구성 틀

### typescript
프로젝트의 안정성 및 생산성 증가를 위해 typesctipt를 통해 진행하도록 합니다.

### ssr - next.js
ssr을 도입함에 있어 가장 최적화가 잘 되어있고 이에따른 사용 컨벤션이 명확한 라이브러리인 `next.js` 를 통해 SSR 지원까지 구성 합니다.

### 전역상태 관리 - redux-toolkit
현재 해당 작성시점(21. 04. 18) 을 기준으로 `redux-toolkit` 은 redux를 사용할떄의 최대한의 bestPractice 가 해당 라이브러리에 녹아들어가 있습니다.
`redux-toolkit` 의 slice 를 통해 프로젝트를 구성하며 비동기 통신이 redux쪽에 필요할 경우 자체 제공하는 `createAsyncThunk(thunk 기반)` 까지 지원하고 있습니다.

### 비동기 통신 관리 - react-query
비동기로 불러온 데이터가 전역상태에 필요한 영역이 아닌 단순 비동기 처리를 할 경우 `react-query` 를 사용하여 진행하도록 합니다.
단순한 비동기 처리가 목적이라면 전역상태관리가 아닌 `react-query` 를 활용하여 처리하도록 합니다.

### 불변성 관리 - immer
프로젝트 전반에 걸친 불변성 관리는 immer 라이브러리를 통해 처리하도록 합니다.
### date처리 - date-fns
날짜에 대한 모든 처리는 `date-fns` 를 통해 처리 하도록 합니다.

### 기타 util - lodash-es
최적화 처리를 위해 lodash가 아닌 `lodash-es` 를 사용하도록 합니다.
 
### 유닛 테스트 - jest, react-testing-library
util들의 유닛테스트 및 컴포넌트 테스트를 처리하기 위해 사용합니다.

### e2e - cypress
e2e를 진행할 경우 cypress 를 통해 작업하도록 합니다.

## 프로젝트 스캐폴딩
해당 프로젝트는 다음과 같은 큰 틀의 스캐폴딩을 기반으로 구성됩니다.

```
project
├── .next // next.js 빌드 파일 
├── node_modules
├── src
│   ├── components    # 컴포넌트들을 구성합니다. 
│   │   ├── atoms         # 최소단위의 재사용성이 강한 기본 컴포넌트 영역입니다. presentational 해야 합니다.
│   │   ├── molecules  # atom을 조합한 컴포넌트 영역입니다. presentational 해야 합니다. 
│   │   ├── common     # 프로젝트에서 사용되는 공통 컴포넌트를 정의합니다.
│   │   └── ...service     #  도메인 서비스 단위 컴포넌트를 정의합니다.
│   ├── core
│   │   ├── apis     # api 요청 모음
│   │   ├── config  # 환경별 config 설정 파일  
│   │   │   ├── local.ts
│   │   │   ├── dev.ts
│   │   │   ├── stage.ts
│   │   │   ├── prod.ts
│   │   │   └── index.ts
│   │   ├── utils    # 각종 유틸 함수를 작성합니다.
│   │   ├── hoc      # 공통 hoc 영역을 정의합니다.
│   │   ├── hooks    # 공통 hook 파일을 정의 합니다.
│   │   ├── contexts # 공통 contexts 파일을 정의 합니다.
│   │   └── hooks    # hook 파일을 정의 합니다.
│   ├── models       # 서비스에 필요한 공통 type 영역을 정의합니다. 폴더 컨벤션은 서비스 도메인 단위로 처리합니다.
│   ├── pages  # next.js 에서 지원하는 페이지 entry 영역입니다.
│   ├── static  # 이미지 파일 등 애셋을 정의합니다. 
│   ├── store   # redux 스토어
│   │   ├── module      #각 reducer 모음.
│   │   │   ├── index.ts        # store의 config 설정 및 store에서 사용되는 rootType을 지정합니다.
│   │   │   └── ....modules     #폴더 컨벤션은 서비스 도메인 단위로 구성하고 redux-toolkit의 slice를 기본으로 사용합니다.
│   │   └── index.ts
│   └── styles // 스타일 영역을 정의합니다.
│
├── .gitignore
├── package.json
├── ,,,,, (extra files)
└── README.md
```


## 컴포넌트 folder 구조 규칙

```
components
├── atoms
├── molecules
├── common
├── todo
│   ├── TodoList
│   │   ├── TodoList.spec.ts
│   │   └── index.tsx
│   └── TodoListItem
│       ├── options.ts
│       └── index.tsx
```


해당 프로젝트에서는 hook 을 최대한 활용해서 프로젝트를 진행하기 때문에 기존의 **`presentational and container pattern` 을 사용한 containers, components root 폴더 구조는 삭제**합니다.

해당 보일러플레이트 구조에서 **모든 컴포넌트는 components 의 folder 내부에서 구성**합니다. (page 영역 제외)
해당 컴포넌트 구조는 **atomic의 디자인을 따르지만 관리유지 측면에서 `atoms`와 `molecules` 까지만 공통영역**으로 나누고 나머지는 각 서비스 비즈니스의 영역으로 처리하도록 합니다.

> atomicDesign: https://medium.com/@inthewalter/atomic-design-for-react-514660f93ba

* **atoms** : **가장 작은 단위의 컴포넌트를 의미**합니다. (input, button, ...) 해당 컴포넌트는 재사용성이 가장 중요합니다.
* **molecules** : **atom을 조합**한 컴포넌트 입니다. 예를들어 atoms 영역의 input과 label 컴포넌트를 합쳐 InputLabel 컴포넌트를 조합할 수 있습니다.
* **common** : **서비스 내부에서 공통적으로 사용되는 컴포넌트들의 구성**은 해당 컴포넌트에서 처리합니다.
* **각 서비스 도메인** : **각 서비스 단위로 폴더**를 구성하여 사용합니다.


### 컴포넌트 파일 작성 규칙
컴포넌트는 **해당 컴포넌트의 폴더에 컴포넌트의 이름을 작성 하고 해당 폴더에 `index.tsx` 를 작성하여 컴포넌트를 구성**합니다. 
폴더로 컴포넌트를 묶은 이유는 **해당 컴포넌트의 테스트 파일 작성 및 해당 컴포넌트에서만 사용되는 부분을 추가로 작성하기 위해** 파일을 추가로 구성하기 위함 입니다.

```
TodoList
├── index.tsx // TodoList 컴포넌트
├── TodoList.spec.ts // TodoList 테스트 파일
└── options.ts // TodoList 컴포넌트에서만 사용되는 옵션 파일들
```

### rootDepth 단위 컴포넌트 unit 테스트 및 storybook 적용 가이드 
현재 컴포넌트 folder가이드는 크게 `atoms`, `molecules`, `common`, `서비스 컴포넌트 영역` 총 4가지로 구성되는데 각 영역 별 단위테스트 및 storybook 적용은 다음과 같이 권고 혹은 필수로 구분 합니다.

#### unit테스트
**`atoms`, `molecules`, `common`** 의 영역은 재사용성이 강하기 때문에 반드시 unit 테스트를 필수로 작성합니다. `서비스 컴포넌트 영역` 도 단위테스트는 권장되나 일정 등 여러 이슈가 존재할 경우는 협업 코드 리뷰어와 협의를 통해 진행합니다.

#### storybook
**`atoms`, `molecules`** 의 영역에서는 테스트 및 협업을 위해 **storybook의 적용을 필수로 작성**하도록 합니다.

## 컴포넌트 작성 가이드

### 1. 함수표현식을 통한 구성
컴포넌트 작성시 arrowFunction 이 아닌 함수 표현식을 사용하여 컴포넌트를 작성합니다. 컴포넌트 내부에서는 arrowFunction을 통해 함수를 구성합니다.
또한 export의 경우 hoc 등을 고려하여 최하단에서 export 하도록 작성 합니다.
```jsx
function Todo() {
  
  const onXXXFunc = () => {};

  return (
    <div>todo</div>
  )
}

export default Todo;
```

### 2. 컴포넌트 props 구성
컴포넌트의 props의 갯수가 2개를 기준으로 비구조화 할당을 다음과 같이 정의합니다. 또한 컴포넌트의 타입은 `IProps` 로 통일하여 처리합니다.

```jsx
/** props를 2개 사용 */
interface IProps { test: string; test1: string }
function Component({ test, test1 }: IProps) {}
 
 
/** props 변수를 2개 이상 사용 */
function Component(props: IProps) { 
  const { test, test1 } = props;
}
```

### 3. 컴포넌트 내부 함수가 많은 경우 처리
컴포넌트내부에서 컴포넌트의 state가 사용되지 않는 함수들의 경우 해당 컴포넌트의 export 상단부에서 작성하여 컴포넌트의 복잡도를 최소화 합니다.
or 함수의 line이 길거나 함수가 많은 경우 해당 컴포넌트 folder에서 ts파일을 추가로 구성하여 import 하는 방식으로 처리하도록 합니다.

``` jsx
/*
TodoList
├── todoFunc.ts
└── index.tsx
*/

/** props를 2개 사용 */
...
import todoFunc from './todoFunc'; // 컴포넌트에 담아두기에 너무 큰 영역이라면 해당 컴포넌트depth에서 파일을 생성해 import ~!

interface IProps {  }

function TodoList(props: IProps) {
  const [ state, setState ] = useState('');
  const XXX = getXXX(state);
  const YYY todoFunc(state);
  return {...}
}

function getXXX(state){ ... }

export default TodoList;
 
```
### 4. 컴포넌트 작성 순서
컴포넌트의 상태, 각종 함수들, 라이프싸이클 등의 순서는 다음과 같은 순서대로 작성하도록 하여 컴포넌트를 읽는 전반적인 가독성을 상승시키도록 합니다.

```jsx

// 1. 컴포넌트 props 선언 사용하는 props 가 없다면 생략 가능 합니다.
interface IProps {
  
}

function Component(props: IProps) {
  // 2. 컴포넌트 상태를 정의합니다. state or Reducer or ReduxState
  const [ state, setState ] = useState('');
  // 3. 각종 hook 함수들을 정의합니다.
  const { data } = useQuery('fnKey', fetchFn);
  // 4. 생명주기 함수를 정의합니다. effect가 많은 경우 해당 비즈니스를 훅으로 묶어서 각 관심사를 나누어 처리하도록 합니다.
  useEffect(() => {}, []);
  // 5. 컴포넌트에 필요한 각종 함수들을 정의합니다. (arrowFunc)
  const onButtonClick = () => {};
  // 6. jsx를 랜더링 합니다.
  return <div>component</div>;
}

// 7. 해당 컴포넌트에 종속된 함수이지만 state에 영향을 받지 않는 함수를 별도정의합니다.
function FunctionXXX() {
  return '';
}

// 8. 컴포넌트를 export 합니다. hoc가 필요한 경우 해당 영역에서 정의합니다.
export default Component;
```

### 5. 컴포넌트 안에서 jsx 정의하는 경우 접두사 render 사용
컴포넌트 내부에서 jsx영역을 추가 정의하는 변수에는 접두사로 `render`를 사용하여 일관된 네이밍을 유지합니다.
```jsx
function TodoItem({title, content}: IProps) {
    // return 전 렌더링 변수의 경우는 접두사로 `render` 를 작성해 혼동할 부분을 최대한 줄이도록 합니다..
    const renderTitle = <h3>{title}</h3>;

    return (
        <div>
            {renderTitle}
            <p>{content}</p>
        </div>
    );
};
```

### 6. 컴포넌트 종속 hook의 위치 선정
한 컴포넌트 안에서 여러 관심사가 있는 경우 이를 관심사 별로 hook으로 만들어 해당 컴포넌트 내부에 파일을 생성하여 이를 import 하여 사용합니다.
```jsx
/*
TodoList
├── useGetTodoList.ts
├── useGetComment.ts
└── index.tsx
*/

function TodoList(props: IProps) {
    // 각 관심사를 hook 으로 정의하여 컴포넌트 입장에서 확인시 명확하게 각 로직이 분리되어 사용되는 장점이 존재합니다.
    const { todoList } = useGetTodoList();
    const { comment } = useGetComment();
  
    return (
        <div>
            {renderTitle}
            <p>{content}</p>
        </div>
    );
};
```

### 7. render 영역 inline 처리 
render 되는 영역이 한줄이라면 괄호를 사용하지 않습니다. 여러줄인 경우 다음과 같이 작성 합니다.

#### singleLine
```jsx

// Bad
return <div>와다다다</div>;
 
```

#### multiLine
```jsx

// Bad
return (<div>
    <input type="text" />
</div>);
 
 
// Good
return (
    <div>
        <input type="text" />
    </div>
)
```

### 8. loop 구성시 key에 배열의 index는 가급적 피해주세요.
배열요소를 render시 map함수를 통해 랜더하게 되는데 이때 **index 를 key 요소로 사용되는 것은 다음 조건을 만족할 경우만 허용**합니다.

> key에 index를 넣어서 안되는 이유: https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318

* **배열의 각 item별로 수정, 삭제, 추가 등의 기능이 없는 단순 렌더링만 담당**하는 경우
* 정렬 혹은 필터 가 없는 경우 

### 9. 컴포넌트의 타입(인터페이스) 를 wrap 해야 하는 경우
컴포넌트의 타입을 래핑 해야하는 경우 별도로 export 하는 것이 아닌 다음과 같이 util 함수를 작성하여 wrap 해서 사용 하도록 합니다.
 > 참조 article : https://javascript.plainenglish.io/a-cleaner-api-for-react-ts-components-47d0704a508c

![](https://images.velog.io/images/gommpo/post/26c39a0b-c8a1-4d73-9ca7-4cb338aedb27/image.png)

## redux 작성 가이드
redux는 최상위 store 파일에 각 서비스 도메인 단위로 redux파일을 생성합니다. 이때 모든 **redux파일은 ducks패턴의 가이드를 기반으로 만들어진 slice 를 기반으로 작성**합니다. 또한 **비동기데이터 핸들링을 목적으로 redux의 사용을 금지**합니다. **단순히 비동기에 대한 처리가 목적이라면 이는 `react-query`를 사용하여 처리**합니다.

### redux 스토어 설정 및 타입 위치
redux의 설정파일 및 타입에 대한 위치는 store 폴더의 index.ts 에 구성합니다.

```ts
import reducer from './modules';
import thunk from 'redux-thunk';
import { LayoutState } from '@store/modules/Layout';
import { AccountListState } from '@store/modules/AccountList';

// 설정 파일 
const initStore = () => {
  return configureStore({
    reducer,
    middleware: [thunk]
  });
};

// redux 타입 정의
export type RootState = {
  layout: LayoutState;
  accountList: AccountListState;
};

export default initStore;

```

해당 index.ts 에서 작성한 RootState는 컴포넌트에서 useSelector를 통한 값을 사용할때 type으로 사용합니다.
```tsx

function Component(){
  const XXX = useSelector((root: RootState) => root.layout);
  ...
}

```

### slice 작성 가이드
slice의 폴더구성은 components 구성과 마찬가지로 `폴더이름 + index.ts 의 조합`으로 구성합니다. 또한 작성 순서는 다음 순서대로 작성하여 프로젝트 구성을 일관되게 처리합니다.


```ts
// 1. reducer 네임을 정의합니다. 이름은 폴더명과 동일하게 구성하고 상위 depth가 있을경우 상위depth/폴더명 의 형식으로 구성합니다.
const name = 'todo';

// 2. 비동기 핸들링이 필요한 경우 createAsyncThunk 를 사용하여 처리합니다.
export const getTodo = createAsyncThunk(
  `${name}/getTodo`, // name은 reducer이름  + / + 함수명으로 구성합니다.
  async (todoId: number) => {
    ...
});

// 3. 스토어 타입을 정의합니다. xxxState의 네이밍으로 통일하여 구성합니다.
export type TodoState = {
  todo: string;
}

// 4. reducer 초기값을 정의합니다.
const initialState: TodoState = {
  todo: ''
};

// 5. slice를 export 시켜주도록 합니다.
export default createSlice({
  name,
  initialState,
  reducers: {
    ...
  }
})
```
