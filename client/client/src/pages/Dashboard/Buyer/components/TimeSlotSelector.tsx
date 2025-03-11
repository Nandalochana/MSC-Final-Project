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
}

interface TimeSlotSelectorProps {
  onSubmit: (timeSlots: TimeSlot[]) => void;
  initialTimeSlots?: TimeSlot[];
  existingBookings?: TimeSlot[];
  isBookingMode?: boolean;
}

export const TimeSlotSelector = ({ 
  onSubmit, 
  initialTimeSlots = [], 
  existingBookings = [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isBookingMode = false 
}: TimeSlotSelectorProps) => {
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [selectedStartTime, setSelectedStartTime] = useState<Dayjs | null>(null);
  const [selectedEndTime, setSelectedEndTime] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (initialTimeSlots.length > 0) {
      setSelectedSlot(null);
      setSelectedStartTime(null);
      setSelectedEndTime(null);
    }
  }, [initialTimeSlots]);

  const handleSubmit = () => {
    if (selectedSlot && selectedStartTime && selectedEndTime) {
      const selectedStartTimeFormatted = selectedStartTime.format("HH:mm");
      const selectedEndTimeFormatted = selectedEndTime.format("HH:mm");
      if (
        dayjs(selectedStartTimeFormatted, "HH:mm").isBetween(dayjs(selectedSlot.start, "HH:mm"), dayjs(selectedSlot.end, "HH:mm"), null, "[)") &&
        dayjs(selectedEndTimeFormatted, "HH:mm").isBetween(dayjs(selectedSlot.start, "HH:mm"), dayjs(selectedSlot.end, "HH:mm"), null, "[)") &&
        selectedStartTime.isBefore(selectedEndTime)
      ) {
        onSubmit([{ _id: selectedSlot._id, start: selectedStartTimeFormatted, end: selectedEndTimeFormatted }]);
      } else {
        message.error("Selected time is outside the available slot or invalid.");
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
          const isBooked = existingBookings.some(booking => {
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
          const isBooked = existingBookings.some(booking => {
            const bookingStartHour = dayjs(booking.start).hour();
            const bookingEndHour = dayjs(booking.end).hour();
            const bookingStartMinute = dayjs(booking.start).minute();
            const bookingEndMinute = dayjs(booking.end).minute();
            return (selectedHour === bookingStartHour && i >= bookingStartMinute) || (selectedHour === bookingEndHour && i <= bookingEndMinute);
          });
          if ((selectedHour === dayjs(slot.start, "HH:mm").hour() && i < startMinute) || 
              (selectedHour === dayjs(slot.end, "HH:mm").hour() && i > endMinute) || 
              isBooked) {
            minutes.push(i);
          }
        }
        return minutes;
      },
    };
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {initialTimeSlots.map((slot, index) => (
          <div
            key={index}
            className={`p-3 rounded-md border ${
              selectedSlot === slot 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-blue-300'
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
      )}

      {initialTimeSlots.length > 0 ? (
        <Button 
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
  );
};