"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FaPlusCircle } from "react-icons/fa";
// ShadCN Dialog imports
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

  const [newCategory, setNewCategory] = useState({
    name: "",
    icon: "",
  });

  const [categories, setCategories] = useState(["electronics", "furniture", "stationery"]); // example categories

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
    // Add API integration or state update logic here
  };

  const addCategory = () => {
    if (newCategory.name) {
      setCategories([...categories, newCategory.name]);
      setNewCategory({ name: "", icon: "" }); // reset category form
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 mt-12 md:mt-5">
      <div className="flex flex-row justify-between font-ibm">
        <div>
          <h1 className="text-xl font-semibold mb-6 text-center">Add New Product</h1>
        </div>
        <div>
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
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 border rounded-md p-12">
        {/* Product Information */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Category */}
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

            {/* Product Name */}
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

            {/* Brand */}
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

            {/* Dimensions */}
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

            {/* Location */}
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

            {/* Image */}
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
          </div>
        </section>

        <Separator />

        {/* Product Status */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Product Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Status */}
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger className="w-full mt-1">
                  {formData.status || "Select status"}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="borrowed">Borrowed</SelectItem>
                  <SelectItem value="stolen">Stolen</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Condition */}
            <div>
              <Label htmlFor="condition">Condition</Label>
              <Select
                onValueChange={(value) => setFormData({ ...formData, condition: value })}
              >
                <SelectTrigger className="w-full mt-1">
                  {formData.condition || "Select condition"}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="used">Used</SelectItem>
                  <SelectItem value="damaged">Damaged</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date of Entry */}
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
        </section>

        <Separator />

        {/* Borrower Details */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Borrower Details (Optional)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Borrower Name */}
            <div>
              <Label htmlFor="borrowerName">Borrower Name</Label>
              <Input
                id="borrowerName"
                name="borrowerName"
                type="text"
                placeholder="Enter borrower name"
                value={formData.borrowedBy.borrowerName}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            {/* National ID */}
            <div>
              <Label htmlFor="nationalId">National ID</Label>
              <Input
                id="nationalId"
                name="nationalId"
                type="text"
                placeholder="Enter national ID"
                value={formData.borrowedBy.nationalId}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            {/* Product ID */}
            <div>
              <Label htmlFor="productId">Product ID</Label>
              <Input
                id="productId"
                name="productId"
                type="text"
                placeholder="Enter product ID"
                value={formData.borrowedBy.productId}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            {/* Borrowing and Returning Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="borrowingDate">Borrowing Date</Label>
                <Input
                  id="borrowingDate"
                  name="borrowingDate"
                  type="date"
                  value={formData.borrowedBy.borrowingDate}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="returningDate">Returning Date</Label>
                <Input
                  id="returningDate"
                  name="returningDate"
                  type="date"
                  value={formData.borrowedBy.returningDate}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8">
          <Button className="bg-black text-white w-full">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
