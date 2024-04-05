export interface ModelResponse<T extends Object> {
    mensaje:  string;
    success:  boolean;
    response: T;
}
