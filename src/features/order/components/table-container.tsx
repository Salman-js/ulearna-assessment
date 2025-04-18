'use client';

import { columns, DataTable } from '@/components/data-table';
import {
  ITableOrder,
  OrderTableQuery,
} from '@/features/order/interface/interface.order';
import React, { useEffect, useState } from 'react';
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
import { useFetchOrders } from '../api/api.orders';

type TableContainerProps = {
  orders: ITableOrder[];
};

const TableContainer: React.FC<TableContainerProps> = ({
  orders: initialData,
}) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [queryParams, setQueryParams] = useState<OrderTableQuery>({
    page: pagination.pageIndex + 1,
    period: 'one-month',
    size: pagination.pageSize,
  });
  const { data, refetch } = useFetchOrders(initialData, queryParams);
  const tableData: ITableOrder[] = data ?? [];

  const table = useReactTable({
    data: tableData,
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
  useEffect(() => {
    refetch();
  }, [queryParams, pagination]);
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
