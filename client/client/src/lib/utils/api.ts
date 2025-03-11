import { z } from "zod";
import { AxiosRequestConfig, Method } from "axios";
import { instance, instanceWithoutInterceptors } from "../axiosInstance";

interface APICallPayload<Request, Response> {
  method: Method;
  path: string | ((requestData: Request) => string);
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

    // Determine the API URL
    const url = typeof path === "function" ? path(requestData) : path;

    // Define API call payload
    let data = null;
    let params = undefined;

    if (method === "GET") {
      params = requestData; // Set requestData as query parameters
    } else {
      data = requestData; // Send data in body for non-GET requests
    }

    console.log("API Call:", { url, method, params, data });

    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      params, // Attach query parameters for GET requests
    };

    // Make API call based on type
    const response =
      type === "private"
        ? await instance(config)
        : await instanceWithoutInterceptors(config);

    // Validate response
    const result = responseSchema.safeParse(response.data);

    if (!result.success) {
      console.error("🚨 Safe-Parsing Failed ", result.error);
      throw new Error(result.error.message);
    } else {
      return result.data;
    }
  };
}

