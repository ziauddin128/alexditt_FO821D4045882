import { privateAxios } from "@/components/axiosInstance/axios";
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

export default function DeleteAccount() {

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
                    style: {
                        backgroundColor: "#4CAF50",
                        color: "#fff",
                    },
                });

                logout();
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
    }

    // Deactive Admin dialog
    const handleDeactiveAdmin = () => {
        return (
            <Dialog>

                <DialogTrigger asChild>
                    <button className="bg-primary-color text-white px-5 py-[10px] rounded text-sm font-normal cursor-pointer">Delete</button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[530px] bg-gray3-bg border-gray3-border settingDialog" >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogHeader className="pb-4 border-b border-[#222733]">
                            <DialogTitle className="text-base font-semibold  text-white">Delet Account</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                            <div className='mt-4'>
                                {/* timeline */}
                                <div className="mb-4">
                                    <Label className="font-base font-medium mb-3 text-white">Choose Time Period<span className="text-red-500">*</span></Label>

                                    <Controller
                                        name="deactivationPeriod"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            validate: (value) =>
                                                value !== "" || "Time period is required",
                                        }}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <SelectTrigger className="h-[40px] w-full px-4 py-3 text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color text-white">
                                                    <SelectValue placeholder="Select business type" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-secondary-bg text-white border border-slate-700 rounded">
                                                    <SelectItem value="3">3 Days</SelectItem>
                                                    <SelectItem value="7">7 Days</SelectItem>
                                                    <SelectItem value="30">30 Days</SelectItem>
                                                    <SelectItem value="365">365 Days</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />


                                    {errors.deactivationPeriod && (
                                        <p className="error-msg">{errors.deactivationPeriod.message}</p>
                                    )}
                                </div>
                            </div>
                        </DialogDescription>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type='button' variant="outline" className="py-3 px-4 bg-transparent border border-primary-color text-white font-sm font-medium cursor-pointer hover:bg-primary-color hover:text-white rounded">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" className="py-3 px-4 bg-primary-color text-white font-sm font-medium cursor-pointer hover:bg-primary-color rounded">Submit</Button>
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
