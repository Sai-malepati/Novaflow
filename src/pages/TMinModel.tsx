import React from "react";
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
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import MainLayout from "../components/MainLayout";
import TMinScaffold, { TMinStep } from "../components/TMinScaffold";
import { useLocation, useNavigate } from "react-router-dom";

/* --------------------------------- data --------------------------------- */

const STEPS: TMinStep[] = [
  { title: "Gathering Details", helper: "Complete", state: "done" },
  { title: "Gathering Documents", helper: "Complete", state: "done" },
  { title: "Data Collection (OCR)", helper: "Complete", state: "done" },
  { title: "3D Model Generating", state: "active" },
  { title: "T-Min Review", state: "idle" },
  { title: "Generating Report", state: "idle" },
];

type Row = { id: string; label: string; param: string; comment: string };
type LocRow = { id: string; label: string; param: string; comment: string };

const DESIGN_ROWS_INIT: Row[] = [
  {
    id: "d1",
    label: "Piping Specification",
    param: "Shell Ring 1",
    comment: "FE to review the low reading areas (probably lower)",
  },
  {
    id: "d2",
    label: "Metallurgy",
    param: "Shell",
    comment: "FE to review the low reading areas (probably lower)",
  },
  {
    id: "d3",
    label: "Design Pressure",
    param: "85.5",
    comment: "FE to review the low reading areas (probably lower)",
  },
  {
    id: "d4",
    label: "Design Temperature",
    param: "0.750",
    comment: "FE to review the low reading areas (probably lower)",
  },
  {
    id: "d5",
    label: "Code of Construction Year",
    param: "0.125",
    comment: "FE to review the low reading areas (probably lower)",
  },
  {
    id: "d6",
    label: "Allowable Stress",
    param: "CS",
    comment: "FE to review the low reading areas (probably lower)",
  },
  {
    id: "d7",
    label: "Calculation Prepared by",
    param: "Shell Ring 1",
    comment: "FE to review the low reading areas (probably lower)",
  },
  { id: "d8", label: "Date", param: "23/09/2025", comment: "" },
];

const LOCATION_ROWS_INIT: LocRow[] = [
  {
    id: "l1",
    label: "Component",
    param: "ESL & Fabrication drawing(OT, Vault)",
    comment: "",
  },
  { id: "l2", label: "Pipe NPS", param: "(ESL & Drawing)", comment: "" },
  { id: "l3", label: "Schedule", param: "(ESL & Drawing)", comment: "" },
  { id: "l4", label: "Threaded Pipe", param: "(Drawing)", comment: "" },
  { id: "l5", label: "Tmm", param: "0.125", comment: "" },
  { id: "l6", label: "TPMG", param: "CS", comment: "" },
  { id: "l7", label: "TAPI574", param: "Shell Ring 1", comment: "" },
  { id: "l8", label: "TB31.3", param: "(Plant Manager)", comment: "" },
  { id: "l9", label: "Localized damage", param: "85.5", comment: "" },
];

/* ------------------------------ helpers UI ------------------------------ */
const SectionTitle: React.FC<React.PropsWithChildren> = ({ children }) => (
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
    }}
  >
    {children}
  </Box>
);

/* --------------------------------- page --------------------------------- */

const TMinModel: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { eslId?: string } };
  const eslId = state?.eslId ?? "107011";

  /* editable rows */
  const [designRows, setDesignRows] = React.useState<Row[]>(DESIGN_ROWS_INIT);
  const [locationRows, setLocationRows] =
    React.useState<LocRow[]>(LOCATION_ROWS_INIT);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [draftComment, setDraftComment] = React.useState("");

  const startEdit = (id: string, current: string) => {
    setEditingId(id);
    setDraftComment(current);
  };
  const commitEdit = () => {
    if (!editingId) return;
    setDesignRows((prev) =>
      prev.map((r) =>
        r.id === editingId ? { ...r, comment: draftComment } : r
      )
    );
    setLocationRows((prev) =>
      prev.map((r) =>
        r.id === editingId ? { ...r, comment: draftComment } : r
      )
    );
    setEditingId(null);
    setDraftComment("");
  };

  /* flow flags */
  const [modelCreated, setModelCreated] = React.useState(false);
  const [hasThickness, setHasThickness] = React.useState(false);
  const [approved, setApproved] = React.useState(false);

  /* popup for send to review */
  const [openSendPopup, setOpenSendPopup] = React.useState(false);

  const handleCreate3D = () => setModelCreated(true);
  const handleCalcRT = () => setHasThickness(true);
  const handleSendToReview = () => setOpenSendPopup(true);
  const handleSendOk = () => {
    setOpenSendPopup(false);
    setApproved(true);
  };

  /* generate report navigation */
  const handleGenerateReport = React.useCallback(() => {
    navigate("/tmin-report", { state: { eslId } });
  }, [navigate, eslId]);

  /* scaffold tiles */
  const tiles = [
    { icon: <span>🏷️</span>, label: "Equipment Tag", value: "CLE3L3-T0302" },
    {
      icon: <span>⚙️</span>,
      label: "Process Description",
      value: "Pressure Vessel",
    },
    { icon: <span>👥</span>, label: "Business Team", value: "CLEUS" },
    { icon: <span>🏭</span>, label: "Unit", value: "CLEU3" },
  ];

  const fileLocation =
    "K:\\BTAREA\\BTES\\FIXEDEQUIP\\Inspection\\FS\\CLEU\\CLEUs\\Inspection Planner’s Folder\\EOR Folder CLE3L3-T0302";

  /* --------- NEW: state for MSP comments & Assumptions --------- */
  const [mspComment, setMspComment] = React.useState(
    "*Has not had an initial internal inspection. Internal required to ensure process changes have been successful and to ensure shell integrity."
  );
  const [assumptions, setAssumptions] = React.useState(
    "I:\\BTAREA\\BTES\\FIXEDEQUIP\\Inspection\\FS\\CLEU\\CLEUs\nInspection Planner’s Folder\\EOR Folder CLE3L3-T0302"
  );

  return (
    <MainLayout>
      <TMinScaffold
        eslId={eslId}
        sapId="10819961"
        assignedDate="30/07/2025"
        timeRemaining="2 Days"
        site="Baytown"
        steps={STEPS}
        tiles={tiles}
        tilesTitle="General Information"
        fileLocation={fileLocation}
        /* we render a custom footer that changes with the flow */
        showFooter={false}
      >
        {/* banner – retirement thickness value when calculated */}
        {hasThickness && !approved && (
          <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}>
            <Chip
              label="Retirement Thickness for IDM/EOR Evaluation : 1.33 mm"
              color="success"
              sx={{ fontWeight: 700 }}
            />
          </Box>
        )}
        {/* status Approved badge */}
        {approved && (
          <Box
            sx={{ mt: 1, display: "flex", justifyContent: "flex-end", gap: 1 }}
          >
            <Typography sx={{ fontWeight: 700, mr: 1 }}>Status</Typography>
            <Chip label="Approved" color="success" variant="filled" />
          </Box>
        )}

        {/* ----- Validate Collected Data : Design Information ----- */}
        <SectionTitle>Validate Collected Data</SectionTitle>

        <Paper variant="outlined" sx={{ overflow: "hidden", mb: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#FFECEC" }}>
                <TableCell sx={{ fontWeight: 700 }}>
                  Design Information
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Parameter&apos;s</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Comments</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {designRows.map((r) => {
                const editing = editingId === r.id;
                return (
                  <TableRow key={r.id}>
                    <TableCell>{r.label}</TableCell>
                    <TableCell sx={{ color: "text.secondary" }}>
                      {r.param}
                    </TableCell>
                    <TableCell sx={{ minWidth: 420 }}>
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
                            px: 1.5,
                            py: 0.75,
                            bgcolor: "#F5F7F9",
                            borderRadius: 1,
                            border: "1px solid #ECEDEF",
                            color: "text.primary",
                          }}
                        >
                          {r.comment || "—"}
                        </Box>
                      )}
                    </TableCell>
                    <TableCell width={52}>
                      <IconButton
                        size="small"
                        onClick={() => startEdit(r.id, r.comment)}
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>

        {/* <SectionTitle>Location Information</SectionTitle> */}

        <Paper variant="outlined" sx={{ overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#FFECEC" }}>
                <TableCell sx={{ fontWeight: 700 }}>Location</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Parameter&apos;s</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Comment</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locationRows.map((r) => {
                const editing = editingId === r.id;
                return (
                  <TableRow key={r.id}>
                    <TableCell>{r.label}</TableCell>
                    <TableCell sx={{ color: "text.secondary" }}>
                      {r.param}
                    </TableCell>
                    <TableCell sx={{ minWidth: 420 }}>
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
                            px: 1.5,
                            py: 0.75,
                            bgcolor: "#F5F7F9",
                            borderRadius: 1,
                            border: "1px solid #ECEDEF",
                            color: "text.primary",
                          }}
                        >
                          {r.comment || "—"}
                        </Box>
                      )}
                    </TableCell>
                    <TableCell width={52}>
                      <IconButton
                        size="small"
                        onClick={() => startEdit(r.id, r.comment)}
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>

        {/* ===== MSP Engineer comments / Assumptions ===== */}
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 0.75 }}>
            <Typography sx={{ fontWeight: 700, mr: 1 }}>
              MSP Engineer comments
            </Typography>
            <IconButton size="small">
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
          <Typography sx={{ color: "text.secondary", mb: 2 }}>
            *Has not had an initial internal inspection. Internal required to
            ensure process changes have been successful and to ensure shell
            integrity.
          </Typography>

          <Typography sx={{ fontWeight: 700, mb: 0.75 }}>
            Assumptions
          </Typography>
          <Paper variant="outlined" sx={{ p: 1 }}>
            <TextField
              fullWidth
              multiline
              minRows={3}
              value={`I:\\BTAREA\\BTES\\FIXEDEQUIP\\Inspection\\FS\\CLEU\\CLEUs\nInspection Planner’s Folder\\EOR Folder CLE3L3-T0302`}
              variant="standard"
              InputProps={{ disableUnderline: true }}
            />
          </Paper>
        </Box>

        {/* --------------------------- Dynamic Footer --------------------------- */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          {/* LEFT BUTTON */}
          {!modelCreated && (
            <Button
              variant="outlined"
              color="error"
              sx={{ textTransform: "none" }}
              onClick={() => navigate(-1)}
            >
              BACK TO LIST
            </Button>
          )}
          {modelCreated && !hasThickness && (
            <Button
              variant="contained"
              sx={{ textTransform: "none" }}
              onClick={handleCalcRT}
            >
              CALCULATE RETIREMENT THICKNESS
            </Button>
          )}
          {hasThickness && (
            <Button
              variant="outlined"
              color="error"
              sx={{ textTransform: "none" }}
              onClick={() => navigate(-1)}
            >
              BACK TO LIST
            </Button>
          )}

          {/* RIGHT BUTTON */}
          {!modelCreated && (
            <Button
              variant="contained"
              color="error"
              sx={{ textTransform: "none" }}
              onClick={handleCreate3D}
            >
              CREATE 3D MODEL
            </Button>
          )}

          {modelCreated && !hasThickness && (
            <Button
              variant="outlined"
              color="error"
              sx={{ textTransform: "none" }}
              onClick={() => navigate(-1)}
            >
              BACK TO LIST
            </Button>
          )}

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
      </TMinScaffold>

      {/* --------------------------- Send-to-review popup --------------------------- */}
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
  );
};

export default TMinModel;
