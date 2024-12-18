
export class Result<T> {
  private _value?: T;
  private _error: string = '';

  private constructor() {
  }

  static CreateFailure<T>(error: string) {
    error = error ? error : 'unknown error';
    const result = new Result<T>();
    result._error = error ? error : 'unknown';
    return result;
  }

  static CreateSuccess<T>(data: T) {
    const result = new Result<T>();
    result._value = data;
    return result;
  }

  public get value(): T {
    return this._value as T;
  }

  public get error() {
    return this._error;
  }

  public get isFailure() {
    return !!this._error;
  }

  public get isSuccess() {
    return !this._error;
  }

}
