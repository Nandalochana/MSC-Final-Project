import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import fallbackImage from "../../../../assets/avatar.svg";
import { FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router";


interface ProfileCardProps {
  data: {
    _id: string;
    profileName: string;
    address: string;
    imageUrl: string;
    rating: number;
  };
}

const ProfileCard: React.FC<ProfileCardProps> = ({ data }) => {
    const navigate = useNavigate()

    console.log('ProfileIcon', fallbackImage)
    
  return (
    <div className="p-4 bg-white shadow rounded-lg flex flex-col justify-center items-center gap-3">
      <img
        src={fallbackImage}
        alt={data.profileName}
        className="h-20 object-cover rounded-md mb-4"
      />
      <h3 onClick={() => navigate(`/buyer/freelancer/${data._id}`)} className="text-lg font-bold cursor-pointer hover:text-gray-400">{data.profileName}</h3>
      <p className="text-gray-600">{data.address}</p>
      <ReactStars
                count={5}
                value={data.rating}
                size={16}
                activeColor="#FF8A00"
                isHalf={true}
                edit={false}
                emptyIcon={<FaRegStar className="text-[#FF8A00]" />}
                halfIcon={<FaStarHalfAlt />}
                filledIcon={<FaStar />}
              />
    </div>
  );
};

export default ProfileCard;
