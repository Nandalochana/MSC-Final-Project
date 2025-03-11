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

  const deleteTimeSlot = useDeleteTimeSlot(); 

  useEffect(() => {
    if (initialTimeSlots.length > 0) {
      setTimeSlots(initialTimeSlots);
    } else {
      setTimeSlots([]);
    }
  }, [initialTimeSlots]);

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { start: "", end: "" }]);
  };

  const removeTimeSlot = (index: number) => {
    const slotToDelete = timeSlots[index];
    if (slotToDelete._id) {
      deleteTimeSlot.mutate(slotToDelete._id);
    }
    setTimeSlots(timeSlots.filter((_, i) => i !== index));
    message.success("Time slot deleted successfully");
  };

  const updateTimeSlot = (index: number, field: keyof TimeSlot, value: Dayjs | null) => {
    const updatedSlots = timeSlots.map((slot, i) => {
      if (i === index) {
        return { 
          ...slot, 
          [field]: value ? value.format("HH:mm") : "" 
        };
      }
      return slot;
    });
    setTimeSlots(updatedSlots);
  };

  const isValid = () => {
    return timeSlots.length > 0 && timeSlots.every(slot => slot.start && slot.end);
  };

  const handleSubmit = () => {
    if (!isValid()) {
      message.error("Please add at least one valid time slot before saving.");
      return;
    }

    onSubmit(timeSlots);
  };

  console.log('timeSlots', timeSlots);

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
            />
            <span className="text-gray-500">to</span>
            <TimePicker
              format="HH:mm"
              value={slot.end ? dayjs(slot.end, "HH:mm") : null}
              onChange={(value) => updateTimeSlot(index, "end", value)}
              className="w-full"
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