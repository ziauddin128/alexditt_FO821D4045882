"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import EditIcon from "@/components/icons/EditIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { privateAxios } from "@/components/axiosInstance/axios";
import { toast } from "sonner";
import { Category } from "./CategoriesTable";
import { Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface CategoryModalProps {
  category: Category | null;
}

interface FormData {
  category_name: string;
  description: string;
  status: string;
  category_tags: string;
}

export default function AddCategories({ category }: CategoryModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
    control,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log(data);
    /* try {
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
    } */
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        {category ? (
          <button className="h-6 w-6 bg-[#111] hover:bg-primary-color flex items-center justify-center rounded-[2px]">
            <EditIcon className="text-white h-4 w-4" />
          </button>
        ) : (
          <button className="text-base font-medium text-white flex justify-center items-center gap-1 bg-primary-color px-5 py-2.5 rounded-lg cursor-pointer">
            <Plus className="h-5 w-5" />
            <span>Add Category</span>
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[566px] xl:max-w-[866px] bg-gray3-bg border-gray3-border rounded-lg text-white settingDialog ">
        <DialogHeader className="pb-4 border-b border-[#222733]">
          <DialogTitle className="text-base font-semibold  text-white">
            {category ? "Edit Category" : "Add New Category"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="mb-3">
              <Label className="custom-label mb-3">Category Name</Label>
              <Input
                placeholder="e.g., Horror, Sci-Fi"
                className="custom-input"
                {...register("category_name", {
                  required: "Category name is required",
                })}
              />
              {errors.category_name && (
                <p className="error-msg">{errors.category_name.message}</p>
              )}
            </div>

            <div className="mb-3">
              <Label className="custom-label mb-3">Description</Label>
              <Textarea
                placeholder="Brief description (optional)"
                className="!h-[100px] custom-input"
                {...register("description")}
              />
            </div>

            <div className="mb-3">
              <Label className="custom-label mb-3">Status</Label>

              <Controller
                name="status"
                control={control}
                defaultValue=""
                rules={{
                  validate: (value) => value !== "" || "Select status",
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <SelectTrigger className="custom-input cursor-pointer">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="border border-gray3-bg bg-dark-bg rounded text-white">
                      <SelectGroup className="space-y-2">
                        <SelectItem
                          value="1"
                          className="selectOption !justify-start"
                        >
                          Active
                        </SelectItem>
                        <SelectItem
                          value="0"
                          className="selectOption !justify-start"
                        >
                          Deactive
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.status && (
                <p className="error-msg">{errors.status.message}</p>
              )}
            </div>

            <div className="mb-6">
              <Label className="custom-label mb-3">
                Assign Tags (optional)
              </Label>
              <Textarea
                placeholder="#Superhero #Crime #RomCom"
                className="!h-[100px] custom-input"
                {...register("category_tags")}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="h-[45px] w-full py-3 px-4 bg-primary-color text-white font-base font-medium cursor-pointer hover:bg-primary-color rounded"
            >
              {category ? "Update" : "Add New Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
