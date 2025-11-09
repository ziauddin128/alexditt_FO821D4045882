"use client";
import React, { useState } from "react";
import LivePage from "./livePage";
import UpcomingPage from "./upcomingPage";
import { Pagination } from "@/components/ui/pagination";

export default function Tabcreate() {
  const [activeTab, setActiveTab] = useState<"live" | "upcoming">("live");

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
}
