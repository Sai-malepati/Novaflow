import React, { memo, useEffect, useMemo, useState } from "react"
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Link as MUILink,
} from "@mui/material"
import DataTable from "../../components/DataTable"
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts"
import MainLayout from "../../components/MainLayout"
import { UserInfoHeader } from ".././user-info-header/UserInfoHeader"
import {
  ProbabilityIcon,
  CorrosionIcon,
  DeviationIcon,
  InspectionIcon,
  ToolIcon,
} from "icons"
import { useGetItemsQuery } from "store/api"
import { ColumnsType } from "types"
import { useNavigate } from "react-router-dom"
import SvgModalAnimator from "components/SvgModalAnimator"

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

const COLUMNS: ColumnsType[] = [
  { id: "eslid", label: "Task ID", minWidth: 120, sortable: true },
  { id: "severityName", label: "Severity", sortable: true },
  { id: "assignedDate", label: "Assigned Date", sortable: true, minWidth: 150 },
  { id: "deadLineDate", label: "Due Date" },
  { id: "statusName", label: "Status" },
]

const CHART_DATA = [
  { name: "Q1", assigned: 115, completed: 75 },
  { name: "Q2", assigned: 140, completed: 110 },
  { name: "Q3", assigned: 100, completed: 75 },
  { name: "Q4", assigned: 70, completed: 30 },
];

const REPORT_LINKS = [
  "ESLs Pending MSP Reviewer",
  "ESLs Pending Documentation",
  "Avg. turnaround time",
  "Weekly/Monthly Executed/",
  "Rejected/ Closed ESLs",
]

const TOOLS = [
  { label: "T-Min Documents Library", icon: <ProbabilityIcon /> },
  { label: "Corrosion Rate Calculator", icon: <CorrosionIcon /> },
  { label: "Standard Deviation Calculator", icon: <DeviationIcon /> },
  { label: "Inspection Report Scrapper", icon: <InspectionIcon /> },
  { label: "Tool 5", icon: <ToolIcon /> },
  { label: "Tool 6", icon: <ToolIcon /> },
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

const ToolsGrid = memo(function ToolsGrid() {
  return (
    <Card elevation={0} sx={{ borderRadius: 2, background: "#fff5f5", border: "1px solid #f3d6d6" }}>
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
          {TOOLS.map((t) => (
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
  const { data = [], isLoading } = useGetItemsQuery("Esls")
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)
  const [selectedEslId, setSelectedEslId] = useState<string | null>(null)

  const handleClick = (value: string) => {
    setSelectedEslId(value)
    setOpenModal(true)
  }

  useEffect(() => {
    if (openModal && selectedEslId) {
      const timer = setTimeout(() => {
        setOpenModal(false)
        navigate("/tmin-review", { state: { eslId: selectedEslId } })
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [openModal, selectedEslId, navigate])

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

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newSize = parseInt(event.target.value, 10)
    setRowsPerPage(newSize)
    setPage(0)
  }

  const chartData = useMemo(() => CHART_DATA, [])

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
                isLoading={isLoading}
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
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5, color: "#5A5A5A" }}>
                      Recent <strong>T-Min ESL Tasks</strong>
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
                      Total completed tasks this month <strong style={{ color: "#4CAF50" }}>12</strong>
                    </Typography>
                  </Box>
                }
                columns={COLUMNS}
                rows={data}
                onClick={handleClick}
              >
                <Box sx={{ textAlign: "right", p: 2 }}>
                  <MUILink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      navigate("/tmin")
                    }}
                    sx={{ fontSize: 14 }}
                  >
                    Detailed view
                  </MUILink>
                </Box>
              </DataTable>
            </Box>

          </Box>

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
              2025 Tasks Status
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
                      position: "insideLeft", // keep it inside
                      offset: 20, // small fine-tune
                      dy: 80,
                      style: { fontSize: 12, fill: "#555" },
                    }}
                    tickMargin={15} // adds space between label and graph area
                    width={80} // adds total Y-axis width (creates gap before bars)
                  />

                  <Tooltip />
                  {/* Legend moved below the chart */}
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
                    barSize={25} // reduced bar width
                  />
                  <Bar
                    dataKey="completed"
                    name="Completed Tasks"
                    fill="#388e3c"
                    radius={[4, 4, 0, 0]}
                    barSize={25} // reduced bar width
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

        <ToolsGrid />

      </Box>
    </MainLayout>
  )
}

export default Dashboard
