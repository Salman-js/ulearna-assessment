'use client';

import { columns, DataTable } from '@/components/data-table';
import { ITableOrder } from '@/features/order/interface/interface.order';
import { OrderTableQuery } from '@/interface/interface.global';
import React, { useState } from 'react';
import { useFetchOrders } from '../api/api.orders';
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { OrderStatus } from '@prisma/client';
import { set } from 'zod';

type TableContainerProps = {
  orders: ITableOrder[];
};

const TableContainer: React.FC<TableContainerProps> = ({
  orders: initialData,
}) => {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 20,
  });
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [queryParams, setQueryParams] = useState<OrderTableQuery>({
    page: pagination.pageIndex + 1,
    period: 'one-month',
    size: pagination.pageSize,
  });
  const { data } = useFetchOrders(initialData, queryParams);

  const table = useReactTable({
    data: data ?? [],
    columns: columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
  const handleStatusChange = (value: OrderStatus | undefined) => {
    setQueryParams((prev) => ({
      ...prev,
      status: value,
    }));
  };
  return (
    <DataTable
      data={data ?? []}
      table={table}
      onStatusChange={handleStatusChange}
      status={queryParams.status}
    />
  );
};
export default TableContainer;
