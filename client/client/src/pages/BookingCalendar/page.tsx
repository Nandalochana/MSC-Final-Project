import { useState } from "react";
import {
  Calendar as AntCalendar,
  Modal,
  Button as AntButton,
  Badge,
  Select,
} from "antd";
import { format } from "date-fns";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useAddTimeSlots } from "./api/query";
import { useUserStore } from "../../store/user-store";
import { FreelancerAPI } from "./api/query-slice";
import { TimeSlotPicker } from "./components/TimeSlotPicker";

type ViewMode = "month" | "year";

const BookingCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [availability, setAvailability] = useState<"available" | "unavailable">(
    "available"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<
    Array<{ _id: string; start: string; end: string }>
  >([]);
  const queryClient = useQueryClient();

  const { user } = useUserStore();

  // Simulated query - replace with actual API call
  const { data: availabilityData = [] as Array<{ date: string; available: boolean; timeSlots: { _id: string; start: string; end: string; }[]; status: string; userId: string; _id: string; }> } = useQuery({
    queryKey: ["timeSlots"],
    queryFn: () => FreelancerAPI.getTimeSlots(),
  });

  const addTimeSlot = useAddTimeSlots();

  const handleDateSelect = (date: Dayjs) => {
    // Prevent selecting past dates
    if (date.isBefore(dayjs(), "day")) {
      message.error("Cannot select past dates");
      return;
    }

    const formattedDate = date.format("YYYY-MM-DD");
    setSelectedDate(date.toDate());

    const data = Array.isArray(availabilityData) ? availabilityData : availabilityData.data;
    const existingData = data?.find(
      (d: { date: string | number | Date; }) => format(new Date(d.date), "yyyy-MM-dd") === formattedDate
    ) as { date: string; available: boolean; timeSlots: { _id: string; start: string; end: string; }[]; status: string; userId: string; _id: string; };

    if (existingData) {
      setAvailability(existingData.available ? "available" : "unavailable");
      setSelectedTimeSlots(
        existingData.timeSlots.map((slot: { _id: string; start: string; end: string; }) => ({
          _id: existingData._id,
          start: slot.start,
          end: slot.end,
        }))
      );
    } else {
      setAvailability("available");
      setSelectedTimeSlots([]);
    }

    setIsModalOpen(true);
  };

  const handleAvailabilitySubmit = async (
    timeSlots: { start: string; end: string }[]
  ) => {
    if (!selectedDate) return;
  
    if (!user?.user._id) {
      console.error("User ID is undefined");
      return;
    }
  
    if (timeSlots.length === 0) {
      message.error("Please add at least one time slot.");
      return;
    }
  
    const data = {
      userId: user.user._id,
      date: format(selectedDate, "yyyy-MM-dd"),
      available: availability === "available",
      status: "active",
      timeSlots: timeSlots,
    };
  
    try {
      await addTimeSlot.mutateAsync(data);
      message.success("Availability updated successfully!");
  
      // Close the modal immediately after submission
      setIsModalOpen(false);
      setSelectedTimeSlots([]);
  
      // Refetch the availability data to update the calendar
      queryClient.invalidateQueries({ queryKey: ["timeSlots"] });
    } catch (error) {
      console.error("Error updating availability:", error);
      message.error("Failed to update availability.");
    }
  };
  

  const dateCellRender = (date: Dayjs) => {
    const formattedDate = date.format("YYYY-MM-DD");
    
    const data = Array.isArray(availabilityData) ? availabilityData : availabilityData.data;
  
    // Ensure date is valid before accessing it
    const dateData = data.find((d: { date: string | number | Date; }) => {
      const parsedDate = dayjs(d.date);
      
      if (!parsedDate.isValid()) {
        console.warn("Invalid date found in availability data:", d.date);
        return false; // Skip invalid date entries
      }
  
      return parsedDate.format("YYYY-MM-DD") === formattedDate;
    });
  
    // Disable past dates
    const isPastDate = date.isBefore(dayjs(), "day");
  
    if (dateData || isPastDate) {
      return (
        <div className="absolute bottom-2 left-2">
          <div
            className={`p-2 rounded-md ${
              isPastDate
                ? ""
                : dateData?.available
                ? "bg-green-100"
                : "bg-red-100"
            }`}
          >
            <Badge
              status={
                isPastDate
                  ? "default"
                  : dateData?.available
                  ? "success"
                  : "error"
              }
              text={
                <div className="text-xs">
                  {isPastDate ? (
                    <></>
                  ) : (
                    <>
                      <div>
                        {dateData?.available ? "Available" : "Unavailable"}
                      </div>
                      {dateData?.available &&
                        dateData?.timeSlots?.map((slot, index) => (
                          <div key={index} className="text-gray-600">
                            {slot.start} - {slot.end}
                          </div>
                        ))}
                      {!dateData?.available &&
                        dateData?.timeSlots?.map((slot, index) => (
                          <div key={index} className="text-gray-600">
                            {slot.start} - {slot.end}
                          </div>
                        ))}
                    </>
                  )}
                </div>
              }
            />
          </div>
        </div>
      );
    }
  
    return null;
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

  const handleAvailabilityChange = (value: "available" | "unavailable") => {
    setAvailability(value);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50/50">
        <section className="h-48 flex flex-col justify-center items-center bg-blue-500 text-white">
          <h1 className="text-3xl font-bold"> Availability Calendar</h1>
          <p className="text-white">
            Select dates and manage your availability
          </p>
        </section>

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
              <div>
                <Select
                  value={availability}
                  onChange={handleAvailabilityChange}
                  className="w-full"
                  options={[
                    { label: "Available", value: "available" },
                    { label: "Unavailable", value: "unavailable" },
                  ]}
                />
              </div>

              <TimeSlotPicker
                onSubmit={handleAvailabilitySubmit}
                initialTimeSlots={selectedTimeSlots}
              />
              
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default BookingCalendar;