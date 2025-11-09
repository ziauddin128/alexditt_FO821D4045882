"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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

import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pagination } from "../ui/pagination";
import { Paginations } from "./pagination";

interface DataTableProps<TData, TValue> {
  children?: React.ReactNode;
  tableBar?: React.ReactNode;
  tableTitle?: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  page?: number;
  pageSize?: number;
  total?: number;
  onPageChange?: (page: number) => void;
  addDataButton?: React.ReactNode;
  setOpen?: (open: boolean) => void;
  open?: boolean;
}

export function DataTable<TData, TValue>({
  children,
  tableBar,
  tableTitle,
  addDataButton,
  columns,
  data,
  page,
  pageSize,
  total,
  onPageChange,
  setOpen,
  open,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="">
      <div className="rounded-md bg-[#131824] text-white ">
        {/* table top bar */}
        {children && <div className="px-4 pt-4 mb-2">{children}</div>}
        {/* <div className="flex flex-col md:flex-row items-start md:items-center justify-between rounded-md px-6 pt-4 gap-3"> */}
        {/* <h2 className="text-lg font-semibold text-white">
          {tableTitle}
        </h2> */}
        <>
          {/* {addDataButton || (
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-100">
                  <Search className="w-4 h-4" />
                </span>
                <Input
                  type="text"
                  placeholder="Search anything here"
                  className="pl-9 pr-4 py-2 w-56 rounded-md  border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#5E17EB] text-sm"
                />
              </div>
              <Button
                onClick={() => setOpen && setOpen(!open)}
                variant="outline"
                className="flex items-center gap-2  text-gray-200 font-medium cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>
            </div>       
          )} */}
        </>
        {/* </div> */}
        <div className="mx-4  overflow-hidden ">
          <Table className="">
            <TableHeader className=" ">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  className="hover:bg-[#131824] border-[#1B202C]"
                  key={headerGroup.id}
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="font-semibold  p-4 text-[#fff] "
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="text-[#A5A5AB] hover:bg-[#131824] border-[#1B202C]"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell className="p-4 " key={cell.id}>
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
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="my-6 pb-4">
        <Paginations
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
