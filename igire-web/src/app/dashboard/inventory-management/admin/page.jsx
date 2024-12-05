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

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]); // Store all users here
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered users

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
            {filteredUsers && filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <button className="text-green-500">
                      <FaEdit />
                    </button>
                    <button className="text-red-500">
                      <FaTrash />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
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
