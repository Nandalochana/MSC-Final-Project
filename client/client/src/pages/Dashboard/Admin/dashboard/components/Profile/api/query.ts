import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ProfileManagementAPI } from "./query-slice";
import { ProfileDeleteInfoSchemaType, ProfileUpdateInfoSchemaType } from "./schema";

interface ErrorResponse {
  message: string;
}

interface UpdateProfileInput {
  profileId: string;
}

interface DeleteProfileInput {
  profileId: string;
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation<ProfileUpdateInfoSchemaType, AxiosError<ErrorResponse>, UpdateProfileInput>({
    mutationFn: async (data: UpdateProfileInput) => {
      await ProfileManagementAPI.UpdateProfileStatus({ profileId: data.profileId });
      return { profileId: data.profileId };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
    onError: (error) => {
      console.error("Error updating profile status:", error.response?.data);
    },
  });
}

export function useDeleteProfile() {
  const queryClient = useQueryClient();

  return useMutation<ProfileDeleteInfoSchemaType, AxiosError<ErrorResponse>, DeleteProfileInput>({
    mutationFn: async (data: DeleteProfileInput) => {
      await ProfileManagementAPI.DeleteProfile({ profileId: data.profileId });
      return { profileId: data.profileId };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
    onError: (error) => {
      console.error("Error deleting profile:", error.response?.data);
    },
  });
}
