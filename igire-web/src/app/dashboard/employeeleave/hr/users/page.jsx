'use client';

import React, { useState, useEffect } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HiOutlineSearch } from "react-icons/hi";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const columns = [
    { accessorKey: "employeeId", header: "Employee ID" },
    {
        accessorKey: "firstName",
        header: "Full Name",
        cell: ({ row }) => row.original.firstName,
    },
    {
        accessorKey: "lastName",
        header: "Full Name",
        cell: ({ row }) => row.original.lastName,
    },
    { accessorKey: "position", header: "Position" },
    { accessorKey: "joinedOn", header: "Joined On" },
    { accessorKey: "leaveBalance", header: "Leave Balance" },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className={`text-${row.original.status === 'Active' ? 'green' : 'red'}-600 bg-${row.original.status === 'Active' ? 'green' : 'red'}-100 px-2 py-1 rounded-full`}>
                {row.original.status}
            </div>
        ),
    },
    {
        accessorKey: "actions",
        header: "Action",
        cell: ({ row }) => (
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="text-green-600"
                    onClick={() => handleEdit(row.original)}
                >
                    <AiFillEdit />
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600"
                    onClick={() => handleDelete(row.original)}
                >
                    <AiFillDelete />
                </Button>
            </div>
        ),
    },
];

const ManageUsers = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://iro-employee-bn.onrender.com/getAll/employee', {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                const formattedData = data.employees.map((employee) => ({
                    employeeId: employee?.employeeID,
                    firstName: employee?.firstName,
                    lastName: employee?.lastName,
                    position: employee?.position,
                    joinedOn: new Date(employee?.createdAt).toLocaleDateString(),
                    leaveBalance: employee?.leaveBalance || 0,
                    status: employee.status,
                }));
                setUsers(formattedData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const filteredData = users.filter(user =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            globalFilter: searchTerm,
        },
    });

    return (
        <div className="p-2 sm:p-6 flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <p className="text-xl font-semibold">Manage Users</p>
                <div className="relative sm:w-80 w-full">
                    <Input
                        placeholder="Search user..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                    <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
                <a href="/dashboard/employeeleave/hr/users/adduser">
                    <Button className="flex gap-2 text-white">
                        Add User
                        <IoIosAddCircleOutline />
                    </Button>
                </a>
            </div>

            <div className="w-full">
                <div className="rounded-md border">
                    {loading ? (
                        <p className="text-center py-4">Loading...</p>
                    ) : error ? (
                        <p className="text-center py-4 text-red-600">Error: {error}</p>
                    ) : (
                        <Table>
                            <TableHeader className="bg-[#EFF4FA]">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead key={header.id}>
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length}>No data found</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
