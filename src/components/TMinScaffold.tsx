import React, { Fragment, useState } from "react"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Paper,
  Stack,
  Avatar,
} from "@mui/material"
import userImg from '../static/images/user.png';
import userBgImg from '../static/images/user_bg.png';
import Cookies from "js-cookie";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";



export type TMinStep = {
  title: string
  state: "done" | "active" | "idle"
  helper?: string
}

export const DEFAULT_STEPS: TMinStep[] = [
  { title: "Gathering Details", helper: "Complete", state: "done" },
  { title: "Gathering Documents", helper: "In Progress", state: "active" },
  { title: "Data Collection (OCR)", state: "idle" },
  { title: "Review Data", state: "idle" },
  { title: "T-Min Review", state: "idle" },
  { title: "Report Generation", state: "idle" },
]

// type Tile = { icon: React.ReactNode; label: string; value: string }

type Tile = {  label: string; value: string }

type Props = {
  eslId: string
  enableUploadDoc?: boolean
  sapId?: string
  assignedDate?: string
  timeRemaining?: string
  site?: string

  steps?: TMinStep[]


  tiles?: Tile[]
  tilesTitle?: string


  fileLocationLabel?: string
  fileLocation?: string
  onBack?: () => void
  onNext?: () => void
  backLabel?: string
  nextLabel?: string
  rightExtra?: React.ReactNode


  showFooter?: boolean
  showBackButton?: boolean
  showNextButton?: boolean
  showFileLocation?: boolean
  disableNextButton?: boolean


  children?: React.ReactNode
}


const Row = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 1,
      py: 0.35,
      minHeight: 28,
    }}
  >
    <Typography sx={{ color: "text.secondary", fontSize: 13.5, fontWeight: 700 }}>
      {label}
    </Typography>
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>{children}</Box>
  </Box>
)

const Connector = () => <Box sx={{ flex: 1, height: 8, borderRadius: 4, bgcolor: "#D9D9D9" }} />

// const TileCard = ({ icon, label, value }: Tile) => (
//   <Paper
//     variant="outlined"
//     sx={{
//       p: 1.25,
//       borderRadius: 2,
//       borderColor: "#EFEFEF",
//       boxShadow: "none",
//       display: "flex",
//       alignItems: "center",
//       gap: 1,
//       minHeight: 58,
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
const TileCard = ({ icon, label, value }) => (
  <Paper
    elevation={0}
    sx={{
      p: 1.25,
      borderRadius: 2,
      border: "none",
      boxShadow: "none",
      display: "flex",
      alignItems: "center",
      gap: 1,
      minHeight: 58,
      backgroundColor: "#fff",
    }}
  >
    <Box sx={{ color: "error.main", display: "grid", placeItems: "center" }}>
      {icon}
    </Box>

    <Box sx={{ minWidth: 0 }}>
      {/* 🔹 Label (key) - Bold */}
      <Typography
        variant="caption"
        sx={{ fontWeight: 800, color: "text.primary" , mb: 0.8}}
      >
        {label}
      </Typography>

      {/* 🔹 Value - Light */}
      <Typography
        variant="body2"
        sx={{
          fontWeight: 300,
          color: "text.secondary",
          lineHeight: 1.2,
          mt: 0.25,
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

 


const TMinScaffold: React.FC<Props> = ({
  eslId,
  sapId = "—",
  assignedDate = "—",
  timeRemaining = "—",
  site = "—",
  steps = DEFAULT_STEPS,
  tiles,
  tilesTitle = "Inspection Details",
  enableUploadDoc = false,
  fileLocationLabel = "Inspection Files Location:",
  fileLocation,

  onBack,
  onNext,
  backLabel = "BACK",
  nextLabel = "Next",
  rightExtra,

  showFooter = true,
  showBackButton = true,
  showNextButton = true,
  showFileLocation = true,
  disableNextButton = false,
  

  children,
}) => {
  const [editing, setEditing] = useState(false)
  const [sap, setSap] = useState(sapId)
  const [draft, setDraft] = useState(sapId)

  const handleBack = () => (onBack ? onBack() : window.history.back())

  const workflow = Cookies.get('workflow')
  
  const workflowType =  workflow ? JSON.parse(workflow) : {}

  const StepNode = ({
    title,
    state,
    index,
    helper,
  }: {
    title: string
    state: TMinStep["state"]
    index: number
    helper?: string
  }) => {
    const bg =
      state === "done"
        ? "linear-gradient(180deg, #6BD871, #1D3F1F)"
        : state === "active"
          ? "warning.main"
          : "grey.400"
    const textColor = state === "done" ? "#459649" : state === "active" ? "#FF9800" : "#5A5A5A"
    const fontBold = state === "done" || state === "active" ? "700" : "500"
    return (
      <Fragment key={title}>
        <Box
          sx={{
            maxWidth: 95,
            textAlign: "center",
            position: "absolute",
            left: `${(index - 1) * (100 / (steps.length - 1))}%`,
            transform: "translateX(-50%)",
            top: "-5em",
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>
            {title}
          </Typography>
        </Box>
        {state === "active" ? (
          <Box
            sx={{
              maxWidth: 95,
              textAlign: "center",
              position: "absolute",
              left: `${(index - 1) * (100 / (steps.length - 1))}%`,
              transform: "translate(-50%, -50%) scale(1.5)",
              top: "50%",
              zIndex: 2,
              "&:before": {
                content: '""',
                position: "absolute",
                transform: "translate(-50%, -50%)",
                top: "50%",
                left: "50%",
                width: "70%",
                height: "70%",
                borderRadius: "50%",
                bgcolor: "#E8E8E8",
                animation: "pulse 2s infinite",
                margin: "auto",
              },
              "&:after": {
                content: '""',
                position: "absolute",
                transform: "translate(-50%, -50%)",
                top: "50%",
                left: "50%",
                width: "40%",
                height: "40%",
                borderRadius: "50%",
                bgcolor: "#E8E8E8",
                animation: "pulse 2s infinite",
                backgroundImage: "linear-gradient(180deg, yellow, red)",
                margin: "auto",
              },
            }}
          >
            <Box sx={{ display: "grid", placeItems: "center" }}>
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  backgroundImage: bg,
                  bgcolor: "#fff",
                  color: "#fff",
                  fontWeight: 700,
                  display: "grid",
                  placeItems: "center",
                  border: "1px solid #e8e8e8",
                  boxShadow: "0px -1px 0px rgba(0, 0, 0, 0.2)",
                }}
              />
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              maxWidth: 95,
              textAlign: "center",
              position: "absolute",
              left: `${(index - 1) * (100 / (steps.length - 1))}%`,
              transform: "translate(-50%, -50%)",
              top: "50%",
              zIndex: 2,
            }}
          >
            <Box sx={{ display: "grid", placeItems: "center" }}>
              <Box
                sx={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  backgroundImage: bg,
                  bgcolor: "#fff",
                  color: "#fff",
                  fontWeight: 700,
                  display: "grid",
                  placeItems: "center",
                  border: "1px solid #e8e8e8",
                  boxShadow: "0px -1px 0px rgba(0, 0, 0, 0.2)",
                }}
              />
            </Box>
          </Box>
        )}
        <Box
          sx={{
            maxWidth: 95,
            textAlign: "center",
            position: "absolute",
            left: `${(index - 1) * (100 / (steps.length - 1))}%`,
            transform: "translateX(-50%)",
            bottom: "-4rem",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: "block",
              width: "5rem",
              color: textColor,
              fontWeight: fontBold,
            }}
          >
            {helper || `Step ${index}`}
          </Typography>
        </Box>
      </Fragment>
    )
  }

  return (
    <Box sx={{ p: 2.25, pt: "4.75rem" }}>
      <Card elevation={0} sx={{ borderRadius: 2, border: "1px solid #ededed", mb: 2  }}>
        <CardContent sx={{ minHeight:"13rem", p:'0 1rem', display:'flex', alignItems:'center', "&:last-child": {
            paddingBottom: 0
          } }}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "stretch", width: '100%'}}>
            {workflowType?.tmin ?  <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                jsustifyContent: "space-between",
                bgcolor: "#FFF7F7",
                borderRadius: 2,
                border: "1px solid #EFEFEF",
                p: 1.5,
              }}
            >
              <Box sx={{ flex: "0 0 150px", display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 700, fontSize: "0.8rem", color: "#28A5DD" }}
                >
                  ESL ID
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#5A5A5A", fontSize: "0.8rem" }}>
                  SAP ID
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#6D6E71", fontSize: "0.8rem" }}>
                  Assigned Date
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#6D6E71", fontSize: "0.8rem" }}>
                  Time Remaining
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#6D6E71", fontSize: "0.8rem" }}>
                  Site
                </Typography>
              </Box>
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Typography sx={{ color: "#28A5DD", fontWeight: 600, fontSize: "0.8rem" }}>
                  {eslId}
                </Typography>
                <Typography sx={{ fontWeight: 600, fontSize: "0.8rem", color: "#080404", display:'flex', gap:1}}>
                  {sap}
               <EditOutlinedIcon sx = {{color: "#28A5DD", width: "12px",height: "12px", cursor:"Pointer",borderBottom:"1px solid #28A5DD"}}/>
                </Typography>
                <Typography sx={{ fontWeight: 600, fontSize: "0.8rem", color: "#292929" }}>
                  {assignedDate}
                </Typography>
                <Typography sx={{ fontWeight: 600, fontSize: "0.8rem", color: "#292929" }}>
                  {timeRemaining}
                </Typography>
                <Typography sx={{ fontWeight: 600, fontSize: "0.8rem", color: "#292929" }}>
                  {site}
                </Typography>
              </Box>
            </Box> : null}

            {workflowType?.hitLeak ?  
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Avatar
        src={userImg}
        alt="Profile"
        sx={{
          width: 100,
          height: 100,
          padding: "5px",
          backgroundImage: `url(${userBgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          borderRadius: "50%",
        }}
      />
      <Box sx={{ borderLeft: "3px solid #D5010B", paddingLeft: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "red" }}>
          Welcome, Steven
        </Typography>
        <Typography variant="body2" sx={{ color: "gray" }}>
          EXXON MSP ENGINEER
        </Typography>
      </Box>
    </Box> : null}
              <Box
              sx={{
                px: 1,
                py: 0.25,
                minWidth: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                p: "0 5%",
                m: "0 auto",
              }}
            >
              <Box
                sx={() => {
                  const lastDoneIndex = Math.max(
                    ...steps.map((s, i) => (s.state === "done" ? i : -1)),
                    -1,
                  );
                  const percent = ((lastDoneIndex + 1) / (steps.length - 1)) * 100;
                  const progressPercent = percent > 100 ? 100 : percent;
                  return {
                    background: "#E8E8E8",
                    height: "0.8rem",
                    width: "100%",
                    overflow: "visible",
                    position: "relative",
                    boxShadow: "0 -1px 0 rgba(0,0,0,0.2)",
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      height: "100%",
                      width: `${progressPercent}%`,
                      backgroundImage: "linear-gradient(180deg, #6BD871, #1D3F1F)",
                      zIndex: 1,
                      borderRadius: 4,
                      transition: "width 0.2s ease",
                    },
                  }
                }}
              >
                {steps.map((s, i) => (
                  <React.Fragment key={s.title}>
                    <StepNode title={s.title} state={s.state} index={i + 1} helper={s.helper} />
                  </React.Fragment>
                ))}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>


      {tiles && tiles.length > 0 && (
        <Card elevation={0} sx={{ borderRadius: 2, border: "1px solid #ededed", mb: 2 }}>
          <CardContent sx={{ p: 2 }}>
            <Typography variant="subtitle2" sx={{ color: "error.main", fontWeight: 700, mb: 1 }}>
              {tilesTitle}
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
              {tiles.map((t, i) => (
                <TileCard key={i} {...t} />
              ))}
            </Box>
          </CardContent>
        </Card>
      )}


      {children}


      {showFooter && (
        <Box sx={{ mt: 2 }}>
          {showFileLocation && fileLocation && (
            <Box>
              <Typography variant="caption" sx={{ color: "error.main", fontWeight: 700 }}>
                {fileLocationLabel}
              </Typography>
              <Typography variant="caption" sx={{ ml: 1, color: "text.secondary" }}>
                {fileLocation}
              </Typography>
            </Box>
          )}

          {(showBackButton || showNextButton || rightExtra) && (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={enableUploadDoc ? "space-between" : "flex-end"}
              sx={{ mt: 1.5 }}
            >
              {enableUploadDoc ? (
                <Button disabled variant="contained" color="primary" sx={{ textTransform: "none" }}>
                  UPLOAD DOCUMENTS
                </Button>
              ) : null}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {showBackButton ? (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleBack}
                    sx={{ textTransform: "none" }}
                  >
                    {backLabel}
                  </Button>
                ) : (
                  <span />
                )}

                <Box>
                  {rightExtra}
                  {showNextButton && (
                    <Button
                      variant="contained"
                      onClick={onNext}
                      disabled={disableNextButton}
                      sx={{
                        textTransform: "none",
                        ml: rightExtra ? 1.5 : 0,
                        px: 4,
                        borderRadius: 2,
                        bgcolor: "#FF4D4D",
                        "&:hover": { bgcolor: "#E53935" },
                      
                      }}
                    >
                      {nextLabel}
                    </Button>
                  )}
                </Box>
              </Box>
            </Stack>
          )}
        </Box>
      )}
    </Box>
  )
}

export default TMinScaffold;