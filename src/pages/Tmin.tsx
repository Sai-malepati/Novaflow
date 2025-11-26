import React, { useEffect, useState } from "react"
import { Box, Typography, CircularProgress, Dialog } from "@mui/material"
import MainLayout from "../components/MainLayout"
import { UserInfoHeader } from "./user-info-header/UserInfoHeader"
import DataTable from "../components/DataTable"
import { useLocation, useParams, useNavigate } from "react-router-dom"
import { ColumnsType } from "types"
import { useGetItemsQuery } from "store/api"
import SvgModalAnimator from "components/SvgModalAnimator"
import Cookies from "js-cookie"

// ===================== T-MIN CONFIG =====================

const TMIN_COLUMNS: ColumnsType[] = [
  { id: "eslid", label: "ESL ID", sortable: true },
  { id: "eslHealth", label: "ESL Health", sortable: true },
  { id: "assignedDate", label: "Assigned Date", sortable: true },
  { id: "deadLineDate", label: "Due Date", sortable: true },
  { id: "statusName", label: "Execution Status", minWidth: 120, sortable: true },
  { id: "severityName", label: "Severity", sortable: true },
  { id: "site", label: "Site", sortable: true },
  { id: "unitName", label: "Unit", sortable: true },
  { id: "equipmentTypeName", label: "Equipment Type", sortable: true },
]

// ===================== HIT & LEAK CONFIG (STATIC) =====================

// Columns exactly as in Adobe: Tag ID, EDD ID, Task Name, Status, Assignee, Assigned Date, Due Date
const HIT_LEAK_COLUMNS: ColumnsType[] = [
  { id: "tagId", label: "Tag ID", sortable: true },
  { id: "eddId", label: "EDD ID", sortable: true },
  { id: "taskName", label: "Task Name", sortable: true },
  { id: "statusName", label: "Status", sortable: true },
  { id: "assignee", label: "Assignee", sortable: true },
  { id: "assignedDate", label: "Assigned Date", sortable: true },
  { id: "deadLineDate", label: "Due Date", sortable: true },
]

// Static rows copied from the Adobe Hit & Leak design
const HIT_LEAK_ROWS = [
  {
    tagId: "3456789",
    eddId: "107011",
    taskName: "ABCD-1234",
    statusName: "New",
    assignee: "Peter",
    assignedDate: "30/07/2025",
    deadLineDate: "01/08/2025",
  },
  {
    tagId: "3456789",
    eddId: "107012",
    taskName: "ABCD-1234",
    statusName: "New",
    assignee: "Steven R.",
    assignedDate: "30/07/2025",
    deadLineDate: "01/08/2025",
  },
  {
    tagId: "3456789",
    eddId: "107013",
    taskName: "ASDFG-3456",
    statusName: "New",
    assignee: "Steven R.",
    assignedDate: "30/07/2025",
    deadLineDate: "02/08/2025",
  },
  {
    tagId: "3456789",
    eddId: "107014",
    taskName: "ZXCV-23456",
    statusName: "In Progress",
    assignee: "Steven R.",
    assignedDate: "30/07/2025",
    deadLineDate: "30/07/2025",
  },
  {
    tagId: "3456789",
    eddId: "107015",
    taskName: "XCVBNM-67",
    statusName: "In Progress",
    assignee: "Steven R.",
    assignedDate: "30/07/2025",
    deadLineDate: "30/07/2025",
  },
  {
    tagId: "3456789",
    eddId: "107020",
    taskName: "SDFG-5678",
    statusName: "In Progress",
    assignee: "Peter",
    assignedDate: "30/07/2025",
    deadLineDate: "30/07/2025",
  },
  {
    tagId: "3456789",
    eddId: "107017",
    taskName: "DFGHJ-456",
    statusName: "Completed",
    assignee: "Peter",
    assignedDate: "30/07/2025",
    deadLineDate: "02/08/2025",
  },
  {
    tagId: "3456789",
    eddId: "107018",
    taskName: "WERTYU-097",
    statusName: "Completed",
    assignee: "Peter",
    assignedDate: "30/07/2025",
    deadLineDate: "30/07/2025",
  },
]

const TMin: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams<{ id?: string }>()
  const { data: esls = [] } = useGetItemsQuery("Esls")

  // --------- Workflow flags from cookie ----------
  const workflow = Cookies.get("workflow")
  const workflowTypes = workflow ? JSON.parse(workflow) : {}
  const isTmin = !!workflowTypes?.tmin
  const isHitLeak = !!workflowTypes?.hitLeak

  const taskIdFromState = (location.state as any)?.taskId as string | undefined
  const taskId = taskIdFromState || params.id

  const [openModal, setOpenModal] = useState(false)
  const [selectedEsl, setSelectedEsl] = useState<any>(null)

  const handleClick = (eslId: string) => {
    // For Hit & Leak we just show static table; no click behaviour
    if (!isTmin) return

    const row = esls.find((item: any) => item.eslid === Number(eslId))
    if (row) {
      setSelectedEsl(row)
      setOpenModal(true)
    } else {
      console.warn("No row found for ESL ID:", eslId)
    }
  }

  const handleClose = (_event: object, reason: string) => {
    if (reason === "backdropClick") return
    setOpenModal(false)
  }

  useEffect(() => {
    if (openModal && selectedEsl && isTmin) {
      const timer = setTimeout(() => {
        setOpenModal(false)
        sessionStorage.setItem("eslData", JSON.stringify(selectedEsl))
        navigate("/tmin-review")
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [openModal, selectedEsl, navigate, isTmin])

  // --------- Table config based on workflow ----------
  const tableTitle = isHitLeak ? "TASKS LIST STATUS" : "END OF SERVICE LIFE MANAGEMENT"

  const columns = isHitLeak ? HIT_LEAK_COLUMNS : TMIN_COLUMNS
  const tableRows = isHitLeak ? HIT_LEAK_ROWS : esls

  return (
    <MainLayout>
      <Box sx={{ p: 3, pt: "3.4rem" }}>
        <UserInfoHeader />

        {/* Only show the ESL ID info text for T-Min flow */}
        {taskId && isTmin && (
          <Typography variant="subtitle2" sx={{ mb: 1, color: "text.secondary" }}>
            Showing details (clicked) for ESL ID: <strong>{taskId}</strong>
          </Typography>
        )}

        <DataTable
          title={tableTitle}
          columns={columns}
          rows={tableRows}
          rawCount={10}
          isSearchable
          isPagination={true}
          // T-Min keeps clickable ESL link + redirect modal
          sourceLink={isTmin ? "eslid" : undefined}
          navigateTo={isTmin ? "/tmin-review" : ""}
          onClick={isTmin ? handleClick : undefined}
          // Hit & Leak shows Actions column with eye icon (static for now)
          showActions={isHitLeak ? { view: true } : undefined}
        />

        {/* Modal only for T-Min workflow */}
        {isTmin && (
          <Dialog open={openModal} onClose={handleClose} disableEscapeKeyDown={true}>
            <Box
              onClick={(e) => e.preventDefault()}
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                p: 2,
                borderRadius: 1.5,
                boxShadow: 20,
                textAlign: "center",
                width: 220,
                minHeight: 160,
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                ESL ID: {selectedEsl?.eslId}
              </Typography>
              <Typography variant="body2" sx={{ mt: 0.5 }}>
                Redirecting to review...
              </Typography>
              <Box sx={{ mt: 1 }}>
                <SvgModalAnimator
                  open={openModal}
                  onClose={() => setOpenModal(false)}
                  selectedEslId={selectedEsl?.eslId}
                  frameInterval={400}
                />
              </Box>
              <CircularProgress size={20} sx={{ mt: 1.5 }} />
            </Box>
          </Dialog>
        )}
      </Box>
    </MainLayout>
  )
}

export default TMin
