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
import { useFetchOrders, useFetchOrdersCount } from '../api/api.orders';
import TableWrapper from './table-wrapper';

const TableContainer: React.FC = () => {
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
    size: pagination.pageSize,
  });
  const { data, isLoading, isRefetching, isError, refetch } =
    useFetchOrders(queryParams);
  const { data: totalCount } = useFetchOrdersCount({
    status: queryParams.status,
  });
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
    manualPagination: true,
    rowCount: totalCount ?? 0,
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
      isRefetching={isRefetching}
      isLoading={isLoading}
      isError={isError || (!isLoading && !data)}
      retry={refetch}
    />
  );
};
export default TableContainer;
