'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { leaveTypes } from '@/components/ui/leavetypesdata';
import EditLeaveTypeModal from './editleavetypemodal';
import DeleteLeaveTypeModal from './deleteleavetpemodal';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";

const ManageLeaveTypes = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [leaveTypesState, setLeaveTypes] = useState(leaveTypes);
    const [selectedLeaveType, setSelectedLeaveType] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const filteredData = leaveTypesState.filter(
        (type) =>
            type.leaveType &&
            type.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (leaveType) => {
        setSelectedLeaveType(leaveType);
        setIsEditModalOpen(true);
    };

    const handleDelete = (leaveType) => {
        setSelectedLeaveType(leaveType);
        setIsDeleteModalOpen(true);
    };

    const handleSaveEdit = (updatedLeaveType) => {
        const updatedLeaveTypes = leaveTypesState.map((type) =>
            type.id === updatedLeaveType.id ? updatedLeaveType : type
        );
        setLeaveTypes(updatedLeaveTypes);
        setIsEditModalOpen(false);
    };

    const handleDeleteConfirm = () => {
        const updatedLeaveTypes = leaveTypesState.filter(
            (type) => type.id !== selectedLeaveType.id
        );
        setLeaveTypes(updatedLeaveTypes);
        setIsDeleteModalOpen(false);
    };

    const leaveTypeColumns = [
        { accessorKey: "leaveType", header: "Leave Type" },
        { accessorKey: "givenleavedays", header: "Given Days" },
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



    const table = useReactTable({
        data: filteredData,
        columns: leaveTypeColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold">Manage Leave Types</h1>
                <Input
                    placeholder="Search records"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                />
            </div>

            <div className="overflow-auto">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableCell key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
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
                                <TableCell
                                    colSpan={leaveTypeColumns.length}
                                    className="text-center"
                                >
                                    No data available.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-600">
                    Showing {table.getState().pagination.pageIndex + 1} of {table.getPageCount()} entries
                </span>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>

            {isEditModalOpen && (
                <EditLeaveTypeModal
                    leaveType={selectedLeaveType}
                    onSave={handleSaveEdit}
                    onClose={() => setIsEditModalOpen(false)}
                />
            )}
            {isDeleteModalOpen && (
                <DeleteLeaveTypeModal
                    leaveType={selectedLeaveType}
                    onDelete={handleDeleteConfirm}
                    onClose={() => setIsDeleteModalOpen(false)}
                />
            )}
        </div>
    );
};

export default ManageLeaveTypes;
