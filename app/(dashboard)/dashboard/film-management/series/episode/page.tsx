import React from "react";
import { redirect } from "next/navigation";

export default function ManageEpisodeRootPage() {
  return redirect("/dashboard/film-management/");
}
