import { useQuery } from "@tanstack/react-query";
import React from "react";
import { TaskManagementAPI } from "../Task/api/query-slice";



const BookingManagement: React.FC = () => {

    const { data = { data: [] }, isError, isLoading, error } = useQuery({
        queryKey: ["booking"],
        queryFn: () => TaskManagementAPI.LoadAllTasks(),
    });

    const bookings = data.data.map((booking: any) => ({
        id: booking._id,
        title: booking.title,
        description: booking.description,
        status: booking.status,
        createdUserId: {
            id: booking.createdUserId._id,
            firstName: booking.createdUserId.firstName,
            lastName: booking.createdUserId.lastName,
        },
        ...booking
    }));

    if (isLoading) {
        return <div>Loading...</div>
    }
    else if (isError) {
        return <div>Error loading bookings: {error.message}</div>
    }

    return (

        <div>
            <h1>Booking Management</h1>
            <p> Booking Managamement infor is Here</p>
            
        </div>
    )
};

export default BookingManagement;