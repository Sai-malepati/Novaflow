import React, { useRef, useState } from 'react';
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
} from '@mui/material';
import { styled } from "@mui/material/styles"
import MainLayout from '../components/MainLayout';
import TMinScaffold, { TMinStep } from '../components/TMinScaffold';
import { useLocation, useNavigate } from 'react-router-dom';

import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useCreateItemMutation } from 'store/api';

const steps: TMinStep[] = [
  { title: "Gathering Details", helper: "Complete", state: "done" },
  { title: "Gathering Documents", helper: "In Progress", state: "active" },
  { title: "Data Collection (OCR)", state: "idle" },
  { title: "3D Model Generating", state: "idle" },
  { title: "T-Min Review", state: "idle" },
  { title: "Generating Report", state: "idle" },
];

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
/* ---- small local cards reused on this page ---- */
const HollowCard = ({
  title,
  action,
  minH = 260,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  minH?: number;
  children?: React.ReactNode;
}) => (
  <Card variant="outlined" sx={{ borderRadius: 2, }}>
    <Box
      sx={{
        px: 1.5,
        py: 1,
        bgcolor: '#F2F2F2',
        borderRadius: '10px 10px 0 0',
        borderBottom: '1px solid #e5e5e5',
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 700, color: 'text.secondary' }}
        >
          {title}
        </Typography>
        {action}
      </Stack>
    </Box>
    <CardContent sx={{ minHeight: minH, p: 2 }}>
      {children}
    </CardContent>
  </Card>
);

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
    variant="outlined"
    sx={{
      p: 1.5,
      borderRadius: 2,
      borderColor: '#EFEFEF',
      boxShadow: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: 1.25,
      minHeight: 66,
    }}
  >
    <Box sx={{ color: 'error.main', display: 'grid', placeItems: 'center' }}>
      {icon}
    </Box>
    <Box sx={{ minWidth: 0 }}>
      <Typography
        variant="caption"
        sx={{ fontWeight: 800, color: 'text.secondary' }}
      >
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          color: 'text.secondary',
          lineHeight: 1.2,
          mt: 0.25,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        title={value}
      >
        {value}
      </Typography>
    </Box>
  </Paper>
);

/* ---- page ---- */
const TMinReview: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation() as { state?: { eslId?: string } };
  const eslId = state?.eslId || '107011';
  const [createItem] = useCreateItemMutation();
  const handleUploadDoc = async (event: any) => {
    const file = event.target.files?.[0];
    file && await createItem({
      endpoint: `OpentextSource/U1AFormTMinCalculation?fileName=${file.name}`,
      body: JSON.stringify({
        fileName: file.name,
      }),
    })
  }

  // MSP Notepad
  const [note, setNote] = useState('');
  const [hoveringNotePad, setHoveringNotePad] = useState(false);
  const [savedOpen, setSavedOpen] = useState(false);
  const noteRef = useRef<HTMLTextAreaElement | null>(null);

  const saveNote = () => {
    if (!note.trim()) return;
    const content = note.replace(/\n/g, '\r\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MSP_Note_ESL_${eslId}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setSavedOpen(true);
  };
  const clearNote = () => {
    setNote('');
    requestAnimationFrame(() => noteRef.current?.focus());
  };

  const steps: TMinStep[] = [
    { title: 'Gathering Details', helper: 'Complete', state: 'done' },
    { title: 'Gathering Documents', helper: 'In Progress', state: 'active' },
    { title: 'Data Collection (OCR)', state: 'idle' },
    { title: '3D Model Generating', state: 'idle' },
    { title: 'T-Min Review', state: 'idle' },
    { title: 'Generating Report', state: 'idle' },
  ];

  return (
    <MainLayout>
      <TMinScaffold
        eslId={eslId}
        sapId="10819961"
        assignedDate="30/07/2025"
        timeRemaining="2 Days"
        site="Baytown"
        steps={steps}
        fileLocationLabel="Inspection Files Location:"
        fileLocation="K:\BTAREA\BTES\FIXEDEQUIP\Inspection\FS\CLEU\CLEUs\Inspection Planner’s Folder\EOR Folder CLE3L3-T0302"
        onBack={() => navigate("/tmin")}
        // onNext={() => console.log('Next')}
        onNext={() => navigate("/tmin-docs", { state: { eslId } })}
      >
        {/* ====== middle content (unchanged) ====== */}
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
              {/* Replace with your real tiles as needed */}
              <InfoTile icon={<span>🏷️</span>} label="Equipment Tag" value="CLE3L3-T0302" />
              <InfoTile icon={<span>🛠️</span>} label="Equipment Type" value="Pressure Vessel" />
              <InfoTile
                icon={<span>📈</span>}
                label="Thickness Status"
                value="Vessel - Above IDM RL"
              />
              <InfoTile icon={<span>👥</span>} label="Business Team" value="CLEUS" />
              <InfoTile icon={<span>🪪</span>} label="Site Inspector" value="Akshay Mahto" />
              <InfoTile icon={<span>🏭</span>} label="Unit" value="CLEU3" />
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
          <HollowCard title="Prompts" minH={280} />
          <HollowCard title="Inspection Recommendations/Descriptions" minH={280} />
          <HollowCard
            title="Attachments"
            minH={280}
            // action={
            //   <IconButton size="small" color="error" onClick={handleUploadDoc}>
            //     <NoteAddOutlinedIcon />
            //   </IconButton>
            //   <Button component="label" variant="text" startIcon={<NoteAddOutlinedIcon />}>
            //     <VisuallyHiddenInput
            //       type="file"
            //       onChange={handleUploadDoc}
            //       multiple // Set to true if you want to allow multiple files
            //     />
            //   </Button>
            // }
          >
            <Link sx={{ display: "block" }} href="#">
              bpvc_viii-1_u-1a_5.pdf
            </Link>
            <Link sx={{ display: "block" }} variant="body1" href="#">
              bpvc_6.pdf
            </Link>
          </HollowCard>
          <HollowCard
            title="MSP Engineer Note Pad"
            minH={280}
            action={
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Tooltip title="Save To Record (download)">
                  <span>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={saveNote}
                      disabled={!note.trim()}
                    >
                      <SaveAltOutlinedIcon />
                    </IconButton>
                  </span>
                </Tooltip>
                <Tooltip title="Clear">
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
                </Tooltip>
              </Box>
            }
          >
            <Box
              sx={{
                position: "relative",
                height: 240,
                border: "1px dashed #DBDBDB",
                borderRadius: 1,
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
    </MainLayout>
  )
};

export default TMinReview;