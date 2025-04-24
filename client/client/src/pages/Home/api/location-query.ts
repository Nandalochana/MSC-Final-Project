import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { LocationAPI } from "./location-query-slice";

interface ErrorResponse {
  message: string;
}

export function useSendLocation() {
  return useMutation<
    void,
    AxiosError<ErrorResponse>,
    { userId: string; status: "ACTIVE"; latitude: number; longitude: number }
  >({
    mutationFn: async (locationData) => {
      await LocationAPI.sendLocation(locationData);
    },
    onError: (error) => {
      console.error("Error sending location:", error);
    },
  });
}
