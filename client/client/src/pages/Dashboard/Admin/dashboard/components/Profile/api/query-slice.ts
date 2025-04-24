import { z } from "zod";
import {
    ProfileDeleteInfoSchema,
  ProfileInfoRequestSchema,
  ProfileInfoResponseSchema,
  ProfileUpdateInfoSchema,
  ProfileUpdateResponseSchema,
} from "./schema";
import { API_ENDPOINT } from "../../../../../../../lib/utils/endpoints-constant";
import { api } from "../../../../../../../lib/utils/api";

const LoadAllProfilesRequest = ProfileInfoRequestSchema;
const LoadAllProfilesResponse = ProfileInfoResponseSchema;
const ProfileUpdateInfoRequest = ProfileUpdateInfoSchema;
const ProfileUpdateResponseResponse = ProfileUpdateResponseSchema;
const ProfileDelteresponse = ProfileDeleteInfoSchema;

const LoadAllProfiles = api<
  z.infer<typeof LoadAllProfilesRequest>,
  z.infer<typeof LoadAllProfilesResponse>
>({
  method: "GET",
  path: API_ENDPOINT.PROFILE_ALL,
  requestSchema: LoadAllProfilesRequest,
  responseSchema: LoadAllProfilesResponse,
});

const UpdateProfileStatus = api<
  z.infer<typeof ProfileUpdateInfoRequest>,
  z.infer<typeof ProfileUpdateResponseResponse>
>({
  path: (params) => `${API_ENDPOINT.PROFILE_STATUS}/${params.profileId}`,
  method: "PUT",
  requestSchema: ProfileUpdateInfoRequest,
  responseSchema: ProfileUpdateResponseResponse,
  type: "private",
});

const DeleteProfile = api<
  z.infer<typeof ProfileUpdateInfoRequest>,
  z.infer<typeof ProfileDelteresponse>
>({
  path: (params) => `${API_ENDPOINT.PROFILE}/${params.profileId}`,
  method: "DELETE",
  requestSchema: ProfileUpdateInfoRequest,
  responseSchema: ProfileDelteresponse,
  type: "private",
});

export const ProfileManagementAPI = {
  LoadAllProfiles,
  UpdateProfileStatus,
  DeleteProfile
};
