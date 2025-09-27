import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
 
export interface MainLayoutProps {
  children: React.ReactNode;
}
 
export interface DataTableProps {
  columns: GridColDef[];
  rows: any[];
  pageSizeOptions?: number[];
}