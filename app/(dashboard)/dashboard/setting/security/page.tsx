"use client";
import React from "react";
import Tabs from "@/components/pages/setting/Tabs";
import DeactiveAccount from "@/components/pages/setting/DeactiveAccount";
import ChangePassword from "@/components/pages/setting/ChangePassword";
import DeleteAccount from "@/components/pages/setting/DeleteAccount";

export default function Setting() {
  return (
    <>
      {/* Tabs */}
      <Tabs />

      {/* Security Details */}
      <div className="bg-secondary-bg p-4 rounded-[8px] mt-4">
        <ChangePassword />
        <DeactiveAccount />
        <DeleteAccount />
      </div>
    </>
  );
}
