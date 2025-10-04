import React, { memo, useEffect, useState } from "react"
import { Box, Typography, Card, CardContent, Divider, Link as MUILink, Modal, CircularProgress } from "@mui/material"
import DataTable from "../../components/DataTable"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import MainLayout from "../../components/MainLayout"
import { UserInfoHeader } from ".././user-info-header/UserInfoHeader"
import { ProbabilityIcon, CorrosionIcon, DeviationIcon, InspectionIcon, ToolIcon } from "icons"
import { useGetItemsQuery } from "store/api"
import { ColumnsType } from "types"
import { useNavigate } from "react-router-dom"
import SvgModalAnimator from "components/SvgModalAnimator"

// --- Styles
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
  fontSize: 14,
  width: "100%",
  display: "block",
  padding: "4px 0",
  "&:hover": { textDecorationColor: "#28A5DD", color: "#28A5DD" },
}

// --- Table columns
const COLUMNS: ColumnsType[] = [
  { id: "eslid", label: "Task ID", minWidth: 120 },
  { id: "severityName", label: "Severity" },
  { id: "assignedDate", label: "Assigned Date" },
  { id: "dueInDays", label: "Due In Days" },
  { id: "documentStatusName", label: "Document Status" },
  { id: "statusName", label: "Status" },
]

// --- Chart, Links, Tools (unchanged)
const CHART_DATA = [
  { name: "Week 1", value: 10 },
  { name: "Week 2", value: 15 },
  { name: "Week 3", value: 20 },
  { name: "Week 4", value: 30 },
]

const REPORT_LINKS = [
  "Manufacturer Record Book (MRB)",
  "General arrangement",
  "Datasheet",
  "U1A form",
  "Nameplate details",
]

const TOOLS = [
  { label: "Probability of Failure", icon: <ProbabilityIcon /> },
  { label: "Corrosion Rate Calculator", icon: <CorrosionIcon /> },
  { label: "Standard Deviation Generator", icon: <DeviationIcon /> },
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
          <MUILink href="#" sx={linkSx}>
            {text}
          </MUILink>
        ))}
      </CardContent>
    </Card>
  )
})

const ToolsGrid = memo(function ToolsGrid() {
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
  const { data = [] } = useGetItemsQuery("Esls")
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
  }, [openModal, selectedEslId])

  return (
    <MainLayout>
      <Box sx={{ p: 3, pt: "5rem" }}>
        <UserInfoHeader />
        <Box
          sx={{
            mb: 2,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: 2,
            alignItems: "start",
          }}
        >
          <DataTable
            title="Recent ESL Task"
            columns={COLUMNS}
            rows={data}
            showActions={{ view: true }}
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

          <Box sx={{ mt: 4, width: "100%", borderRadius: "10px", boxShadow: 3, bgcolor: "#fff" }}>
            <Typography
              variant="subtitle1"
              sx={{ backgroundColor: "#FDF3F3", p: 1, mb: 2, fontWeight: 600 }}
            >
              Work Report
            </Typography>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={CHART_DATA}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#1976d2" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
            <Box
              sx={{
                mt: 2,
                px: 2,
                pb: 2,
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 2,
              }}
            >
              <ReportCard title="Weekly Report" links={REPORT_LINKS} />
              <ReportCard title="Monthly Report" links={REPORT_LINKS} />
            </Box>
          </Box>
        </Box>
        <ToolsGrid />
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 2,
              boxShadow: 24,
              textAlign: "center",
              width: 300,
            }}
          >
            <Typography variant="h6">ESL ID: {selectedEslId}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Redirecting to review...
            </Typography>
            <Box sx={{ mt: 2 }}>
              <SvgModalAnimator
                open={openModal}
                onClose={() => setOpenModal(false)}
                selectedEslId={selectedEslId}
                frameInterval={400}
              />
            </Box>
            <CircularProgress sx={{ mt: 2 }} />
          </Box>
        </Modal>
      </Box>
    </MainLayout>
  )
}

export default Dashboard
