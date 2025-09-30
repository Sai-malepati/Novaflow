import React from "react";
import {
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
  Link as MUILink,
  Button,
} from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";

import MainLayout from "../components/MainLayout";
import TMinScaffold, { TMinStep } from "../components/TMinScaffold";

const STEPS_COMPLETE: TMinStep[] = [
  { title: "Gathering Details", helper: "Complete", state: "done" },
  { title: "Gathering Documents", helper: "Complete", state: "done" },
  { title: "Data Collection (OCR)", helper: "Complete", state: "done" },
  { title: "3D Model Generating", helper: "Complete", state: "done" },
  { title: "T-Min Review", helper: "Complete", state: "done" },
  { title: "Generating Report", helper: "Complete", state: "done" },
];

const tiles = [
  { icon: <span>🏷️</span>, label: "Equipment Tag", value: "CLE3L3-T0302" },
  {
    icon: <span>📄</span>,
    label: "Process Description",
    value: "Pressure Vessel",
  },
  { icon: <span>👥</span>, label: "Business Team", value: "CLEUS" },
  { icon: <span>🏭</span>, label: "Unit", value: "CLEU3" },
];

const SectionTitle: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Box
    sx={{
      bgcolor: "#EFF2F3",
      border: "1px solid #E4E6E8",
      borderRadius: 1,
      px: 2,
      py: 1,
      fontWeight: 700,
      color: "text.primary",
      mb: 1.25,
      mt: 2,
    }}
  >
    {children}
  </Box>
);

const TMinReport: React.FC = () => {
  const eslId = "107011";

  return (
    <MainLayout>
      <TMinScaffold
        eslId={eslId}
        sapId="10819961"
        assignedDate="30/07/2025"
        timeRemaining="2 Days"
        site="Baytown"
        steps={STEPS_COMPLETE}
        tiles={tiles}
        tilesTitle="General Information"
        // No footer controls on this page
        showFooter={false}
      >
        <SectionTitle>Report Generated</SectionTitle>

        <Card
          elevation={0}
          sx={{ border: "1px solid #ededed", borderRadius: 2 }}
        >
          <CardContent sx={{ p: 2 }}>
            <Paper
              variant="outlined"
              sx={{
                borderRadius: 2,
                p: 1.25,
                display: "flex",
                alignItems: "center",
                gap: 1.25,
              }}
            >
              <PictureAsPdfIcon sx={{ color: "error.main" }} />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <MUILink
                  underline="hover"
                  sx={{ fontWeight: 700, color: "text.primary" }}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  ESL ID : 107011 T-Min Final Report
                </MUILink>
                <Typography
                  variant="caption"
                  sx={{ display: "block", color: "text.secondary" }}
                >
                  PDF
                </Typography>
              </Box>

              <Stack direction="row" spacing={0.5}>
                {/* open in new tab / preview */}
                <IconButton size="small" title="Open">
                  <LaunchOutlinedIcon fontSize="small" />
                </IconButton>
                {/* download */}
                <IconButton size="small" title="Download">
                  <DownloadOutlinedIcon fontSize="small" />
                </IconButton>
                <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
                {/* delete */}
                <IconButton size="small" title="Delete">
                  <DeleteOutlineOutlinedIcon fontSize="small" />
                </IconButton>
                {/* share/send */}
                <IconButton size="small" title="Send">
                  <SendOutlinedIcon fontSize="small" />
                </IconButton>
              </Stack>
            </Paper>

            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={1.25}
              sx={{ mt: 2 }}
            >
              <Button
                variant="outlined"
                color="error"
                onClick={() => window.history.back()}
                sx={{ textTransform: "none" }}
              >
                Back to List
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </TMinScaffold>
    </MainLayout>
  );
};

export default TMinReport;
