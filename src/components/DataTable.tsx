import React, { JSX, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TablePagination,
  Paper,
  IconButton,
  TableSortLabel,
  Link as MUILink,
  Skeleton,
} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ArrowsIcon } from '../icons/ArrowsIcon';
import { SortingOrderIcon } from '../icons/SortingOrderIcon';
import { useNavigate } from 'react-router-dom';

type Column = {
  id: string | number;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  sortable?: boolean;
};
type Order = 'asc' | 'desc';
type Row = { [key: string]: string | number };

interface DataTableProps {
  title?: string | React.ReactNode
  columns: Column[]
  rows: Row[]
  sourceLink?: string
  navigateTo?: string
  showActions?: {
    view?: boolean
    edit?: boolean
    delete?: boolean
  }
  onView?: (row: Row) => void
  onEdit?: (row: Row) => void
  onDelete?: (row: Row) => void
  isSearchable?: boolean
  isPagination?: boolean
  rawCount?: number
  onClick?: (value: string) => void
  isLoading?: boolean
  children?: JSX.Element | JSX.Element[]
}

const DataTable: React.FC<DataTableProps> = ({
  title,
  columns,
  rows,
  sourceLink,
  navigateTo = "",
  showActions = { view: false, edit: false, delete: false },
  onView,
  onEdit,
  onDelete,
  onClick,
  isSearchable = false,
  isPagination = false,
  isLoading = false,
  rawCount = 6,
  children,
}) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(rawCount)
  const [search, setSearch] = useState("")
  const [orderBy, setOrderBy] = useState<string | number>("")
  const [order, setOrder] = useState<Order>("asc")
  const navigate = useNavigate();
  const skeletonRowsCount = rawCount;

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage)
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const handleSort = (columnId: string | number) => {
    const isAsc = orderBy === columnId && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(columnId)
  }

  const sortedRows = [...rows].sort((a, b) => {
    if (!orderBy) return 0
    const aValue = a[orderBy]
    const bValue = b[orderBy]
    if (aValue < bValue) return order === "asc" ? -1 : 1
    if (aValue > bValue) return order === "asc" ? 1 : -1
    return 0
  })

  const filteredRows = sortedRows.filter((row) =>
    Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase())
  )

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "red"
      case "High": return "orange"
      case "Medium": return "purple"
      case "Low": return "blue"
      default: return "inherit"
    }
  }

  const getDueColor = (value: string | number) => {
    const n = Number(value)
    if (n === 0 || n === 1) return "#D5010B"   
    if (n === 2) return "#FF9800"
    if (n === 3 || n === 5) return "#4CAF50"  
    return "inherit"
  }

  const getStatusColor = (status: string) => {
    if (status.includes("In Progress")) return "orange"          
    if (status.includes("New Task")) return "blue"
    if (status.includes("MSP Review Completed")) return "green"
    if (status.includes("Under MSP review")) return "#0087a1"
    if (status.includes("High")) return "#FF9800"
    if (status.includes("Critical")) return "#D5010B"
    if (status.includes("Insufficient Data")) return "#FF9800"
    if (status.includes("Sufficient Data")) return "#03A9F4"
    if (status.includes("Completed")) return "#4CAF50"
    if (status.includes("Received Data")) return "#4CAF50"

    return "#5A5A5A"
  }

  const getEslHealthStatus = (status: string) => {
    if (status.includes("All Okay")) return "#4CAF50"
    if (status.includes("Missing Documents")) return "#D5010B"
    if (status.includes("Overdue")) return "#FF9800"
    return "#5A5A5A"
  }

  const renderSortIcons = (): JSX.Element => (
    <Box sx={{ display: "flex", flexDirection: "row", ml: 1, gap: 1 }}>
      <ArrowsIcon />
      {/* <SortingOrderIcon /> */}
    </Box>
  )

  return (
    <Paper elevation={0} sx={{ width: "100%", overflow: "hidden" }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" px={1} py={1}>
        <Typography width="100%" variant="subtitle2" fontSize="13px" color="#5A5A5A" fontWeight={600}>
          {title}
        </Typography>
        {isSearchable && (
          <Box display="flex" alignItems="center" gap={1}>
            <TextField
              size="small"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{ endAdornment: <SearchIcon fontSize="small" color="action" /> }}
            />
          </Box>
        )}
      </Box>

      {/* Table */}
      <Box sx={{ boxShadow: 3, border: "1px solid #ccc;", borderRadius: "10px;", paddingBottom: "5px" }}>
        <TableContainer sx={{ maxHeight: "65vh", borderRadius: "10px;" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align || "left"}
                    sx={{
                      fontWeight: "bold",
                      fontSize: "0.75rem",
                      backgroundColor: "#FDF3F3",
                      padding: "1.5rem",
                      minWidth: column.minWidth || 100,
                      cursor: column.sortable ? "pointer" : "default",
                      lineHeight: "1",
                    }}
                    sortDirection={orderBy === column.id ? order : false}
                  >
                    {column.sortable ? (
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : "asc"}
                        onClick={() => handleSort(column.id)}
                        hideSortIcon={false}
                        IconComponent={renderSortIcons}
                        sx={{ fontSize: "0.85rem" }}
                      >
                        {column.label}
                      </TableSortLabel>
                    ) : (
                      column.label
                    )}
                  </TableCell>
                ))}
                {(showActions.view || showActions.edit || showActions.delete) && (
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: "0.85rem",
                      backgroundColor: "#FDF3F3",
                      textAlign: "center",
                      position: "sticky",
                      right: 0,
                      zIndex: 3,
                      lineHeight: "1",
                    }}
                  >
                    Actions
                  </TableCell>
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {isLoading
                ? Array.from({ length: skeletonRowsCount }).map((_, i) => (
                  <TableRow key={i}>
                    {columns.map((col) => (
                      <TableCell key={col.id}>
                        <Skeleton variant="text" width="80%" height={20} />
                      </TableCell>
                    ))}
                    {(showActions.view || showActions.edit || showActions.delete) && (
                      <TableCell align="center">
                        <Box display="flex" justifyContent="center" gap={1}>
                          <Skeleton variant="circular" width={24} height={24} />
                          <Skeleton variant="circular" width={24} height={24} />
                          <Skeleton variant="circular" width={24} height={24} />
                        </Box>
                      </TableCell>
                    )}
                  </TableRow>
                ))
                : filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => (
                    <TableRow  key={i}>
                      {columns.map((column) => {
                        const value = row[column.id];

                        // link cell
                        if (sourceLink && column.id === sourceLink) {
                          return (
                            <TableCell sx = {{padding:'2rem'}} key={column.id}>
                              <MUILink
                                sx={{ cursor: "pointer", color: "#1976d2" }}
                                onClick={() => onClick?.(value.toString())}
                                underline="none"
                              >
                                {value}
                              </MUILink>
                            </TableCell>
                          );
                        }

                        // Severity cell
                        if (column.id === "severityName" || column.id === "Severity") {
                          return (
                            <TableCell
                              key={column.id}
                              sx={{
                                color: getSeverityColor(String(value)),
                                fontWeight: 600,
                                padding: "2rem",
                                lineHeight: "1 !important",

                              }}
                            >
                              {value}
                            </TableCell>
                          );
                        }
                        if (column.id === "dueInDays") {
                          return (
                            <TableCell
                              key={column.id}
                              sx={{
                                color: getDueColor(value),
                                fontWeight: 700,
                                padding: "2rem",
                                lineHeight: "1 !important",
                              }}
                            >
                              {value}
                            </TableCell>
                          );
                        }

                        if (column.id === "documentStatusName") {
                          return (
                            <TableCell
                              key={column.id}
                              sx={{
                                color: getStatusColor(String(value)),
                                fontWeight: 600,
                                padding: "2rem",
                                lineHeight: "1 !important",
                              }}
                            >
                              {value}
                            </TableCell>
                          );
                        }
                        
                        if (column.id === "statusName") {
                          return (
                            <TableCell
                              key={column.id}
                              sx={{
                                color: getStatusColor(String(value)),
                                fontWeight: 600,
                                padding: "2rem",
                                lineHeight: "1 !important",
                              }}
                            >
                              {value}
                            </TableCell>
                          );
                        }
                        
                        if (column.id === "eslHealth") {
                            return (
                              <TableCell
                                key={column.id}
                                sx={{
                                  color: getEslHealthStatus(String(value)),
                                  fontWeight: 600,
                                  padding: "2rem",
                                  lineHeight: "1 !important",
                                }}
                              >
                                {value}
                              </TableCell>
                            )
                          }
                        return (
                          <TableCell key={column.id} sx={{ padding: "2rem", lineHeight: "1 !important" }}>
                            {value}
                          </TableCell>
                        );
                      })}

                      {(showActions.view || showActions.edit || showActions.delete) && (
                        <TableCell
                          align="center"
                          sx={(theme) => ({
                            position: "sticky",
                            right: 0,
                            zIndex: 2,
                            padding: "2rem",
                            backgroundColor: theme.palette.background.paper,
                          })}
                        >
                          <Box display="flex" justifyContent="center" gap={1}>
                            {showActions.view && (
                              <IconButton onClick={() => onView?.(row)}>
                                <VisibilityIcon fontSize="small" />
                              </IconButton>
                            )}
                            {showActions.edit && (
                              <IconButton onClick={() => onEdit?.(row)}>
                                <EditIcon fontSize="small" />
                              </IconButton>
                            )}
                            {showActions.delete && (
                              <IconButton onClick={() => onDelete?.(row)}>
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            )}
                          </Box>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box>{children}</Box>

        {isPagination  && (
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ borderTop: "1px solid #ddd" }}
          />
        )}
      </Box>
    </Paper>
  )
}

export default DataTable;
