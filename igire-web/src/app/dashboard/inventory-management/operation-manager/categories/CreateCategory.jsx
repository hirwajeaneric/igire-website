"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CreateCategory = ({ addCategory }) => {
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddCategory = async () => {
  if (!newCategory.name.trim()) return;
  setLoading(true);
  setError(null);

  try {
    // Get the token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized. Please log in.");
      setLoading(false);
      return;
    }


    const response = await fetch(
      "https://iro-website-bn-1.onrender.com/api/Inventory/category",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token
        },
        body: JSON.stringify({ categoryName: newCategory.name }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create category");
    }

    const data = await response.json();
    addCategory({ id: data.id || Date.now(), name: newCategory.name }); // Use returned id if available
    setNewCategory({ name: "" });
  } catch (err) {
    setError("Error creating category. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-black ml-2 text-white">Add Category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Category</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Label htmlFor="categoryName">Category Name</Label>
          <Input
            id="categoryName"
            placeholder="Enter category name"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ name: e.target.value })}
          />
          {error && <p className="text-red-500">{error}</p>}
          <Button
            onClick={handleAddCategory}
            className="w-full bg-black text-white"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Category"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategory;
