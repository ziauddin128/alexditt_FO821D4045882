"use client";
import React, { useState } from "react";
import LivePage from "./livePage";
import { Pagination } from "@/components/ui/pagination";
import UpcomingTable from "./upcomingTable";

export default function Tabcreate() {
  const [activeTab, setActiveTab] = useState<"live" | "upcoming">("live");

<<<<<<< HEAD
    return (
        <div className="py-4 ">
            {/* ---------- Buttons ---------- */}
            <div className="flex gap-2 mb-5">
                <button
                    onClick={() => setActiveTab("live")}
                    className={`py-[10px] px-4 text-xs sm:text-sm font-medium pb-1 whitespace-nowrap border-b-2 transition-all duration-200 ${activeTab === "live"
                        ? "border-primary-color text-white"
                        : "border-transparent text-gray-400 hover:text-white"
                        }`}

                >
                    Live
                </button>

                <button
                    onClick={() => setActiveTab("upcoming")}
                    className={`py-[10px] px-4 text-xs sm:text-sm font-medium pb-1 whitespace-nowrap border-b-2 transition-all duration-300 ${activeTab === "upcoming"
                        ? "border-primary-color text-white"
                        : "border-transparent text-gray-400 hover:text-white"
                        }`}

                >
                    Upcoming
                </button>
            </div>

            {/* ---------- Conditional Render ---------- */}
            <div className="px-5">
                {activeTab === "live" && <LivePage />}
            </div>
            <div className="">
                {activeTab === "upcoming" && <UpcomingTable />}
            </div>


        </div >
    );
=======
  return (
    <div className="py-4 px-5">
      {/* ---------- Buttons ---------- */}
      <div className="flex gap-2 mb-5">
        <button
          onClick={() => setActiveTab("live")}
          className={`py-[10px] px-5 rounded ${activeTab === "live" ? "" : ""}`}
        >
          Live
        </button>

        <button
          onClick={() => setActiveTab("upcoming")}
          className={`py-[10px] px-5 rounded ${
            activeTab === "upcoming" ? "" : ""
          }`}
        >
          Upcoming
        </button>
      </div>

      {/* ---------- Conditional Render ---------- */}
      {activeTab === "live" && <LivePage />}
      {activeTab === "upcoming" && <UpcomingPage />}
    </div>
  );
>>>>>>> ca2152f14d6c120a2487b25fb37e633045ac2d6a
}
