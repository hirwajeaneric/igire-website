'use client';

import React, { useState } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HiOutlineSearch } from "react-icons/hi";
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

const data = [
    { name: "Johnny Scott", employeeId: "IRO_EMP_0012", position: "Project Manager", joinedOn: "2024-11-10", leavebalance: "0", status: "Active" },
    { name: "Milton Doe", employeeId: "IRO_EMP_0013", position: "Operations", joinedOn: "2024-10-10", leavebalance: "1.5", status: "Active" },
    { name: "Shawn Den", employeeId: "IRO_EMP_0046", position: "HR", joinedOn: "2021-03-03", leavebalance: "16", status: "Active" },
    { name: "Carol Reed", employeeId: "IRO_EMP_0029", position: "Volunteer", joinedOn: "2021-03-03", leavebalance: "12.5", status: "Active" },
    { name: "Danny Wood", employeeId: "IRO_EMP_0014", position: "Research", joinedOn: "2021-03-04", leavebalance: "9", status: "Active" },
    { name: "Shawn Martin", employeeId: "IRO_EMP_0069", position: "Finance", joinedOn: "2021-03-04", leavebalance: "5.5", status: "Active" },
];

const columns = [
    { accessorKey: "employeeId", header: "Employee ID" },
    { accessorKey: "name", header: "Full Name" },
    { accessorKey: "position", header: "Position" },
    { accessorKey: "joinedOn", header: "Joined On" },
    { accessorKey: "leavebalance", header: "Leave balance" },
    { accessorKey: "status", header: "Status", cell: ({ row }) => <div className="text-green-600 bg-green-100 px-2 py-1 rounded-full">{row.getValue("status")}</div> },
];

const ManageUsers = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [globalFilter, setGlobalFilter] = useState("");
    const [users, setUsers] = useState(data);

    const filteredData = users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const [sorting, setSorting] = useState([]);
    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        state: {
            sorting,
            globalFilter,
        },
    });

    return (
        <>
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
                    <span >
                        <a href='/dashboard/employeeleave/hr/users/adduser'><Button className="flex gap-2 text-white">
                            Add User
                            <IoIosAddCircleOutline />
                        </Button></a>
                    </span>
                </div>

                <div className="w-full">
                    <div className="rounded-md border">
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
                                        <TableCell colSpan={6}>No data found</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManageUsers;
