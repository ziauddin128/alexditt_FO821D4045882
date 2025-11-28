"use client";
import React, { useState } from "react";
import ContentTable from "./ContentTable";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function ContentManagement() {
  const [filmType, setFilmType] = useState<string>("Movie");

  const router = useRouter();

  const handleTypeClick = () => {
    if (filmType === "Movie") {
      router.push("/dashboard/film-management/movie");
    } else {
      router.push("/dashboard/film-management/series");
    }
  };

  const handleFilmType = () => {
    return (
      <Dialog>
        <DialogTrigger
          asChild
          className="text-base font-medium text-white flex justify-center items-center gap-1 bg-primary-color px-5 py-2.5 rounded-lg cursor-pointer"
        >
          <div>
            <Plus className="h-5 w-5" />
            <span>Add new content</span>
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[566px] xl:max-w-[866px] bg-gray3-bg border-gray3-border rounded-lg text-white settingDialog ">
          <DialogHeader className="pb-4 border-b border-[#222733]">
            <DialogTitle className="text-base font-semibold  text-white">
              Add new content
            </DialogTitle>
          </DialogHeader>

          <div>
            <div className="mb-6">
              <Label className="custom-label mb-3">Film Category</Label>
              <Select
                defaultValue="Movie"
                onValueChange={(value) => setFilmType(value)}
              >
                <SelectTrigger className="custom-input cursor-pointer">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="border border-gray3-bg bg-dark-bg rounded text-white">
                  <SelectGroup className="space-y-2">
                    <SelectItem
                      value="Movie"
                      className="selectOption !justify-start"
                    >
                      Movie
                    </SelectItem>
                    <SelectItem
                      value="Series"
                      className="selectOption !justify-start"
                    >
                      Series
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className={`h-[45px] w-full py-3 px-4 bg-primary-color text-white font-base font-medium cursor-pointer hover:bg-primary-color rounded`}
              onClick={handleTypeClick}
            >
              Next
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="space-y-4">
      {/* Title */}
      <div className="flex flex-wrap gap-y-2 items-center  justify-between">
        <h2 className="text-lg font-medium text-white">Film Management</h2>
        {handleFilmType()}
      </div>
      {/*  Table  */}
      <div>
        <ContentTable />
      </div>
    </div>
  );
}
