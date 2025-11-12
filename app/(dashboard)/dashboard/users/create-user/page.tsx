"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Calendar from "@/components/icons/Calendar";
import EyeOfIcon from "@/components/icons/EyeOfIcon";
import { Textarea } from "@/components/ui/textarea";

interface FormData {
    name: string;
    email: string;
    address: string;
    phone: string;
    gender: string;
    description: string;
    create_date: string;
    password: string;
}

export default function CreateUser() {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({});

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log("Form submitted:", data);
    };

    return (
        <div className=" rounded-sm">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-[#131824] p-4 rounded-[8px] mt-4">
                    <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                            <Label className="text-white font-inter text-[16px] font-medium leading-[160%] pb-3">Name</Label>
                            <Input
                                {...register("name", { required: "Name is required" })}
                                placeholder="Cameron Williamson"
                                className="h-[40px] w-full px-4 py-[14px] text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color"
                            />
                            {errors.name && <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>}
                        </div>

                        <div>
                            <Label className="text-white font-inter text-[16px] font-medium leading-[160%] pb-3">Email</Label>
                            <Input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Please enter a valid email address",
                                    },
                                })}
                                placeholder="cameron.graham@example.com"
                                className="h-[40px] w-full px-4 py-[14px] text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color"
                            />
                            {errors.email && <p className="text-red-500 mt-1 text-sm">{errors.email.message}</p>}
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5 mt-4">
                        <div>
                            <Label className="text-white font-inter text-[16px] font-medium leading-[160%] pb-3">Create Date</Label>

                            <div className="relative">
                                <Input
                                    type="date"
                                    {...register("create_date", { required: "Create date is required" })}
                                    className="h-[40px] w-full px-4 py-[14px] text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color"
                                />
                                <Calendar className="absolute right-3 top-1/4 w-5 h-5 text-gray-400 pointer-events-none" />
                                {errors.create_date && <p className="text-red-500 mt-1 text-sm">{errors.create_date.message}</p>}
                            </div>
                        </div>

                        <div>
                            <Label className="text-white font-inter text-[16px] font-medium leading-[160%] pb-3">Phone</Label>
                            <Input
                                {...register("phone", { required: "Phone number is required" })}
                                placeholder="(704) 555-0127"
                                className="h-[40px] w-full px-4 py-[14px] text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color"
                            />
                            {errors.phone && <p className="text-red-500 mt-1 text-sm">{errors.phone.message}</p>}
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5 mt-4">
                        <div>
                            <Label className="text-white font-inter text-[16px] font-medium leading-[160%] pb-3">Gender</Label>
                            <select
                                {...register("gender", { required: "Gender is required" })}
                                className="h-[40px] w-full px-4 py-[4px] text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color"
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Select gender
                                </option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.gender && <p className="text-red-500 mt-1 text-sm">{errors.gender.message}</p>}
                        </div>

                        <div>
                            <Label className="text-white font-inter text-[16px] font-medium leading-[160%] pb-3">Description</Label>
                            <textarea
                                {...register("description", { required: "Description is required" })}
                                placeholder="Write a description about yourself"
                                className="h-[40px] w-full px-4 py-[14px] text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color"
                            />
                            {errors.description && <p className="text-red-500 mt-1 text-sm">{errors.description.message}</p>}
                        </div>
                    </div>

                    {/* Password Field with show/hide */}
                    <div className="relative mt-4">
                        <Label className="text-white font-inter text-[16px] font-medium leading-[160%] pb-3" htmlFor="password">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                            placeholder="•••••••••••••"
                            className="h-[40px] w-full px-4 py-[14px] text-sm font-normal border border-[#0D121E] bg-[#0D121E] rounded outline-none focus-visible:ring-0 focus-visible:border-primary-color"
                        />
                        {errors.password && <p className="text-red-500 mt-1 text-sm">{errors.password.message}</p>}
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[48px] text-white"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            <EyeOfIcon />
                        </button>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <button
                            type="submit"
                            className="bg-[#2D9DFF] rounded-full text-white px-[100px] md:px-[206px] py-[14px] text-sm font-normal cursor-pointer  border border-white "
                        >
                            Creating a new user
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
