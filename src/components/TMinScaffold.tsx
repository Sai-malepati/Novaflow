import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  IconButton,
  TextField,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Stepper } from "./StepperProgressBar";

export type TMinStep = {
  title: string;
  state: "done" | "active" | "idle";
  helper?: string;
};

export const DEFAULT_STEPS: TMinStep[] = [
  { title: "Gathering Details", helper: "Complete", state: "done" },
  { title: "Gathering Documents", helper: "In Progress", state: "active" },
  { title: "Data Collection (OCR)", state: "idle" },
  { title: "3D Model Generating", state: "idle" },
  { title: "T-Min Review", state: "idle" },
  { title: "Generating Report", state: "idle" },
];

type Tile = { icon: React.ReactNode; label: string; value: string };

type Props = {
  eslId: string

  // Status panel
  sapId?: string
  assignedDate?: string
  timeRemaining?: string
  site?: string

  // Steps
  steps?: TMinStep[]
  activeStep?: number

  // Tiles
  tiles?: Tile[]
  tilesTitle?: string

  // Footer
  fileLocationLabel?: string
  fileLocation?: string
  onBack?: () => void
  onNext?: () => void
  backLabel?: string
  nextLabel?: string
  rightExtra?: React.ReactNode

  /** Visibility flags (all default to true; safe for other pages) */
  showFooter?: boolean
  showBackButton?: boolean
  showNextButton?: boolean
  showFileLocation?: boolean

  children?: React.ReactNode
}

/* ---------- small local helpers ---------- */
const Row = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
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
    <Typography
      sx={{ color: "text.secondary", fontSize: 13.5, fontWeight: 700 }}
    >
      {label}
    </Typography>
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      {children}
    </Box>
  </Box>
);

const StepNode = ({
  title,
  state,
  index,
  helper,
}: {
  title: string;
  state: TMinStep["state"];
  index: number;
  helper?: string;
}) => {
  const bg =
    state === "done"
      ? "success.main"
      : state === "active"
        ? "warning.main"
        : "grey.400";
  return (
    <Box sx={{ flex: "0 1 110px", minWidth: 100, textAlign: "center" }}>
      <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>
        {title}
      </Typography>
      <Box sx={{ display: "grid", placeItems: "center" }}>
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            bgcolor: bg,
            color: "#fff",
            fontWeight: 700,
            display: "grid",
            placeItems: "center",
          }}
        >
          ✓
        </Box>
      </Box>
      <Typography
        variant="caption"
        sx={{ color: "text.secondary", mt: 0.5, display: "block" }}
      >
        Step {index}
      </Typography>
      {helper && (
        <Typography
          variant="body2"
          sx={{
            mt: 0.5,
            fontWeight: 700,
            color: state === "done" ? "success.main" : "warning.main",
          }}
        >
          {helper}
        </Typography>
      )}
    </Box>
  );
};

const Connector = () => (
  <Box sx={{ flex: 1, height: 8, borderRadius: 4, bgcolor: "#D9D9D9" }} />
);

const TileCard = ({ icon, label, value }: Tile) => (
  <Paper
    variant="outlined"
    sx={{
      p: 1.25,
      borderRadius: 2,
      borderColor: "#EFEFEF",
      boxShadow: "none",
      display: "flex",
      alignItems: "center",
      gap: 1,
      minHeight: 58,
    }}
  >
    <Box sx={{ color: "error.main", display: "grid", placeItems: "center" }}>
      {icon}
    </Box>
    <Box sx={{ minWidth: 0 }}>
      <Typography
        variant="caption"
        sx={{ fontWeight: 800, color: "text.secondary" }}
      >
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
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

/* ---------- scaffold ---------- */
const TMinScaffold: React.FC<Props> = ({
  eslId,
  sapId = "—",
  assignedDate = "—",
  timeRemaining = "—",
  site = "—",
  activeStep = 1,
  tiles,
  tilesTitle = "Inspection Notification Details",

  fileLocationLabel = "Inspection Files Location:",
  fileLocation,

  onBack,
  onNext,
  backLabel = "BACK TO LIST",
  nextLabel = "Next",
  rightExtra,

  // NEW defaults
  showFooter = true,
  showBackButton = true,
  showNextButton = true,
  showFileLocation = true,

  children,
}) => {
  const [editing, setEditing] = useState(false)
  const [sap, setSap] = useState(sapId)
  const [draft, setDraft] = useState(sapId)

  const handleBack = () => (onBack ? onBack() : window.history.back())

  return (
    <Box sx={{ p: 2.25, pt: "4.75rem" }}>
      {/* Header: STATUS + Steps */}
      <Card elevation={0} sx={{ borderRadius: 2, border: "1px solid #ededed", mb: 2 }}>
        <CardContent sx={{ p: 1.5 }}>
          <Box sx={{ display: "flex", gap: 2, alignItems: "stretch" }}>
            {/* STATUS */}
            <Box
              sx={{
                flex: "0 0 280px",
                bgcolor: "#FFF7F7",
                borderRadius: 2,
                border: "1px solid #EFEFEF",
                p: 1.5,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 1,
                  mb: 0.25,
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 800, letterSpacing: 0.4 }}>
                  STATUS
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ ml: "auto", fontWeight: 800, color: "error.main" }}
                >
                  ESL ID : {eslId}
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Row label="SAP ID :">
                {!editing ? (
                  <>
                    <Typography sx={{ fontSize: 13.5, fontWeight: 800 }}>{sap}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setDraft(sap)
                        setEditing(true)
                      }}
                      sx={{
                        p: 0.25,
                        color: "primary.main",
                        "& .MuiSvgIcon-root": { fontSize: 16 },
                      }}
                      aria-label="Edit SAP ID"
                    >
                      <EditOutlinedIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <TextField
                      size="small"
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      sx={{ width: 130 }}
                      inputProps={{
                        style: { padding: "6px 8px", fontSize: 13.5 },
                      }}
                    />
                    <IconButton
                      color="success"
                      size="small"
                      onClick={() => {
                        setSap(draft.trim() || sap)
                        setEditing(false)
                      }}
                      sx={{ p: 0.25 }}
                    >
                      <CheckOutlinedIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => setEditing(false)}
                      sx={{ p: 0.25 }}
                    >
                      <CloseOutlinedIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                  </>
                )}
              </Row>
              <Row label="Assigned Date :">
                <Typography sx={{ fontSize: 13.5 }}>{assignedDate}</Typography>
              </Row>
              <Row label="Time Remaining :">
                <Typography sx={{ fontSize: 13.5 }}>{timeRemaining}</Typography>
              </Row>
              <Row label="Site :">
                <Typography sx={{ fontSize: 13.5 }}>{site}</Typography>
              </Row>
            </Box>

            {/* Steps rail */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                px: 1,
                py: 0.25,
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  overflowX: "auto",
                  pb: 0.5,
                }}
              >
                <Stepper activeStep={activeStep} />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Optional Tiles */}
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

      {/* Page content */}
      {children}

      {/* ===== Footer (fully controllable) ===== */}
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
              justifyContent="space-between"
              sx={{ mt: 1.5 }}
            >
              {showBackButton ? (
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<ArrowBackIcon />}
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
            </Stack>
          )}
        </Box>
      )}
    </Box>
  )
}

export default TMinScaffold;
