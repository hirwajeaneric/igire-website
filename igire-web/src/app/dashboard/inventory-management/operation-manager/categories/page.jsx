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
  { id: 1, name: "Furniture" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Welfare" },
  { id: 4, name: "Stationery" },
];

const CategoryList = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [editCategory, setEditCategory] = useState(null);
  const [removeCategoryId, setRemoveCategoryId] = useState(null);

  // Add a new category
  const addCategory = () => {
    if (newCategory.name.trim()) {
      setCategories([...categories, { id: Date.now(), name: newCategory.name }]);
      setNewCategory({ name: "" });
    }
  };

  // Remove a category
  const removeCategory = () => {
    if (removeCategoryId !== null) {
      setCategories(categories.filter((category) => category.id !== removeCategoryId));
      setRemoveCategoryId(null);
    }
  };

  // Update an edited category
  const updateCategory = () => {
    if (editCategory.name.trim()) {
      setCategories(
        categories.map((category) =>
          category.id === editCategory.id ? editCategory : category
        )
      );
      setEditCategory(null);
    }
  };

  return (
    <div className="max-w-5xl mt-6 mx-auto p-8">
      {/* Title and Add Button */}
      <div className="flex justify-between items-center mt-5 md:mt-0 mb-10">
        <h1 className="text-xl font-semibold text-black">Categories</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-black ml-2 text-white">Add Category</Button>
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
                  onChange={(e) => setNewCategory({ name: e.target.value })}
                />
              </div>
              <Button onClick={addCategory} className="w-full bg-black text-white">
                Add Category
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories Table */}
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Category Name</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{category.id}</td>
              <td className="border border-gray-300 px-4 py-2">{category.name}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {/* Edit Button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      onClick={() => setEditCategory(category)}
                      className="bg-gray-300 text-black mx-1"
                    >
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
                            setEditCategory({ ...editCategory, name: e.target.value })
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
                      size="sm"
                      onClick={() => setRemoveCategoryId(category.id)}
                      className="bg-red-500 text-white mx-1"
                    >
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Delete Category</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p>Are you sure you want to remove this category?</p>
                      <div className="flex items-center text-red-500">
                        <IoWarning className="mr-2" size={24} />
                        <p className="text-sm">This action cannot be undone!</p>
                      </div>
                      <DialogFooter>
                        <Button
                          onClick={removeCategory}
                          className="bg-red-500 text-white px-4 py-2"
                        >
                          Yes, remove
                        </Button>
                        <Button
                          onClick={() => setRemoveCategoryId(null)}
                          className="bg-gray-300 px-4 py-2"
                        >
                          Cancel
                        </Button>
                      </DialogFooter>
                    </div>
                  </DialogContent>
                </Dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
