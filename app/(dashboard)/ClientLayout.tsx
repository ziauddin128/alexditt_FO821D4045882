"use client";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import logo from "@/public/logo.svg";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Importing Lucide Icons
import { Menu, MessageCircleQuestionMark } from "lucide-react";

import { Input } from "@/components/ui/input";
import SearchIcon from "@/components/icons/SearchIcon";
import BellIcon from "@/components/icons/BellIcon";
import Dashboard from "@/components/icons/Dashboard";
import Content from "@/components/icons/Content";
import Categories from "@/components/icons/Categories";
import Users from "@/components/icons/Users";
import Subscription from "@/components/icons/Subscription";
import Setting from "@/components/icons/Setting";
import Logout from "@/components/icons/Logout";
import { useAuth } from "@/provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { privateAxios } from "@/components/axiosInstance/axios";
import useGetDifference from "@/hooks/useGetDifference";
import NotificationIcon from "@/components/icons/NotificationIcon";
import FilmManagement from "@/components/icons/FilmManagement";
import LiveTbIcon from "@/components/icons/LiveTvIcon";

// Menu and Bottom items
const menuItems = [
  {
    href: "/dashboard",
    icon: <Dashboard className="w-5 h-5 text-white" />,
    label: "Dashboard",
  },
  {
    href: "/dashboard/film-management",
    icon: <FilmManagement className="w-5 h-5 text-white" />,
    label: "Film Management",
  },
  {
    href: "/dashboard/categories",
    icon: <Categories className="w-5 h-5 text-white" />,
    label: "Categories",
  },
  {
    href: "/dashboard/users",
    icon: <Users className="w-5 h-5 text-white" />,
    label: "User Management",
  },
  {
    href: "/dashboard/liveTv",
    icon: <LiveTbIcon className="w-5 h-5 text-white" />,
    label: "Live TV",
  },
  {
    href: "/dashboard/setting",
    icon: <Setting className="w-5 h-5 text-white" />,
    label: "Setting",
  },
];

const bottomMenu = [
  {
    href: "/logout",
    icon: <Logout className="w-6 h-6 text-white" />,
    label: "Log out",
  },
];

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const { logout, isNotification } = useAuth();
  const pathname = usePathname();

  // Fake user data (since we're not fetching real data)
  const user = {
    data: {
      avatar_url: "/dashboard/profile.png",
      name: "John Doe",
      email: "john.doe@example.com",
    },
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Last 4 Notification
  /* const {
    isLoading,
    error,
    data: notificationData = [],
  } = useQuery({
    queryKey: ["notificationData"],
    queryFn: async () => {
      const res = await privateAxios.get("/users/getAllNotifications");
      return res.data.data;
    },
  }); */

  const isLoading = false;
  const error = false;

  const notificationData = [
    {
      id: 1,
      text: "Hello",
    },
  ];

  const [page, setPage] = useState(1);
  const pageSize = 4; // Number of items per page
  const lastFourNotifications = notificationData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  if (isLoading) return null;
  if (error) return null;

  // Toggle the notification modal
  const toggleNotification = () => {
    setNotificationOpen((prev) => !prev);
  };

  // Handle Logout
  const handleLogout = () => {
    logout();
  };

  const TopBar = () => {
    return (
      <div className="lg:p-4 flex items-center justify-between bg-[#0D121E]">
        <div className="hidden lg:block">
          <h4 className="font-semibold text-2xl">Welcome, Jane Cooper</h4>
          <p className="text-base">Have a nice day</p>
        </div>

        <div className="flex items-center ">
          {/* <div className="relative mr-8 hidden sm:block">
            <Input
              className="flex w-auto lg:w-[330px] justify-between items-center border border-[color:var(--Line-Color,#1B202C)] px-4 py-[9px] rounded-lg border-solid h-[44px] shadow-none outline-none focus-visible:ring-0 focus-visible:border-primary-color"
              placeholder="Search"
            />
            <SearchIcon className="absolute bottom-[12.5px] right-4" />
          </div> */}
          <div className="mr-4 relative">
            {/* Notification */}
            <DropdownMenu>
              <DropdownMenuTrigger className="shadow-none outline-0 cursor-pointer">
                <div className="relative flex w-12 h-12 items-center gap-2.5  justify-center rounded-3xl cursor-pointer">
                  <NotificationIcon />
                  {isNotification && (
                    <div className="absolute top-3 right-3 h-[8px] w-[8px] rounded-full "></div>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="bg-gray3-bg border-gray3-border text-white mr-2 sm:mr-14"
                style={{ width: "300px" }}
              >
                {/* Top */}
                <div className="flex justify-between gap-2 p-4 border-b border-[#1F2430]">
                  <h1 className="text-base font-semibold">Notification</h1>
                </div>
                {/* Middle */}
                <div>
                  {lastFourNotifications.map((notification: any) => {
                    return (
                      <div
                        key={notification.id}
                        className="p-4 flex items-center justify-between border-b border-[#1F2430]"
                      >
                        <div className="flex flex-col gap-1">
                          <h1 className="text-sm font-medium">
                            {notification.text}
                          </h1>
                          <p className="text-xs mt-1">
                            {useGetDifference(notification.created_at)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Bottom */}
                <div className="p-4">
                  <Link
                    href="/dashboard/setting/notification"
                    className="bg-[#2D9DFF] text-sm font-medium py-3 px-3 rounded w-full block text-center"
                  >
                    View All Notifications
                  </Link>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger className="shadow-none outline-0 cursor-pointer">
              <div>
                <div className="flex-shrink-0 rounded-full">
                  <Image
                    className="w-12 h-12 rounded-full object-cover"
                    src={user?.data?.avatar_url || "/dashboard/profile.png"}
                    width={48}
                    height={48}
                    alt="User"
                  />
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-fit bg-gray3-bg border-gray3-border text-white mr-4">
              <DropdownMenuLabel
                className="flex items-center justify-center gap-1 cursor-pointer"
                onClick={handleLogout}
              >
                <Logout className="w-[18px] h-[18px]" />
                <span>Log Out</span>
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  };

  return (
    <div className="flex  min-h-screen bg-[#0D121E] text-white">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed z-30 h-screen w-64 flex flex-col transform bg-[#131824]  transition-transform duration-300 ease-in-out text-[#FFF] ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center pt-[25px]">
          <Link href="/dashboard">
            <img
              src="/dashboard/logo.png"
              className="w-[182px] h-[155px] object-cover"
              alt="Logo"
            />
          </Link>
        </div>

        {/* Menu Items */}
        <nav className="pt-[30px] pb-10 px-4 flex-1 max-h-[700px] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {menuItems.map((item, index) => {
            const isActive = (() => {
              if (item.href === "/dashboard") {
                return pathname === "/dashboard";
              }
              return pathname.startsWith(item.href);
            })();
            return (
              <div className="mb-6" key={index}>
                <Link
                  href={item.href}
                  className={`flex items-center text-lg px-4 py-2.5 rounded-[30px] gap-2 border border-transparent ${
                    isActive
                      ? "bg-primary-color primary-text border-white"
                      : "text-[#FFF] hover:bg-primary-color/20"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Bottom menu */}
        <div className="absolute bottom-0 w-full">
          {bottomMenu.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <div className="px-4 py-1" key={index}>
                <button
                  onClick={handleLogout}
                  className={`cursor-pointer  w-full flex items-center justify-center text-base font-medium px-4 py-3 rounded-full gap-1  ${
                    isActive
                      ? " primary-text font-medium "
                      : "text-[#FFFFFF] font-sans font-normal text-[20px] leading-[120%] align-middle bg-red-600"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              </div>
            );
          })}

          {/* <div className="flex items-center p-4">
            <div className="flex-shrink-0">
              <Image
                className="w-10 h-10 rounded-full"
                src={user?.data?.avatar_url || "/images/profile.png"}
                width={40}
                height={40}
                alt="User"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{user?.data?.name}</p>
              <p className="text-xs text-gray-500">{user?.data?.email}</p>
            </div>
          </div> */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto lg:ml-64 ">
        <div className="p-4 lg:hidden flex justify-between">
          <button
            onClick={toggleSidebar}
            className="text-main focus:outline-none cursor-pointer"
          >
            <Menu />
          </button>

          <div className="lg:hidden">
            <TopBar />
          </div>
        </div>
        <div className="hidden lg:block mx-4 px-0 border-b border-[#1B202C]">
          <TopBar />
        </div>
        <div className="p-4 ">{children}</div>
      </div>
    </div>
  );
}
