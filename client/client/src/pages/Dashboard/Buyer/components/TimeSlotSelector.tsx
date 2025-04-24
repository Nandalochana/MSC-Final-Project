import { useState, useEffect } from "react";
import { Button, TimePicker, message } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

interface TimeSlot {
  _id: string;
  start: string;
  end: string;
  taskInfo?: string;
  description?: string;
  contactInfo?: string;
  location?: string;
}

interface TimeSlotSelectorProps {
  onSubmit: (timeSlots: TimeSlot[]) => void;
  initialTimeSlots?: TimeSlot[];
  existingBookings?: TimeSlot[];
  isBookingMode?: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const TimeSlotSelector = ({
  onSubmit,
  initialTimeSlots = [],
  existingBookings = [],
  isBookingMode = false,
  setIsModalOpen,
}: TimeSlotSelectorProps) => {
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [selectedStartTime, setSelectedStartTime] = useState<Dayjs | null>(
    null
  );
  const [selectedEndTime, setSelectedEndTime] = useState<Dayjs | null>(null);

  // State for additional form inputs
  const [taskInfo, setTaskInfo] = useState("");
  const [description, setDescription] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    if (initialTimeSlots.length > 0) {
      initialTimeSlots.forEach((slot) => {
        const existingBooking = existingBookings.find(
          (booking) =>
            dayjs(booking.start).format("HH:mm") === slot.start &&
            dayjs(booking.end).format("HH:mm") === slot.end
        );

        console.log('existingBooking', existingBooking);
  
        if (existingBooking) {
          setTaskInfo(existingBooking.taskInfo || "");
          setDescription(existingBooking.description || "");
          setContactInfo(existingBooking.contactInfo || "");
          setLocation(existingBooking.location || "");
          setSelectedStartTime(dayjs(existingBooking.start));
          setSelectedEndTime(dayjs(existingBooking.end));
        } else {
          // Clear the form if no matching booking is found
          setTaskInfo("");
          setDescription("");
          setContactInfo("");
          setLocation("");
          setSelectedStartTime(null);
          setSelectedEndTime(null);
        }
      });
    }
  }, [initialTimeSlots, existingBookings]);

  const handleSubmit = () => {
    if (selectedSlot && selectedStartTime && selectedEndTime) {
      const selectedStartTimeFormatted = selectedStartTime.format("HH:mm");
      const selectedEndTimeFormatted = selectedEndTime.format("HH:mm");
      if (
        dayjs(selectedStartTimeFormatted, "HH:mm").isBetween(
          dayjs(selectedSlot.start, "HH:mm"),
          dayjs(selectedSlot.end, "HH:mm"),
          null,
          "[)"
        ) &&
        dayjs(selectedEndTimeFormatted, "HH:mm").isBetween(
          dayjs(selectedSlot.start, "HH:mm"),
          dayjs(selectedSlot.end, "HH:mm"),
          null,
          "[)"
        ) &&
        selectedStartTime.isBefore(selectedEndTime)
      ) {
        // Include additional form data in the submission
        onSubmit([
          {
            _id: selectedSlot._id,
            start: selectedStartTimeFormatted,
            end: selectedEndTimeFormatted,
            taskInfo,
            description,
            contactInfo,
            location,
          },
        ]);
      } else {
        message.error(
          "Selected time is outside the available slot or invalid."
        );
      }
    }
  };

  const getDisabledTime = (slot: TimeSlot) => {
    return {
      disabledHours: () => {
        const startHour = dayjs(slot.start, "HH:mm").hour();
        const endHour = dayjs(slot.end, "HH:mm").hour();
        const hours = [];
        for (let i = 0; i < 24; i++) {
          const isBooked = existingBookings.some((booking) => {
            const bookingStartHour = dayjs(booking.start).hour();
            const bookingEndHour = dayjs(booking.end).hour();
            return i >= bookingStartHour && i <= bookingEndHour;
          });
          if (i < startHour || i > endHour || isBooked) {
            hours.push(i);
          }
        }
        return hours;
      },
      disabledMinutes: (selectedHour: number) => {
        const startMinute = dayjs(slot.start, "HH:mm").minute();
        const endMinute = dayjs(slot.end, "HH:mm").minute();
        const minutes = [];
        for (let i = 0; i < 60; i++) {
          const isBooked = existingBookings.some((booking) => {
            const bookingStartHour = dayjs(booking.start).hour();
            const bookingEndHour = dayjs(booking.end).hour();
            const bookingStartMinute = dayjs(booking.start).minute();
            const bookingEndMinute = dayjs(booking.end).minute();
            return (
              (selectedHour === bookingStartHour && i >= bookingStartMinute) ||
              (selectedHour === bookingEndHour && i <= bookingEndMinute)
            );
          });
          if (
            (selectedHour === dayjs(slot.start, "HH:mm").hour() &&
              i < startMinute) ||
            (selectedHour === dayjs(slot.end, "HH:mm").hour() &&
              i > endMinute) ||
            isBooked
          ) {
            minutes.push(i);
          }
        }
        return minutes;
      },
    };
  };

  return (
    <div className="space-y-6">
      {/* Time Slot Selection Section */}

      <div className="flex justify-between items-start gap-5">
        <div className="w-full">
          <div className="space-y-3 mb-5">
            <h1 className="font-semibold text-lg text-gray-700">
              Select Time Slot
            </h1>
            {initialTimeSlots.map((slot, index) => (
              <div
                key={index}
                className={`p-3 rounded-md border ${
                  selectedSlot === slot
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-300"
                } cursor-pointer transition-all`}
                onClick={() => setSelectedSlot(slot)}
              >
                <div className="text-sm font-medium">
                  {slot.start} - {slot.end}
                </div>
              </div>
            ))}
          </div>

          {selectedSlot && (
            <>
              <h1 className="font-semibold text-lg text-gray-700 mb-2">
                Add Time for Selected Slot
              </h1>
              <div className="flex items-center gap-2 justify-center">
                <TimePicker
                  format="HH:mm"
                  value={selectedStartTime}
                  onChange={setSelectedStartTime}
                  className="w-full"
                  minuteStep={1}
                  disabledTime={() => getDisabledTime(selectedSlot)}
                />
                <span className="text-gray-500">to</span>
                <TimePicker
                  format="HH:mm"
                  value={selectedEndTime}
                  onChange={setSelectedEndTime}
                  className="w-full"
                  minuteStep={1}
                  disabledTime={() => getDisabledTime(selectedSlot)}
                />
              </div>
            </>
          )}
        </div>

        {/* Additional Form Inputs Section */}
        <div className="p-4 border w-full rounded-md bg-gray-50 shadow-sm">
          <h1 className="font-semibold text-lg text-gray-700 mb-4">
            Task Details
          </h1>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Task Info
              </label>
              <input
                type="text"
                placeholder="Enter task info"
                value={taskInfo}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setTaskInfo(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                placeholder="Enter description"
                value={description}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Contact Info
              </label>
              <input
                type="text"
                placeholder="Enter contact info"
                value={contactInfo}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setContactInfo(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                placeholder="Enter location"
                value={location}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center gap-5">
        <Button  className="h-10" onClick={() => setIsModalOpen(false)} block>
          Cancel
        </Button>

        {/* Submit Button */}
        {initialTimeSlots.length > 0 ? (
          <Button
          className="h-10"
            type="primary"
            onClick={handleSubmit}
            disabled={!selectedSlot || !selectedStartTime || !selectedEndTime}
            block
          >
            Book Appointment
          </Button>
        ) : (
          <div className="text-center text-gray-500">
            No available time slots for this date
          </div>
        )}
      </div>
    </div>
  );
};
