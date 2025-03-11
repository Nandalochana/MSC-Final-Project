import { Button, Table, Select } from "antd";
import { useState } from "react";
import { useDeleteTask, useUpdateTask } from "./api/query";

enum TaskStatus {
  Active = "active",
  Inactive = "inactive",
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdUserId: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

interface TaskTableProps {
  tasks: Task[];
}

export default function TaskTable({ tasks }: TaskTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const handleEdit = (taskId: string) => {
    console.log(`Edit task with id: ${taskId}`);
    updateTask.mutate({ taskId });
  };

  const handleDelete = (taskId: string) => {
    console.log(`Delete task with id: ${taskId}`);
    deleteTask.mutate({ taskId });
  };

  const handlePageSizeChange = (value: number) => {
    setPageSize(value);
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-end mb-4">
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
        dataSource={tasks}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: tasks.length,
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          },
        }}
        sortDirections={['ascend', 'descend']}
      >
        <Table.Column title="Title" dataIndex="title" key="title" sorter={(a, b) => a.title.localeCompare(b.title)} />
        <Table.Column title="Description" dataIndex="description" key="description" />
        <Table.Column
          title="Status"
          dataIndex="status"
          key="status"
          sorter={(a, b) => a.status.localeCompare(b.status)}
          render={(status) => (
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                status === TaskStatus.Active ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
              }`}
            >
              {status}
            </span>
          )}
        />
        <Table.Column
          title="Created By"
          dataIndex="createdUserId"
          key="createdUserId"
          render={(createdUserId) => `${createdUserId.firstName} ${createdUserId.lastName}`}
        />
        <Table.Column
          title="Change Status"
          key="actions"
          render={(_, record: Task) => (
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
          render={(_, record: Task) => (
            <div>
              <Button variant="outlined" size="small" onClick={() => handleDelete(record.id)}>
                Delete Record
              </Button>
            </div>
          )}
        />
      </Table>
    </div>
  );
}
