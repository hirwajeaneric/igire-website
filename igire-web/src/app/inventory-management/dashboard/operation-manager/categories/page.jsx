"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoWarning } from "react-icons/io5";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const initialCategories = [
  { id: 1, name: "Furniture", icon: "🪑" },
  { id: 2, name: "Electronics", icon: "💻" },
  { id: 3, name: "Welfare", icon: "🤝" },
  { id: 4, name: "Stationery", icon: "✏️" },
];

const CategoryList = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState({ name: "", icon: "" });
  const [editCategory, setEditCategory] = useState(null);
  const [removeCategoryId, setRemoveCategoryId] = useState(null); // To store the category being removed

  // Add a new category
  const addCategory = () => {
    if (newCategory.name.trim() && newCategory.icon.trim()) {
      setCategories([
        ...categories,
        { id: Date.now(), name: newCategory.name, icon: newCategory.icon },
      ]);
      setNewCategory({ name: "", icon: "" });
    }
  };

  // Remove a category
  const removeCategory = () => {
    if (removeCategoryId !== null) {
      setCategories(categories.filter((category) => category.id !== removeCategoryId));
      setRemoveCategoryId(null); // Close the remove dialog
    }
  };

  // Update an edited category
  const updateCategory = () => {
    if (editCategory.name.trim() && editCategory.icon.trim()) {
      setCategories(
        categories.map((category) =>
          category.id === editCategory.id ? editCategory : category
        )
      );
      setEditCategory(null); // Close modal
    }
  };

  return (
    <div className="max-w-5xl mt-6 mx-auto p-8 ">
      {/* Title and Add Button */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-xl font-semibold text-black">Categories</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-black text-white">Add Category</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a New Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="categoryName">Category Name</Label>
                <Input
                  id="categoryName"
                  placeholder="Enter category name"
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="categoryIcon">Category Icon</Label>
                <Input
                  id="categoryIcon"
                  placeholder="Enter emoji or text icon"
                  value={newCategory.icon}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, icon: e.target.value })
                  }
                />
              </div>
              <Button onClick={addCategory} className="w-full bg-black text-white">
                Add Category
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories List */}
      <div className="grid grid-cols-1sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col justify-between p-4 bg-white text-white rounded-lg shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">{category.icon}</div>
              <h2 className="text-md font-semibold text-black">{category.name}</h2>
            </div>
            <div className="flex gap-2 mt-4">
              {/* Edit Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-gray-300 text-white">
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Category</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="editCategoryName">Category Name</Label>
                      <Input
                        id="editCategoryName"
                        placeholder="Enter new category name"
                        value={editCategory?.name || ""}
                        onChange={(e) =>
                          setEditCategory({
                            ...editCategory,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="editCategoryIcon">Category Icon</Label>
                      <Input
                        id="editCategoryIcon"
                        placeholder="Enter new emoji or text icon"
                        value={editCategory?.icon || ""}
                        onChange={(e) =>
                          setEditCategory({
                            ...editCategory,
                            icon: e.target.value,
                          })
                        }
                      />
                    </div>
                    <Button
                      onClick={updateCategory}
                      className="w-full bg-black text-white"
                    >
                      Update Category
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Remove Button */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    
                    onClick={() => setRemoveCategoryId(category.id)} className="bg-red-500" // Open remove confirmation dialog
                  >
                    Remove
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md bg-white p-6">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-bold">Delete Category</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col space-y-4">
                    <p>Are you sure you want to remove this category?</p>
                    <div className="flex items-center text-red-500">
                      <IoWarning className="mr-2" size={24} />
                      <p className="text-sm">This action cannot be undone!</p>
                    </div>
                  </div>
                  <DialogFooter className="mt-6">
                    <Button
                      onClick={removeCategory} // Proceed with removal
                      className="bg-red-500 text-white px-4 py-2"
                    >
                      Yes, remove
                    </Button>
                    <Button
                      onClick={() => setRemoveCategoryId(null)} // Close the dialog without removing
                      className="bg-gray-300 px-4 py-2"
                    >
                      Cancel
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
