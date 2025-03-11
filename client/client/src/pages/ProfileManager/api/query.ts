import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { AxiosError } from "axios";
import { DeleteProfileResponseSchema, UserProfileAddResponseSchema } from "../components/schema";
import { ProfileAPI } from "./query-slice";

interface ErrorResponse {
  message: string;
}

interface AddProfileInput {
  profileId: string;
  userId: string;
}

export function useAddProfile() {
  const queryClient = useQueryClient();

  return useMutation<
    z.infer<typeof UserProfileAddResponseSchema>,
    AxiosError<ErrorResponse>,
    AddProfileInput
  >({
    mutationFn: async (input) => {
      return ProfileAPI.addUserProfile(input);
    },
    onSuccess: (newProfile) => {
      // Update the userProfiles query cache with the new category
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      queryClient.setQueryData(["userProfiles"], (oldData: any) => {
        if (oldData) {
          return {
            ...oldData,
            data: [...oldData.data, newProfile], // Update the data array with the new profile
          };
        }
        return { data: [newProfile] }; // Initialize the data array if it doesn't exist
      });

      // Optionally, invalidate the query to ensure data is refreshed
      queryClient.invalidateQueries({ queryKey: ["userProfiles"] });
    },
    onError: (error) => {
      console.error("Error adding category:", error.response?.data.message);
    },
  });
}



// Define the mutation hook to delete a profile
export function useDeleteProfile() {
  const queryClient = useQueryClient();

  return useMutation<z.infer<typeof DeleteProfileResponseSchema>, AxiosError<ErrorResponse>, string>({
    mutationFn: async (profileId: string) => {
      console.log("Deleting profile with ID:", profileId);
      return ProfileAPI.deleteUserProfile({ userProfileId: profileId}); 
    },
    onSuccess: (_, profileId) => {
      queryClient.setQueryData(["userProfiles"], (oldData: any) => {
        if (!oldData?.data) return oldData;
        return {
          ...oldData,
          data: oldData.data.filter((profile: { _id: string }) => profile._id !== profileId),
        };
      });
      queryClient.invalidateQueries({ queryKey: ["userProfiles"] });
    },
    onError: (error) => {
      console.error("Error deleting profile:", error.response?.data.message);
    },
  });
}