import React, { useEffect, useState } from "react";
import { Card, Col, Row, Typography } from "antd";
import {
  Line,
  Bar,
  Doughnut,
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { ReportAPI } from "./api/query-slice";
import { BookingManagementAPI } from "../Booking/api/query-slice";
import { ProfileAPI } from "../../../../../ProfileManager/api/query-slice";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend
);

const { Title } = Typography;

const Reports: React.FC = () => {
  const { data = { data: [] }, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => ReportAPI.LoadAllTasks(),
  });

  const { data: bookingData = { data: [] }, isLoading: isBookingLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => BookingManagementAPI.LoadAllBookings(),
  });

  const {
    data: userProfiles = { data: [] },
    isLoading: isUserProfilesLoading,
  } = useQuery({
    queryKey: ["userProfiles"],
    queryFn: () => ProfileAPI.getAllUsersProfiles(),
  });

  const [freelancersTaskData, setFreelancersTaskData] = useState<{
    labels: string[];
    datasets: { label: string; data: number[]; backgroundColor: string }[];
  }>({
    labels: [],
    datasets: [],
  });

  const [freelancersBookingData, setFreelancersBookingData] = useState<{
    labels: string[];
    datasets: { label: string; data: number[]; backgroundColor: string }[];
  }>({
    labels: [],
    datasets: [],
  });

  const [categoriesData, setCategoriesData] = useState<{
    labels: string[];
    datasets: { label: string; data: number[]; backgroundColor: string[] }[];
  }>({
    labels: [],
    datasets: [],
  });

  const [selectedYear, setSelectedYear] = useState<number>(dayjs().year());

  useEffect(() => {
    if (!isLoading) {
      const monthlyTaskCounts = Array(12).fill(0); // Initialize array for 12 months
      data.data.forEach((task: any) => {
        const taskDate = dayjs(task.createdAt);
        if (taskDate.year() === selectedYear) {
          const monthIndex = taskDate.month(); // 0 = January, 11 = December
          monthlyTaskCounts[monthIndex]++;
        }
      });

      setFreelancersTaskData({
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: `Tasks Created in ${selectedYear}`,
            data: monthlyTaskCounts,
            backgroundColor: "red",
          },
        ],
      });
    }
  }, [data, isLoading, selectedYear]);

  useEffect(() => {
    if (!isBookingLoading) {
      const monthlyIncome = Array(12).fill(0); // Initialize array for 12 months
      bookingData.data.forEach((booking: any) => {
        const bookingDate = dayjs(booking.date);
        if (bookingDate.year() === selectedYear) {
          const monthIndex = bookingDate.month(); // 0 = January, 11 = December
          monthlyIncome[monthIndex] += booking.totalPrice;
        }
      });

      setFreelancersBookingData({
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: `Income (Euros) in ${selectedYear}`,
            data: monthlyIncome,
            backgroundColor: "#52c41a",
          },
        ],
      });
    }
  }, [bookingData, isBookingLoading, selectedYear]);

  useEffect(() => {
    if (!isUserProfilesLoading) {
      const categoryCounts: Record<string, number> = {};
      const dynamicColors: string[] = [
        "#1890ff", "#13c2c2", "#faad14", "#eb2f96", "#722ed1", "#ff4d4f", "#73d13d", "#2f54eb",
        "#ff85c0", "#597ef7", "#ffc069", "#ff7a45", "#36cfc9", "#9254de", "#ffec3d", "#d3adf7",
      ]; 
      let colorIndex = 0;

      const categoryColors: Record<string, string> = {};

      userProfiles.data.forEach((profile: any) => {
        const category = profile.profileId.profileName;
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;

        // Assign a color if not already assigned
        if (!categoryColors[category]) {
          categoryColors[category] = dynamicColors[colorIndex % dynamicColors.length];
          colorIndex++;
        }
      });

      const labels = Object.keys(categoryCounts);
      const data = Object.values(categoryCounts);
      const backgroundColor = labels.map((label) => categoryColors[label]);

      setCategoriesData({
        labels,
        datasets: [
          {
            label: "Top Categories",
            data,
            backgroundColor,
          },
        ],
      });
    }
  }, [userProfiles, isUserProfilesLoading]);

  return (
    <div className="p-6">
      <Title level={3}>Freelancer Platform Report</Title>
      <div>
        <label htmlFor="year-select">Select Year: </label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {Array.from({ length: 5 }, (_, i) => dayjs().year() - i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title={`Tasks Created Per Month in ${selectedYear}`}>
            <Line data={freelancersTaskData} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title={`Total Freelancers Booking Income in ${selectedYear}`}>
            <Bar data={freelancersBookingData} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Top Categories by Projects">
            <Doughnut data={categoriesData} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Reports;
