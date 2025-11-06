import { privateAxios } from "@/components/axiosInstance/axios";
import DeleteIcon from "@/components/icons/DeleteIcon";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/provider/AuthProvider";

import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface FormData {
    deactivationPeriod: string
}

export default function DeactiveAccount() {

    const { logout } = useAuth();


    const {
        formState: { errors },
        handleSubmit,
        control
    } = useForm<FormData>();


    // Deactive account submit
    const onSubmit = async (data: FormData) => {
        const deactivationPeriod = Number(data.deactivationPeriod);

        const updateData = {
            deactivationPeriod
        }

        try {
            const response = await privateAxios.post("/admin/settings/deactivate", updateData);
            if (response.data) {
                toast.success("Account deactivated successfully", {
                    position: "top-right",
                    className: "red",
                    style: {
                        backgroundColor: "white",
                        color: "#141825",
                    },
                });

                logout();
            }
        } catch (error: any) {
            toast.error(error.response.data.message, {
                position: "top-right",
                className: "red",
                style: {
                    backgroundColor: "white",
                    color: "#141825",
                },
            });
        }
    }

    // Deactive Admin dialog
    const handleDeactiveAdmin = () => {
        return (
            <Dialog>

                <DialogTrigger asChild>
                    <button className="bg-primary-color text-white px-5 py-[10px] rounded text-sm font-normal cursor-pointer">Deactive</button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[530px] bg-gray3-bg border-gray3-border settingDialog flex justify-center items-center mx-auto" >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader className="pb-4 border-b border-[#222733]">
                        </DialogHeader>
                        <DialogDescription className="">
                            <div className="flex flex-col items-center justify-center space-y-3 text-center">
                                {/* Delete Icon */}
                                <div className="flex justify-center items-center w-12 h-12 bg-white rounded-lg">
                                    <DeleteIcon className="text-[#E70D0D] w-6 h-6 " />
                                </div>

                                {/* Title */}
                                <p className="text-white text-lg font-semibold mt-3">Deactivate Account</p>

                                {/* Description */}
                                <p className="text-gray-300 text-sm max-w-sm">
                                    Are you sure you want to deactivate your account?
                                </p>
                            </div>

                        </DialogDescription>
                        <DialogFooter className="">
                            <div className="flex justify-center items-center mx-auto gap-4 mt-6">
                                <DialogClose asChild>
                                    <Button type='button' variant="outline" className="py-3 px-4 bg-[#202632] w-full  text-white font-sm font-medium cursor-pointer hover:bg-[#E70D0D] hover:text-white rounded-md ">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" className="py-3 px-4 bg-[#202632] w-full  text-white font-sm font-medium cursor-pointer hover:bg-[#E70D0D] rounded-md">Yes</Button>
                            </div>
                        </DialogFooter>
                    </form>
                </DialogContent>

            </Dialog>
        )
    }


    return (
        <div className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#1B202C]">
            <div className="w-full sm:w-[60%]">
                <h6 className="text-base font-medium text-white mb-4">Deactivate Account</h6>
                <p className="text-sm font-normal text-[#A5A5AB]">This will shutdown your account. Your account will be reactive when you sign in again</p>
            </div>
            {handleDeactiveAdmin()}
        </div>
    )
}
