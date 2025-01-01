"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import CreateCategory from "../../categories/CreateCategory";

const API_BASE_URL = "https://iro-website-bn-1.onrender.com";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    prod_id: "",
    categoryId: "",
    name: "",
    brand: "",
    dimensions: "",
    location: "",
    status: "available", // Default value
    condition: "new", // Default value
    productImage: "",
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Unauthorized. Please log in.");
        }

        const response = await fetch(
          `${API_BASE_URL}/api/Inventory/category/getAll`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          const errorDetails = await response.json();
          throw new Error(errorDetails.message || "Failed to fetch categories.");
        }

        const data = await response.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError(err.message);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "productImage" && files) {
      setFormData({ ...formData, productImage: URL.createObjectURL(files[0]) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const productData = {
      prod_id: formData.prod_id,
      name: formData.name,
      brand: formData.brand,
      dimensions: formData.dimensions,
      categoryId: formData.categoryId,
      location: formData.location,
      status: formData.status,
      condition: formData.condition,
      productImage: formData.productImage,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token is missing or invalid.");
      }
   console.log("token", token)
      const response = await fetch(
        `${API_BASE_URL}/api/Inventory/product/create-product`,
        {
          method: "POST",
          body: JSON.stringify(productData),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert("Product added successfully!");
      } else {
        const errorDetails = await response.json();
        alert(
          `Failed to add product: ${errorDetails.message || "Unknown error"}`
        );
        console.error("Error details:", errorDetails);
      }
    } catch (err) {
      alert("An error occurred. Please try again.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex flex-row justify-between items-center mb-6">
        <h1 className="text-lg font-semibold">Add New Product</h1>
        <CreateCategory />
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white border rounded-xl p-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">Product Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="prod_id">Product ID</Label>
              <Input
                id="prod_id"
                name="prod_id"
                type="text"
                placeholder="Enter product ID"
                value={formData.prod_id}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="categoryId">Product Category</Label>
              <Select
                onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
                value={formData.categoryId}
              >
                <SelectTrigger className="w-full mt-1">
                  {formData.categoryId
                    ? categories.find((cat) => cat._id === formData.categoryId)?.categoryName || "Select category"
                    : "Select category"}
                </SelectTrigger>
                <SelectContent>
                  {loading ? (
                    <SelectItem value="loading" disabled>
                      Loading categories...
                    </SelectItem>
                  ) : categories.length > 0 ? (
                    categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.categoryName}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-categories" disabled>
                      No categories available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Input
                id="status"
                name="status"
                type="text"
                placeholder="Status (e.g., available)"
                value={formData.status}
                onChange={handleChange}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="condition">Condition</Label>
              <Input
                id="condition"
                name="condition"
                type="text"
                placeholder="Condition (e.g., new)"
                value={formData.condition}
                onChange={handleChange}
                className="mt-1"
              />
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
              <Label htmlFor="productImage">Product Image</Label>
              <Input
                id="productImage"
                name="productImage"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="mt-1"
              />
            </div>
          </div>

          <div className="mt-8 w-full">
            <Button type="submit" className="bg-black w-full text-white" disabled={loading}>
              {loading ? "Adding..." : "Add"}
            </Button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default AddProductForm;
