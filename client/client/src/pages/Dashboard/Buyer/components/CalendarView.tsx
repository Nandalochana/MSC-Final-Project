import { useState } from "react";
import {
  Calendar as AntCalendar,
  Modal,
  Button as AntButton,
  Badge,
  message,
  TimePicker,
  Button,
} from "antd";
import { format } from "date-fns";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { CloseOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { TimeSlotSelector } from "./TimeSlotSelector";
import { BuyerAPI } from "../api/query-slice";
import { useBookingTimeSlots, useDeleteBooking, useUpdateBooking } from "../api/query";
import { useUserStore } from "../../../../store/user-store";

type ViewMode = "month" | "year";

interface UserDetails {
  data: {
    _id: string;
  };
}

const CalendarView = ({ userDetails }: { userDetails: UserDetails }) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<
    Array<{ _id: string; start: string; end: string }>
  >([]);
  const [existingBooking, setExistingBooking] = useState<
    Array<{ _id: string; start: string; end: string }>
  >([]);

  const { user } = useUserStore();

  const bookingTimes = useBookingTimeSlots();
  const queryClient = useQueryClient();
  const updateBooking = useUpdateBooking();
   const deleteBooking = useDeleteBooking(); 

  // Fetch user details
  const {
    data: timeDetails,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["availability", userDetails?.data._id],
    enabled: !!userDetails?.data._id,
    queryFn: () =>
      BuyerAPI.getFreelancerTimeSlots({
        freelancerId: userDetails?.data._id as string,
      }),
  });

  // Fetch booking details
  const {
    data: bookingDetails,
    isLoading: bookingLoading,
    isError: isBookingError,
    error: bookingError,
  } = useQuery({
    queryKey: ["bookings", user?.user?._id],
    enabled: !!user?.user?._id,
    queryFn: () =>
      BuyerAPI.getTimeSlotsByBuyer({
        buyerId: user?.user?._id as string,
      }),
  });

  if (bookingLoading) {
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

  if (isBookingError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 font-semibold">
            Oops! Something went wrong.
          </p>
          <p className="text-gray-700">{bookingError?.message}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
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

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-red-600 font-semibold">
            Oops! Something went wrong.
          </p>
          <p className="text-gray-700">{error?.message}</p>
        </div>
      </div>
    );
  }

  const handleDateSelect = (date: Dayjs) => {
    if (date.isBefore(dayjs(), "day")) {
      message.error("Cannot select past dates");
      return;
    }

    const formattedDate = date.format("YYYY-MM-DD");
    setSelectedDate(date.toDate());

    const recordsForDate = timeDetails?.data.filter(
      (d) => format(new Date(d.date), "yyyy-MM-dd") === formattedDate
    );

    const bookingsForDate = bookingDetails?.data.filter(
      (d) => format(new Date(d.date), "yyyy-MM-dd") === formattedDate
    );

    if (recordsForDate && recordsForDate.length > 0) {
      // Separate available and unavailable slots
      const availableSlots = recordsForDate
        .filter((d) => d.available)
        .flatMap((d) =>
          d.timeSlots.map((slot) => ({
            _id: d._id,
            start: slot.start,
            end: slot.end,
          }))
        );

      if (availableSlots.length > 0) {
        setSelectedTimeSlots(availableSlots);
        setExistingBooking(
          bookingsForDate?.map((booking) => ({
            _id: booking._id,
            start: booking.timeSlot.start,
            end: booking.timeSlot.end,
          })) || []
        );
        setIsModalOpen(true);
      } else {
        message.info("This date has no available slots for booking.");
      }
    } else {
      message.info("No time slots available on this date.");
    }
  };

  const handleBooking = async (
    timeSlots: { _id: string; start: string; end: string }[]
  ) => {
    if (!selectedDate || timeSlots.length === 0) return;

    const startTime = dayjs(
      `${format(selectedDate, "yyyy-MM-dd")} ${timeSlots[0].start}`
    ).toISOString();
    const endTime = dayjs(
      `${format(selectedDate, "yyyy-MM-dd")} ${timeSlots[0].end}`
    ).toISOString();

    const data = {
      freelancerSlotId: timeSlots[0]._id,
      userId: userDetails.data._id,
      buyerId: user?.user?._id as string,
      startTime,
      endTime,
      hourlyRate: 0,
      totalPrice: 0,
    };

    await bookingTimes.mutateAsync(data);
    message.success("Appointment booked successfully");

    setIsModalOpen(false);
    setSelectedTimeSlots([]);

    // Optionally, invalidate the query to ensure data is refreshed
    queryClient.invalidateQueries({ queryKey: ["bookings", user?.user?._id] });
  };

  const handleUpdateBooking = async (
    bookingId: string,
    timeSlots: { start: string; end: string }[]
  ) => {
    if (!selectedDate || timeSlots.length === 0) return;

    console.log("bookingId", bookingId);
    console.log("first time slot", dayjs(timeSlots[0].start).toISOString());
    console.log("second time slot", timeSlots[0].end);

    console.log('existingBooking', existingBooking);

    const startTime = dayjs(timeSlots[0].start).toISOString();
    const endTime = dayjs(timeSlots[0].end).toISOString();

    const data = {
      bookingId,
      startTime,
      endTime,
    };

    await updateBooking.mutateAsync(data);
    message.success("Booking updated successfully");

    setIsModalOpen(false);
    setSelectedTimeSlots([]);

    // Optionally, invalidate the query to ensure data is refreshed
    queryClient.invalidateQueries({ queryKey: ["bookings", user?.user?._id] });
  };

  const updateTimeSlot = (bookingId: string, field: "start" | "end", value: Dayjs | null) => {
    setExistingBooking((prev) =>
      prev.map((booking) =>
        booking._id === bookingId
          ? { ...booking, [field]: value ? value.toISOString() : "" }
          : booking
      )
    );
  };
  

  const removeBooking = async (bookingId: string) => {
    await deleteBooking.mutateAsync(bookingId);
    message.success("Booking deleted successfully");
    
    setExistingBooking((prev) =>
      prev.filter((booking) => booking._id !== bookingId)
  );
  
  setIsModalOpen(false);
  queryClient.invalidateQueries({ queryKey: ["bookings", user?.user?._id] });

  };


  const getDisabledTime = (start: string, end: string) => {
    const startTime = dayjs(start, "HH:mm");
    const endTime = dayjs(end, "HH:mm");

    const startHour = startTime.hour();
    const endHour = endTime.hour();
    const startMinute = startTime.minute();
    const endMinute = endTime.minute();

    return {
      disabledHours: () => {
        const hours = [];
        for (let i = 0; i < 24; i++) {
          if (i < startHour || i > endHour) {
            hours.push(i);
          }
        }
        return hours;
      },
      disabledMinutes: (selectedHour: number) => {
        const minutes = [];
        if (selectedHour === startHour) {
          for (let i = 0; i < 60; i++) {
            if (i < startMinute) {
              minutes.push(i);
            }
          }
        }
        if (selectedHour === endHour) {
          for (let i = 0; i < 60; i++) {
            if (i > endMinute) {
              minutes.push(i);
            }
          }
        }
        return minutes;
      },
    };
  };


  const dateCellRender = (date: Dayjs) => {
    const formattedDate = date.format("YYYY-MM-DD");

    // Get **all** records for this date
    const recordsForDate = timeDetails?.data.filter(
      (d) => format(new Date(d.date), "yyyy-MM-dd") === formattedDate
    );

    const bookingsForDate = bookingDetails?.data.filter(
      (d) => format(new Date(d.date), "yyyy-MM-dd") === formattedDate
    );

    if (!recordsForDate || recordsForDate.length === 0) return null;

    // Check if there are **available** and **unavailable** slots
    const hasAvailable = recordsForDate.some((d) => d.available);
    const hasUnavailable = recordsForDate.some((d) => !d.available);

    let badgeStatus: "default" | "success" | "error" | "warning" | undefined =
      "default";
    let bgColor = "bg-gray-300";
    let icon = "";

    if (hasAvailable) {
      badgeStatus = "success";
      bgColor = "bg-green-100 text-green-600";
      icon = "✔";
    } else if (hasUnavailable) {
      badgeStatus = "error";
      bgColor = "bg-red-100 text-red-600";
      icon = "✖";
    }

    return (
      <div className="absolute bottom-2 left-2">
        <Badge
          status={badgeStatus}
          text={
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${bgColor}`}
              title={`Available: ${hasAvailable ? "Yes" : "No"}, Unavailable: ${
                hasUnavailable ? "Yes" : "No"
              }`}
            >
              {icon}
            </div>
          }
        />
        {bookingsForDate && bookingsForDate.length > 0 && (
          <div className="mt-1 text-xs text-blue-600">
            {bookingsForDate.map((booking) => (
              <div key={booking._id}>
                {dayjs(booking.timeSlot.start).format("HH:mm")} -{" "}
                {dayjs(booking.timeSlot.end).format("HH:mm")}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, viewMode));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, viewMode));
  };

  const handleToday = () => {
    setCurrentDate(dayjs());
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50/50">
        <div className="max-w-7xl mx-auto my-10">
          <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="space-x-2">
                <AntButton
                  type={viewMode === "month" ? "primary" : "default"}
                  onClick={() => setViewMode("month")}
                >
                  Month
                </AntButton>
                <AntButton
                  type={viewMode === "year" ? "primary" : "default"}
                  onClick={() => setViewMode("year")}
                >
                  Year
                </AntButton>
              </div>
              <h2 className="text-xl font-semibold">
                {currentDate.format(viewMode === "year" ? "YYYY" : "MMMM YYYY")}
              </h2>
              <div className="space-x-2">
                <AntButton icon={<LeftOutlined />} onClick={handlePrevMonth} />
                <AntButton icon={<RightOutlined />} onClick={handleNextMonth} />
                <AntButton type="primary" onClick={handleToday}>
                  Today
                </AntButton>
              </div>
            </div>
            <AntCalendar
              fullscreen={true}
              onSelect={handleDateSelect}
              value={currentDate}
              onChange={setCurrentDate}
              mode={viewMode}
              cellRender={(current, info) => {
                if (info.type === "date") {
                  return dateCellRender(current);
                }
                return info.originNode;
              }}
              className="custom-calendar"
              headerRender={() => null}
              disabledDate={(current) => current.isBefore(dayjs(), "day")}
            />
          </div>

          <Modal
            title={selectedDate && format(selectedDate, "MMMM d, yyyy")}
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
          >
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">
                Available Time Slots
              </h3>
              <TimeSlotSelector
                onSubmit={handleBooking}
                initialTimeSlots={selectedTimeSlots}
                existingBookings={existingBooking}
                isBookingMode={true}
              />
              {existingBooking.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-700">
                    Existing Bookings
                  </h3>
                  {existingBooking.map((booking) => (
                    <div key={booking._id} className="p-2 border my-4 rounded-md">
                      <div className="space-y-3 py-2">
                        <div className="flex items-center gap-2 group">
                        <TimePicker
                            format="HH:mm"
                            value={booking.start ? dayjs(booking.start) : null}
                            onChange={(value) => updateTimeSlot(booking._id, "start", value)}
                            className="w-full"
                            disabledTime={() => getDisabledTime(selectedTimeSlots[0].start, selectedTimeSlots[0].end)}
                          />
                          <span className="text-gray-500">to</span>
                          <TimePicker
                            format="HH:mm"
                            value={booking.end ? dayjs(booking.end) : null}
                            onChange={(value) => updateTimeSlot(booking._id, "end", value)}
                            className="w-full"
                            disabledTime={() => getDisabledTime(selectedTimeSlots[0].start, selectedTimeSlots[0].end)}
                          />
                          <Button
                            type="text"
                            icon={<CloseOutlined />}
                            onClick={() => removeBooking(booking._id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </div>
                        <AntButton
                          type="primary"
                          className="w-full"
                          onClick={() =>
                            handleUpdateBooking(booking._id, [
                              { start: booking.start, end: booking.end },
                            ])
                          }
                        >
                          Update Booking
                        </AntButton>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default CalendarView;
