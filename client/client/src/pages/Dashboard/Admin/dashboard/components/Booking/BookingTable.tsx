import { Button, Table, Select } from "antd";
import { useState } from "react";
import { useDeleteBooking, useUpdateBooking } from "./api/query";
import { format } from "date-fns";  

enum BookingStatus {
  Active = "active",
  Inactive = "inactive",
}

interface Booking {
  id: string;
  userId: string;
  date: string;
  timeSlot: string[];
  buyerId: string;
  status: BookingStatus;
  hourlyRate: number;
  totalPrice: number;
  taskInfo: string;
  description: string;
  contactInfo: string;
  location: string;
  buyerStatus: string;
  freelancerStatus: string;
}

interface BookingTableProps {
  bookings: Booking[];
}

export default function BookingTable({ bookings }: BookingTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const updateBooking = useUpdateBooking();
  const deleteBooking = useDeleteBooking();

  const handleEdit = (bookingId: string) => {
    console.log(`Edit booking with id: ${bookingId}`);
    updateBooking.mutate({ bookingId });
  };

  const handleDelete = (bookingId: string) => {
    console.log(`Delete booking with id: ${bookingId}`);
    deleteBooking.mutate({ bookingId });
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div className="container mx-auto py-10">
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-4 max-w-5xl mx-auto max-h-[80vh] overflow-auto"> {/* Adjusted panel container */}
        <div className="flex justify-end">
          <Select
            defaultValue={10}  
            onChange={handlePageSizeChange}
            options={[
              { value: 1, label: "1" },
              { value: 2, label: "2" },
              { value: 3, label: "3" },
              { value: 4, label: "4" },
              { value: 5, label: "5" },
              { value: 10, label: "10" },
              { value: 20, label: "20" },
              { value: 50, label: "50" },
            ]}
          />
        </div>
        <Table
          dataSource={bookings}
          rowKey="id"
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: bookings.length,
            onChange: (page, pageSize) => {
              setCurrentPage(page);
              setPageSize(pageSize);
            },
          }}
          sortDirections={['ascend', 'descend']}
        >
          <Table.Column title="Description" dataIndex="description" key="description" />
          <Table.Column
            title="Status"
            dataIndex="status"
            key="status"
            sorter={(a, b) => a.status.localeCompare(b.status)}
            render={(status) => (
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                  status === BookingStatus.Active ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                }`}
              >
                {status}
              </span>
            )}
          />
          <Table.Column
            title="Created By"
            dataIndex="userId"
            key="createdUserId"
            render={(userId) => `${userId?.firstName || "N/A"} ${userId?.lastName || "N/A"}`}
          />
          <Table.Column
            title="Date"
            dataIndex="date"
            key="date"
            render={(date) => (date ? format(new Date(date), "yyyy-MM-dd HH:mm:ss") : "N/A")}
          />
          <Table.Column
            title="Time Slot"
            dataIndex="timeSlot"
            key="timeSlot"
            render={(timeSlot) =>
              timeSlot?.start && timeSlot?.end
                ? `${format(new Date(timeSlot.start), "yyyy-MM-dd HH:mm:ss")} - ${format(
                    new Date(timeSlot.end),
                    "yyyy-MM-dd HH:mm:ss"
                  )}`
                : "N/A"
            }
          />
          <Table.Column
            title="Buyer Status"
            dataIndex="buyerStatus"
            key="buyerStatus"
          />
          <Table.Column
            title="Freelancer Status"
            dataIndex="freelancerStatus"
            key="freelancerStatus"
          />
          <Table.Column
            title="Hourly Rate"
            dataIndex="hourlyRate"
            key="hourlyRate"
          />
          <Table.Column
            title="Total Price"
            dataIndex="totalPrice"
            key="totalPrice"
          />
          <Table.Column
            title="Location"
            dataIndex="location"
            key="location"
          />
          <Table.Column
            title="Contact Info"
            dataIndex="contactInfo"
            key="contactInfo"
          />
          <Table.Column
            title="Change Status"
            key="actions"
            render={(_, record: Booking) => (
              <div>
                <Button variant="outlined" size="small" onClick={() => handleEdit(record.id)}>
                  Change Status
                </Button>
              </div>
            )}
          />
          <Table.Column
            title="Delete Action"
            key="deletactions"
            render={(_, record: Booking) => (
              <div>
                <Button variant="outlined" size="small" onClick={() => handleDelete(record.id)}>
                  Delete Record
                </Button>
              </div>
            )}
          />
        </Table>
      </div>
    </div>
  );
}
