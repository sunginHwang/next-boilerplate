/*
* redux 에서 사용되는 비동기 값의 공통 flux 상태 타입
* */

export interface IAsyncState<T> {
    loading: boolean;
    data: T;
    error?: any;
}
