import { z } from "zod";
import { AxiosRequestConfig, Method } from "axios";
import { instance, instanceWithoutInterceptors } from "../axiosInstance";

interface APICallPayload<Request, Response> {
  method: Method;
  path: string;
  requestSchema: z.ZodType<Request>;
  responseSchema: z.ZodType<Response>;
  type?: "private" | "public";
}

export function api<Request, Response>({
  type = "private",
  method,
  path,
  requestSchema,
  responseSchema,
}: APICallPayload<Request, Response>) {
  return async (requestData: Request) => {
    // Validate request data
    requestSchema.parse(requestData);

    // Prepare API call
    let url = "http://localhost:3000/" + path;
    let data = null;

    if (requestData) {
      if (method === "GET" || method === "DELETE") {
        url += `${requestData}`;
      } else {
        data = requestData;
      }
    }

    const config: AxiosRequestConfig = {
      method,
      url,
      data,
    };
     console.log('url', url);
    // Make API call base on the type of request
    const response =
      type === "private"
        ? await instance(config)
        : await instanceWithoutInterceptors(config);

    // Parse and validate response data
    const result = responseSchema.safeParse(response.data);
console.log('response', response.data);
    if (!result.success) {
      console.log('result.error', result);
      console.error("🚨 Safe-Parsing Failed ", result.error);
      throw new Error(result.error.message);
    } else {
      console.log('result.data', result.data);
      return result.data;
    }
  };
}
