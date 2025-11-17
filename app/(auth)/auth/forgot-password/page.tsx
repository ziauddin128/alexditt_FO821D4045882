"use client";

import { publicAxios } from "@/components/axiosInstance/axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { storage } from "@/lib/storage";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface formData {
  email: string;
}

export default function ForgotPassword() {
  const [formError, setFormError] = useState("");
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<formData>();

  useEffect(() => {
    if (errors.email?.message) {
      setFormError("");
    }
  }, [errors.email?.message]);

  const onSubmit = async (data: formData) => {
    storage.setItem("otp-email", data.email);

    try {
      const response = await publicAxios.post("/users/forget_pass", data);
      if (response.data) {
        // Only set storage after successful API call
        if (typeof window !== "undefined") {
          storage.setItem("otp-email", data.email);
        }
        router.push("/auth/verify-code");
      }
    } catch (error: any) {
      if (error.response) {
        const errResponse = error.response.data;
        setFormError(errResponse.message);
      } else {
        setFormError("Network error: Failed to reach server");
      }
    }
  };

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

        <div className="mt-4 mb-12">
          <h1 className="text-[28px] font-medium">Forgot Password?</h1>
          <p className="text-base font-normal mt-4">
            No worries, we’ll send you reset instructions.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-12">
            {/* <Label className="font-base font-medium mb-3">Email</Label> */}
            <Input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              className="h-[44px] w-full px-4 py-3 text-sm font-normal border border-[#4A4C56] rounded-[8px] outline-none focus-visible:ring-0 focus-visible:border-primary-color"
              placeholder="Enter Email Address"
            />

            {errors.email?.message ? (
              <p className="error-msg">{String(errors.email.message)}</p>
            ) : (
              formError && <p className="error-msg">{formError}</p>
            )}
          </div>

          <Link href="/auth/verify-code">
            <button
              type="submit"
              className="h-11 w-full rounded bg-primary-color font-base font-medium cursor-pointer"
            >
              Send Email
            </button>
          </Link>
        </form>
      </div>
      <div className="hidden lg:block">
        <Image
          src="/images/forgot-password-img.png"
          height={1000}
          width={1000}
          alt="Sign In Image"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
