import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import { privateAxios } from "@/components/axiosInstance/axios";

import DeleteIcon from "@/components/icons/DeleteIcon";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function DeleteCast({
  movieId,
  id: castId,
}: {
  movieId: string;
  id: string;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRemoveCast = async () => {
    setLoading(true);

    console.log("Cast ID to remove: ", castId);

    try {
      const response = await privateAxios.patch(`/admin/movie/${movieId}`, {
        cast_delete_ids: castId,
      });

      if (response.data) {
        toast.success(response?.data?.message);
        // refetch();
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message?.message;
      toast.error(errorMessage);
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="absolute top-2 right-2 cursor-pointer bg-secondary-color text-white p-1 rounded-sm">
          <Trash2 className="w-4 h-4" />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[530px] bg-gray3-bg border-gray3-border settingDialog  mx-auto">
        <DialogHeader className="pb-4"></DialogHeader>
        <DialogDescription className="">
          <div className="flex flex-col items-center justify-center space-y-3 text-center">
            <div className="flex justify-center items-center w-12 h-12 bg-white rounded-lg">
              <DeleteIcon className="text-[#E70D0D] w-6 h-6 " />
            </div>

            <p className="text-white text-lg font-semibold mt-3">
              Confirm Delete
            </p>

            <p className="text-gray-300 text-sm max-w-sm">
              You want to delete the marked items. This can't be undone once you
              delete.
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
              type="button"
              className="py-3 px-4 bg-secondary-color text-white font-sm font-medium cursor-pointer hover:bg-[#E70D0D] rounded-md"
              onClick={handleRemoveCast}
            >
              {loading ? "Deleing..." : "Delete"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
