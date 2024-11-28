'use client';

import React from 'react';
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HiOutlineSearch } from "react-icons/hi";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";

const StatusCard = ({ title, percentage, color }) => (
    <Card className="md:w-[calc(33.333%-0.75rem)]">
        <CardContent className="flex flex-col items-center justify-center gap-3 p-3">
            <p className="text-[17px] text-center text-muted-foreground">{title}</p>
            <CardTitle className={`text-[24px] font-bold ${color}`}>{percentage}</CardTitle>
        </CardContent>
    </Card>
);

const data = [
    {
        date: "21 Nov, 2024",
        name: "Liam Hayes",
        totalDays: 8,
        startingDate: '24 Nov, 2024',
        endDate: '2 Dec, 2024',
        leaveType: "Sick",
        status: "Pending",
    },
    {
        date: "19 Nov, 2024",
        name: "Noah Bennett",
        totalDays: 5,
        startingDate: '30 Nov, 2024',
        endDate: '6 Dec, 2024',
        leaveType: "Paternity",
        status: "Pending",
    },
    {
        date: "19 Nov, 2024",
        name: "Ethan Miller",
        totalDays: 5,
        startingDate: '30 Nov, 2024',
        endDate: '6 Dec, 2024',
        leaveType: "Paternity",
        status: "Pending",
    },
];

const columns = [
    { accessorKey: "date", header: "Date" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "totalDays", header: "Total days" },
    { accessorKey: "startingDate", header: "Start Date" },
    { accessorKey: "endDate", header: "End Date" },
    { accessorKey: "leaveType", header: "Leave type" },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status");
            const statusClass =
                status === "Approved" ? "text-green-500" : status === "Declined" ? "text-red-500" : "text-yellow-500";
            return <span className={statusClass}>{status}</span>;
        },
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => (
            <Button className='bg-gray-200 text-black hover:text-white' onClick={() => handleViewDetails(row.original)}>View Details</Button>
        ),
    },
];

export default function Dashboard() {
    const [sorting, setSorting] = React.useState([]);
    const [globalFilter, setGlobalFilter] = React.useState("");

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        state: { sorting, globalFilter },
    });

    return (
        <div className="p-2 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
                <StatusCard title="Available Leave types" percentage="12" />
                <StatusCard title="Registered employee" percentage="6" />
                <StatusCard title="Pending application" percentage="3" />
                <StatusCard title="Approved application" percentage="26" />
                <StatusCard title="Declined application" percentage="2" />
            </div>

            <div className="w-full">
                <div className="flex flex-col sm:flex-row sm:items-center items-start gap-3 justify-between mb-3">
                    <h1 className="text-xl font-semibold">New Leave request</h1>
                    <div className="relative w-80">
                        <Input
                            placeholder="Search by name..."
                            value={globalFilter}
                            onChange={(event) => setGlobalFilter(event.target.value)}
                            className="pl-10"
                        />
                        <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                    </div>
                </div>

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
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex items-center justify-end space-x-2 py-2">
                    <Button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <GrFormPrevious />
                    </Button>
                    <span>
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </span>
                    <Button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <GrFormNext />
                    </Button>
                </div>
            </div>
        </div>
    );
}
