"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const usersData = [
  {
    id: 1,
    photo: "https://via.placeholder.com/40",
    name: "John Doe",
    phone: "+1 123 456 7890",
    email: "johndoe@example.com",
    position: "Manager",
  },
  {
    id: 2,
    photo: "https://via.placeholder.com/40",
    name: "Jane Smith",
    phone: "+1 987 654 3210",
    email: "janesmith@example.com",
    position: "Developer",
  },
  {
    id: 3,
    photo: "https://via.placeholder.com/40",
    name: "Mike Johnson",
    phone: "+1 555 123 4567",
    email: "mikejohnson@example.com",
    position: "Designer",
  },
];

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(usersData);

  // Handle search input
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = usersData.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.phone.includes(term) ||
        user.position.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  // Mock edit and delete actions
  const handleEdit = (user) => {
    alert(`Edit user: ${user.name}`);
  };

  const handleDelete = (user) => {
    alert(`Delete user: ${user.name}`);
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
              <TableHead>Photo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.position}</TableCell>
                  <TableCell className="flex space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
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
    </div>
  );
}
