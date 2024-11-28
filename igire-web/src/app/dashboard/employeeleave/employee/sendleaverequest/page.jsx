'use client';

import React, { useState } from 'react';
import { leaveTypes } from '@/components/ui/leavetypesdata';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const RequestLeave = () => {
    const [formData, setFormData] = useState({
        employeeName: '',
        leaveType: '',
        startDate: '',
        endDate: '',
        attachment: null,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLeaveTypeChange = (value) => {
        setFormData((prevData) => ({
            ...prevData,
            leaveType: value,
        }));
    };

    const handleAttachmentChange = (event) => {
        const file = event.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            attachment: file,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form Data:", formData);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Request Leave</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Employee Name */}
                <div>
                    <Label htmlFor="employeeName" className="block mb-2 text-sm font-medium">
                        Employee Name
                    </Label>
                    <Input
                        id="employeeName"
                        name="employeeName"
                        type="text"
                        placeholder="Enter your name"
                        value={formData.employeeName}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                    />
                </div>

                <div>
                    <Label htmlFor="leaveType" className="block mb-2 text-sm font-medium">
                        Leave Type
                    </Label>
                    <Select onValueChange={handleLeaveTypeChange} value={formData.leaveType}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Leave Type" />
                        </SelectTrigger>
                        <SelectContent>
                            {leaveTypes.map((leave) => (
                                <SelectItem key={leave.id} value={leave.leaveType}>
                                    {leave.leaveType}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="startDate" className="block mb-2 text-sm font-medium">
                        Start Date
                    </Label>
                    <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                    />
                </div>

                <div>
                    <Label htmlFor="endDate" className="block mb-2 text-sm font-medium">
                        End Date
                    </Label>
                    <Input
                        id="endDate"
                        name="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        required
                        className="w-full"
                    />
                </div>

                <div>
                    <Label htmlFor="attachment" className="block mb-2 text-sm font-medium">
                        Add Attachment
                    </Label>
                    <Input
                        id="attachment"
                        name="attachment"
                        type="file"
                        onChange={handleAttachmentChange}
                        className="w-full"
                    />
                </div>

                <Button type="submit" className="">
                    Submit Request
                </Button>
            </form>
        </div>
    );
};

export default RequestLeave;
