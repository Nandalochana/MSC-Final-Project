import { useEffect, useState } from "react";
import { Button, TimePicker, message } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { useDeleteTimeSlot } from "../api/query";

interface TimeSlot {
  _id?: string;
  start: string;
  end: string;
}

interface TimeSlotSelectorProps {
  onSubmit: (timeSlots: TimeSlot[]) => void;
  initialTimeSlots?: TimeSlot[];
}

export const TimeSlotPicker = ({ onSubmit, initialTimeSlots = [] }: TimeSlotSelectorProps) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>(initialTimeSlots);

  console.log('timeSlots', timeSlots);

  const deleteTimeSlot = useDeleteTimeSlot();

  useEffect(() => {
    // Initialize with provided time slots or reset to empty
    setTimeSlots(initialTimeSlots);
  }, [initialTimeSlots]);

  const addTimeSlot = () => {
    // Add a new empty time slot
    setTimeSlots([...timeSlots, { start: "", end: "" }]);
  };

  const removeTimeSlot = (index: number) => {
    const slotToDelete = timeSlots[index];
    if (slotToDelete._id) {
      // Call API to delete the time slot if it has an `_id`
      deleteTimeSlot.mutate(slotToDelete._id, {
        onSuccess: () => {
          message.success("Time slot deleted successfully");
        },
        onError: () => {
          message.error("Failed to delete time slot");
        },
      });
    }
    // Remove the time slot from the local state
    setTimeSlots(timeSlots.filter((_, i) => i !== index));
  };

  const updateTimeSlot = (index: number, field: keyof TimeSlot, value: Dayjs | null) => {
    // Update the `start` or `end` time of a specific time slot
    const updatedSlots = timeSlots.map((slot, i) => {
      if (i === index) {
        return {
          ...slot,
          [field]: value ? value.format("HH:mm") : "",
        };
      }
      return slot;
    });
    setTimeSlots(updatedSlots);
  };

  const isValid = () => {
    // Ensure all time slots have valid `start` and `end` times
    return timeSlots.every((slot) => slot.start && slot.end && slot.start < slot.end);
  };

  const handleSubmit = () => {
    if (!isValid()) {
      message.error("Please ensure all time slots have valid start and end times.");
      return;
    }
    onSubmit(timeSlots);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {timeSlots.map((slot, index) => (
          <div key={index} className="flex items-center gap-2 group">
            <TimePicker
              format="HH:mm"
              value={slot.start ? dayjs(slot.start, "HH:mm") : null}
              onChange={(value) => updateTimeSlot(index, "start", value)}
              className="w-full"
              placeholder="Start Time"
            />
            <span className="text-gray-500">to</span>
            <TimePicker
              format="HH:mm"
              value={slot.end ? dayjs(slot.end, "HH:mm") : null}
              onChange={(value) => updateTimeSlot(index, "end", value)}
              className="w-full"
              placeholder="End Time"
            />
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => removeTimeSlot(index)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Button type="default" icon={<PlusOutlined />} onClick={addTimeSlot} block>
          Add Time Slot
        </Button>
        <Button type="primary" onClick={handleSubmit} block disabled={!isValid()}>
          Save
        </Button>
      </div>
    </div>
  );
};