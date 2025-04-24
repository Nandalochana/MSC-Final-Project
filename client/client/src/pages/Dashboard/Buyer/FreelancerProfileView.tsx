import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import fallbackImage from "../../../assets/avatar.svg";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { UserDetailsAPI } from "../../UserSettings/api/query-slice";
import { ProfileAPI } from "../../ProfileManager/api/query-slice";
import UserProfiles from "./components/UserProfiles";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import CalendarView from "./components/CalendarView";

const FreelancerProfileView: React.FC = () => {
  const params = useParams();

  // Fetch user details
  const {
    data: userDetails,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userDetails", params?.id],
    enabled: !!params?.id,
    queryFn: () =>
      UserDetailsAPI.getUserDetails({ userId: params?.id as string }),
  });

  // Fetch user profiles
  const {
    data: userProfiles = [],
    isLoading: isUserProfilesLoading,
    isError: isUserProfilesError,
    error: userProfilesError,
  } = useQuery({
    queryKey: ["userProfiles"],
    queryFn: () => ProfileAPI.getAllUserProfiles({ userId: params?.id || "" }),
  });
console.log("User Profiles:", {userDetails, userProfiles});
  if (isLoading || isUserProfilesLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <p className="text-gray-700 font-medium">
            Page is loading, please wait...
          </p>
        </div>
      </div>
    );
  }

  if (isError || isUserProfilesError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 font-semibold">
            Oops! Something went wrong.
          </p>
          <p className="text-gray-700">
            {error?.message || userProfilesError?.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto min-h-screen">
      {/* Header Section */}
      <section className="h-48 flex flex-col justify-center items-center bg-blue-500 text-white">
        <h1 className="text-3xl font-bold">Buyer Dashboard</h1>
      </section>

      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center gap-2">
            <img
              src={userDetails?.data.profileImg ? userDetails?.data.profileImg : fallbackImage}
              alt={userDetails?.data.firstName}
              className="h-32 w-32 object-cover rounded-full mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-800">
              {userDetails?.data.firstName}
            </h2>
            <p className="text-base text-gray-500 mb-2">
              {userDetails?.data.mobileNr}
            </p>
            <p className="text-base text-gray-500">
              {userDetails?.data.address1}
            </p>

            {/* Rating Component */}
            <ReactStars
              count={5}
              value={Array.isArray(userProfiles) || !userProfiles?.data ? 0 : userProfiles.data[0]?.rating}
              size={16}
              activeColor="#FF8A00"
              isHalf={true}
              edit={false}
              emptyIcon={<FaRegStar className="text-[#FF8A00]" />}
              halfIcon={<FaStarHalfAlt />}
              filledIcon={<FaStar />}
            />
          </div>

          {/* Services and Booking Tabs */}
          <div className="bg-white rounded-lg shadow-lg col-span-2">
            <Tabs defaultActiveKey="services" className="p-4">
              <TabPane tab="Services" key="services">
                <div className="space-y-4 overflow-y-auto h-80">
                  {Array.isArray(userProfiles) ||
                  userProfiles?.data.length === 0 ? (
                    <p className="text-gray-500">No profiles added yet.</p>
                  ) : (
                    <UserProfiles
                      profiles={userProfiles.data}
                      isLoading={isUserProfilesLoading}
                    />
                  )}
                </div>
              </TabPane>
              <TabPane tab="Book Appointment" key="booking">
                <div className="h-[600px] overflow-y-auto">
                  {userDetails && <CalendarView userDetails={userDetails} />}
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerProfileView;
