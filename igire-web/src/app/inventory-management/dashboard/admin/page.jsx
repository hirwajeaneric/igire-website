"use client";

import React, { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const usersData = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    phoneNumber: "+1 123 456 7890",
    email: "johndoe@example.com",
    role: "Manager",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    phoneNumber: "+1 987 654 3210",
    email: "janesmith@example.com",
    role: "Developer",
  },
  {
    id: 3,
    firstName: "Mike",
    lastName: "Johnson",
    phoneNumber: "+1 555 123 4567",
    email: "mikejohnson@example.com",
    role: "Designer",
  },
];

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(usersData);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editFormData, setEditFormData] = useState(null);

  // Handle search input
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = usersData.filter(
      (user) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.phoneNumber.includes(term) ||
        user.role.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  // Handle Edit action
  const handleEdit = (user) => {
    setSelectedUser(user);
    setEditFormData({ ...user });
    setIsEditDialogOpen(true);
  };

  // Handle form changes in Edit Dialog
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleRoleChange = (value) => {
    setEditFormData({ ...editFormData, role: value });
  };

  const saveEdit = () => {
    setFilteredUsers((prev) =>
      prev.map((user) =>
        user.id === editFormData.id ? { ...editFormData } : user
      )
    );
    setIsEditDialogOpen(false);
    alert("User updated successfully!");
  };

  // Handle Delete action
  const handleDelete = (user) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setFilteredUsers((prev) =>
      prev.filter((user) => user.id !== selectedUser.id)
    );
    setIsDeleteDialogOpen(false);
    alert("User deleted successfully!");
  };

  return (
    <div className="space-y-6 p-10 mt-5 font-ibm">
      {/* Title, Search, and Add Button Row */}
      <div className="flex flex-row justify-between mb-20">
        <div>
          <h2 className="text-xl font-semibold">Users</h2>
        </div>
        <div className="flex  items-center">
          <HiOutlineSearch
            className="absolute ml-3 -z-1 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search user..."
            value={searchTerm}
            onChange={handleSearch}
            className="border pl-10 pr-20 rounded-md py-2 w-s"
          />
        </div>
        <div>
          <a href="admin/addUser">
            <Button className="flex items-center bg-black text-white">
              <FaPlusCircle className="mr-2" /> Add User
            </Button>
          </a>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                  <TableCell>{user.phoneNumber}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className="flex space-x-2">
                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={() => handleEdit(user)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(user)}
                    >
                      <FaTrash />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      {isEditDialogOpen && editFormData && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white rounded-md p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Edit User</h3>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={editFormData.firstName}
                  onChange={handleEditChange}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={editFormData.lastName}
                  onChange={handleEditChange}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={editFormData.phoneNumber}
                  onChange={handleEditChange}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={editFormData.email}
                  onChange={handleEditChange}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="role">Role</Label>
                <Select
                  onValueChange={handleRoleChange}
                  defaultValue={editFormData.role}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <Button
                onClick={() => setIsEditDialogOpen(false)}
                className="bg-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={saveEdit}
                className="bg-green-500 text-white"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      {isDeleteDialogOpen && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="bg-white rounded-md p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-4">
              Are you sure you want to delete{" "}
              <strong>{`${selectedUser.firstName} ${selectedUser.lastName}`}</strong>?
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <Button
                onClick={() => setIsDeleteDialogOpen(false)}
                className="bg-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                className="bg-red-500 text-white"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
