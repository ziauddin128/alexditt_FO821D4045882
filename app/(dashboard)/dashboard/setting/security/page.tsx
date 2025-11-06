
"use client";
import React from 'react'
import { Switch } from "@/components/ui/switch"

import Tabs from "@/components/pages/setting/Tabs";
import DeactiveAccount from '@/components/pages/setting/DeactiveAccount';
import ChangePassword from '@/components/pages/setting/ChangePassword';
import DeleteAccount from '@/components/pages/setting/DeleteAccount';

export default function Setting() {

  return (
    <>
      {/* Tabs */}
      <Tabs />

      {/* Security Details */}
      <div className='bg-secondary-bg p-4 rounded-[8px] mt-4'>
        {/* Password */}
        <ChangePassword />

        {/* Google Authentication */}

        {/* Deactivate Account */}

        <DeactiveAccount />

        {/* <Switch checked className="cursor-pointer custom-switch" /> */}

        {/* DeletAcount */}
        <DeleteAccount />


      </div>

    </>
  )
}


