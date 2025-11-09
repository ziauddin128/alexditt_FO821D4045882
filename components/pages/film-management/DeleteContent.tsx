import { privateAxios } from "@/components/axiosInstance/axios";
import DeleteIcon from "@/components/icons/DeleteIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DiamondMinus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function DeleteContent({
  categoryId,
}: {
  categoryId: string | number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const dialogRef = useRef<HTMLDivElement>(null);

  const deleteMutation = useMutation({
    mutationFn: async (id: string | number) => {
      try {
        await privateAxios.delete(`/contents/${id}`);
      } catch (error: any) {
        const message =
          error?.response?.data?.message || "Something went wrong!";
        throw new Error(message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contents"] });
      toast.success("Item deleted successfully");
      setIsOpen(false);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleDelete = () => {
    console.log("Delete this", categoryId);
    deleteMutation.mutate(categoryId);
  };

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;
    const onClick = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [isOpen]);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer h-6 w-6 bg-[#111] hover:bg-secondary-color flex items-center justify-center rounded-[2px]"
      >
        <DeleteIcon className="text-white h-4 w-4 " />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-[1px] flex justify-center items-center z-50">
            <div ref={dialogRef} className="bg-white p-6 rounded-lg max-w-sm">
              <div className="flex items-center justify-center mb-4">
                <DiamondMinus className="w-30 h-14 text-red-500" />
              </div>
              <h3 className="text-xl mb-4 text-wrap text-center text-gray-900">
                Are you sure you want to delete this item?
              </h3>
              <div>
                {/* <p>{item.title}</p> */}
                {/* Add any additional item details if necessary */}
              </div>
              <div className="mt-4 flex gap-4 justify-evenly">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded text-black cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer disabled:bg-red-400"
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
