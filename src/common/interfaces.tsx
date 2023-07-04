export interface IReducerAction<T> {
  type: string;
  payload?: T;
  error?: string;
}
