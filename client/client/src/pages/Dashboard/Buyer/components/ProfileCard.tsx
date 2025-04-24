import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import fallbackImage from "../../../../assets/avatar.svg";
import { FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router";

interface ProfileCardProps {
  users: Array<{
    _id: string;
    firstName: string;
    lastName: string;
    address1: string;
    rating: number;
    score: number;
    profileImg: string;
  }>;
  isLoading: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ users, isLoading }) => {
  const navigate = useNavigate();


  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-gray-700 font-medium">Page is loading, please wait...</p>
      </div>
    );
  }

  return (
    <>
      {users.map((user, index) => (
        <div
          key={index}
          className="p-4 bg-white shadow rounded-lg flex flex-col justify-center items-center gap-3"
        >
          <img
            src={user?.profileImg ? user?.profileImg : fallbackImage}
            alt={user.firstName}
            className="h-20 object-cover rounded-md mb-4"
          />
          <h3
            onClick={() => navigate(`/buyer/freelancer/${user._id}`)}
            className="text-lg font-bold cursor-pointer hover:text-gray-400"
          >
            {user.firstName}
          </h3>
          <p className="text-gray-600">{user.address1}</p>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <p>AI Rating:</p>
            <div
              style={{
                width: "100px",
                height: "10px",
                backgroundColor: "#e0e0e0",
                borderRadius: "5px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${user.score}%`,
                  height: "100%",
                  backgroundColor: user.score > 70 ? "green" : user.score > 40 ? "orange" : "red",
                }}
              ></div>
            </div>
          </div>
          <ReactStars
            count={5}
            value={user.rating}
            size={16}
            activeColor="#FF8A00"
            isHalf={true}
            edit={false}
            emptyIcon={<FaRegStar className="text-[#FF8A00]" />}
            halfIcon={<FaStarHalfAlt />}
            filledIcon={<FaStar />}
          />
        </div>
      ))}
    </>
  );
};

export default ProfileCard;
