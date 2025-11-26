import React, { memo, useEffect, useMemo, useState } from "react"
import { Box, Typography, Card, CardContent, Divider, Link as MUILink } from "@mui/material"
import DataTable from "../../components/DataTable"
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts"
import MainLayout from "../../components/MainLayout"
import { UserInfoHeader } from ".././user-info-header/UserInfoHeader"
import { ProbabilityIcon, CorrosionIcon, DeviationIcon, InspectionIcon, ToolIcon } from "icons"
import { useGetItemsQuery } from "store/api"
import { ColumnsType } from "types"
import { useNavigate } from "react-router-dom"
import SvgModalAnimator from "components/SvgModalAnimator"
import Cookies from "js-cookie"

const tileCardSx = {
  borderRadius: 2,
  border: "none",
  backgroundColor: "transparent",
  boxShadow: "none",
  overflow: "visible",
}
const tileContentSx = {
  p: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 1,
  bgcolor: "#fff",
  borderRadius: 2,
  minHeight: 121,
  textAlign: "center" as const,
  boxShadow: "0px 3px 6px #00000029",
  justifyContent: "space-between",
}
const linkSx = {
  color: "#6D6E71",
  textDecorationColor: "#6D6E71",
  fontSize: 12,
  width: "100%",
  display: "block",
  padding: "4px 0",
  "&:hover": { textDecorationColor: "#28A5DD", color: "#28A5DD" },
}

/** 🔹 T-MIN TABLE COLUMNS */
const TMIN_COLUMNS: ColumnsType[] = [
  { id: "eslid", label: "Task ID", minWidth: 120, sortable: true },
  { id: "severityName", label: "Severity", sortable: true },
  { id: "assignedDate", label: "Assigned Date", sortable: true, minWidth: 150 },
  { id: "deadLineDate", label: "Due Date" },
  { id: "statusName", label: "Status" },
]

/** 🔹 HIT & LEAK TABLE COLUMNS (from Adobe screen) */
const HIT_LEAK_COLUMNS: ColumnsType[] = [
  { id: "siteName", label: "Site Name", minWidth: 140 },
  { id: "severityName", label: "Severity", sortable: true },
  { id: "assignedDate", label: "Assigned Date", minWidth: 150 },
  { id: "assignee", label: "Assignees", minWidth: 150 },
  { id: "statusName", label: "Status" },
]

/** 🔹 T-MIN CHART DATA (existing) */
const CHART_DATA_TMIN = [
  { name: "Q1", assigned: 115, completed: 75 },
  { name: "Q2", assigned: 140, completed: 110 },
  { name: "Q3", assigned: 100, completed: 75 },
  { name: "Q4", assigned: 70, completed: 30 },
]

/** 🔹 HIT & LEAK CHART DATA (per engineer, like Adobe) */
const CHART_DATA_HIT_LEAK = [
  { name: "Peter", assigned: 80, completed: 55 },
  { name: "Robert", assigned: 65, completed: 40 },
  { name: "Akash", assigned: 50, completed: 35 },
  { name: "Eli", assigned: 70, completed: 45 },
]

const REPORT_LINKS = [
  "ESLs Pending MSP Reviewer",
  "ESLs Pending Documentation",
  "Avg. turnaround time",
  "Weekly/Monthly Executed/",
  "Rejected/ Closed ESLs",
]

/** 🔹 T-MIN TOOLS */
const TMIN_TOOLS = [
  { label: "T-Min Documents Library", icon: <ProbabilityIcon /> },
  { label: "Corrosion Rate Calculator", icon: <CorrosionIcon /> },
  { label: "Standard Deviation Calculator", icon: <DeviationIcon /> },
  { label: "Inspection Report Scrapper", icon: <InspectionIcon /> },
  { label: "Tool 5", icon: <ToolIcon /> },
  { label: "Tool 6", icon: <ToolIcon /> },
]

/** 🔹 HIT & LEAK TOOLS (based on Adobe) */
const HIT_LEAK_TOOLS = [
  { label: "Hit & Leak Documents Library", icon: <ProbabilityIcon /> },
  { label: "Corrosion Rate Calculator", icon: <CorrosionIcon /> },
  { label: "Standard Deviation Generator", icon: <DeviationIcon /> },
  { label: "Inspection Report Scrapper", icon: <InspectionIcon /> },
  { label: "Tool 5", icon: <ToolIcon /> },
  { label: "Tool 6", icon: <ToolIcon /> },
]

/** 🔹 Static rows for Hit & Leak table (from Adobe screen) */
const HIT_LEAK_ROWS = [
  {
    siteName: "ABCD-1234",
    severityName: "Critical",
    assignedDate: "30/07/2025",
    assignee: "Yet to Assign",
    statusName: "New Task",
  },
  {
    siteName: "ABCD-1234",
    severityName: "High",
    assignedDate: "30/07/2025",
    assignee: "Yet to Assign",
    statusName: "New Task",
  },
  {
    siteName: "ASDFG-3456",
    severityName: "High",
    assignedDate: "30/07/2025",
    assignee: "Perter Parker",
    statusName: "MSP Assessment",
  },
  {
    siteName: "ZXCV-23456",
    severityName: "Critical",
    assignedDate: "30/07/2025",
    assignee: "Eli",
    statusName: "Under MSP Review",
  },
  {
    siteName: "XCVBNM-67",
    severityName: "High",
    assignedDate: "30/07/2025",
    assignee: "Robert Steven",
    statusName: "TC Review",
  },
  {
    siteName: "SDFG-5678",
    severityName: "High",
    assignedDate: "30/07/2025",
    assignee: "Akash",
    statusName: "Completed",
  },
]

export const ReportCard = memo(function ReportCard({
  title,
  links,
}: {
  title: string
  links: string[]
}) {
  return (
    <Card elevation={2} sx={{ borderRadius: 2 }}>
      <CardContent sx={{ p: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.2, color: "#333" }}>
          {title}
        </Typography>
        <Divider sx={{ mb: 1.5 }} />
        {links.map((text) => (
          <MUILink key={text} href="#" sx={linkSx} onClick={(e) => e.preventDefault()}>
            {text}
          </MUILink>
        ))}
      </CardContent>
    </Card>
  )
})

const ToolsGrid = memo(function ToolsGrid({
  tools,
}: {
  tools: { label: string; icon: React.ReactNode }[]
}) {
  return (
    <Card
      elevation={0}
      sx={{ borderRadius: 2, background: "#fff5f5", border: "1px solid #f3d6d6" }}
    >
      <CardContent sx={{ p: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5, color: "#333" }}>
          Tools Connected
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(6, 1fr)",
            },
            gap: 2,
          }}
        >
          {tools.map((t) => (
            <Card key={t.label} elevation={1} sx={tileCardSx}>
              <CardContent sx={tileContentSx}>
                <Box sx={{ color: "#000", border: "1px solid #6D6E71", borderRadius: 1, p: 1 }}>
                  {t.icon}
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    lineHeight: 1.2,
                    color: "error.main",
                    textAlign: "center",
                  }}
                >
                  {t.label}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
})

const Dashboard: React.FC = () => {
  const navigate = useNavigate()

  // 🔹 Workflow flags from cookie
  const workflow = Cookies.get("workflow")
  const workflowTypes = workflow ? JSON.parse(workflow) : {}
  const isTmin = !!workflowTypes?.tmin
  const isHitLeak = !!workflowTypes?.hitLeak

  // T-Min ESL data (only meaningful in T-Min workflow)
  const { data = [], isLoading } = useGetItemsQuery("Esls")

  const [openModal, setOpenModal] = useState(false)
  const [selectedEslId, setSelectedEslId] = useState<string | null>(null)

  const handleClick = (value: string) => {
    // For now, row click navigation is only for T-Min ESLs
    if (!isTmin) return
    setSelectedEslId(value)
    setOpenModal(true)
  }

  useEffect(() => {
    if (openModal && selectedEslId && isTmin) {
      const timer = setTimeout(() => {
        setOpenModal(false)
        navigate("/tmin-review", { state: { eslId: selectedEslId } })
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [openModal, selectedEslId, navigate, isTmin])

  const rows = useMemo(() => {
    if (!data) return []
    if (Array.isArray(data)) return data.map((r) => normalizeRowId(r))
    return [normalizeRowId(data)]
  }, [data])

  function normalizeRowId(row: any) {
    if (!row) return row
    const normalizedId = row.eslid ?? row.eslId ?? row.taskId ?? row.id ?? null
    return { ...row, eslid: normalizedId }
  }

  const tableKey = `table-${rows.length}-${isLoading ? "loading" : "ready"}`

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  useEffect(() => {
    setPage(0)
  }, [rows.length])

  const paginatedRows = useMemo(() => {
    const start = page * rowsPerPage
    return rows.slice(start, start + rowsPerPage)
  }, [rows, page, rowsPerPage])

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newSize = parseInt(event.target.value, 10)
    setRowsPerPage(newSize)
    setPage(0)
  }

  const chartData = useMemo(() => (isHitLeak ? CHART_DATA_HIT_LEAK : CHART_DATA_TMIN), [isHitLeak])

  const tableTitleText = isHitLeak ? "Tasks List Status" : "Recent T-Min ESL Tasks"
  const chartTitleText = isHitLeak ? "Nov 25 Tasks Status" : "2025 Tasks Status"
  const toolsToShow = isHitLeak ? HIT_LEAK_TOOLS : TMIN_TOOLS
  const tableColumns = isHitLeak ? HIT_LEAK_COLUMNS : TMIN_COLUMNS
  const tableRows = isHitLeak ? HIT_LEAK_ROWS : data

  return (
    <MainLayout>
      <Box sx={{ p: 3, pt: "5rem" }}>
        <UserInfoHeader />

        <Box
          sx={{
            mb: 2,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "60% 40%" },
            gap: 2,
            alignItems: "stretch",
          }}
        >
          {/* ===== LEFT: TABLE ===== */}
          <Box
            sx={{
              bgcolor: "#fff",
              borderRadius: "10px",
              boxShadow: 3,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "100%",
              maxWidth: "100%",
              overflow: "hidden",
              p: 2,
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                width: "100%",
                maxWidth: "100%",
                overflowX: "auto",
              }}
            >
              <DataTable
                key={tableKey}
                isLoading={isHitLeak ? false : isLoading}
                isPagination={true}
                rawCount={13}
                title={
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 700, mb: 0.5, color: "#5A5A5A" }}
                    >
                      {tableTitleText}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 700,
                        mb: 0.5,
                        fontSize: "12px",
                        color: "#5A5A5A",
                        textAlign: "right",
                      }}
                    >
                      Total completed tasks this month{" "}
                      <strong style={{ color: "#4CAF50" }}>12</strong>
                    </Typography>
                  </Box>
                }
                columns={tableColumns}
                rows={tableRows}
                onClick={handleClick}
              >
                <Box sx={{ textAlign: "right", p: 2 }}>
                  <MUILink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      navigate("/tmin")
                      // navigate(isHitLeak ? "/upload-file" : "/tmin")
                    }}
                    sx={{ fontSize: 14 }}
                  >
                    Detailed view
                  </MUILink>
                </Box>
              </DataTable>
            </Box>
          </Box>

          {/* ===== RIGHT: CHART + REPORT CARDS ===== */}
          <Box
            sx={{
              bgcolor: "#fff",
              borderRadius: "10px",
              boxShadow: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              width: "100%",
              maxWidth: "100%",
              overflow: "hidden",
              p: 2,
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                backgroundColor: "#fff5f5",
                p: 1,
                mb: 2,
                fontWeight: 700,
                color: "#d32f2f",
              }}
            >
              {chartTitleText}
            </Typography>

            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: 280,
                backgroundImage: "url('/world-map-light.png')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                  barGap={2}
                  barCategoryGap="10%"
                >
                  <XAxis dataKey="name" />
                  <YAxis
                    label={{
                      value: "Number of Assigned Tasks",
                      angle: -90,
                      position: "insideLeft",
                      offset: 20,
                      dy: 80,
                      style: { fontSize: 12, fill: "#555" },
                    }}
                    tickMargin={15}
                    width={80}
                  />
                  <Tooltip />
                  <Legend
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{
                      paddingTop: "10px",
                    }}
                  />
                  <Bar
                    dataKey="assigned"
                    name="Assigned Tasks"
                    fill="#1976d2"
                    radius={[4, 4, 0, 0]}
                    barSize={25}
                  />
                  <Bar
                    dataKey="completed"
                    name="Completed Tasks"
                    fill="#388e3c"
                    radius={[4, 4, 0, 0]}
                    barSize={25}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>

            <Box
              sx={{
                mt: 2,
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 2,
              }}
            >
              <ReportCard title="Weekly Report" links={REPORT_LINKS} />
              <ReportCard title="Monthly Report" links={REPORT_LINKS} />
            </Box>
          </Box>
        </Box>

        {/* ===== TOOLS CONNECTED ===== */}
        <ToolsGrid tools={toolsToShow} />
      </Box>
    </MainLayout>
  )
}

export default Dashboard
