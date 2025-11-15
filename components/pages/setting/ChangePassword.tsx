"use client";
import React from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { privateAxios } from "@/components/axiosInstance/axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import EyeIcon from "@/components/icons/EyeIcon";
import EyeSlash from "@/components/icons/EyeSlash";
import { Button } from "@/components/ui/button";

interface FormData {
  currentPassword: string;
  newPassword: string;
  confirm_password: string;
}

export default function ChangePassword() {
  const [type, setType] = React.useState<"password" | "text">("password");
  const [type2, setType2] = React.useState<"password" | "text">("password");
  const [type3, setType3] = React.useState<"password" | "text">("password");

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<FormData>();

  // Change password submit
  const onSubmit = async (data: FormData) => {
    try {
      const updateData = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      };

      const response = await privateAxios.put("/users/updatePass", updateData);
      if (response.data) {
        toast.success("Password changed successfully", {
          position: "top-right",
          style: {
            backgroundColor: "#4CAF50",
            color: "#fff",
          },
        });
        reset();
      }
    } catch (error: any) {
      toast.error(error.response.data.message, {
        position: "top-right",
        style: {
          backgroundColor: "#f44336",
          color: "#fff",
        },
      });
    }
  };

  // Change Password Dialog
  const handleChangePassword = () => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <button className="bg-primary-color text-white px-5 py-[10px] rounded text-sm font-normal cursor-pointer">
            Change Password
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[530px] bg-gray3-bg border-gray3-border settingDialog">
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader className="pb-4 border-b border-[#222733]">
              <DialogTitle className="text-base font-semibold  text-white">
                Change Password
              </DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <div className="mt-4">
                {/* Current Password */}
                <div className="mb-3">
                  <Label className="custom-label mb-3 text-white">
                    Old Password<span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={type}
                      {...register("currentPassword", {
                        required: "Current password is required",
                      })}
                      className="custom-input text-white"
                      placeholder="Current Password"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setType(type === "password" ? "text" : "password")
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white"
                    >
                      {type === "password" ? (
                        <EyeIcon className="h-5 w-5" />
                      ) : (
                        <EyeSlash className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {errors.currentPassword && (
                    <p className="error-msg">
                      {errors.currentPassword.message}
                    </p>
                  )}
                </div>

                {/* New Password */}
                <div className="mb-3">
                  <Label className="custom-label mb-3 text-white">
                    New Password<span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={type2}
                      {...register("newPassword", {
                        required: "New password is required",
                        minLength: {
                          value: 8,
                          message: "Password should be at least 8 characters",
                        },
                      })}
                      className="custom-input text-white"
                      placeholder="New Password"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setType2(type2 === "password" ? "text" : "password")
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-white"
                    >
                      {type2 === "password" ? (
                        <EyeIcon className="h-5 w-5" />
                      ) : (
                        <EyeSlash className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {errors.newPassword && (
                    <p className="error-msg">{errors.newPassword.message}</p>
                  )}
                </div>
              </div>
            </DialogDescription>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="py-3 px-4 bg-transparent border border-primary-color text-white font-sm font-medium cursor-pointer hover:bg-primary-color hover:text-white rounded"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="py-3 px-4 bg-primary-color text-white font-sm font-medium cursor-pointer hover:bg-primary-color rounded"
              >
                Change
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#1B202C]">
      <div className="w-full sm:w-[60%]">
        <h6 className="text-base font-medium text-white mb-4">Password</h6>
        <p className="text-sm font-normal text-[#A5A5AB]">
          Set a unique password to protect the account Last Changed 03 Jan 2024,
          09:00 AM
        </p>
      </div>
      {handleChangePassword()}
    </div>
  );
}
