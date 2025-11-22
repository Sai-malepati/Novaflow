import React, { useEffect, useMemo, useRef, useState } from "react"
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Link,
  Paper,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
  TooltipProps,
  tooltipClasses,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import MainLayout from "../components/MainLayout"
import TMinScaffold, { TMinStep } from "../components/TMinScaffold"
import { useLocation, useNavigate } from "react-router-dom"

import { useCreateItemMutation } from "store/api"
import DownloadIcon from "../icons/DownloadIcon"
import InfoIcon from "../icons/InfoIcon"
import PopupDialog from "components/PopupDialog"
import CloseIcon from "@mui/icons-material/Close"
import pipeImg from '../static/images/pipe.png';

const steps: TMinStep[] = [
  { title: "Gathering Details", helper: "Complete", state: "done" },
  { title: "Gathering Documents", helper: "In Progress", state: "active" },
  { title: "Data Collection (OCR)", state: "idle" },
  { title: "Review Data", state: "idle" },
  { title: "T-Min Review", state: "idle" },
  { title: "Report Generation", state: "idle" },
]

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
})

const HollowCard = ({
  title,
  action,
  children,
  padding,
  cardContentPad,
}: {
  title: string
  action?: React.ReactNode
  children?: React.ReactNode
  padding?: number | string,
  cardContentPad?: number,
}) => (
  <Card variant="outlined" sx={{ borderRadius: 2 }}>
    <Box
      sx={{
        p: padding,
        bgcolor: "#F2F2F2",
        borderRadius: "10px 10px 0 0",
        borderBottom: "1px solid #e5e5e5",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "text.secondary" }}>
          {title}
        </Typography>
        {action}
      </Stack>
    </Box>
    <CardContent sx={{ height: "100%", p: `${cardContentPad || 0}rem` }}>{children}</CardContent>
  </Card>
)

// const InfoTile = ({
//    icon,
//   label,
//   value,
// }: {
//    icon: React.ReactNode
//   label: string
//   value: string
// }) => (
//   <Paper
//     variant="outlined"
//     sx={{
//       p: 1.5,
//       borderRadius: 2,
//       borderColor: "#EFEFEF",
//       boxShadow: "none",
//       display: "flex",
//       alignItems: "center",
//       gap: 1.25,
//       minHeight: 66,
//     }}
//   >
//     <Box sx={{ color: "error.main", display: "grid", placeItems: "center" }}>{icon}</Box>
//     <Box sx={{ minWidth: 0 }}>
//       <Typography variant="caption" sx={{ fontWeight: 800, color: "text.secondary" }}>
//         {label}
//       </Typography>
//       <Typography
//         variant="body2"
//         sx={{
//           fontWeight: 600,
//           color: "text.secondary",
//           lineHeight: 1.2,
//           mt: 0.25,
//           whiteSpace: "nowrap",
//           overflow: "hidden",
//           textOverflow: "ellipsis",
//         }}
//         title={value}
//       >
//         {value}
//       </Typography>
//     </Box>
//   </Paper>
// )

const InfoToolTip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#FFF",
    color: "#28A5DD",
    boxShadow: "1px 1px 5px #CCC",
    width: "15rem",
    padding: '1rem',
    fontSize: '12px',
  },
  [`& .${tooltipClasses.arrow}`]: {
    display: "none",
  },
}));

const InfoTile = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <Paper
    elevation={0}
    sx={{
      p: 1.5,
      borderRadius: 2,
      border: "none",
      boxShadow: "none",
      display: "flex",
      alignItems: "center",
      gap: 1.25,
      minHeight: 66,
      backgroundColor: "#fff",
    }}
  >
    <Box sx={{ color: "error.main", display: "grid", placeItems: "center" }}>
      {icon}
    </Box>

    <Box sx={{ minWidth: 0 }}>
      {/* Label (Key) */}
      <Typography
        variant="caption"
        sx={{ fontWeight: 700, color: "text.primary", mb: 0.5 }}
      >
        {label}
      </Typography>

      {/* Value (Lighter font, subtle) */}
      <Typography
        variant="body2"
        sx={{
          fontWeight: 400,
          color: "text.secondary",
          lineHeight: 1.3,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        title={value}
      >
        {value}
      </Typography>
    </Box>
  </Paper>
);

const TMinReview: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation();
  // const eslData = (location.state as { eslData?: any })?.eslData;

  const eslDataSession = sessionStorage?.getItem("eslData") || ""
  const eslData = JSON.parse(eslDataSession)

  const eslId = eslData?.eslid;
  const assignedDate = new Date(eslData?.assignedDate).toLocaleDateString();
  const site = eslData?.site;

  const dueInDays = eslData?.dueInDays + " Days";


  const [createItem, loader] = useCreateItemMutation()
  console.log('isLoading', loader);
  useEffect(() => {
    const fetchAndUploadFile = async () => {
      try {
        const url = `https://novaflowdocumentservice-axhseggmeeffgjc2.centralindia-01.azurewebsites.net/api/OpentextSource/GetfilefromOpentextAndUploadtoDatalake?EslId=${eslId}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`Failed to call API: ${response.statusText}`);
        }

      const result = await response.json(); // or response.text() based on API response type

    } catch (error) {
      console.error("Error in API call:", error);
    }
  };

  if (eslId) {  // only call if eslId exists
    fetchAndUploadFile();
  }
}, [eslId]);


  // MSP Notepad
  const [note, setNote] = useState("")
  const [hoveringNotePad, setHoveringNotePad] = useState(false)
  const [savedOpen, setSavedOpen] = useState(false)
  const noteRef = useRef<HTMLTextAreaElement | null>(null)
 
  const openSuccess = useMemo(() => {
   
    return loader.isSuccess;

  },[loader.isSuccess])
   console.log('openSuccess', openSuccess);
  const saveNote = async () => {
    if (!note.trim()) return
    await createItem({ endpoint: "Esls", method: "PUT", body: { id: eslData?.id, eslid: eslId, comments: note } })
   

  

    // const content = note.replace(/\n/g, "\r\n")

    // const blob = new Blob([content], { type: "text/plain;charset=utf-8" })
    // const url = URL.createObjectURL(blob)
    // const a = document.createElement("a")
    // a.href = url
    // a.download = `MSP_Note_ESL_${eslId}.txt`
    // document.body.appendChild(a)
    // a.click()
    // a.remove()
    // URL.revokeObjectURL(url)
    // setSavedOpen(true)
  }
  const clearNote = () => {
    setNote("")
    requestAnimationFrame(() => noteRef.current?.focus())
  }

  const steps: TMinStep[] = [
    { title: "Gathering Details", helper: "Complete", state: "done" },
    { title: "Gathering Documents", helper: "In Progress", state: "active" },
    { title: "Data Collection (OCR)", state: "idle" },
    { title: "Review Data", state: "idle" },
    { title: "T-Min Review", state: "idle" },
    { title: "Report Generation", state: "idle" },
  ]

  const [openPreview, setOpenPreview] = useState(false)
  const [previewFile, setPreviewFile] = useState<string | null>(null)
  const [previewTitle, setPreviewTitle] = useState<string>("")

  const handleOpenPreview = (title: string) => {
    setPreviewTitle(title)
    setPreviewFile(pipeImg)
    setOpenPreview(true)
  }

  const handleClosePreview = () => {
    setOpenPreview(false)
    setPreviewFile(null)
  }

  return (
    <MainLayout>
      <TMinScaffold
        eslId={eslId}
        sapId="10819961"
        assignedDate={assignedDate}
        timeRemaining={dueInDays}
         site={site}
        steps={steps}
        fileLocationLabel="Inspection Files Location:"
        fileLocation="K:\BTAREA\BTES\FIXEDEQUIP\Inspection\FS\CLEU\CLEUs\Inspection Planner’s Folder\EOR Folder CLE3L3-T0302"
        onBack={() => navigate("/tmin")}
        onNext={() => navigate("/tmin-docs", { state: { eslData } })}
      >
        <Card elevation={0} sx={{ borderRadius: 2, border: "1px solid #ededed", mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle2" sx={{ color: "error.main", fontWeight: 700, mb: 1 }}>
              Inspection Notification Details
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2,1fr)",
                  md: "repeat(3,1fr)",
                  lg: "repeat(6,1fr)",
                },
                gap: 1.25,
              }}
            >
              <InfoTile
                //  icon={<span>🏷️</span>} 
                label="Equipment Tag"
                value={eslData?.equipmentTag} />

              <InfoTile
                // icon={<span>🛠️</span>} 
                label="Equipment Type"
                value={eslData?.equipmentTypeName} />
              <InfoTile
                // icon={<span>📈</span>}
                label="Thickness Status"
                value="Vessel - Above IDM RL"
              />
              <InfoTile
                // icon={<span>👥</span>} 
                label="Business Team"
                value={eslData?.businessTeamName} />
              <InfoTile
                // icon={<span>🪪</span>} 
                label="Site Inspector"
                value={eslData?.siteInspector} />
              <InfoTile
                // icon={<span>🏭</span>}
                label="Unit"
                value={eslData?.unitName} />
            </Box>
          </CardContent>
        </Card>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr", lg: "repeat(4, 1fr)" },
            gap: 1.5,
          }}
        >
          <HollowCard title="Prompt/ Inspection Agenda" padding="12px 10px" cardContentPad={1} action={
            <InfoToolTip placement="bottom-end" title="A structured outline detailing the key areas, timing and objectives for the upcoming inspection">
              <IconButton
                size="small"
                sx={{ width: 30, height: 30 }}
              >
                < InfoIcon />

              </IconButton>
            </InfoToolTip>}
          >

            <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
              What is your recommendation to the business team – Is immediate action required?
              <li>What was the driver for the inspection?</li>
              <li>
                What was the minimum measured thickness and how does that compare to the
                requirement?
              </li>
            </ul>
          </HollowCard>

          <HollowCard title="Inspection Recommendations" padding="12px 10px" cardContentPad={1} action=
            {<InfoToolTip placement="bottom-end" title="A Concise summary of findings suggested actions to improve compliance,safety and opearional">
              <IconButton
                size="small"
                sx={{ width: 30, height: 30 }}
              >
                < InfoIcon />

              </IconButton>
            </InfoToolTip>}
          >
            <div style={{ lineHeight: 1.8, color: "#4A4A4A" }}>
              <p style={{ margin: "0 0 12px 0" }}>What was the driver for the inspection?</p>

              <p style={{ marginBottom: 12 }}>
                <span>Thickness Inspection</span>
                <br />
                <span>(Due date:- 09/01/2025)</span>
              </p>

              <p style={{ margin: "0 0 12px 0" }}>
                What is your recommendation to the business team – Is immediate action? FE to review
                the low reading areas (probably lower).
              </p>

              <p style={{ margin: "0 0 12px 0" }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry..
              </p>

              <p style={{ margin: 0 }}>
                <strong>Current thickness: 1.35 mm</strong>
              </p>
            </div>
          </HollowCard>

          <HollowCard title="Attachments" padding="12px 10px" cardContentPad={1}>
            <Link
              sx={{ display: "block", mb: 0.5 }}
              component="button"
              onClick={() => handleOpenPreview("bpvc_viii-1_u-1a_5.pdf")}
            >
              bpvc_viii-1_u-1a_5.pdf
            </Link>
            <Link
              sx={{ display: "block" }}
              component="button"
              onClick={() => {
                // open file viewer / modal / API call — your logic here
              }}
            >
              bpvc_6.pdf
            </Link>
          </HollowCard>
          <HollowCard
            title="Engineer’s Notepad"
             padding="10px"
            action={
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Tooltip title="Save To Record">
                  <span>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={saveNote}
                      disabled={!note.trim()}
                      sx={{ width: 25, height: 25 }}
                    >
                      {loader?.isLoading ? <CircularProgress /> : < DownloadIcon />}
                    </IconButton>
                  </span>
                </Tooltip>
                {/* <Tooltip title="Clear">
                  <span>
                    <IconButton
                      size="small"
                      color="inherit"
                      onClick={clearNote}
                      disabled={!note.trim()}
                    >
                      <ClearOutlinedIcon />
                    </IconButton>
                  </span>
                </Tooltip> */}
              </Box>
            }
          >
            <Box
              sx={{
                position: "relative",
                border: "1px dashed #DBDBDB",
                borderRadius: 1,
                height: "100%",
                background:
                  "repeating-linear-gradient(white, white 28px, #ECECEC 29px, #ECECEC 30px)",
              }}
              onMouseEnter={() => setHoveringNotePad(true)}
              onMouseLeave={() => setHoveringNotePad(false)}
            >
              {hoveringNotePad && !note.trim() && (
                <Typography
                  sx={{
                    position: "absolute",
                    inset: 0,
                    display: "grid",
                    placeItems: "center",
                    color: "text.disabled",
                    fontStyle: "italic",
                    pointerEvents: "none",
                    userSelect: "none",
                  }}
                >
                  Please enter the text
                </Typography>
              )}
              <textarea
                ref={noteRef}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write your note here..."
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  outline: "none",
                  resize: "none",
                  background: "transparent",
                  padding: "8px",
                  fontFamily: "inherit",
                  fontSize: "14px",
                  lineHeight: "28px",
                  color: "#333",
                  position: "relative",
                  zIndex: 1,
                }}
                aria-label="MSP Engineer notes"
              />
            </Box>
          </HollowCard>
        </Box>

        {/* Image Preview Modal */}
        <Dialog
          open={openPreview}
          onClose={handleClosePreview}
          maxWidth={false}              // allow custom width
          PaperProps={{
            sx: {
              width: "50vw",            // ⬅ reduce width
              height: "90vh",           // ⬅ increase height
              overflow: "hidden",       // ⬅ remove scrollbars
              borderRadius: 2,
            },
          }}

          sx={{
            "& .MuiDialog-container": {
              alignItems: "center",
            },
            "& .MuiDialogContent-root": {
              overflow: "hidden !important",  // remove scroll inside content
            },
            "& .MuiDialog-paper": {
              overflow: "hidden !important",  // double ensure
            },
            "& .MuiDialog-paperScrollPaper": {
              overflow: "hidden !important",  // remove scroll from this wrapper
            },
          }}
        >
          <DialogTitle sx={{ color: "error.main", fontWeight: 700 }}>
            {previewTitle}
            <IconButton
              sx={{ position: "absolute", right: 8, top: 8 }}
              onClick={handleClosePreview}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent
            sx={{
              p: 0,                     // remove padding so image fills edge-to-edge
              height: "100%",           // allow full height
            }}
          >
            <img
              src={previewFile || ""}
              alt="preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",     // fill area, cropping allowed
              }}
            />
          </DialogContent>

          {/* <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleClosePreview} color="primary">
              Close
            </Button>
          </DialogActions> */}
        </Dialog>


        <Snackbar
          open={savedOpen}
          autoHideDuration={1800}
          onClose={() => setSavedOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={() => setSavedOpen(false)}
            severity="success"
            variant="filled"
            sx={{ fontSize: 13 }}
          >
            Note downloaded.
          </Alert>
        </Snackbar>
      </TMinScaffold>
      <PopupDialog
        open={openSuccess}
        message="MSP Engineer Comments succesfully saved."
      />
      
    </MainLayout>
  )
}

export default TMinReview
