import { useState } from "react";
import {
  Calendar as AntCalendar,
  Modal,
  Button as AntButton,
  Select,
  Popover,
} from "antd";
import { format } from "date-fns";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useAddTimeSlots } from "./api/query";
import { useUserStore } from "../../store/user-store";
import { TimeSlotPicker } from "./components/TimeSlotPicker";
import { BuyerAPI } from "../Dashboard/Buyer/api/query-slice";

type ViewMode = "month" | "year";

type TimeSlot = {
  _id: string;
  start: string;
  end: string;
};

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
  // const { data: availabilityData = [] } = useQuery({
  //   queryKey: ["timeSlots"],
  //   queryFn: () => FreelancerAPI.getTimeSlots(),
  // });


    // Fetch user details
    const {
      data: availabilityData = [],
      // isLoading,
      // isError,
      // error,
    } = useQuery({
      queryKey: ["timeSlots", user?.user._id],
      enabled: !!user?.user._id,
      queryFn: () =>
        BuyerAPI.getFreelancerTimeSlots({
          freelancerId: user?.user._id as string,
        }),
    });

  const addTimeSlot = useAddTimeSlots();

  const handleDateSelect = (date: Dayjs) => {
    const formattedDate = date.format("YYYY-MM-DD");

    // Find all time slots for the selected date
    const data = Array.isArray(availabilityData)
      ? availabilityData
      : availabilityData.data;
    const existingData = data?.find(
      (d) => dayjs(d.date).format("YYYY-MM-DD") === formattedDate
    );

    // Prevent selecting past dates
    if (date.isBefore(dayjs(), "day")) {
      message.error("Cannot select past dates");
      return;
    }

    // Always open the modal for adding new time slots
    setSelectedDate(date.toDate());
    setAvailability(existingData?.available ? "available" : "unavailable");
    setSelectedTimeSlots([]); // Start with an empty array of time slots
    setIsModalOpen(true); // Open the modal
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSlotClick = (slot: TimeSlot, date: Dayjs, dateData: any) => {
    const formattedDate = date.format("YYYY-MM-DD");

    // Find all time slots for the selected date
    const data = Array.isArray(availabilityData)
      ? availabilityData
      : availabilityData.data;
    const existingData = data?.find(
      (d) => dayjs(d.date).format("YYYY-MM-DD") === formattedDate
    );

    setSelectedDate(date.toDate());
    setSelectedTimeSlots([
      {
        _id: dateData._id,
        start: slot.start,
        end: slot.end,
      },
    ]);
    setAvailability(existingData?.available ? "available" : "unavailable");
    setIsModalOpen(true);
    // if (existingData) {
    // }
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

    const data = Array.isArray(availabilityData)
      ? availabilityData
      : availabilityData.data;
    const dateData = data.filter(
      (d) => dayjs(d.date).format("YYYY-MM-DD") === formattedDate
    );

    if (!dateData.length || date.isBefore(dayjs(), "day")) return null;

    const renderSlots = () => {
      const slots = dateData.flatMap((d) =>
        (d.timeSlots || []).map((slot) => ({
          ...slot,
          available: d.available,
          dateData: d,
        }))
      ); // Attach dateData to each slot

      const visibleSlots = slots.slice(0, 3); // Show up to 3 slots initially
      const hiddenCount = slots.length - visibleSlots.length;

      console.log("visibleSlots", visibleSlots);

      return (
        <div className="flex flex-col gap-1">
          {visibleSlots.map((slot, i) => (
            <div
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                handleSlotClick(slot, date, slot.dateData); // Pass slot.dateData
              }}
              className={`text-xs text-white px-2 py-1 rounded cursor-pointer hover:bg-green-200 hover:text-black ${
                slot.available ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {slot.start} - {slot.end}
            </div>
          ))}
          {hiddenCount > 0 && (
            <Popover
              content={
                <div className="space-y-1 z-50">
                  {slots.map((slot, i) => (
                    <div
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSlotClick(slot, date, slot.dateData); // Pass slot.dateData
                      }}
                      className={`text-xs text-white px-2 py-1 rounded cursor-pointer hover:bg-green-200 hover:text-black ${
                        slot.available ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {slot.start} - {slot.end}
                    </div>
                  ))}
                </div>
              }
              title={dayjs(date).format("MMMM D, YYYY")}
              trigger="click"
            >
              <div
                className="text-xs text-gray-500 hover:underline cursor-pointer"
                onClick={(e) => e.stopPropagation()} // Prevent event propagation
              >
                +{hiddenCount} more
              </div>
            </Popover>
          )}
        </div>
      );
    };

    return <div className="px-1 py-1">{renderSlots()}</div>;
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
                  onChange={(value) => setAvailability(value)}
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
