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

const useCreateCategory = () => {
  return useMutation({
    mutationFn: (data: any) => {
      return privateAxios.post("/admin/categories/create_category", data);
    },
  });
};

const useUpdateCategory = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => {
      return privateAxios.put(`/admin/categories/categories/${id}`, data);
    },
  });
};
// export interface Category {
//   id: string;
//   name: string;
//   description: string;
//   assignedTags: string;
//   slug: string;
//   status: number;
// }

export default function AddCategories({ category }: CategoryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    assignedTags: "",
    slug: "",
    status: 1,
  });

  const {
    mutate: createCategory,
    isPending: createLoading,
    isError: createError,
  } = useCreateCategory();
  const {
    mutate: updateCategory,
    isPending: updateLoading,
    isError: updateError,
  } = useUpdateCategory();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.categoryName,
        description: category.description,
        assignedTags: category.categoryName,
        // slug: category.slug,
        status: category.status,
      });
    } else {
      setFormData({ name: "", description: "", assignedTags: "", slug: "", status: 1 });
    }
  }, [category]);

  const handleSubmit = async () => {
    if (!formData.name) {
      toast.error("Name is required");
      return;
    }

    const generateSlug = formData.name
      .toLocaleLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");

    const payload = { ...formData, slug: generateSlug }

    if (category) {
      // Update category
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
      // Create category
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
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger className=" cursor-pointer" asChild>
        {category ? (
          <p>
            <EditIcon />
          </p>
        ) : (
          <p className="font-roboto text-[16px] font-medium leading-[24px] text-[#FFF] bg-[#2D9DFF] py-[10px] px-5 rounded-md">Add Category</p>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[466px] md:max-w-[566px] xl:max-w-[866px] flex-col items-start gap-[43px] border border-[color:var(--Line-Color,#1B202C)] [background:#181E2A] p-6 rounded-lg border-solid text-white">
        <DialogHeader>
          <DialogTitle>
            {category ? "Edit Category" : "Add New Category"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="category-name" className="text-white font-inter text-[14px] font-medium leading-[14px]">Category Name</Label>
            <Input className="py-3 px-4 border-2 border-[#222733]"
              id="category-name"
              name="name"
              value={formData.name}
              placeholder="e.g., Horror, Sci-Fi"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="category-name" className="text-white font-inter text-[14px] font-medium leading-[14px]">Description</Label>
            <textarea className="border-2 border-[#222733] rounded-md py-3 px-4"
              id="category-name"
              name="description"
              value={formData.description}
              placeholder="Brief description (optional)"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          {/* <div className="grid gap-3">
            <Label htmlFor="category-slug">Slug</Label>
            <Input
              id="category-slug"
              name="slug"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
            />
          </div> */}

          <div className="grid gap-3">
            <Label htmlFor="category-status" className="text-white font-inter text-[14px] font-medium leading-[14px]">Status</Label>
            <select
              id="category-status"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: Number(e.target.value) })
              }
              className="bg-[#181E2A] text-white border rounded-sm px-4 py-3 border-[#222733]"
            >
              <option value={1}>Active</option>
              <option value={0}>Deactive</option>
            </select>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="category-category" className="text-white font-inter text-[14px] font-medium leading-[14px]"
            >Assign Tags (optional)</Label>
            <textarea className="py-3 px-4 border-2 border-[#222733] rounded-md"
              id="category-assignedTags"
              name="assignedTags"
              value={formData.assignedTags}
              placeholder="#Superhero #Crime  #RomCom "
              onChange={(e) =>
                setFormData({ ...formData, assignedTags: e.target.value })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            type="submit"
            disabled={createLoading || updateLoading}
            className="bg-[#2D9DFF] w-full"
          >
            {category ? (
              <>{updateLoading ? "Updating..." : "Update"}</>
            ) : (
              <>{createLoading ? "Creating..." : "Add New Category"}</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
