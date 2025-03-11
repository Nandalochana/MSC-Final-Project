import { Link, useNavigate } from "react-router";
import { useUserStore } from "../../../store/user-store";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useLogOut } from "../../../services/logout/api";
import { Routes } from "../../../lib/utils/routes-constants";
import { Dropdown, Menu, Button as AntButton } from "antd";

export const Header = () => {
  const { user } = useUserStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const { removeCredentials } = useUserStore();
  const logoutMutation = useLogOut();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutMutation.mutate();
    removeCredentials();
    navigate(Routes.SIGNIN);
  };

  const handleDashboardRedirect = () => {
    if (user?.loginInfo?.userRoleId?.role === "Freelancer") {
      navigate("/freelancer");
    } else if (user?.loginInfo?.userRoleId?.role === "Buyer") {
      navigate("/buyer");
    } else if (user?.loginInfo?.userRoleId?.role === "Admin") {
      navigate("/admin");
    }
  };

  // Change header background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const bookingsMenu = (
    <Menu>
      <Menu.Item key="completed" onClick={() => navigate("/bookings/completed")}>
        Completed
      </Menu.Item>
      <Menu.Item key="upcoming" onClick={() => navigate("/bookings/upcoming")}>
        Upcoming
      </Menu.Item>
    </Menu>
  );

  const userMenu = (
    <Menu>
      <Menu.Item key="dashboard" onClick={handleDashboardRedirect}>
        Dashboard
      </Menu.Item>
      <Menu.Item key="settings" onClick={() => navigate(`/settings/${user?.user?._id}`)}>
        Settings
      </Menu.Item>
      {user?.loginInfo?.userRoleId?.role === "Buyer" && (
        <Menu.Item key="task" onClick={() => navigate(`/task`)}>
          Task Management
        </Menu.Item>
      )}
      {user?.loginInfo?.userRoleId?.role === "Freelancer" && (
        <>
          <Menu.Item key="profiles" onClick={() => navigate("/freelancer/profiles")}>
            Profiles
          </Menu.Item>
          <Menu.Item key="calendar" onClick={() => navigate("/calendar")}>
            Calendar
          </Menu.Item>
        </>
      )}
          <Menu.SubMenu key="bookings" title="All Bookings" popupOffset={[0, 0]} popupClassName="ant-dropdown-menu-submenu-popup">
            {bookingsMenu}
          </Menu.SubMenu>
      <Menu.Item key="logout" onClick={handleLogout} className="logout-menu-item">
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      id="navbar"
      className={`fixed top-0 w-full z-50 px-3 py-2 flex items-center justify-between md:justify-around transition-colors duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <Link to="/">
        <div>
          <span className="font-bold text-2xl">LOGO</span>
        </div>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-7">
        <div className="*:text-sm flex items-center gap-5 *:duration-100">
          <Link to="/">
            <button className="text-shadow-black">Home</button>
          </Link>
          <Link to="/about-us">
            <button className="text-shadow-black">About</button>
          </Link>
          <Link to="/#services">
            <button className="text-shadow-black">Services</button>
          </Link>
        </div>

        {/* User Dropdown */}
        <div>
          {user?.accessToken ? (
            <Dropdown overlay={userMenu} trigger={['click']}>
              <AntButton className="text-black text-base font-bold rounded-3xl">
                <div className="flex items-center gap-2">
                  {user?.user?.firstName || "User"}
                  <IoIosArrowDown />
                </div>
              </AntButton>
            </Dropdown>
          ) : (
            <Link to="/sign-in">
              <button className="bg-blue-700 text-white px-4 py-2 text-sm font-semibold rounded-3xl">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button className="mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};