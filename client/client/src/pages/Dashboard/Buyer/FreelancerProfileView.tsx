import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import ReactStars from 'react-rating-stars-component';
import fallbackImage from '../../../assets/avatar.svg';

// interface Service {
//   name: string;
//   description: string;
// }

// interface Seller {
//   profileName: string;
//   email: string;
//   phone: string;
//   profileImage: string | null; // Could be null if no image provided
//   services: Service[];
//   rating: number;
// }

// interface ProfileViewProps {
//   seller: Seller;
// }

const FreelancerProfileView: React.FC = () => {

    const seller = {
        profileName: "John Doe",
        email: "john@example.com",
        phone: "+1234567890",
        profileImage: "/path-to-image.jpg", // Optional, defaults to fallbackImage
        rating: 4.5,
        services: [
          {
            name: "Web Development",
            description: "Building custom websites with modern technologies."
          },
          {
            name: "SEO Optimization",
            description: "Improving search engine rankings for your website."
          },
          {
            name: "Web Development",
            description: "Building custom websites with modern technologies."
          },
          {
            name: "SEO Optimization",
            description: "Improving search engine rankings for your website."
          },
        ]
      };

      

  return (
    <div className="mx-auto min-h-screen">
      {/* Header Section */}
      <section className="h-48 flex flex-col justify-center items-center bg-blue-500 text-white">
        <h1 className="text-3xl font-bold">Buyer Dashboard</h1>
      </section>

      <div className="max-w-7xl mx-auto py-12 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Card */}
        <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
          <img
            src={fallbackImage}
            alt={seller.profileName}
            className="h-32 w-32 object-cover rounded-full mb-4"
          />
          <h2 className="text-2xl font-semibold text-gray-800">{seller.profileName}</h2>
          <p className="text-sm text-gray-500 mb-2">{seller.email}</p>
          <p className="text-sm text-gray-500">{seller.phone}</p>

          {/* Rating Component */}
          <ReactStars
            count={5}
            value={seller.rating}
            size={16}
            activeColor="#FF8A00"
            isHalf={true}
            edit={false}
            emptyIcon={<FaRegStar className="text-[#FF8A00]" />}
            halfIcon={<FaStarHalfAlt />}
            filledIcon={<FaStar />}
          />
        </div>

        {/* Seller Services */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Services</h3>
          <div className="space-y-4">
            {seller.services.map((service, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
              >
                <h4 className="text-lg font-medium text-gray-800">{service.name}</h4>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>


  
  );
};

export default FreelancerProfileView;
