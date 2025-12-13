"use client";
import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Importing Lucide Icons
import { Menu } from "lucide-react";

import Dashboard from "@/components/icons/Dashboard";
import Categories from "@/components/icons/Categories";
import Users from "@/components/icons/Users";
import Logout from "@/components/icons/Logout";
import { useAuth } from "@/provider/AuthProvider";
import FilmManagement from "@/components/icons/FilmManagement";

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

  const { logout, user } = useAuth();
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isLoading = false;
  const error = false;

  if (isLoading) return null;
  if (error) return null;

  // Handle Logout
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  const TopBar = () => {
    return (
      <div className="lg:p-4 flex items-center justify-between bg-[#0D121E]">
        <div className="hidden lg:block">
          <h4 className="font-semibold text-2xl">
            Welcome {user?.name ? `,${user?.name}` : ""}
          </h4>
          <p className="text-base">Have a nice day</p>
        </div>

        <div className="flex items-center ">
          {/* User Profile */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="shadow-none outline-0 cursor-pointer">
              <div>
                <div className="flex-shrink-0 rounded-full">
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={user?.avatar_url}
                    alt="Admin"
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
