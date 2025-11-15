"use client";
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
import DeleteIcon from "@/components/icons/DeleteIcon";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";

export default function DeleteContent({
  categoryId,
}: {
  categoryId: string | number;
}) {
  const [open, setOpen] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log(data);

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="cursor-pointer h-6 w-6 bg-[#111] hover:bg-secondary-color flex items-center justify-center rounded-[2px]">
          <DeleteIcon className="text-white h-4 w-4 " />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[530px] bg-gray3-bg border-gray3-border settingDialog flex justify-center items-center mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader className="pb-4 border-b border-[#222733]"></DialogHeader>
          <DialogDescription className="">
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
              {/* Delete Icon */}
              <div className="flex justify-center items-center w-12 h-12 bg-white rounded-lg">
                <DeleteIcon className="text-[#E70D0D] w-6 h-6 " />
              </div>

              {/* Title */}
              <p className="text-white text-lg font-semibold mt-3">
                Confirm Delete
              </p>

              {/* Description */}
              <p className="text-gray-300 text-sm max-w-sm">
                You want to delete the marked items. This can't be undone once
                you delete.
              </p>
            </div>
          </DialogDescription>
          <DialogFooter className="">
            <div className="flex justify-center items-center mx-auto gap-4 mt-6">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="py-3 px-4 bg-[#202632] text-white font-sm font-medium cursor-pointer hover:bg-[#11151c]  border border-white hover:text-white rounded-md"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="py-3 px-4 bg-secondary-color text-white font-sm font-medium cursor-pointer hover:bg-[#E70D0D] rounded-md"
              >
                Delete
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
