import { Link, useNavigate } from "react-router";
import { useUserStore } from "../../../store/user-store";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useLogOut } from "../../../services/logout/api";

export const Header = () => {
  const { user } = useUserStore();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const logoutMutation = useLogOut();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutMutation.mutate();
    setDropdownOpen(false);
  };

  const handleDashboardRedirect = () => {
    if (user?.loginInfo?.userRoleId?.role === "Freelancer") {
      navigate("/freelancer"); // Redirect to Freelancer dashboard
    } else if (user?.loginInfo?.userRoleId?.role === "Buyer") {
      navigate("/buyer"); // Redirect to Buyer dashboard
    }
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      id="navbar"
      className="border-bf px-3 py-2 flex items-center justify-between md:justify-around fixed top-0 w-full z-50 duration-500 text-black border-transparent max-w-screen"
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

        {/* Conditional Rendering for User */}
        <div>
          {user?.accessToken ? (
            <div className="relative" ref={dropdownRef}>
              <button
                className="text-black text-base font-bold rounded-3xl"
                onClick={() => setDropdownOpen(!isDropdownOpen)}
              >
                <div className="flex items-center gap-2">
                  {user?.user?.firstName || "User"}

                  {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-40">
                  <button
                    onClick={handleDashboardRedirect}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Dashboard
                  </button>
                 {user?.loginInfo?.userRoleId?.role === "Freelancer" && <button
                    onClick={() => navigate("/freelancer/profiles")}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Profiles
                  </button>}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
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
