import React, { useState } from 'react';
import { Menu } from 'antd';
import './admindashboard.css';
import Reports from './components/Reports/Reports';
// import Logs from './components/Logs/Logs';
import UserManagement from './components/UserManagement/UserManagement';
import { DashboardComponents } from './DashboardComponents';
import TaskManagement from './components/Task/TaskManagement';
import BookingManagement from './components/Booking/BookingManagement';

const { SubMenu } = Menu;

const AdminDashboard: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<JSX.Element>(<UserManagement />);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (e: any) => {
    console.log('click ', e.key);
    switch (e.key) {

      case DashboardComponents.UserManagement:
        setSelectedComponent(<UserManagement />);
        break;
      case DashboardComponents.Reports:
        setSelectedComponent(<Reports />);
        break;
      case DashboardComponents.TaskSettings:
        setSelectedComponent(<TaskManagement />);
        break;
      case DashboardComponents.BookingManagement:
        setSelectedComponent(<BookingManagement />);
        break;
      case DashboardComponents.Logs:
        // setSelectedComponent(<Logs />);
        break;
      default:
        setSelectedComponent(<UserManagement />);
    }
  };

  return (
    <div className="admin-dashboard">
      <Menu
        onClick={handleClick}
        style={{ width: 300, marginTop: 20 }} // Increased width and added top margin
        mode="vertical"
      >
        <SubMenu key="sub1" title="User Management">
          <Menu.Item key={DashboardComponents.UserManagement} style={{ fontSize: '16px', padding: '10px 20px' }}>Manage Users</Menu.Item>
        </SubMenu>

        <SubMenu key="sub2" title="Task Management">
          <Menu.Item key={DashboardComponents.TaskSettings} style={{ fontSize: '16px', padding: '10px 20px' }}>Task-Settings</Menu.Item>
        </SubMenu>

        <SubMenu key="sub3" title="Booking Management">
          <Menu.Item key={DashboardComponents.BookingManagement} style={{ fontSize: '16px', padding: '10px 20px' }}>Booking Management</Menu.Item>
        </SubMenu>

        <SubMenu key="sub4" title="Reports">
          <Menu.Item key={DashboardComponents.Reports} style={{ fontSize: '16px', padding: '10px 20px' }}>View Reports</Menu.Item>
          <Menu.Item key={DashboardComponents.Logs} style={{ fontSize: '16px', padding: '10px 20px' }}>Logs</Menu.Item>
        </SubMenu>
      </Menu>
      <div className="content">
        {selectedComponent}
      </div>
    </div>
  );
};

export default AdminDashboard;
