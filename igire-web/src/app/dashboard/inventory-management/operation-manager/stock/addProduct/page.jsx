"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    brand: "",
    dimensions: "",
    location: "",
    status: "",
    condition: "",
    dateOfEntry: "",
    image: null,
    borrowedBy: {
      borrowerName: "",
      nationalId: "",
      productId: "",
      borrowingDate: "",
      returningDate: "",
    },
  });

  const [newCategory, setNewCategory] = useState({ name: "", icon: "" });
  const [categories, setCategories] = useState(["electronics", "furniture", "stationery"]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, [name]: files[0] });
    } else if (name in formData.borrowedBy) {
      setFormData({
        ...formData,
        borrowedBy: { ...formData.borrowedBy, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  const addCategory = () => {
    if (newCategory.name) {
      setCategories([...categories, newCategory.name]);
      setNewCategory({ name: "", icon: "" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex flex-row justify-between items-center mb-6">
        <h1 className="text-lg font-semibold">Add New Product</h1>
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
              <DialogFooter>
                <Button onClick={addCategory} className="w-full bg-black text-white">
                  Add Category
                </Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white border rounded-xl p-6">
        {/* Product Information Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Product Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="category">Product Category</Label>
              <Select
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="w-full mt-1">
                  {formData.category || "Select category"}
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category, index) => (
                    <SelectItem key={index} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter product name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                name="brand"
                type="text"
                placeholder="Enter brand name"
                value={formData.brand}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="dimensions">Dimensions</Label>
              <Input
                id="dimensions"
                name="dimensions"
                type="text"
                placeholder="Enter dimensions"
                value={formData.dimensions}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                type="text"
                placeholder="Enter location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="image">Product Image</Label>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="dateOfEntry">Date of Entry</Label>
              <Input
                id="dateOfEntry"
                name="dateOfEntry"
                type="date"
                value={formData.dateOfEntry}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
          </div>
          <div className="mt-8 w-full  ">
          <Button className="bg-black w-full text-white ">Update </Button>
        
        </div>
        </section>

        
      </form>
    </div>
  );
};

export default AddProductForm;
