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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import EditIcon from "@/components/icons/EditIcon";
import { privateAxios } from "@/components/axiosInstance/axios";
import { Category } from "./CategoriesTable";
import { Plus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";

import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface CategoryModalProps {
  category: Category | null;
  refetch: () => void;
}

interface FormData {
  category_name: string;
  category_description: string;
  status: string;
}

export default function AddCategories({
  category,
  refetch,
}: CategoryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(category);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    if (isEdit) {
      try {
        const response = await privateAxios.patch(
          `/category/${category?.id}`,
          data
        );
        if (response.data) {
          toast.success(response?.data?.message);
          setIsOpen(false);
          refetch();
        }
      } catch (error: any) {
        const errorMessage = error?.response?.data?.message?.message;
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const response = await privateAxios.post("/category", data);
        if (response.data) {
          toast.success(response?.data?.message);
          reset();
          setIsOpen(false);
          refetch();
        }
      } catch (error: any) {
        const errorMessage = error?.response?.data?.message?.message;
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} modal={false}>
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
            <div className="mb-6">
              <Label className="custom-label mb-3">Category Name</Label>
              <Input
                placeholder="e.g., Horror, Sci-Fi"
                className="custom-input"
                {...register("category_name", {
                  required: "Category name is required",
                })}
                defaultValue={category?.category_name || ""}
              />
              {errors.category_name && (
                <p className="error-msg">{errors.category_name.message}</p>
              )}
            </div>

            <div className="mb-6">
              <Label className="custom-label mb-3">Description</Label>
              <Textarea
                placeholder="Brief description (optional)"
                className="!h-[100px] custom-input"
                {...register("category_description")}
              >
                {category?.category_description || ""}
              </Textarea>
            </div>

            {category && (
              <div className="mb-6">
                <Label className="custom-label mb-3">Status</Label>

                <Controller
                  name="status"
                  control={control}
                  defaultValue={category?.category_status}
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
                            value="ACTIVE"
                            className="selectOption !justify-start"
                          >
                            ACTIVE
                          </SelectItem>
                          <SelectItem
                            value="INACTIVE"
                            className="selectOption !justify-start"
                          >
                            INACTIVE
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className={`h-[45px] w-full py-3 px-4 bg-primary-color text-white font-base font-medium cursor-pointer hover:bg-primary-color rounded ${
                loading ? "cursor-not-allowed pointer-events-none" : ""
              }`}
              disabled={loading}
            >
              {loading
                ? category
                  ? "Updating..."
                  : "Adding..."
                : category
                ? "Update"
                : "Add New Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
