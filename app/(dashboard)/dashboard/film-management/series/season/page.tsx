import React from "react";
import { redirect } from "next/navigation";

export default function ManageSeasonRootPage() {
  return redirect("/dashboard/film-management/");
}
