import React from "react";
import { redirect } from "next/navigation";

export default function ManageSeasonEpisodeRootPage() {
  return redirect("/dashboard/film-management/");
}
