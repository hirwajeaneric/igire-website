"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HiOutlineSearch } from "react-icons/hi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaPlusCircle, FaEdit, FaTrash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    userId: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    fetch("https://iro-website-bn-1.onrender.com/api/Inventory/users")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Users:", data); 
        if (data) {
          setUsers(data); 
          setFilteredUsers(data); 
        }
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      userId: user.userId,
      email: user.email,
      role: user.role,
    });
    setEditModalOpen(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No token found, please log in.");
      return;
    }

    try {
      const response = await fetch(`https://iro-website-bn-1.onrender.com/api/Inventory/users/update-user/${selectedUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user.");
      }

      const data = await response.json();
      alert("User updated successfully!");
      setUsers((prev) => prev.map((user) => (user._id === selectedUser._id ? data : user)));
      setEditModalOpen(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeleteUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No token found, please log in.");
      return;
    }

    try {
      const response = await fetch(`https://iro-website-bn-1.onrender.com/api/Inventory/users/delete-user/${selectedUser._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user.");
      }

      alert("User deleted successfully!");
      setUsers((prev) => prev.filter((user) => user._id !== selectedUser._id));
      setDeleteModalOpen(false);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-5 mt-10 font-ibm">
      <div className="flex flex-row justify-between mt-5 md:mt-0 mb-10 gap-2">
        <h2 className="text-xl font-semibold">Users</h2>
        <div className="flex items-center w-full md:w-auto">
          <HiOutlineSearch className="absolute ml-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search user..."
            value={searchTerm}
            onChange={handleSearch}
            className="border pl-10 pr-20 rounded-md py-2 w-full"
          />
        </div>
        <a href="admin/addUser">
          <Button className="bg-black text-white">
            <FaPlusCircle className="mr-2" />
            <span className="hidden sm:inline">Add User</span>
          </Button>
        </a>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <button className="text-green-500" onClick={() => handleEditClick(user)}>
                      <FaEdit />
                    </button>
                    <button className="text-red-500" onClick={() => handleDeleteClick(user)}>
                      <FaTrash />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Loading users
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-xl">Edit User</CardTitle>
            </CardHeader>
            <form onSubmit={handleUpdateUser}>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    name="role"
                    type="text"
                    value={formData.role}
                    onChange={handleEditChange}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="submit" className="p-2 bg-green-500">Save Changes</Button>
                <Button className="p-2 " onClick={() => setEditModalOpen(false)}>Cancel</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-md shadow-lg">
            <h3 className="text-lg">Are you sure you want to delete this user?</h3>
            <div className="mt-4 flex gap-4">
              <Button onClick={handleDeleteUser} className="bg-red-500 text-white">Yes, Delete</Button>
              <Button onClick={() => setDeleteModalOpen(false)} className="bg-gray-500 text-white">Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
