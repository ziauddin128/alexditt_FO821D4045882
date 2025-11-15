import React from "react";
import Image from "next/image";
import Link from "next/link";
import BlueShield from "@/components/icons/BlueShield";

export default function ResetSuccessfull() {
  return (
    <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen">
      <div className="text-white py-10 max-w-[500px] w-full lg:max-w-full mx-auto lg:mx-0">
        <Link href="/auth">
          <Image
            src="/dashboard/logo.png"
            height={120}
            width={145}
            alt="Logo"
            className="w-[145] h-[119px] object-cover block mx-auto"
          />
        </Link>

        <div className="h-10"></div>

        <div className="mt-4 mb-12 space-y-4">
          <BlueShield />
          <h1 className="text-[28px] font-medium">Password Reset Done!</h1>
          <p className="text-base font-normal">
            Your password has been successfully reset. Click below to log in.
          </p>
        </div>

        <Link href="/auth">
          <button
            type="submit"
            className="h-11 w-full rounded bg-primary-color font-base font-medium cursor-pointer"
          >
            Continue
          </button>
        </Link>
      </div>
      <div className="hidden lg:block">
        <Image
          src="/images/sign-in-img.png"
          height={1000}
          width={1000}
          alt="Sign In Image"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
