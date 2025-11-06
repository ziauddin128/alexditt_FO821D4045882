"use client";

import DashboardContent from "@/components/pages/dashboard/DashboardContent";
import StatsCard from "@/components/pages/dashboard/StatsCard";
import { DataTable } from "@/components/reusable/data-table";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <DashboardContent />
      </div>
    </div>
  );
}
