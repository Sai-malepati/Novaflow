import React, { useMemo, useState } from "react";
import {
  Button,
  Chip,
  IconButton,
  Link as MUILink,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Typography,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

import MainLayout from "../components/MainLayout";
import TMinScaffold, { TMinStep } from "../components/TMinScaffold";
import RequestMissingDocsDialog, {
  MailDoc,
} from "../components/RequestMissingDocsDialog";
import { useLocation, useNavigate } from "react-router-dom";

type DocRow = {
  id: string;
  name: string;
  link: string;
  available: "Yes" | "No";
  tool: "CREDO" | "Vault" | "Open-Text";
  quality: "Good" | "Average" | "Bad";
};

const ROWS: DocRow[] = [
  {
    id: "1",
    name: "Manufacturer Record Book (MRB)",
    link: "https://dalwaps//..",
    available: "Yes",
    tool: "CREDO",
    quality: "Good",
  },
  {
    id: "2",
    name: "General arrangement / fabrication drawing",
    link: "https://dalwaps//..",
    available: "Yes",
    tool: "CREDO",
    quality: "Good",
  },
  {
    id: "3",
    name: "Datasheet",
    link: "https://dalwaps//..",
    available: "Yes",
    tool: "CREDO",
    quality: "Average",
  },
  {
    id: "4",
    name: "U1A form",
    link: "https://dalwaps//..",
    available: "Yes",
    tool: "CREDO",
    quality: "Bad",
  },
  {
    id: "5",
    name: "Nameplate details",
    link: "https://dalwaps//..",
    available: "Yes",
    tool: "Vault",
    quality: "Average",
  },
  {
    id: "6",
    name: "Piping and Instrumentation Diagram",
    link: "https://dalwaps//..",
    available: "Yes",
    tool: "Vault",
    quality: "Good",
  },
  {
    id: "7",
    name: "Equipment strategy",
    link: "https://dalwaps//..",
    available: "Yes",
    tool: "Open-Text",
    quality: "Good",
  },
  {
    id: "8",
    name: "TML Sketch",
    link: "https://dalwaps//..",
    available: "Yes",
    tool: "Open-Text",
    quality: "Average",
  },
];

const DOCS_STEPS: TMinStep[] = [
  { title: "Gathering Details", helper: "Complete", state: "done" },
  { title: "Gathering Documents", helper: "Complete", state: "done" },
  { title: "Data Collection (OCR)", helper: "In Progress", state: "active" },
  { title: "3D Model Generating", state: "idle" },
  { title: "T-Min Review", state: "idle" },
  { title: "Generating Report", state: "idle" },
];

const TMinDocs: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { eslId?: string } };
  const eslId = state?.eslId ?? "107011";

  // six tiles
  const tiles = [
    { icon: <span>🏷️</span>, label: "Equipment Tag", value: "CLE3L3-T0302" },
    {
      icon: <span>🛠️</span>,
      label: "Equipment Type",
      value: "Pressure Vessel",
    },
    {
      icon: <span>📈</span>,
      label: "Thickness Status",
      value: "Vessel - Above IDM RL",
    },
    { icon: <span>👥</span>, label: "Business Team", value: "CLEUS" },
    { icon: <span>🪪</span>, label: "Site Inspector", value: "Akshay Mahto" },
    { icon: <span>🏭</span>, label: "Unit", value: "CLEU3" },
  ];

  const fileLocation =
    "K:\\BTAREA\\BTES\\FIXEDEQUIP\\Inspection\\FS\\CLEU\\CLEUs\\Inspection Planner’s Folder\\EOR Folder CLE3L3-T0302";

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const allSelected = selectedIds.length === ROWS.length && ROWS.length > 0;

  const toggleOne = (id: string) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  const toggleAll = () =>
    setSelectedIds((prev) =>
      prev.length === ROWS.length ? [] : ROWS.map((r) => r.id)
    );

  const selectedDocs: MailDoc[] = useMemo(
    () =>
      ROWS.filter((r) => selectedIds.includes(r.id)).map((r) => ({
        id: r.id,
        name: r.name,
        tool: r.tool,
        quality: r.quality,
        available: r.available,
      })),
    [selectedIds]
  );

  const [mailOpen, setMailOpen] = useState(false);

  return (
    <MainLayout>
      <TMinScaffold
        eslId={eslId}
        sapId="10819961"
        assignedDate="30/07/2025"
        timeRemaining="2 Days"
        site="Baytown"
        steps={DOCS_STEPS}
        tiles={tiles}
        fileLocationLabel="Inspection Files Location:"
        fileLocation={fileLocation}
        onBack={() => navigate("/tmin")}
        onNext={() => navigate("/tmin/model", { state: { eslId } })} // <-- ✅ go to TMinModel
        rightExtra={
          <Button
            variant="outlined"
            color="error"
            sx={{ textTransform: "none", mr: 1.25 }}
            onClick={() => setMailOpen(true)}
            disabled={selectedDocs.length === 0}
          >
            REQUEST MISSING DOCS
          </Button>
        }
      >
        <Typography
          variant="subtitle2"
          sx={{ color: "text.secondary", fontWeight: 700, mb: 1 }}
        >
          Documents Collected
        </Typography>

        <Paper variant="outlined" sx={{ borderRadius: 2, overflow: "hidden" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#FFF7F7" }}>
                  <TableCell width={50}>
                    <Checkbox
                      size="small"
                      checked={allSelected}
                      indeterminate={!allSelected && selectedIds.length > 0}
                      onChange={toggleAll}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Document Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Document Links</TableCell>
                  <TableCell sx={{ fontWeight: 700, whiteSpace: "nowrap" }}>
                    Available /<br /> NON Available
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>
                    Tools{" "}
                    <Typography
                      component="span"
                      sx={{ color: "text.disabled" }}
                    >
                      ↕
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>
                    Document Quality
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, textAlign: "center" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {ROWS.map((r) => {
                  const checked = selectedIds.includes(r.id);
                  return (
                    <TableRow key={r.id} hover>
                      <TableCell width={50}>
                        <Checkbox
                          size="small"
                          checked={checked}
                          onChange={() => toggleOne(r.id)}
                        />
                      </TableCell>

                      <TableCell>{r.name}</TableCell>

                      <TableCell>
                        <MUILink href={r.link} underline="hover">
                          {r.link}
                        </MUILink>
                      </TableCell>

                      <TableCell>
                        <Typography
                          color={
                            r.available === "Yes"
                              ? "success.main"
                              : "error.main"
                          }
                          fontWeight={600}
                        >
                          {r.available}
                        </Typography>
                      </TableCell>

                      <TableCell>{r.tool}</TableCell>

                      <TableCell>
                        <Chip
                          size="small"
                          label={r.quality}
                          color={
                            r.quality === "Good"
                              ? "success"
                              : r.quality === "Average"
                                ? "warning"
                                : "error"
                          }
                          variant="outlined"
                        />
                      </TableCell>

                      <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                        <IconButton size="small">
                          <VisibilityOutlinedIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small">
                          <DownloadOutlinedIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small">
                          <DeleteOutlineOutlinedIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </TMinScaffold>

      <RequestMissingDocsDialog
        open={mailOpen}
        eslId={eslId}
        selectedDocs={selectedDocs}
        onClose={() => setMailOpen(false)}
        onSend={(payload) => {
          console.log("EMAIL PAYLOAD (UI only):", {
            eslId,
            ...payload,
            selectedDocs,
          });
          setMailOpen(false);
        }}
      />
    </MainLayout>
  );
};

export default TMinDocs;
