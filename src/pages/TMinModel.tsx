import React, { useEffect, useState } from "react"
import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TextField,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogActions,
  Stack,
} from "@mui/material"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"
import MainLayout from "../components/MainLayout"
import TMinScaffold, { TMinStep } from "../components/TMinScaffold"
import { useLocation, useNavigate } from "react-router-dom"
import { ReportCard } from "./dashboard/Dashboard"
import {
  useCreateItemMutation,
  useGetItemsQuery,
  useGetOCRValuesQuery,
  useGetTMinValuesQuery,
} from "store/api"
import InsertLinkIcon from "@mui/icons-material/InsertLink"

const STEPS: TMinStep[] = [
  { title: "Gathering Details", helper: "Complete", state: "done" },
  { title: "Gathering Documents", helper: "Complete", state: "done" },
  { title: "Data Collection (OCR)", helper: "Complete", state: "done" },
  { title: "Review Data", helper: "In Progress", state: "active" },
  { title: "T-Min Review", state: "idle" },
  { title: "Report Generation", state: "idle" },
]

const REPORT_LINKS = [
  "Manufacturer Record Book (MRB)",
  "General arrangement/fabrication drawing",
  "Datasheet",
  "U1A form",
  "Nameplate details",
  "Piping and Instrumentation Diagram",
  "Equipment strategy",
  "TML Sketch",
]

const REFERENCE_DOCS: string[] = [
  // "IOW Assessment.pdf",
  // "Thickness Trending.xlsx",
]

const LAN_PATH =
  "K:\\BTAREA\\BTES\\FIXEDEQUIP\\Inspection\\FS\\CLEU\\CLEUs\n" +
  "Inspection Planner’s Folder\\EOR Folder CLE3L3-T0302"

type Row = { id: string; label: string; param: string; comment: string }
type LocRow = { id: string; label: string; param: string; comment: string }

export const SectionTitle: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Box
    sx={{
      bgcolor: "#EFF2F3",
      border: "1px solid #E4E6E8",
      borderRadius: 1,
      px: 2,
      py: 1.25,
      fontWeight: 700,
      color: "text.primary",
      mb: 1.25,
      mt: 2,
      position: "sticky",
      top: 390,
      zIndex: 2,
    }}
  >
    {children}
  </Box>
)

const TMinModel: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  // const eslData = (location.state as { eslData?: any })?.eslData;
  const eslDataSession = sessionStorage?.getItem("eslData") || ""
  const eslData = JSON.parse(eslDataSession)

  const eslId = eslData?.eslid
  const assignedDate = new Date(eslData?.assignedDate).toLocaleDateString()
  const site = eslData?.site
  const [dueInDays, setDueInDays] = useState(eslData?.dueInDays + " Days")
  const [modelCreated, setModelCreated] = useState(false)
  const [data, setData] = useState<any | null>(null)
  const [steps, setSteps] = useState(STEPS)
  const [mspEngComment, setMspEngComment] = useState(false)
  const [mspAssumptions, setMspAssumptions] = useState(false)

  //   const { data: ocrData, isLoading: ocrLoading } = useGetOCRValuesQuery(eslData?.id);
  const { data: ocrData, isLoading: ocrLoading } = useGetItemsQuery(
    `OpentextSource/GetOCRValues?id=${eslData?.id}`,
  )

  const { data: tminData, isLoading: tminLoading } = useGetTMinValuesQuery(eslId)

  const [designRows, setDesignRows] = React.useState<Row[]>([])
  const [locationRows, setLocationRows] = React.useState<Row[]>([])
  React.useEffect(() => {
    const updatedRows: Row[] = [
      {
        id: "d1",
        label: "Piping Specification",
        param: "Shell Ring 1",
        comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      },
      {
        id: "d2",
        label: "Metallurgy",
        param: ocrData?.ocrResult?.mawp,
        comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      },
      {
        id: "d3",
        label: "Design Pressure",
        param: ocrData?.ocrResult?.design_metal_temp_at_design_pressure,
        comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      },
      {
        id: "d4",
        label: "Design Temperature",
        param: ocrData?.ocrResult?.max_temp,
        comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      },
      {
        id: "d5",
        label: "Code of Construction Year",
        param: "1994",
        comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      },
      {
        id: "d6",
        label: "Allowable Stress",
        param: "CS",
        comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      },
      {
        id: "d7",
        label: "Calculation Prepared by",
        param: "Shell Ring 1",
        comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      },
      {
        id: "d8",
        label: "Date",
        param: "23/09/2025",
        comment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      },
    ]

    const LOCATION_ROWS_INIT = [
      {
        id: "l1",
        label: "Component",
        param: tminData?.Component,
        comment: "",
      },
      { id: "l2", label: "Pipe NPS", param: tminData?.PipeNps, comment: "" },
      { id: "l3", label: "Schedule", param: tminData?.Schedule, comment: "" },
      { id: "l4", label: "Threaded Pipe", param: tminData?.ThreadedPipe, comment: "" },
      { id: "tmm", label: "Tmm", param: tminData?.Tmm, comment: "" },
      { id: "pmg", label: "PMG", param: tminData?.PMG, comment: "" },
      { id: "tpmg", label: "TPMG", param: tminData?.TPMG, comment: "" },
      { id: "tapi", label: "TAPI574", param: tminData?.TAPI?.toFixed(3), comment: "" },
      { id: "l8", label: "TB31.3", param: tminData?.PlantManagerJ, comment: "" },
      { id: "l9", label: "Localized damage", param: tminData?.LocalizedDamage, comment: "" },
    ]
    setDesignRows(updatedRows)
    setLocationRows(LOCATION_ROWS_INIT)
    console.log("useEffect calling")
  }, [ocrData, tminData])

  const [editingId, setEditingId] = React.useState<string | null>(null)
  const [draftComment, setDraftComment] = React.useState("")

  const startEdit = (id: string, current: string) => {
    setEditingId(id)
    setDraftComment(current)
  }
  const commitEdit = () => {
    if (!editingId) return
    setDesignRows((prev) =>
      prev.map((r) => (r.id === editingId ? { ...r, comment: draftComment } : r)),
    )
    setLocationRows((prev) =>
      prev.map((r) => (r.id === editingId ? { ...r, comment: draftComment } : r)),
    )
    setEditingId(null)
    setDraftComment("")
  }

  const [hasThickness, setHasThickness] = React.useState(false)
  const [approved, setApproved] = React.useState(false)
  const [thicknessValue, setThicknessValue] = React.useState<string | number | null>(null)

  const [openSendPopup, setOpenSendPopup] = React.useState(false)
  const [createItem, { isLoading }] = useCreateItemMutation()

  const handleCreate3D = () => setModelCreated(true)

  const handleCalcRT = async () => {
    if (!tminData) {
      console.error("tminData result not loaded")
      return
    } else {
      console.log("handleCalcRT tminData :: ", tminData)
    }

    try {
      console.log("locationRows", locationRows)
      const newItem = await createItem({
        endpoint: `TminCalculation/calculate?eslId=${eslId}`,
        body: {
          pipeNps: parseFloat(locationRows[1].param),
          schedule: tminData?.Schedule,
          nominalthickness: tminData?.Nominalthickness,
          threadedPipe: tminData?.ThreadedPipe,
          tmm: parseFloat(locationRows[4].param),
          plantManagerJ: tminData?.PlantManagerJ,
          plantManagerK: tminData?.PlantManagerK,
          localizedDamage: tminData?.LocalizedDamage,
          pmg: parseFloat(locationRows[5].param),
          api: tminData?.API,
          location: tminData?.Location,
          component: tminData?.Component,
        },
      }).unwrap()

      setThicknessValue(newItem?.jsonres?.retirementThickness ?? "NA")

      setLocationRows((prev) => {
        return prev.map((item) => {
          if (Object.prototype.hasOwnProperty.call(newItem.jsonres, item.id)) {
            return { ...item, param: newItem.jsonres[item.id] }
          }
          return item
        })
      })

      if (!isLoading) setHasThickness(true)
    } catch (err) {
      console.error("Error calculating retirement thickness:", err)
    }
  }

  const handleSendToReview = () => {
    setOpenSendPopup(true)
  }
  const handleSendOk = () => {
    setOpenSendPopup(false)
    setDueInDays("2 days")

    setApproved(true)
    setSteps((prev) =>
      prev.map((step) => {
        if (step.title === "Review Data") {
          return {
            ...step,
            helper: "Complete",
            state: "done",
          }
        }
        if (step.title === "T-Min Review") {
          return {
            ...step,
            helper: "In Progress",
            state: "active",
          }
        }
        return step
      }),
    )
  }

  const handleGenerateReport = React.useCallback(() => {
    navigate("/tmin-report", { state: { eslId } })
  }, [navigate, eslId])

  const tiles = [
    {
      // icon: <span>🏷️</span>,
      label: "Equipment Tag",
      value: eslData?.equipmentTag,
    },
    {
      // icon: <span>⚙️</span>,
      label: "Process Description",
      value: eslData?.processDescription,
    },
    {
      // icon: <span>👥</span>,
      label: "Business Team",
      value: eslData?.businessTeamName,
    },
    {
      // icon: <span>🏭</span>,
      label: "Unit",
      value: eslData?.unitName,
    },
  ]

  const fileLocation =
    "K:\\BTAREA\\BTES\\FIXEDEQUIP\\Inspection\\FS\\CLEU\\CLEUs\\Inspection Planner’s Folder\\EOR Folder CLE3L3-T0302"

  const { data: eslsData } = useGetItemsQuery("Esls")

  const comments = eslsData?.some((esls: any) => esls?.eslid === eslData?.eslid)

  const [mspComment, setMspComment] = useState(
    comments ||
      "*Has not had an initial internal inspection. Internal required to ensure process changes have been successful and to ensure shell integrity.",
  )
  useEffect(() => {
    setMspComment(eslsData?.filter((esls: any) => esls?.eslid === eslData?.eslid)[0].comments)
  }, [eslsData])
  console.log("mspComment", mspComment)
  const assumptions =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry,Lorem Ipsum has been the industry's standard dummy text even since the 1500s"

  return (
    <MainLayout>
      <TMinScaffold
        eslId={eslId}
        sapId="10819961"
        assignedDate={assignedDate}
        timeRemaining={dueInDays}
        site={site}
        steps={steps}
        tiles={tiles}
        tilesTitle="General Information"
        fileLocation={fileLocation}
        showFooter={false}
      >
        {approved && (
          <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Typography sx={{ fontWeight: 700, mr: 1 }}>Status</Typography>
            <Chip label="Approved" color="success" variant="filled" />
          </Box>
        )}
        
        <Paper variant="outlined" sx={{ overflow: "hidden", mb: 2 }}>
          <Table>
            <TableHead sx={{ position: "sticky", top: 0 }}>
              <TableRow sx={{ bgcolor: "#FFECEC" }}>
                <TableCell sx={{ fontWeight: 700, position: "sticky", top: 0 }}>
                  Design Information
                </TableCell>
                {/* <TableCell sx={{ fontWeight: 700 }}>Parameter&apos;s</TableCell> */}
                <TableCell sx={{ fontWeight: 700, position: "sticky", top: 0 }}>Values</TableCell>
                <TableCell sx={{ fontWeight: 700, position: "sticky", top: 0 }}>Comment</TableCell>
                <TableCell sx={{ fontWeight: 700, position: "sticky", top: 0 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {designRows.map((r) => {
                const editing = editingId === r.id
                return (
                  <TableRow key={r.id}>
                    <TableCell sx={{ width: 200, borderBottom: 0, padding: 1 }}>
                      <Box sx={{ border: "1px solid #ECEDEF", padding: 2 }}>{r.label}</Box>
                    </TableCell>
                    <TableCell
                      sx={{ width: 350, color: "text.secondary", borderBottom: 0, padding: 1 }}
                    >
                      <Box sx={{ border: "1px solid #ECEDEF", padding: 2, "&:empty": { p: 3 } }}>
                        {r.param}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ width: 300, borderBottom: 0, padding: 1 }}>
                      {editing ? (
                        <TextField
                          fullWidth
                          size="small"
                          value={draftComment}
                          onChange={(e) => setDraftComment(e.target.value)}
                          onBlur={commitEdit}
                          autoFocus
                        />
                      ) : (
                        <Box
                          sx={{
                            p: 2,
                            bgcolor: "#F5F7F9",
                            borderRadius: 1,
                            border: "1px solid #ECEDEF",
                            color: "text.primary",
                            "&:empty": { p: 3 },
                          }}
                        >
                          {r.comment}
                        </Box>
                      )}
                    </TableCell>
                    <TableCell width={52} sx={{ borderBottom: 0, padding: 1 }}>
                      <IconButton size="small" onClick={() => startEdit(r.id, r.comment)}>
                        <EditOutlinedIcon fontSize="small" sx={{ color: "#28A5DD" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Paper>

        <Paper variant="outlined" sx={{ overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#FFECEC" }}>
                <TableCell sx={{ fontWeight: 700, borderBottom: 0 }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 700, borderBottom: 0 }}>Values</TableCell>
                <TableCell sx={{ fontWeight: 700, borderBottom: 0 }}>Comment</TableCell>
                <TableCell sx={{ fontWeight: 700, borderBottom: 0 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locationRows.map((r) => {
                const editing = editingId === r.id
                return (
                  <TableRow key={r.id}>
                    <TableCell sx={{ width: 200, borderBottom: 0, padding: 1 }}>
                      <Box sx={{ border: "1px solid #ECEDEF", padding: 2 }}>{r.label}</Box>
                    </TableCell>
                    <TableCell
                      sx={{ width: 350, borderBottom: 0, color: "text.secondary", padding: 1 }}
                    >
                      {editing ? (
                        <TextField
                          onChange={(e) => {
                            setLocationRows((prevlocationRows) =>
                              prevlocationRows.map((row) =>
                                row.id === editingId ? { ...row, param: e.target.value } : row,
                              ),
                            )
                          }}
                          fullWidth
                          size="small"
                          value={r.param}
                          autoFocus
                        />
                      ) : (
                        <Box
                          sx={{
                            p: 2,
                            color: "text.secondary",
                            border: "1px solid #ECEDEF",
                            "&:empty": { p: 3 },
                          }}
                        >
                          {r.param}
                        </Box>
                      )}
                    </TableCell>
                    <TableCell sx={{ width: 300, borderBottom: 0, padding: 1 }}>
                      {editing ? (
                        <TextField
                          fullWidth
                          size="small"
                          value={r.comment}
                          onChange={(e) => {
                            setLocationRows((prevlocationRows) =>
                              prevlocationRows.map((row) =>
                                row.id === editingId ? { ...row, comment: e.target.value } : row,
                              ),
                            )
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            p: 2,
                            bgcolor: "#F5F7F9",
                            borderRadius: 1,
                            border: "1px solid #ECEDEF",
                            color: "text.primary",
                            "&:empty": { p: 3 },
                          }}
                        >
                          {r.comment}
                        </Box>
                      )}
                    </TableCell>
                    <TableCell width={52} sx={{ borderBottom: 0 }}>
                      <IconButton size="small" onClick={() => startEdit(r.id, r.comment)}>
                        <EditOutlinedIcon fontSize="small" sx={{ color: "#28A5DD" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          <Box sx={{ display: "flex", flexDirection: "column", p: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 0.75,
                gap: 1.5,
              }}
            >
              <Typography sx={{ fontWeight: 700, mr: 1, width: "25%" }}>
                MSP Engineer comments
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  width: "100%",
                }}
              >
                <TextField
                  disabled={!mspEngComment}
                  sx={{ width: "91%", p: 1, "& textarea": { color: "text.secondary" } }}
                  fullWidth
                  multiline
                  minRows={3}
                  value={mspComment}
                  variant="outlined"
                  onBlur={() => setMspEngComment(false)}
                />
                <IconButton size="small" onClick={() => setMspEngComment(true)}>
                  <EditOutlinedIcon fontSize="small" sx={{ color: "#28A5DD" }} />
                </IconButton>
              </Box>
            </Box>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Typography sx={{ fontWeight: 700, mb: 0.75, width: "25%" }}>Assumptions</Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  width: "100%",
                }}
              >
                <TextField
                  disabled={!mspAssumptions}
                  sx={{ width: "91%", p: 1, "& textarea": { color: "text.secondary" } }}
                  fullWidth
                  multiline
                  minRows={3}
                  defaultValue={assumptions}
                  variant="outlined"
                  onBlur={() => setMspAssumptions(false)}
                />
                {/* </Paper> */}
                <IconButton size="small" onClick={() => setMspAssumptions(true)}>
                  <EditOutlinedIcon fontSize="small" sx={{ color: "#28A5DD" }} />
                </IconButton>
              </Box>
              {/* <Paper variant="outlined" sx={{ p: 1, width: "100%" }}> */}
            </Box>
          </Box>
        </Paper>
        <Box sx={{ display: "flex", gap: 9, mt: 2, flexWrap: "wrap" }}>
          <Box sx={{ flex: "0 0 30%", maxWidth: 400 }}>
            <ReportCard title="Reference Attachments" links={REPORT_LINKS} />
          </Box>
          {/* <Box
            sx={{
              flex: "0 0 30%",
              minWidth: 300,
              border: "1px solid #E0E0E0",
              borderRadius: 1,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              gap: 2,
              mt: 2,
            }}
          >
            <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid #ECEDEF" }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  color: "text.primary",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <InsertLinkIcon fontSize="small" sx={{ color: "#e53935" }} /> 
                Reference Documents
              </Typography>
            </Box>

            <Box sx={{ p: 2 }}>
              {REFERENCE_DOCS.length === 0 ? (
                <Typography variant="body2" color="text.secondary"></Typography>
              ) : (
                <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
                  {REFERENCE_DOCS.map((doc) => (
                    <li key={doc}>
                      <Typography variant="body2" color="text.primary">
                        {doc}
                      </Typography>
                    </li>
                  ))}
                </ul>
              )}
            </Box>
          </Box> */}

          <Box
            sx={{
              // flex: "1 1 20%",
              maxWidth: 400,
              border: "1px solid #E0E0E0",
              borderRadius: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid #ECEDEF" }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  color: "text.secondary",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <InsertLinkIcon fontSize="small" sx={{ color: "#e53935" }} />
                LAN Drive link
              </Typography>
            </Box>
            <Box sx={{ p: 2 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}
              >
                {LAN_PATH}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            position: "sticky",
            bottom: 0,
            backgroundColor: "#FFF",
            padding: "1rem 0",
            // (modelCreated && !hasThickness) || (hasThickness && !approved) ? "space-between" : "flex-end",
            mt: 2,
          }}
        >
          {/* LEFT BUTTON */}
          <Box display={"flex"} gap={2}>
            <Button
              loading={isLoading}
              variant="contained"
              sx={{ textTransform: "none" }}
              onClick={handleCalcRT}
            >
              CALCULATE RETIREMENT THICKNESS
            </Button>

            {hasThickness && !approved && !isLoading && (
              <Box
                sx={{
                  mt: 1,
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "right",
                  color: "#129419",
                }}
              >
                <strong> Retirement Thickness for IDM/EOR Evaluation </strong>: {thicknessValue} mm
              </Box>
            )}
          </Box>
          {/* RIGHT BUTTONS */}
          <Box display={"flex"} gap={2}>
            <Button
              variant="outlined"
              color="error"
              sx={{ textTransform: "none" }}
              onClick={() => navigate(-1)}
            >
              BACK
            </Button>
            {/* {!modelCreated && (
              <Button variant="contained" color="error" sx={{ textTransform: "none" }} onClick={handleCreate3D}>
                CREATE 3D MODEL
              </Button>
            )} */}

            {hasThickness && !approved && (
              <Button
                variant="contained"
                color="error"
                sx={{ textTransform: "none" }}
                onClick={handleSendToReview}
              >
                SEND TO REVIEW
              </Button>
            )}

            {approved && (
              <Button
                variant="contained"
                color="error"
                sx={{ textTransform: "none" }}
                onClick={handleGenerateReport}
              >
                GENERATE REPORT
              </Button>
            )}
          </Box>
        </Box>
      </TMinScaffold>
      <Dialog open={openSendPopup} onClose={() => setOpenSendPopup(false)}>
        <DialogContent sx={{ pt: 3, pb: 1 }}>
          <Stack alignItems="center" justifyContent="center" spacing={2}>
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 34 }} />
            <Typography variant="body1" align="center" color="text.primary">
              Report is successfully sent to the reviewer.
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ pb: 2, pr: 2 }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleSendOk}
            sx={{ textTransform: "none", px: 4 }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </MainLayout>
  )
}

export default TMinModel
