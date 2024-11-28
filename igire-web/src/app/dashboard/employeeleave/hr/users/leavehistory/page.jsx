// pages/leave-history/index.jsx
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from "@/components/ui/table";

// Sample leave history data for all employees
const leaveHistoryData = [
    { employeeId: "IRO_EMP_0012", name: "Johnny Scott", date: "2024-11-05", leaveType: "Sick Leave", status: "Approved" },
    { employeeId: "IRO_EMP_0012", name: "Johnny Scott", date: "2024-10-12", leaveType: "Annual Leave", status: "Pending" },
    { employeeId: "IRO_EMP_0013", name: "Milton Doe", date: "2024-09-15", leaveType: "Sick Leave", status: "Denied" },
    { employeeId: "IRO_EMP_0046", name: "Shawn Den", date: "2023-08-05", leaveType: "Emergency Leave", status: "Approved" },
    // Add more history data as needed
];

const LeaveHistoryPage = () => {
    const [history, setHistory] = useState(leaveHistoryData); // Show all leave history data

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Leave History</h2>

            {history.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Employee Name</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Leave Type</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {history.map((entry, index) => (
                            <TableRow key={index}>
                                <TableCell>{entry.name}</TableCell>
                                <TableCell>{entry.date}</TableCell>
                                <TableCell>{entry.leaveType}</TableCell>
                                <TableCell>{entry.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p>No leave history available.</p>
            )}

            <Button onClick={() => window.history.back()}>Back to Users</Button>
        </div>
    );
};

export default LeaveHistoryPage;
