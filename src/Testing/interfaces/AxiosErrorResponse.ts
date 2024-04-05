export interface AxiosErrorResponse {
    data: { success: boolean; mensaje: string };
    statusText: string;
    status: number
}