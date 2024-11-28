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
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { HiOutlineSearch } from "react-icons/hi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePathname } from "next/navigation";

const data = [
  {
    date: "21 Nov, 2024",
    name: "John Doe",
    totalDays: 5,
    startingDate: "27 Nov, 2024",
    endDate: "1 Dec, 2024",
    leaveType: "Annual Leave",
    status: "Pending",
  },
];

const columns = [
  {
    accessorKey: "date",
    header: () => "Date",
  },
  {
    accessorKey: "name",
    header: () => "Full Name",
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
  {
    accessorKey: "status",
    header: () => "Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      let statusClass = "text-yellow-500";
      if (status === "Approved") statusClass = "text-green-500";
      if (status === "Declined") statusClass = "text-red-500";

      return <div className={statusClass}>{status}</div>;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const pathname = usePathname();

      return (
        <a href="/dashboard/employeeleave/employee/receivedleaverequest/requestdetails"><button
          className="text-blue-500 hover:underline"
        >
          View Details
        </button></a>
      );
    },
  },
];

export default function Request() {
  const [sorting, setSorting] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [selectedRequest, setSelectedRequest] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

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

  return (
    <div className="w-full sm:p-6 p-2">
      <div className="flex flex-col sm:flex-row sm:items-center items-start gap-3 justify-between mb-3">
        <h1 className="text-xl font-semibold">New Request</h1>
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
