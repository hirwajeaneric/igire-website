"use client";

import * as React from "react";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { HiOutlineSearch } from "react-icons/hi";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const data = [
    {
        date: "5 Feb, 2024",
        totalDays: 8,
        startingDate: '10 Feb, 2024',
        endDate: '18 Mar, 2024',
        leaveType: "casual",
    },
    {
        date: "21 Nov, 2023",
        totalDays: 8,
        startingDate: '24 Nov, 2023',
        endDate: '2 Dec, 2023',
        leaveType: "Sick",
    },
    {
        date: "19 Nov, 2023",
        totalDays: 5,
        startingDate: '30 Nov, 2023',
        endDate: '6 Dec, 2023',
        leaveType: "Paternity",
    },
    {
        date: "1 Jun, 2020",
        totalDays: 5,
        startingDate: '3 Jun, 2020',
        endDate: '6 Jun, 2020',
        leaveType: "Paternity",
    },
];

const columns = [
    {
        accessorKey: "date",
        header: () => "Date",
    },
    {
        accessorKey: "totalDays",
        header: () => "Total days",
    },
    {
        accessorKey: "startingDate",
        header: () => "Start Date",
    },
    {
        accessorKey: "endDate",
        header: () => "End Date",
    },
    {
        accessorKey: "leaveType",
        header: "Leave type",
    },
];

export default function MyRequest() {
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
        state: {
            sorting,
            globalFilter,
        },
    });

    const handleViewDetails = (row) => {
        alert(`Viewing details for: ${row.name}`);
    };

    return (
        <div className="w-full sm:p-6 p-2">
            <div className="flex flex-col sm:flex-row sm:items-center items-start gap-3 justify-between mb-3">
                <h1 className="text-xl font-semibold">Leave History</h1>
                <div className="relative w-80 ">
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
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
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
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
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
    );
}
