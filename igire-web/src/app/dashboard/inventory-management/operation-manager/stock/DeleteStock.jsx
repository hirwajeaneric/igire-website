import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IoWarning } from "react-icons/io5";

const DeleteStock = ({ open, onOpenChange, onDelete, onClose, productId }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token not found. Please log in.");
      }

      if (!productId) {
        throw new Error("Product ID is missing.");
      }

      console.log("DeleteStock: Attempting to delete product with _id:", productId);

      const response = await fetch(`https://iro-website-bn-1.onrender.com/api/Inventory/product/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log("DeleteStock: Product deleted successfully");
        onDelete(productId);
      } else {
        const errorData = await response.json();
        console.error("DeleteStock: Server response:", errorData);
        throw new Error(errorData.message || 'Failed to delete product');
      }
    } catch (error) {
      console.error('DeleteStock: Error deleting product:', error);
      setError(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm bg-white p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Delete Product</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <p>Are you sure you want to delete this product?</p>
          <div className="flex items-center text-red-500">
            <IoWarning className="mr-2" size={24} />
            <p className="text-sm">This action cannot be undone!</p>
          </div>
          {error && (
            <div className="text-red-500 text-sm">
              Error: {error}
            </div>
          )}
        </div>
        <DialogFooter className="mt-6">
          <Button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2" disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Yes, Delete"}
          </Button>
          <Button onClick={onClose} className="bg-gray-300 px-4 py-2" disabled={isDeleting}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteStock;

