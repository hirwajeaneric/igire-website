"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function EditStock({ open, onOpenChange, selectedRowData, onSave }) {
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    brand: "",
    dimensions: "",
    location: "",
    status: "",
    condition: "",
    dateOfEntry: "",
    borrowedBy: {
      borrowerName: "",
      nationalId: "",
      productId: "",
      borrowingDate: "",
      returningDate: "",
    },
  });

  const [imageFile, setImageFile] = useState(null);

  // Sync formData with selectedRowData when the dialog is opened
  useEffect(() => {
    if (selectedRowData) {
      setFormData({
        ...selectedRowData,
        borrowedBy: selectedRowData.borrowedBy || {
          borrowerName: "",
          nationalId: "",
          productId: "",
          borrowingDate: "",
          returningDate: "",
        },
      });
    }
  }, [selectedRowData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check for nested fields in "borrowedBy"
    if (name in formData.borrowedBy) {
      setFormData((prev) => ({
        ...prev,
        borrowedBy: {
          ...prev.borrowedBy,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSave = () => {
    // Call onSave and pass the updated data
    onSave({ ...formData, imageFile });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <form>
          {/* General Details */}
          <div className="grid md:grid-cols-3 text-gray-700 gap-4">
            <label>
              Category:
              <Input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="border px-2 py-1 rounded-md w-full"
              />
            </label>
            <label>
              Name:
              <Input
                type="text"      
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border px-2 py-1 rounded-md w-full"
              />
            </label>
            <label>
              Brand:
              <Input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="border px-2 py-1 rounded-md w-full"
              />
            </label>
            <label>
              Dimensions:
              <Input
                type="text"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleChange}
                className="border px-2 py-1 rounded-md w-full"
              />
            </label>
            <label>
              Location:
              <Input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="border px-2 py-1 rounded-md w-full"
              />
            </label>
          </div>

          

          {/* Product Status */}
          <section>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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


          {/* Borrower Details */}
          <section>
            <h2 className="text-lg font-semibold mt-4">Borrower Details (if applicable)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <div>
                <Label >National ID:
                <Input
                  id="nationalId"
                  name="nationalId"
                  type="text"
                  placeholder="Enter national ID"
                  value={formData.borrowedBy.nationalId}
                  onChange={handleChange}
                  className="mt-1"
                /></Label>
              </div>
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
        </form>
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} className="bg-gray-300">
            Cancel
          </Button>
          <Button type="button" onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
