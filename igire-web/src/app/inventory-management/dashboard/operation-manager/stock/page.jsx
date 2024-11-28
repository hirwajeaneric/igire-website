"use client";

import React, { useState, useMemo } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { FaPlusCircle, FaFileDownload } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import EditStock from "./EditStock";
import DeleteStock from "./DeleteStock";
import jsPDF from "jspdf";
import "jspdf-autotable";

const data = [
  {
    id: 1,
    category: "Furniture",
    name: "Table",
    brand: "Product A",
    dimensions: "5x3 ft",
    location: "Class 1",
    status: "Available",
    condition: "New",
    dateOfEntry: "2023-09-01",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    category: "Electronics",
    name: "Projector",
    brand: "Brand B",
    dimensions: "12x8 in",
    location: "Office",
    status: "Borrowed",
    condition: "Used",
    dateOfEntry: "2023-09-15",
    borrowedBy: {
      borrowerName: "Jane Smith",
      nationalId: "987654321",
      productId: "002",
      borrowingDate: "2023-11-01",
      returningDate: "2023-11-10",
    },
    image: "https://via.placeholder.com/100",
  },
  {
    id: 1,
    category: "Furniture",
    name: "Table",
    brand: "Product A",
    dimensions: "5x3 ft",
    location: "Class 1",
    status: "Available",
    condition: "New",
    dateOfEntry: "2023-09-01",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    category: "Electronics",
    name: "Projector",
    brand: "Brand B",
    dimensions: "12x8 in",
    location: "Office",
    status: "Borrowed",
    condition: "Used",
    dateOfEntry: "2023-09-15",
    borrowedBy: {
      borrowerName: "Jane Smith",
      nationalId: "987654321",
      productId: "002",
      borrowingDate: "2023-11-01",
      returningDate: "2023-11-10",
    },
    image: "https://via.placeholder.com/100",
  },
  {
    id: 1,
    category: "Furniture",
    name: "Table",
    brand: "Product A",
    dimensions: "5x3 ft",
    location: "Class 1",
    status: "Available",
    condition: "New",
    dateOfEntry: "2023-09-01",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    category: "Electronics",
    name: "Projector",
    brand: "Brand B",
    dimensions: "12x8 in",
    location: "Office",
    status: "Borrowed",
    condition: "Used",
    dateOfEntry: "2023-09-15",
    borrowedBy: {
      borrowerName: "Jane Smith",
      nationalId: "987654321",
      productId: "002",
      borrowingDate: "2023-11-01",
      returningDate: "2023-11-10",
    },
    image: "https://via.placeholder.com/100",
  },
];

export default function Stock() {
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  
  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(productSearchTerm.toLowerCase()) &&
        (locationFilter === "" || item.location.includes(locationFilter))
    );
  }, [productSearchTerm, locationFilter]);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const tableHeaders = [
      "ID",
      "Category",
      "Name",
      "Brand",
      "Dimensions",
      "Location",
      "Status",
      "Condition",
      "Date of Entry",
      "Borrower Name",
    ];

    const rows = data.map((item) => [
      item.id || "N/A",
      item.category || "N/A",
      item.name || "N/A",
      item.brand || "N/A",
      item.dimensions || "N/A",
      item.location || "N/A",
      item.status || "N/A",
      item.condition || "N/A",
      item.dateOfEntry || "N/A",
      item.borrowedBy?.borrowerName || "N/A",
    ]);

    doc.autoTable({
      head: [tableHeaders],
      body: rows,
    });

    doc.save("Stock.pdf");
  };

  const table = useReactTable({
    data: filteredData,
    columns: [
      {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => <div>{row.original.id}</div>,
      },
      {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => (
          <div>
            <img
              src={row.original.image}
              alt={row.original.name}
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
          </div>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => <div>{row.original.category}</div>,
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <div>{row.original.name}</div>,
      },
      {
        accessorKey: "brand",
        header: "Brand",
        cell: ({ row }) => <div>{row.original.brand}</div>,
      },
      {
        accessorKey: "dimensions",
        header: "Dimensions",
        cell: ({ row }) => <div>{row.original.dimensions}</div>,
      },
      {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => <div>{row.original.location}</div>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <div>{row.original.status}</div>,
      },
      {
        accessorKey: "condition",
        header: "Condition",
        cell: ({ row }) => {
          const condition = row.original.condition;
          const getColor = () => {
            if (condition === "New") return "text-green-600";
            if (condition === "Used") return "text-yellow-600";
            if (condition === "Damaged") return "text-red-600";
            return "text-gray-600";
          };
          return <div className={getColor()}>{condition}</div>;
        },
      },
      {
        accessorKey: "dateOfEntry",
        header: "Date of Entry",
        cell: ({ row }) => <div>{row.original.dateOfEntry}</div>,
      },
      {
        accessorKey: "borrowedBy.borrowerName",
        header: "Borrower Name",
        cell: ({ row }) => (
          <div>{row.original.borrowedBy?.borrowerName || "N/A"}</div>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  <MdMoreHoriz size={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedRowData(row.original);
                    setOpenEditDialog(true);
                  }}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedRowData(row.original);
                    setOpenDeleteDialog(true);
                  }}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
      },
    ],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
  });

  return (
    <div className="w-full px-6">
      {/* Search and Filters */}
      <div className="flex items-center justify-between mt-10 mb-3 font-ibm">
        <p className="py-4 text-xl font-semibold">Stock Overview</p>
        <div className="relative max-w-lg">
          <HiOutlineSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search product..."
            value={productSearchTerm}
            onChange={(e) => setProductSearchTerm(e.target.value)}
            className="border pl-10 pr-20 rounded-md py-2 w-full"
          />
        </div>
        <div className="flex space-x-2">
          <select
            className="border px-1 text-[15px] py-2 rounded-md"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="">Filter Location</option>
            <option value="Class 1">Class 1</option>
            <option value="Class 2">Class 2</option>
            <option value="Office">Office</option>
          </select>
          <button
            onClick={handleExportPDF}
            className="flex items-center text-[15px] px-1 py-2 border rounded-md bg-white"
          >
            <FaFileDownload className="mr-1" /> <span>Download</span>
          </button>
          <a href="stock/addProduct">
            <button className="flex items-center px-1 py-2 text-[15px] border rounded-md bg-black text-white">
              <FaPlusCircle className="mr-1" /> <span>Add stock</span>
            </button>
          </a>
        </div>
      </div>
      {/* Table */}
      <div className="rounded-md border bg-white mt-12">
        <Table>
          <TableHeader className="bg-[#EFF4FA]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
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
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-end mt-4">
  <Button
    onClick={() => table.previousPage()}
    disabled={!table.getCanPreviousPage()}
    className="px-1 py-1 flex items-center"
  >
    <BiChevronLeft size={20} className="" />
  </Button>
  <span className="mx-2">
    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
  </span>
  
  <Button
    onClick={() => table.nextPage()}
    disabled={!table.getCanNextPage()}
    className="px-1 py-1 flex items-center"
  >
    <BiChevronRight size={20} className="" />
  </Button>
</div>
<EditStock
  open={openEditDialog}
  onOpenChange={setOpenEditDialog}
  selectedRowData={selectedRowData}
  onSave={() => {
    // Save logic goes here
    setOpenEditDialog(false);
  }}
/>

<DeleteStock
  open={openDeleteDialog}
  onOpenChange={setOpenDeleteDialog}
  onDelete={() => {
    // Delete logic goes here
    setOpenDeleteDialog(false);
  }}
/>


    </div>
  );
}
