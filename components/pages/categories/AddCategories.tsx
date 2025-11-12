"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import EditIcon from "@/components/icons/EditIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { privateAxios } from "@/components/axiosInstance/axios";
import { toast } from "sonner";
import { Category } from "./CategoriesTable";

interface CategoryModalProps {
  category: Category | null;
}

const useCreateCategory = () =>
  useMutation({
    mutationFn: (data: any) =>
      privateAxios.post("/admin/categories/create_category", data),
  });

const useUpdateCategory = () =>
  useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: any }) =>
      privateAxios.put(`/admin/categories/categories/${id}`, data),
  });

export default function AddCategories({ category }: CategoryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    assignedTags: "",
    slug: "",
    status: 1,
  });

  const { mutate: createCategory, isPending: createLoading } = useCreateCategory();
  const { mutate: updateCategory, isPending: updateLoading } = useUpdateCategory();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.categoryName ?? "",
        description: category.description ?? "",
        assignedTags: category.categoryName ?? "",
        slug: "",
        status: category.status ?? 1,
      });
    } else {
      setFormData({ name: "", description: "", assignedTags: "", slug: "", status: 1 });
    }
  }, [category]);

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    const generateSlug = formData.name
      .toLocaleLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");

    const payload = { ...formData, slug: generateSlug };

    if (category) {
      updateCategory(
        { id: category.id, data: payload },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            toast.success("Category Updated Successfully!");
            setIsOpen(false);
          },
          onError: () => toast.error("Failed to update category"),
        }
      );
    } else {
      createCategory(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["categories"] });
          setIsOpen(false);
          toast.success("Category Created Successfully!");
          setFormData({
            name: "",
            description: "",
            assignedTags: "",
            slug: "",
            status: 1,
          });
        },
        onError: () => toast.error("Failed to create category"),
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        {category ? (
          <EditIcon />
        ) : (
          <p className="font-roboto text-[16px] font-medium leading-[24px] text-white bg-[#2D9DFF] py-[10px] px-5 rounded-md">
            Add Category
          </p>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[566px] xl:max-w-[866px] border border-[#1B202C] bg-[#181E2A] p-6 rounded-lg text-white">
        <DialogHeader>
          <DialogTitle>{category ? "Edit Category" : "Add New Category"}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="category-name">Category Name</Label>
            <Input
              id="category-name"
              value={formData.name}
              placeholder="e.g., Horror, Sci-Fi"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="py-3 px-4 border-2 border-[#222733]"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="category-description">Description</Label>
            <textarea
              id="category-description"
              value={formData.description}
              placeholder="Brief description (optional)"
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="border-2 border-[#222733] rounded-md py-3 px-4"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="category-status">Status</Label>
            <select
              id="category-status"
              className="border-2 border-[#222733] bg-transparent rounded-md py-3 px-4"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: Number(e.target.value) })}
            >
              <option value={1}>Active</option>
              <option value={0}>Deactive</option>
            </select>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="category-tags">Assign Tags (optional)</Label>
            <textarea
              id="category-tags"
              value={formData.assignedTags}
              placeholder="#Superhero #Crime #RomCom"
              onChange={(e) => setFormData({ ...formData, assignedTags: e.target.value })}
              className="py-3 px-4 border-2 border-[#222733] rounded-md"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={createLoading || updateLoading}
            className="bg-[#2D9DFF] w-full"
          >
            {category
              ? updateLoading
                ? "Updating..."
                : "Update"
              : createLoading
                ? "Creating..."
                : "Add New Category"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
