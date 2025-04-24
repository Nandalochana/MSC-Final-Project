import React from "react";
import { useQuery } from "@tanstack/react-query";
import { BookingManagementAPI } from "./api/query-slice";
import BookingTable from "./BookingTable";
import "./BookingSlot.css"; 

const BookingManagement: React.FC = () => {
  const { data = { data: [] }, isLoading, isError, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => BookingManagementAPI.LoadAllBookings(),
  });

  const bookings = data.data.map((booking: any) => ({
    id: booking._id,
    userId: booking.userId.firstName + " " + booking.userId.lastName,
    date: booking.date,
    timeSlot: booking.timeSlot,
    buyerId: booking.buyerId.firstName + " " + booking.buyerId.lastName,
    status: booking.status,
    hourlyRate: booking.hourlyRate,
    totalPrice: booking.totalPrice,
    taskInfo: booking.taskInfo,
    description: booking.description,
    contactInfo: booking.contactInfo,
    location: booking.location,
    buyerStatus: booking.buyerStatus,
    freelancerStatus: booking.freelancerStatus,
    ...booking,
  }));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading bookings: {error.message}</div>;
  }

  return (
      <div className="book-management-container">
          <h2 className="book-management-title">Book-Slot Management</h2>
          <div className="book-table-wrapper">
            <BookingTable bookings={bookings} />
          </div>
        </div>
  );
};

export default BookingManagement;