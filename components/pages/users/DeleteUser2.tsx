import { privateAxios } from "@/components/axiosInstance/axios";
import TrashBin from "@/components/icons/TrashBin";
import { DiamondMinus } from "lucide-react";
import { useState } from "react";

import { toast } from "sonner";

export default function DeleteUser2({ id }: { id: string | number }) {
  const [isOpen, setIsOpen] = useState(false);

  // Delete User
  const handleDelete = async () => {
    try {
      const response = await privateAxios.delete(`/admin/user/user/${id}`);
      if (response.data) {
        toast.success("User deleted successfully", {
          position: "top-right",
          style: {
            backgroundColor: "#4CAF50",
            color: "#fff",
          },
        });
      }
    } catch (error: any) {
      toast.error(error.response.data, {
        position: "top-right",
        style: {
          backgroundColor: "#f44336",
          color: "#fff",
        },
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex items-center gap-2 px-[14px] py-[7px] bg-[#E63946] text-white rounded"
      >
        <TrashBin />
        <span className="text-sm font-normal">Delete</span>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-[1px] flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-sm">
              <div className="flex items-center justify-center mb-4">
                <DiamondMinus className="w-30 h-14 text-red-500" />
              </div>
              <h3 className="text-xl mb-4 text-wrap text-center text-gray-900">
                Are you sure you want to delete this user?
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
                  //   onClick={() => {
                  //     // onDelete(item.id); // Call delete function
                  //     // onClose(); // Close the modal
                  //     handleDelete;
                  //   }}
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
