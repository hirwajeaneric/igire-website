'use client';

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const AddUserPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        supervisor: "",
    });

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleAddUser = () => {
        alert(`User added successfully! Name: ${formData.name}, Email: ${formData.email}, Role: ${formData.role}, Supervisor: ${formData.supervisor}`);
        setFormData({ name: "", email: "", role: "", supervisor: "" });
    };

    return (
        <div className="flex items-center justify-center py-6">
        <div className="mx-2 md:mx-36  w-full bg-white p-6 rounded-xl shadow-md">
            <h1 className=" text-xl font-bold mb-6">Add New User</h1>

            <div className="space-y-4">
                <div className="flex flex-col">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        placeholder="Enter full name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="mt-2"
                    />
                </div>

                <div className="flex flex-col">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="mt-2"
                    />
                </div>

                <div className="flex flex-col">
                    <Label htmlFor="role">Role</Label>
                    <Select
                        id="role"
                        value={formData.role}
                        onValueChange={(value) => handleChange("role", value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Human Resource">Human Resources</SelectItem>
                            <SelectItem value="Project Director">Project Director</SelectItem>
                            <SelectItem value="Operation Manager">Operation Manager</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col">
                    <Label htmlFor="supervisor">Supervisor</Label>
                    <Select
                        id="supervisor"
                        value={formData.supervisor}
                        onValueChange={(value) => handleChange("supervisor", value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select supervisor" />
                        </SelectTrigger>
                        <SelectContent>
                                <SelectItem value="Milton Doe">Milton Doe</SelectItem>
                                <SelectItem value="Danny Wood">Danny Wood</SelectItem>
                                <SelectItem value="Shawn Den">Shawn Den</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="mt-6">
                <Button
                    onClick={handleAddUser}
                        disabled={!formData.name || !formData.email || !formData.role || !formData.supervisor}
                    className="bg-[#0FA958] text-white px-8 py-2 disabled:bg-gray-400"
                >
                    Submit
                </Button>
            </div>
            </div>
        </div>
    );
};

export default AddUserPage;
