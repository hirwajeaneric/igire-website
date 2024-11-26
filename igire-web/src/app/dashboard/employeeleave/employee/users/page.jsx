'use client';

import React, { useState } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import AddUserModal from './addUserMoal';
import EditUserModal from './editUserModal';
import DeleteUserModal from './deleteUserModal';
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
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data = [
  { name: "Carol Reed", employeeId: "IRO_EMP_0029", position: "Volunteer", joinedOn: "2021-03-03", leavebalance: "12.5", status: "Active" },
  { name: "Danny Wood", employeeId: "IRO_EMP_0014", position: "Apprentice", joinedOn: "2021-03-04", leavebalance: "9", status: "Active" },
  { name: "Anna Maria", employeeId: "IRO_EMP_0019", position: "Apprentice", joinedOn: "2021-03-04", leavebalance: "9", status: "Active" },
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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [globalFilter, setGlobalFilter] = useState("");
  const [users, setUsers] = useState(data); 
  const [error, setError] = useState(null);

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
          <p className="text-xl font-semibold">Users under my supervision</p>
          <div className="relative sm:w-80 w-full">
            <Input
              placeholder="Search user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <HiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        <div className="w-full ">
          

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
            <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              <GrFormPrevious />
            </Button>
            <span>
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
            <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              <GrFormNext />
            </Button>
          </div>
        </div>
      </div>

      <AddUserModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <EditUserModal isOpen={false} onClose={() => { }} user={null} setUsers={setUsers} setError={setError} />
      <DeleteUserModal isOpen={false} onClose={() => { }} userIdToDelete={null} users={users} setUsers={setUsers} setError={setError} />
    </>
  );
};

export default ManageUsers;
