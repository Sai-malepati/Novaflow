import React from "react";

import {

  Box,

  Paper,

  Stack,

  Typography,

  Button,


} from "@mui/material";

import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

import MainLayout from "../../components/MainLayout";

import TMinScaffold, { TMinStep } from "../../components/TMinScaffold";



const STEPS_ADOBE: TMinStep[] = [

  { title: "Reading Tasks", helper: "Complete", state: "done" },

  { title: "Collecting Details", helper: "In Progress", state: "active" },

  { title: "Collecting Data", state: "idle", helper: "Step 3" },

  { title: "Engineering Analysis", state: "idle", helper: "Step 4" },

  { title: "MSP Review", state: "idle", helper: "Step 5" },

  { title: "Reports Generation", state: "idle", helper: "Step 6" },

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

const UploadFile: React.FC = () => {

  const eslId = "107011";

  const [file, setFile] = React.useState<File | null>(null);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const openPicker = () => inputRef.current?.click();

  const handlePick: React.ChangeEventHandler<HTMLInputElement> = (e) => {

    const f = e.target.files?.[0] ?? null;

    setFile(f);

  };

  const handleUpload = () => {

    if (!file) return;

    console.log("Uploading:", file.name);

  };

  return (
    <MainLayout>
      <TMinScaffold

        eslId={eslId}

        sapId="10819961"

        assignedDate="30/07/2025"

        timeRemaining="2 Days"

        site="Baytown"

        steps={STEPS_ADOBE}


      >
        <SectionTitle>Document Uploading</SectionTitle>

        <Paper

          variant="outlined"

          sx={{

            borderRadius: 2,

            p: 1.5,

          }}
        >
          <Stack

            direction="row"

            alignItems="center"

            spacing={1.5}

            sx={{

              border: "1px solid #E6E8EB",

              borderRadius: 1.5,

              pl: 1,

            }}
          >
            <Box

              sx={{

                width: 48,

                height: 48,

                display: "grid",

                placeItems: "center",

              }}
            >
              <CloudUploadOutlinedIcon sx={{ color: "#2C7BE5" }} />
            </Box>

         
            <Box

              onClick={openPicker}

              sx={{

                flex: 1,

                py: 1.25,

                color: file ? "text.primary" : "text.secondary",

                cursor: "pointer",

                userSelect: "none",

              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600 }}>

                {file ? file.name : "Upload the ESL File"}
              </Typography>
            </Box>

            <Button

              variant="contained"

              color="error"

              onClick={handleUpload}

              disabled={!file}

              sx={{

                textTransform: "none",

                px: 3,

                mr: 1,

              }}
            >

              UPLOAD
            </Button>
          </Stack>


          <input

            ref={inputRef}

            type="file"

            onChange={handlePick}

            style={{ display: "none" }}



          />
        </Paper>


        {false && (
          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
            <Button

              variant="outlined"

              color="error"

              onClick={() => window.history.back()}

              sx={{ textTransform: "none" }}
            >

              Back to List
            </Button>
          </Stack>

        )}
      </TMinScaffold>
    </MainLayout>

  );

};

export default UploadFile;

