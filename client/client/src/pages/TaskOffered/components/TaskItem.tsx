import { FC } from "react";
import { Card, Tag, Row, Col, Button, Rate } from "antd";
import { useNavigate } from "react-router";
import { CheckCircleFilled } from "@ant-design/icons";

interface TaskItemProps {
  tasks: {
    _id: string;
    taskId?: {
      _id: string;
      createdUserId:
        | string
        | {
            _id: string;
            firstName: string;
            lastName: string;
            profileImg: string;
            address1: string;
            address2: string;
            address3: string;
            telephoneNr: string;
            mobileNr: string;
            status: string;
            __v: number;
          };
      title: string;
      description: string;
      status: string;
      createdAt: string;
      updatedAt: string;
    };
    createdUserId?: {
      _id: string;
      firstName: string;
      lastName: string;
      profileImg: string;
      address1: string;
      address2: string;
      address3: string;
      telephoneNr: string;
      mobileNr: string;
      status: string;
      __v: number;
    };
    offerUserId?: string;
    totalPrice?: number;
    status: string;
    offerStatus?: string;
    buyerStatus?: string;
    freelancerStatus?: string;
  }[];
  isLoading: boolean;
  isBuyer: boolean;
  onUpdateStatus: (id: string, status: string) => void;
  getLatestRating: (taskId: string) => { rating: number } | null;
  onOpenRatingModal: (id: string) => void;
  setRating: (rating: number) => void;
}

const TaskItem: FC<TaskItemProps> = ({
  tasks,
  isLoading,
  isBuyer,
  onUpdateStatus,
  onOpenRatingModal,
  getLatestRating,
  setRating,
}) => {
  const navigate = useNavigate();

  if (isLoading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <Row gutter={[16, 16]}>
      {tasks.map((task) => {
        const taskDetails = task.taskId || task;
        const createdUser = taskDetails.createdUserId;
        const isFreelancerConfirmed = task.freelancerStatus === "confirmed";
        const isBuyerConfirmed = task.buyerStatus === "confirmed";

        const latestRating = getLatestRating(task._id);

        return (
          <Col key={task._id} xs={24} sm={12} md={8} lg={6}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Card
                title={taskDetails.title || "No Title"}
                bordered={true}
                style={{
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #e0e0e0",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  position: "relative",
                  backgroundColor: isBuyerConfirmed ? "#f0fff4" : "white", // Greenish background for confirmed tasks
                  borderColor: isBuyerConfirmed ? "#52c41a" : "#e0e0e0",
                  flex: "1", // Ensures the card takes up the full height of the container
                  display: "flex",
                  flexDirection: "column",
                }}
                hoverable
                onClick={() => navigate(`/task/${task.taskId?._id || task._id}`)}
                bodyStyle={{
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between", // Ensures content is spaced evenly
                  flex: "1",
                }}
                headStyle={{
                  backgroundColor: "#f5f5f5",
                  borderBottom: "1px solid #e0e0e0",
                }}
                extra={
                  task.freelancerStatus === "confirmed" ? (
                    <CheckCircleFilled
                      style={{ color: "green", fontSize: "24px" }}
                    />
                  ) : null
                }
              >
                <div>
                  <p className="mb-2 break-all line-clamp-2">{taskDetails.description}</p>
                  {task.totalPrice && (
                    <p className="mb-2 break-all">
                      <strong>Total Price:</strong> {task.totalPrice} €
                    </p>
                  )}
                  <div className="flex gap-2 my-2">
                    {/* <Tag
                      icon={<CheckCircleFilled />}
                      color={task.status === "active" ? "green" : "red"}
                    >
                      {task.status.toUpperCase()}
                    </Tag> */}
                    {/* {task.offerStatus && (
                      <Tag
                        icon={<CheckCircleFilled />}
                        color={task.offerStatus === "offered" ? "blue" : "gray"}
                      >
                        {task.offerStatus.toUpperCase()}
                      </Tag>
                    )} */}
                  </div>
                  {typeof createdUser === "object" && (
                    <div>
                      <p>
                        <strong>Created by:</strong> {createdUser.firstName}{" "}
                        {createdUser.lastName}
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm button for freelancer (Only show if not confirmed) */}
                {!isBuyer && !isFreelancerConfirmed && (
                  <div className="flex gap-2 mt-4 z-50 w-full">
                    <Button
                      type="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateStatus(task._id, "confirmed");
                      }}
                      className="w-full"
                    >
                      Confirm
                    </Button>
                  </div>
                )}

                {/* Buyer "Complete" button (Only show if freelancer confirmed but buyer has not confirmed) */}
                {isBuyer && isFreelancerConfirmed && !isBuyerConfirmed && (
                  <div className="flex gap-2 mt-4 z-50 w-full">
                    <Button
                      type="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateStatus(task._id, "completed");
                      }}
                      className="w-full"
                    >
                      Complete
                    </Button>
                  </div>
                )}

                {/* Buyer completed task indicator */}
                {isBuyerConfirmed && !isBuyer && (
                  <div style={{ marginTop: "16px", textAlign: "center" }}>
                    <Tag color="green">
                      <CheckCircleFilled /> Completed
                    </Tag>
                  </div>
                )}

                <div>
                  {isBuyer && task.buyerStatus === "confirmed" && (
                    <div className="flex flex-col items-start">
                      {latestRating ? (
                        <div className="flex flex-col items-center gap-2">
                          <Rate
                            disabled
                            allowHalf
                            value={latestRating.rating}
                            className="text-lg"
                          />
                          <Button
                            type="primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenRatingModal(task._id);
                              setRating(latestRating.rating);
                            }}
                            className="w-full"
                          >
                            Edit Rating
                          </Button>
                        </div>
                      ) : (
                        <Button
                          type="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            setRating(0);
                            onOpenRatingModal(task._id);
                          }}
                          className="w-full"
                        >
                          Rate Experience
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </Col>
        );
      })}
    </Row>
  );
};

export default TaskItem;