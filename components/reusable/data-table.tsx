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
                        className="font-semibold   p-4 text-[#fff] "
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
                <TableRow className="hover:bg-transparent">
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
      {pageSize && (
        <div className="my-6 pb-4">
          <Paginations
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}
