import { flyEaseApi } from "../lib/api.ts";
import {AxiosResponse} from "axios";
import { ModelResponse } from "../interfaces/ModelsResponse.ts";

export const Request = async (
    endpoint: string,
    tipo: "post" | "put" | "delete" | "get",
    data: object | null = null
): Promise<AxiosResponse<ModelResponse>> => {
  try {
    return await flyEaseApi[tipo](endpoint, data || {});
  } catch (error:any) {
    return error.response;
  }
};
