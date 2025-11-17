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

/* userDet: Partial<FormData>; */

interface PersonalInfoProps {
  userDet: {
    id?: string | number;
    name?: string;
    status?: string | null;
    created_at?: string;
  };
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
                value="Cameron Williamson"
                readOnly
              />
            </div>

            <div className="mb-3">
              <Label className="text-white mb-3 custom-label">Email</Label>
              <Input
                placeholder="cameron.graham@example.com"
                className="custom-input"
                value="cameron.graham@example.com"
                readOnly
              />
            </div>

            <div className="mb-3">
              <Label className="text-white mb-3 custom-label">
                Create Date
              </Label>

              <div className="relative">
                <Input
                  type="date"
                  className="custom-input"
                  value="1996-12-12"
                  readOnly
                />
                <Calendar className="absolute right-3 top-1/4 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="mb-3">
              <Label className="text-white mb-3 custom-label">Phone</Label>
              <Input
                placeholder="(704) 555-0127"
                className="custom-input"
                value="(704) 555-0127"
                readOnly
              />
            </div>

            <div className="mb-3">
              <Label className="text-white mb-3 custom-label">Gender</Label>
              <Input
                placeholder="Gender"
                className="custom-input"
                value="Male"
                readOnly
              />
            </div>

            <div className="mb-3">
              <Label className="text-white mb-3 custom-label">
                Description
              </Label>
              <Textarea
                className="!h-[100px] custom-input"
                placeholder="Description"
                value="Page layouts look better with something in each section. Web page designers, content writers, and layout artists use lorem ipsum, also known as placeholder copy, to distinguish which areas on a page will hold advertisements, editorials, and filler before the final written content and website designs receive client approval."
                readOnly
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
