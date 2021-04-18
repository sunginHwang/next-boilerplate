# nextjs 보일러 플레이트 구성

## 보일러플레이트의 목적
해당 boilerPlate 구조는 비동기 데이터 처리, 페이징 라우팅, 전역상태관리 등의 여러 큰 요소에 있어 최대한 검증되고 사용하는 방법에 있어 명확한 컨벤션과 관련 문서가 있는
검증된 library들을 조합하여 다른 프로젝트 구성원이 해당 프로젝트를 처음 보더라도 각 library들의 공식 문서 참고만으로도 어느정도 프로젝트의 구성과 작성 방법에 대해 통일화 시키는 취지로 작성되었습니다.
 
 
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

### date처리 - date-fns
날짜에 대한 모든 처리는 `date-fns` 를 통해 처리 하도록 합니다.

### 기타 util - lodash-es
최적화 처리를 위해 lodash-es가 아닌 `lodash-es` 를 사용하도록 합니다.
 
### 유닛 테스트 - jest, react-testing-library
util들의 유닛테스트 및 컴포넌트 테스트를 처리하기 위해 사용합니다.

### e2e - cypress
e2e를 진행할 경우 cypress 를 통해 작업하도록 합니다.



## 컴포넌트 folder 구조 규칙
해당 프로젝트에서는 hook 을 최대한 활용해서 프로젝트를 진행하기 때문에 기존의 `presentational and container pattern` 을 사용한 containers, components root 폴더 구조는 삭제합니다.
> atomicDesign: https://medium.com/@inthewalter/atomic-design-for-react-514660f93ba

해당 보일러플레이트 구조에서 모든 컴포넌트는 components 의 folder 내부에서 구성합니다. (page 영역 제외)
해당 컴포넌트 구조는 atomic의 디자인을 따르지만 관리유지 측면에서 atoms와 molecules 까지만 공통영역으로 나누고 나머지는 각 서비스 비즈니스의 영역으로 처리하도록 합니다.

> atomicDesign: https://medium.com/@inthewalter/atomic-design-for-react-514660f93ba

* **atoms** : 가장 작은 단위의 컴포넌트를 의미합니다. (input, button, ...) 해당 컴포넌트는 재사용성이 가장 중요합니다.
* **molecules** : atom을 조합한 컴포넌트 입니다. 예를들어 atoms 영역의 input과 label 컴포넌트를 합쳐 InputLabel 컴포넌트를 조합할 수 있습니다.
* **common** : 서비스 내부에서 공통적으로 사용되는 컴포넌트들의 구성은 해당 컴포넌트에서 처리합니다.
* **각 서비스 도메인** : 각 서비스 단위로 폴더를 구성하여 사용합니다.

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

### 컴포넌트 파일 작성 규칙
컴포넌트는 해당 컴포넌트의 폴더에 컴포넌트의 이름을 작성 하고 해당 폴더에 `index.tsx` 를 작성하여 컴포넌트를 구성합니다. 
폴더로 컴포넌트를 묶은 이유는 해당 컴포넌트의 테스트 파일 작성 및 해당 컴포넌트에서만 사용되는 부분을 추가로 작성하기 위한 파일을 추가로 구성하기 위함 입니다.

```
TodoList
├── index.tsx // TodoList 컴포넌트
├── TodoList.spec.ts // TodoList 테스트 파일
└── options.ts // TodoList 컴포넌트에서만 사용되는 옵션 파일들
```

### rooDepth 단위 컴포넌트 unit 테스트 및 storybook 적용 가이드 
현재 컴포넌트 folder가이드는 크게 `atoms`, `molecules`, `common`, `서비스 컴포넌트 영역` 총 4가지로 구성되는데 각 영역 별 단위테스트 및 storybook 적용은 다음과 같이 권고 혹은 필수로 구분 합니다.

#### unit테스트
**`atoms`, `molecules`, `common`** 의 영역은 재사용성이 강하기 때문에 반드시 unit 테스트를 필수로 작성합니다. `서비스 컴포넌트 영역` 도 단위테스트는 권장되나 일정 등 여러 이슈가 존재할 경우는 협업 코드 리뷰어와 협의를 통해 진행합니다.

#### storybook
**`atoms`, `molecules`** 의 영역에서는 테스트 및 협업을 위해 **storybook의 적용을 필수로 작성**하도록 합니다.
