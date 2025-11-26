import React, { useState } from "react"
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Link as MUILink,
  Paper,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import MainLayout from "../../components/MainLayout"
import { UserInfoHeader } from "../user-info-header/UserInfoHeader"
import DataTable from "../../components/DataTable"
import { ColumnsType } from "types"

// ====================== COLUMNS ======================

// Columns BEFORE Assigning (NO assignee column yet)
const BASE_COLUMNS: ColumnsType[] = [
  { id: "select", label: "Select", minWidth: 60 },
  { id: "siteName", label: "Site Name", minWidth: 120 },
  { id: "department", label: "Department", minWidth: 110 },
  { id: "businessUnit", label: "Business Unit", minWidth: 110 },
  { id: "equipmentType", label: "Equipment Type", minWidth: 130 },
  { id: "equipmentBucket", label: "Equipment Type Bucket", minWidth: 160 },
  { id: "parentTagName", label: "Parent Tag Name", minWidth: 160 },
  { id: "tag", label: "Tag", minWidth: 80 },
  { id: "edd", label: "EDD", minWidth: 140 },
  { id: "taskName", label: "Task Name", minWidth: 150 },
  { id: "dueDate", label: "Due Date", minWidth: 110 },
  { id: "taskId", label: "Task Id", minWidth: 110 },
  { id: "qaDate", label: "QA Date", minWidth: 110 },
]

// Columns AFTER Assigning
const COLUMNS_WITH_ASSIGNEE: ColumnsType[] = [
  ...BASE_COLUMNS,
  { id: "assignee", label: "Assignee", minWidth: 110 },
]

// ====================== ROWS ======================
const BASE_ROWS = [
  {
    select: "",
    siteName: "SHE UMR",
    department: "XYZ123",
    businessUnit: "BU123",
    equipmentType: "Pipe",
    equipmentBucket: "Pipe",
    parentTagName: "XYZ-12345-abcde",
    tag: "04A",
    edd: "Recheck Probability",
    taskName: "Recheck Probability",
    dueDate: "1/12/2023",
    taskId: "23876812",
    qaDate: "1/9/2023",
    assignee: "",
  },
  {
    select: "",
    siteName: "SHE UMR",
    department: "XYZ123",
    businessUnit: "BU123",
    equipmentType: "Pipe",
    equipmentBucket: "Pipe",
    parentTagName: "XYZ-12345-abcde",
    tag: "04A",
    edd: "Recheck Probability",
    taskName: "Recheck Probability",
    dueDate: "1/12/2023",
    taskId: "23876813",
    qaDate: "1/9/2023",
    assignee: "",
  },
  {
    select: "",
    siteName: "SHE UMR",
    department: "XYZ123",
    businessUnit: "BU123",
    equipmentType: "Pipe",
    equipmentBucket: "Pipe",
    parentTagName: "XYZ-12345-abcde",
    tag: "04A",
    edd: "Recheck Probability",
    taskName: "Recheck Probability",
    dueDate: "1/12/2023",
    taskId: "23876814",
    qaDate: "1/9/2023",
    assignee: "",
  },
  {
    select: "",
    siteName: "SHE UMR",
    department: "XYZ123",
    businessUnit: "BU123",
    equipmentType: "Pipe",
    equipmentBucket: "Pipe",
    parentTagName: "XYZ-12345-abcde",
    tag: "04A",
    edd: "Recheck Probability",
    taskName: "Recheck Probability",
    dueDate: "1/12/2023",
    taskId: "23876815",
    qaDate: "1/9/2023",
    assignee: "",
  },
]

type RowType = (typeof BASE_ROWS)[number]

// ====================== COMPONENT ======================

const CreateTaskList: React.FC = () => {
  const [rows, setRows] = useState(BASE_ROWS)

  // First Assign popup handlers
  const [assignee, setAssignee] = useState<string>("")
  const [pendingAssignee, setPendingAssignee] = useState<string>("")
  const [openDialog, setOpenDialog] = useState(false)
  const [showAssigneeColumn, setShowAssigneeColumn] = useState(false)

  // Check if all rows are assigned already
  const allAssigned = rows.every((r) => r.assignee.trim() !== "")

  // ========== FIRST TIME ASSIGN ==========
  const handleAssign = () => {
    if (!assignee) return
    setPendingAssignee(assignee)
    setOpenDialog(true)
  }

  const handleConfirmAssign = () => {
    setRows((prev) => prev.map((r) => ({ ...r, assignee: pendingAssignee })))
    setShowAssigneeColumn(true)
    setOpenDialog(false)
  }

  // ========== RE-ASSIGN POPUP STATE ==========
  const [editOpen, setEditOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState<RowType | null>(null)
  const [newAssignee, setNewAssignee] = useState<string>("")

  const handleAssigneeClick = (row: RowType) => {
    setSelectedRow(row)
    setNewAssignee("")
    setEditOpen(true)
  }

  const handleEditCancel = () => {
    setEditOpen(false)
    setSelectedRow(null)
    setNewAssignee("")
  }

  const handleEditSave = () => {
    if (!selectedRow || !newAssignee) return

    setRows((prev) =>
      prev.map((row) =>
        row.taskId === selectedRow.taskId
          ? { ...row, assignee: newAssignee } // update only that row
          : row,
      ),
    )

    setEditOpen(false)
    setSelectedRow(null)
    setNewAssignee("")
  }

  return (
    <MainLayout>
      <Box sx={{ p: 3, pt: "5rem" }}>
        <UserInfoHeader />

        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
          New Tasks List For Assigning
        </Typography>

        {/* TABLE */}
        <Paper variant="outlined" sx={{ borderRadius: 2, p: 1.5, mb: 3 }}>
          <DataTable
            title=""
            columns={showAssigneeColumn ? COLUMNS_WITH_ASSIGNEE : BASE_COLUMNS}
            rows={rows}
            isSearchable={false}
            isPagination={true}
            rawCount={10}
            showAssigneeEditIcon
            onAssigneeClick={handleAssigneeClick}
          />
        </Paper>

        {/* ASSIGN SECTION (Only visible before first assignment) */}
        {!allAssigned && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl size="small" sx={{ minWidth: 260 }}>
              <InputLabel>Select Assignees</InputLabel>
              <Select
                label="Select Assignees"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
              >
                <MenuItem value="">
                  <em>Select Assignees</em>
                </MenuItem>
                <MenuItem value="Peter">Peter</MenuItem>
                <MenuItem value="Robert Steven">Robert Steven</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="error"
              disabled={!assignee}
              sx={{ textTransform: "none", px: 4 }}
              onClick={handleAssign}
            >
              ASSIGN
            </Button>
          </Box>
        )}

        {/* SUCCESS POPUP */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogContent sx={{ textAlign: "center", p: 3 }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 56, color: "#4CAF50", mb: 2 }} />
            <Typography sx={{ mb: 2 }}>
              EDD Tag ID ABCD-1234 successfully assigned to the Assignee.
            </Typography>
            <Button variant="contained" color="error" onClick={handleConfirmAssign}>
              OK
            </Button>
          </DialogContent>
        </Dialog>

        {/* ⭐ EDIT / RE-ASSIGN POPUP */}
        <Dialog
          open={editOpen}
          onClose={handleEditCancel}
          PaperProps={{
            sx: {
              borderRadius: 2,
              minWidth: 520,
            },
          }}
        >
          <DialogTitle
            sx={{
              fontWeight: 700, // bold
              fontSize: "1rem",
              pb: 2, // padding bottom
              borderBottom: "1px solid #E0E0E0",
            }}
          >
            Edit Assign The Task List
          </DialogTitle>

          <DialogContent sx={{ pt: 2, pb: 3 }}>
            {/* Top info row – Site / Dept / BU */}
            <Box sx={{ display: "flex", mb: 3, mt: 1, gap: 6 }}>
              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: "#333333", fontWeight: 600 }} // label bold
                >
                  Site Name
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600 }} // value bold
                >
                  {selectedRow?.siteName}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" sx={{ color: "#333333", fontWeight: 600 }}>
                  Department
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: "#6D6E71" }}>
                  {selectedRow?.department}
                </Typography>
              </Box>

              <Box>
                <Typography variant="caption" sx={{ color: "#333333", fontWeight: 600 }}>
                  Business Unit
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: "#6D6E71" }}>
                  {selectedRow?.businessUnit}
                </Typography>
              </Box>
            </Box>

            {/* Current Assignee */}
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="caption"
                sx={{ color: "#333333", fontWeight: 600, fontSize: "0.8rem" }}
              >
                Current Assignee
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5, color: "#03A9F4" }}>
                Assign To{" "}
                <MUILink
                  underline="always"
                  sx={{ color: "#03A9F4", fontWeight: 600, cursor: "pointer" }}
                >
                  {selectedRow?.assignee}
                </MUILink>
              </Typography>
            </Box>

            {/* Select new assignee */}
            <FormControl fullWidth size="small" sx={{ mb: 3 }}>
              <InputLabel>Select New Assignees</InputLabel>
              <Select
                label="Select New Assignees"
                value={newAssignee}
                onChange={(e) => setNewAssignee(e.target.value as string)}
              >
                <MenuItem value="">
                  <em>Select New Assignees</em>
                </MenuItem>
                <MenuItem value="Peter">Peter</MenuItem>
                <MenuItem value="Robert Steven">Robert Steven</MenuItem>
              </Select>
            </FormControl>

            {/* Buttons */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button
                variant="outlined"
                onClick={handleEditCancel}
                sx={{
                  textTransform: "none",
                  px: 4,
                  borderColor: "#D5010B", // red border
                  color: "#D5010B",
                  "&:hover": {
                    borderColor: "#A00006",
                    backgroundColor: "rgba(213,1,11,0.04)",
                  },
                }}
              >
                CANCEL
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleEditSave}
                disabled={!newAssignee}
                sx={{
                  textTransform: "none",
                  px: 4,
                  borderColor: "#D5010B", // red border
                  backgroundColor: "#D5010B",
                  "&:hover": {
                    backgroundColor: "#A00006",
                    borderColor: "#A00006",
                  },
                }}
              >
                SAVE
              </Button>
            </Box>
          </DialogContent>
        </Dialog>
      </Box>
    </MainLayout>
  )
}

export default CreateTaskList
