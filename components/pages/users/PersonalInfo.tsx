"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Calendar from "@/components/icons/Calendar";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
interface PersonalInfoProps {
  userDet: Partial<FormData>;
}

export default function PersonalInfo({ userDet }: PersonalInfoProps) {
  return (
    <div className=" rounded-sm">
      <form>
        <div className="bg-[#131824] p-4 rounded-[8px] mt-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="mb-3">
              <Label className="text-white mb-3 custom-label">Name</Label>
              <Input
                placeholder="Cameron Williamson"
                className="custom-input"
              />
            </div>

            <div className="mb-3">
              <Label className="text-white mb-3 custom-label">Email</Label>
              <Input
                placeholder="cameron.graham@example.com"
                className="custom-input"
              />
            </div>

            <div className="mb-3">
              <Label className="text-white mb-3 custom-label">
                Create Date
              </Label>

              <div className="relative">
                <Input type="date" className="custom-input" />
                <Calendar className="absolute right-3 top-1/4 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="mb-3">
              <Label className="text-white mb-3 custom-label">Phone</Label>
              <Input placeholder="(704) 555-0127" className="custom-input" />
            </div>

            <div className="mb-3">
              <Label className="text-white mb-3 custom-label">Gender</Label>
              <Select>
                <SelectTrigger className="custom-input cursor-pointer">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent className="rounded-none">
                  <SelectItem value="Male" className="cursor-pointer">
                    Male
                  </SelectItem>
                  <SelectItem value="Female" className="cursor-pointer">
                    Female
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-3">
              <Label className="text-white mb-3 custom-label">
                Description
              </Label>
              <Textarea
                className="!h-[100px] custom-input"
                placeholder="Description"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
