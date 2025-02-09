import { z } from "zod";
import { FreelanceResSchema } from "../components/schema";
import { api } from "../../../../lib/utils/api";
import { API_ENDPOINT } from "../../../../lib/utils/endpoints-constant";



const GetFilteredFreelancersRequest = z.object({
  name: z.string().optional(),
  profiles: z.array(z.string()).optional(),
});

const GetFilteredFreelancersResponse = FreelanceResSchema;


const getFreelancers = api<
  z.infer<typeof GetFilteredFreelancersRequest>,
  z.infer<typeof GetFilteredFreelancersResponse>
>({
  path: API_ENDPOINT.FREELANCERS,
  method: "GET",
  requestSchema: GetFilteredFreelancersRequest,
  responseSchema: GetFilteredFreelancersResponse,
  type: "private",
});



export const BuyerAPI = {
  getFreelancers,
};