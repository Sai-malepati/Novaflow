// import React from "react"
// import { Box, Paper, Stack, Typography, Button } from "@mui/material"
// import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined"
// import MainLayout from "../../components/MainLayout"
// import TMinScaffold, { TMinStep } from "../../components/TMinScaffold"
// import Cookies from "js-cookie"
// import { UserInfoHeader } from "../user-info-header/UserInfoHeader"

// const STEPS_ADOBE: TMinStep[] = [
//   { title: "Reading Tasks", helper: "Complete", state: "done" },
//   { title: "Collecting Details", helper: "In Progress", state: "active" },
//   { title: "Collecting Data", state: "idle", helper: "Step 3" },
//   { title: "Engineering Analysis", state: "idle", helper: "Step 4" },
//   { title: "MSP Review", state: "idle", helper: "Step 5" },
//   { title: "Reports Generation", state: "idle", helper: "Step 6" },
// ]

// const SectionTitle: React.FC<React.PropsWithChildren> = ({ children }) => (
//   <Box
//     sx={{
//       bgcolor: "#EFF2F3",
//       border: "1px solid #E4E6E8",
//       borderRadius: 1,
//       px: 2,
//       py: 1,
//       fontWeight: 700,
//       color: "text.primary",
//       mb: 1.25,
//       mt: 2,
//     }}
//   >
//     {children}
//   </Box>
// )

// const UploadFile: React.FC = () => {
//   const eslId = "107011"

//   const [file, setFile] = React.useState<File | null>(null)
//   const inputRef = React.useRef<HTMLInputElement>(null)

//   const openPicker = () => inputRef.current?.click()

//   const handlePick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
//     const f = e.target.files?.[0] ?? null
//     setFile(f)
//   }

//   const handleUpload = () => {
//     if (!file) return
//     console.log("Uploading:", file.name)
//   }

//   // 🔹 Read workflow cookie to know if we are in Hit & Leak
//   const workflow = Cookies.get("workflow")
//   const workflowTypes = workflow ? JSON.parse(workflow) : {}
//   const isHitLeak = !!workflowTypes?.hitLeak

//   /* ------------------------------------------------------------------
//    *  HIT & LEAK LAYOUT  (Adobe format)
//    * ------------------------------------------------------------------ */
//   if (isHitLeak) {
//     return (
//       <MainLayout>
//         <Box sx={{ p: 3, pt: "5rem" }}>
//           {/* Top welcome card (Tonny / Steven etc.) */}
//           <UserInfoHeader />

//           {/* Adobe title */}
//           <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5, color: "#5A5A5A" }}>
//             Document Upload
//           </Typography>

//           {/* Upload card */}
//           <Paper
//             variant="outlined"
//             sx={{
//               borderRadius: 2,
//               p: 1.5,
//               mb: 3,
//             }}
//           >
//             <Stack
//               direction="row"
//               alignItems="center"
//               spacing={1.5}
//               sx={{
//                 border: "1px solid #E6E8EB",
//                 borderRadius: 1.5,
//                 pl: 1,
//               }}
//             >
//               <Box
//                 sx={{
//                   width: 48,
//                   height: 48,
//                   display: "grid",
//                   placeItems: "center",
//                 }}
//               >
//                 <CloudUploadOutlinedIcon sx={{ color: "#2C7BE5" }} />
//               </Box>

//               <Box
//                 onClick={openPicker}
//                 sx={{
//                   flex: 1,
//                   py: 1.25,
//                   color: file ? "text.primary" : "text.secondary",
//                   cursor: "pointer",
//                   userSelect: "none",
//                 }}
//               >
//                 <Typography variant="body2" sx={{ fontWeight: 600 }}>
//                   {file ? file.name : "Upload the ESL Files"}
//                 </Typography>
//               </Box>

//               <Button
//                 variant="contained"
//                 color="error"
//                 onClick={handleUpload}
//                 disabled={!file}
//                 sx={{
//                   textTransform: "none",
//                   px: 3,
//                   mr: 1,
//                 }}
//               >
//                 UPLOAD
//               </Button>
//             </Stack>

//             <input ref={inputRef} type="file" onChange={handlePick} style={{ display: "none" }} />
//           </Paper>

//           {/* Tool tip block – Adobe style */}
//           <Paper
//             variant="outlined"
//             sx={{
//               borderRadius: 1,
//               p: 2,
//               mt: 3,
//               maxWidth: "80%",
//               backgroundColor: "#FFFFFF",
//               borderColor: "#D9D9D9",
//             }}
//           >
//             <Typography
//               variant="subtitle2"
//               sx={{
//                 fontWeight: 600,
//                 mb: 0.75,
//                 color: "#6D6E71",
//                 fontSize: "0.8rem",
//               }}
//             >
//               Tool tip
//             </Typography>

//             <Typography
//               variant="body2"
//               sx={{
//                 fontSize: "0.8rem",
//                 color: "#6D6E71",
//                 lineHeight: 1.6,
//               }}
//             >
//               Latest PRV test reports are downloaded from the ValveTrac database.
//               <br />
//               Typically last month&apos;s reports are downloaded.
//               <br />
//               This might be a time taking task.
//               <br />
//               You will be notified when all the reports are downloaded &amp; ready to use.
//             </Typography>
//           </Paper>
//         </Box>
//       </MainLayout>
//     )
//   }

//   /* ------------------------------------------------------------------
//    *  DEFAULT T-MIN LAYOUT  (original)
//    * ------------------------------------------------------------------ */
//   return (
//     <MainLayout>
//       <TMinScaffold
//         eslId={eslId}
//         sapId="10819961"
//         assignedDate="30/07/2025"
//         timeRemaining="2 Days"
//         site="Baytown"
//         steps={STEPS_ADOBE}
//       >
//         <SectionTitle>Document Uploading</SectionTitle>

//         <Paper
//           variant="outlined"
//           sx={{
//             borderRadius: 2,
//             p: 1.5,
//           }}
//         >
//           <Stack
//             direction="row"
//             alignItems="center"
//             spacing={1.5}
//             sx={{
//               border: "1px solid #E6E8EB",
//               borderRadius: 1.5,
//               pl: 1,
//             }}
//           >
//             <Box
//               sx={{
//                 width: 48,
//                 height: 48,
//                 display: "grid",
//                 placeItems: "center",
//               }}
//             >
//               <CloudUploadOutlinedIcon sx={{ color: "#2C7BE5" }} />
//             </Box>

//             <Box
//               onClick={openPicker}
//               sx={{
//                 flex: 1,
//                 py: 1.25,
//                 color: file ? "text.primary" : "text.secondary",
//                 cursor: "pointer",
//                 userSelect: "none",
//               }}
//             >
//               <Typography variant="body2" sx={{ fontWeight: 600 }}>
//                 {file ? file.name : "Upload the ESL File"}
//               </Typography>
//             </Box>

//             <Button
//               variant="contained"
//               color="error"
//               onClick={handleUpload}
//               disabled={!file}
//               sx={{
//                 textTransform: "none",
//                 px: 3,
//                 mr: 1,
//               }}
//             >
//               UPLOAD
//             </Button>
//           </Stack>

//           <input ref={inputRef} type="file" onChange={handlePick} style={{ display: "none" }} />
//         </Paper>

//         {false && (
//           <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
//             <Button
//               variant="outlined"
//               color="error"
//               onClick={() => window.history.back()}
//               sx={{ textTransform: "none" }}
//             >
//               Back to List
//             </Button>
//           </Stack>
//         )}
//       </TMinScaffold>
//     </MainLayout>
//   )
// }

// export default UploadFile

import React from "react"
import { Box, Paper, Stack, Typography, Button } from "@mui/material"
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined"
import MainLayout from "../../components/MainLayout"
import TMinScaffold, { TMinStep } from "../../components/TMinScaffold"
import Cookies from "js-cookie"
import { UserInfoHeader } from "../user-info-header/UserInfoHeader"
import { useNavigate } from "react-router-dom"

const STEPS_ADOBE: TMinStep[] = [
  { title: "Reading Tasks", helper: "Complete", state: "done" },
  { title: "Collecting Details", helper: "In Progress", state: "active" },
  { title: "Collecting Data", state: "idle", helper: "Step 3" },
  { title: "Engineering Analysis", state: "idle", helper: "Step 4" },
  { title: "MSP Review", state: "idle", helper: "Step 5" },
  { title: "Reports Generation", state: "idle", helper: "Step 6" },
]

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
)

const UploadFile: React.FC = () => {
  const eslId = "107011"
  const [file, setFile] = React.useState<File | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const workflow = Cookies.get("workflow")
  const workflowTypes = workflow ? JSON.parse(workflow) : {}
  const isHitLeak = !!workflowTypes?.hitLeak

  const openPicker = () => inputRef.current?.click()

  const handlePick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.target.files?.[0] ?? null
    setFile(f)
  }

  const handleUpload = () => {
    if (!file) return

    // 🔹 For Hit & Leak: after upload go to Create Task List page
    if (isHitLeak) {
      // you can also store file info in sessionStorage if needed
      // sessionStorage.setItem("hitLeakUploadFileName", file.name)
      navigate("/create-task-list")
      return
    }

    // T-Min fallback (if this page is reused later)
    console.log("Uploading:", file.name)
  }

  /* ------------------------------------------------------------------
   *  HIT & LEAK LAYOUT  (Adobe Document Upload)
   * ------------------------------------------------------------------ */
  if (isHitLeak) {
    return (
      <MainLayout>
        <Box sx={{ p: 3, pt: "5rem" }}>
          <UserInfoHeader />

          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5, color: "#5A5A5A" }}>
            Document Upload
          </Typography>

          {/* Upload card */}
          <Paper
            variant="outlined"
            sx={{
              borderRadius: 2,
              p: 1.5,
              mb: 3,
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
                  {file ? file.name : "Upload the ESL Files"}
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

            <input ref={inputRef} type="file" onChange={handlePick} style={{ display: "none" }} />
          </Paper>

          {/* Tool tip */}
          <Paper
            variant="outlined"
            sx={{
              borderRadius: 1,
              p: 2,
              mt: 3,
              maxWidth: "80%",
              backgroundColor: "#FFFFFF",
              borderColor: "#D9D9D9",
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 600,
                mb: 0.75,
                color: "#6D6E71",
                fontSize: "0.8rem",
              }}
            >
              Tool tip
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontSize: "0.8rem",
                color: "#6D6E71",
                lineHeight: 1.6,
              }}
            >
              Latest PRV test reports are downloaded from the ValveTrac database.
              <br />
              Typically last month&apos;s reports are downloaded.
              <br />
              This might be a time taking task.
              <br />
              You will be notified when all the reports are downloaded &amp; ready to use.
            </Typography>
          </Paper>
        </Box>
      </MainLayout>
    )
  }

  /* ------------------------------------------------------------------
   *  DEFAULT T-MIN LAYOUT  (kept as-is)
   * ------------------------------------------------------------------ */
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

          <input ref={inputRef} type="file" onChange={handlePick} style={{ display: "none" }} />
        </Paper>
      </TMinScaffold>
    </MainLayout>
  )
}

export default UploadFile
