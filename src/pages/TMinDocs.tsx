// import React, { useMemo, useState } from "react"
// import {
//   Button,
//   Chip,
//   IconButton,
//   Link as MUILink,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Checkbox,
//   Typography,
//   TableSortLabel,
//   Box,
// } from "@mui/material"
// import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
// import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined"
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"

// import MainLayout from "../components/MainLayout"
// import TMinScaffold, { TMinStep } from "../components/TMinScaffold"
// import RequestMissingDocsDialog from "../components/RequestMissingDocsDialog"
// import { useLocation, useNavigate } from "react-router-dom"
// import { useCreateItemMutation, useGetItemsQuery } from "store/api"
// import { ArrowsIcon } from "icons"

// const DOCS_STEPS: TMinStep[] = [
//   { title: "Gathering Details", helper: "Complete", state: "done" },
//   { title: "Gathering Documents", helper: "Complete", state: "done" },
//   { title: "Data Collection (OCR)", helper: "In Progress", state: "active" },
//   { title: "Review Data", state: "idle" },
//   { title: "T-Min Review", state: "idle" },
//   { title: "Report Generation", state: "idle" },
// ]

// type Order = 'asc' | 'desc';


// const TMinDocs: React.FC = () => {
//   const navigate = useNavigate()
//   const { data = [] } = useGetItemsQuery("DocumentsCollections")
//   //  const { state } = useLocation() as { state?: { eslId?: string } };
//   //  const eslId = state?.eslId ?? "107011";
//   const location = useLocation()
//   // const eslData = (location.state as { eslData?: any })?.eslData
//   const eslDataSession = sessionStorage?.getItem("eslData") || ""
//   const eslData = JSON.parse(eslDataSession) 
  
//   const eslId = eslData?.eslid
//   const assignedDate = new Date(eslData?.assignedDate).toLocaleDateString()
//   const site = eslData?.site;
//   const dueInDays = eslData?.dueInDays + " Days"
//   const rows = Array.isArray(data) ? data : [data]
//   const [createItem, isLoading] = useCreateItemMutation()
//   const [isEnableNextButton, setIsEnableNextButton] = useState(false);
//   const [orderBy, setOrderBy] = useState<string | number>("")
//   const [order, setOrder] = useState<Order>("asc")
//   console.log('rows', rows);

//   const onClickDowload = async () => {
//     const blob: any = await createItem({ endpoint: 'OpentextSource/downloadfile/opentext', body: { fileName: eslData?.documentName || "2500 TACO U1A.pdf", localPath: 'string' } })
//     console.log('blob', blob);
//     const url = window.URL.createObjectURL(blob?.data);
//     //  console.log('blob?.data', blob?.data);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = "2500 TACO U1A.pdf"; // you can parse from Content-Disposition if neededdocument.body.appendChild(a);
//     a.click();
//     a.remove();
//     window.URL.revokeObjectURL(url);
//   }

//   const columns = [
//     { id: "documentName", label: "Document Name" },
//     { id: "documentLink", label: "Document Links" },
//     { id: "availableStatusName", label: "Available(Y/N)" },
//     { id: "toolName", label: "Tools ", sortable: true },
//     { id: "documentMandatory", label: "Mandatory(Y/N)" },

//   ]

//   const handleSort = (columnId: string | number) => {
//     const isAsc = orderBy === columnId && order === "asc"
//     setOrder(isAsc ? "desc" : "asc")
//     setOrderBy(columnId)
//   }

//   const renderSortIcons = (): JSX.Element => (
//     <Box sx={{ display: "flex", flexDirection: "row", ml: 1, gap: 1 }}>
//       <ArrowsIcon />
//     </Box>
//   )

//   const sortedRows = [...rows]?.sort((a, b) => {
//     if (!orderBy) return 0
//     const aValue = a[orderBy]
//     const bValue = b[orderBy]
//     if (aValue < bValue) return order === "asc" ? -1 : 1
//     if (aValue > bValue) return order === "asc" ? 1 : -1
//     return 0
//   })

//   const filteredRows = sortedRows?.filter((row) =>
//     Object.values(row).join(" ").toLowerCase()
//   )

//   // six tiles
//   const tiles = [
//     {
//       // icon: <span>🏷️</span>, 
//       label: "Equipment Tag",
//       value: eslData?.equipmentTag
//     },
//     {
//       // icon: <span>🛠️</span>,
//       label: "Equipment Type",
//       value: eslData?.equipmentTypeName,
//     },
//     {
//       // icon: <span>📈</span>,
//       label: "Thickness Status",
//       value: eslData?.thicknessStatus,
//     },
//     {
//       // icon: <span>👥</span>, 
//       label: "Business Team",
//       value: eslData?.businessTeamName
//     },
//     {
//       // icon: <span>🪪</span>,
//       label: "Site Inspector",
//       value: eslData?.siteInspector
//     },
//     {
//       // icon: <span>🏭</span>, 
//       label: "Unit",
//       value: eslData?.unitName
//     },
//   ]

//   const fileLocation =
//     "K:\\BTAREA\\BTES\\FIXEDEQUIP\\Inspection\\FS\\CLEU\\CLEUs\\Inspection Planner’s Folder\\EOR Folder CLE3L3-T0302"

//   const [selectedIds, setSelectedIds] = useState<string[]>([])
//   const allSelected = selectedIds?.length === data?.length && data?.length > 0

//   const toggleOne = (id: string) => {
//     setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
//     setIsEnableNextButton(!isEnableNextButton)
//   }
//   const toggleAll = () =>
//     setSelectedIds((prev) =>
//       prev?.length === data?.length ? [] : data?.map((r: any) => r?.documentCollectionId),
//     )

//   const selectedDocs = useMemo(
//     () =>
//       data?.filter((r: any) => selectedIds.includes(r?.documentCollectionId))
//         .map((r: any) => ({
//           documentCollectionId: r?.documentCollectionId,
//           documentName: r?.documentName,
//           toolName: r?.toolName,
//           documentMandatory: r?.documentMandatory,
//           availableStatusName: r?.availableStatusName,
//         })),
//     [selectedIds],
//   )
//   console.log(selectedDocs);
//   const [mailOpen, setMailOpen] = useState(false)

//   return (
//     <MainLayout>
//       <TMinScaffold
//         eslId={eslId}
//         sapId="10819961"
//         assignedDate={assignedDate}
//         timeRemaining={dueInDays}
//         site={site}
//         steps={DOCS_STEPS}
//         tiles={tiles}
//         fileLocationLabel="Inspection Files Location:"
//         enableUploadDoc={true}
//         fileLocation={fileLocation}
//         onBack={() => navigate("/tmin")}
//         onNext={() => navigate("/tmin-model", { state: { eslData } })}
//         disableNextButton={isEnableNextButton}
//         rightExtra={
//           <Button
//             variant="outlined"
//             color="error"
//             sx={{ textTransform: "none", mr: 1.25 }}
//             onClick={() => setMailOpen(true)}
//             disabled={selectedDocs?.length === 0}
//           >
//             REQUEST MISSING DOCS
//           </Button>
//         }
//       >
//         <Typography variant="subtitle2" sx={{ color: "text.secondary", fontWeight: 700, mb: 1 }}>
//           Documents Collected
//         </Typography>

//         <Paper variant="outlined" sx={{ borderRadius: 2, overflow: "hidden" }}>
//           <TableContainer>
//             <Table>
//               {/* <TableHead>
//                 <TableRow sx={{ bgcolor: "#FFF7F7" }}>
//                   <TableCell width={50}>
//                     <Checkbox
//                       size="small"
//                       checked={allSelected}
//                       indeterminate={!allSelected && selectedIds?.length > 0}
//                       onChange={toggleAll}
//                     />
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: 700 }}>Document Name</TableCell>
//                   <TableCell sx={{ fontWeight: 700 }}>Document Links</TableCell>
//                   <TableCell sx={{ fontWeight: 700, whiteSpace: "nowrap" }}>
//                     Available(Y/N)
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: 700 }}>
//                     Tools{" "}
//                     <Typography component="span" sx={{ color: "text.disabled" }}>
//                       ↕
//                     </Typography>
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: 700 }}>Mandatory(Y/N) </TableCell>
//                   <TableCell sx={{ fontWeight: 700, textAlign: "center" }}>Actions</TableCell>
//                 </TableRow>
//               </TableHead> */}
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{
//                     fontWeight: "bold",
//                     fontSize: "0.75rem",
//                     backgroundColor: "#FDF3F3",
//                     lineHeight: "1",
//                   }} width={50}>

//                     <Checkbox
//                       size="small"
//                       checked={allSelected}
//                       indeterminate={!allSelected && selectedIds?.length > 0}
//                       onChange={toggleAll}
//                     />
//                   </TableCell>
//                   {columns.map((column) => (
//                     <TableCell
//                       key={column.id}
//                       align={"left"}
//                       sx={{
//                         fontWeight: "bold",
//                         fontSize: "0.75rem",
//                         backgroundColor: "#FDF3F3",
//                         padding: "8px",
//                         cursor: column.sortable ? "pointer" : "default",
//                         lineHeight: "1",
//                       }}
//                       sortDirection={orderBy === column.id ? order : false}
//                     >
//                       {column.sortable ? (
//                         <TableSortLabel
//                           active={orderBy === column.id}
//                           direction={orderBy === column.id ? order : "asc"}
//                           onClick={() => handleSort(column.id)}
//                           hideSortIcon={false}
//                           IconComponent={renderSortIcons}
//                           sx={{ fontSize: "0.85rem" }}
//                         >
//                           {column.label}
//                         </TableSortLabel>
//                       ) : (
//                         column.label
//                       )}
//                     </TableCell>
//                   ))}       <TableCell
//                     sx={{
//                       fontWeight: "bold",
//                       fontSize: "0.85rem",
//                       backgroundColor: "#FDF3F3",
//                       textAlign: "center",
//                       position: "sticky",
//                       right: 0,
//                       zIndex: 3,
//                       lineHeight: "1",
//                     }}
//                   >
//                     Actions
//                   </TableCell>

//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {filteredRows.map((r) => {
//                   const checked = selectedIds.includes(r?.documentCollectionId)
//                 const  isDiasbled = r?.availableStatusName?.toLowerCase() !== "yes" && r?.documentMandatory?.toLowerCase() === "yes"
//                   return (
//                     <TableRow key={r?.documentCollectionId} hover>
//                       <TableCell width={50}>
//                         <Checkbox
//                         disabled = {!isDiasbled}
//                           size="small"
//                           checked={checked && isDiasbled}
//                           onChange={() => toggleOne(r?.documentCollectionId)}
//                         />
//                       </TableCell>

//                       <TableCell>{r?.documentName}</TableCell>

//                       <TableCell>
//                         <MUILink href={r?.documentLink} sx={{ pointerEvents: "none", textDecoration: 'none' }}>
//                           {r?.documentLink}
//                         </MUILink>
//                       </TableCell>

//                       <TableCell>
//                         <Typography
//                           color={r?.availableStatusName === "Yes" ? "success.main" : "error.main"}
//                           fontWeight={600}
//                         >
//                           {r?.availableStatusName}
//                         </Typography>
//                       </TableCell>

//                       <TableCell>{r?.toolName}</TableCell>

//                       <TableCell>
//                         <Typography
//                           color={
//                             r?.documentMandatory?.toLowerCase() === "yes"
//                               ? "success.main"
//                               : "error.main"
//                           }
//                           fontWeight={600}
//                         >
//                           {r?.documentMandatory
//                             ?.toLowerCase()
//                             .replace(/\b\w/g, (char: string) => char.toUpperCase())}
//                         </Typography>
//                       </TableCell>

//                       <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
//                         <IconButton size="small">
//                           <VisibilityOutlinedIcon fontSize="small" />
//                         </IconButton>
//                         <IconButton size="small" onClick={onClickDowload}>
//                           <DownloadOutlinedIcon fontSize="small" />
//                         </IconButton>
//                         <IconButton size="small">
//                           <DeleteOutlineOutlinedIcon fontSize="small" />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   )
//                 })}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Paper>
//       </TMinScaffold>

//       <RequestMissingDocsDialog
//         open={mailOpen}
//         eslId={eslId}
//         selectedDocs={selectedDocs}
//         onClose={() => setMailOpen(false)}
//       />
//     </MainLayout>
//   )
// }

// export default TMinDocs



import React, { useMemo, useState } from "react"
import {
  Button,
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
  TableSortLabel,
  Box,
} from "@mui/material"

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"

import MainLayout from "../components/MainLayout"
import TMinScaffold, { TMinStep } from "../components/TMinScaffold"
import RequestMissingDocsDialog, { MailDoc } from "../components/RequestMissingDocsDialog"
import { useLocation, useNavigate } from "react-router-dom"
import { useCreateItemMutation, useGetItemsQuery } from "store/api"
import { ArrowsIcon } from "icons"

const DOCS_STEPS: TMinStep[] = [
  { title: "Gathering Details", helper: "Complete", state: "done" },
  { title: "Gathering Documents", helper: "Complete", state: "done" },
  { title: "Data Collection (OCR)", helper: "In Progress", state: "active" },
  { title: "Review Data", state: "idle" },
  { title: "T-Min Review", state: "idle" },
  { title: "Report Generation", state: "idle" },
]

type Order = "asc" | "desc"

const TMinDocs: React.FC = () => {
  const navigate = useNavigate()
  const { data = [] } = useGetItemsQuery("DocumentsCollections")

  const location = useLocation()
  const eslDataSession = sessionStorage?.getItem("eslData") || ""
  const eslData = JSON.parse(eslDataSession)

  const eslId = eslData?.eslid
  const assignedDate = new Date(eslData?.assignedDate).toLocaleDateString()
  const site = eslData?.site
  const dueInDays = eslData?.dueInDays + " Days"

  const rows: any[] = Array.isArray(data) ? data : [data]
  const [createItem] = useCreateItemMutation()

  const [orderBy, setOrderBy] = useState<string | number>("")
  const [order, setOrder] = useState<Order>("asc")

  // ------------------------------------------------------------
  // 🔥 CHANGE #1 — MISSING MANDATORY DOCS CHECK
  // ------------------------------------------------------------
  const hasMissingMandatoryDocs = useMemo(
    () =>
      rows.every(
        (r) =>
          r?.availableStatusName?.toLowerCase() === "no" &&
          r?.documentMandatory?.toLowerCase() === "yes"
      ),
    [rows]
  )

  // ------------------------------------------------------------
  // 🔥 CHANGE #2 — TRACK MAIL SENT
  // ------------------------------------------------------------
  const [hasRequestedMissingDocs, setHasRequestedMissingDocs] = useState(hasMissingMandatoryDocs)

  // ------------------------------------------------------------
  // 🔥 CHANGE #3 — CORRECT NEXT BUTTON LOGIC
  // ------------------------------------------------------------
    // hasMissingMandatoryDocs       // if any missing mandatory doc
    //   ? setHasRequestedMissingDocs(true)  // disable until mail sent
      // : setHasRequestedMissingDocs(false)                     // no missing docs → Next enabled
  // ------------------------------------------------------------
 


  const onClickDowload = async () => {
    const blob: any = await createItem({
      endpoint: "OpentextSource/downloadfile/opentext",
      body: {
        fileName: eslData?.documentName || "2500 TACO U1A.pdf",
        localPath: "string",
      },
    })

    const url = blob?.data ? window.URL?.createObjectURL(blob?.data) : ""
    const a = document.createElement("a")
    a.href = url
    a.download = "2500 TACO U1A.pdf"
    document.body.appendChild(a)
   url && a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
  }

  const columns = [
    { id: "documentName", label: "Document Name" },
    { id: "documentLink", label: "Document Links" },
    { id: "availableStatusName", label: "Available(Y/N)" },
    { id: "toolName", label: "Tools", sortable: true },
    { id: "documentMandatory", label: "Mandatory(Y/N)" },
  ]

  const handleSort = (columnId: string | number) => {
    const isAsc = orderBy === columnId && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(columnId)
  }

  const renderSortIcons = (): JSX.Element => (
    <Box sx={{ display: "flex", ml: 1 }}>
      <ArrowsIcon />
    </Box>
  )

  const sortedRows = [...rows]?.sort((a, b) => {
    if (!orderBy) return 0
    const aValue = a[orderBy]
    const bValue = b[orderBy]
    if (aValue < bValue) return order === "asc" ? -1 : 1
    if (aValue > bValue) return order === "asc" ? 1 : -1
    return 0
  })

  // ------------------------------------------------------------
  // 🔥 CHANGE #4 — REMOVE WRONG FILTER (YOU HAD BUG HERE)
  // ❌ OLD (BAD):
  // const filteredRows = sortedRows?.filter((row) => Object.values(row).join(" ").toLowerCase())
  // ------------------------------------------------------------

  // ⭐ NEW:
  const filteredRows = sortedRows
  // ------------------------------------------------------------

  const tiles = [
    { label: "Equipment Tag", value: eslData?.equipmentTag },
    { label: "Equipment Type", value: eslData?.equipmentTypeName },
    { label: "Thickness Status", value: eslData?.thicknessStatus },
    { label: "Business Team", value: eslData?.businessTeamName },
    { label: "Site Inspector", value: eslData?.siteInspector },
    { label: "Unit", value: eslData?.unitName },
  ]

  const fileLocation =
    "K:\\BTAREA\\BTES\\FIXEDEQUIP\\Inspection\\FS\\CLEU\\CLEUs\\Inspection Planner’s Folder\\EOR Folder CLE3L3-T0302"

  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const allSelected = selectedIds?.length === data?.length && data?.length > 0

  const toggleOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const toggleAll = () =>
    setSelectedIds((prev) =>
      prev.length === data.length ? [] : data.map((r: any) => r?.documentCollectionId)
    )

  const selectedDocs: MailDoc[] = useMemo(
    () =>
      (data as any[])
        ?.filter((r) => selectedIds.includes(r?.documentCollectionId))
        .map((r) => ({
          documentCollectionId: r?.documentCollectionId,
          documentName: r?.documentName,
          toolName: r?.toolName,
          documentMandatory: r?.documentMandatory,
          availableStatusName: r?.availableStatusName,
        })),
    [selectedIds, data]
  )

  const [mailOpen, setMailOpen] = useState(false)

  return (
    <MainLayout>
      <TMinScaffold
        eslId={eslId}
        sapId="10819961"
        assignedDate={assignedDate}
        timeRemaining={dueInDays}
        site={site}
        steps={DOCS_STEPS}
        tiles={tiles}
        fileLocationLabel="Inspection Files Location:"
        enableUploadDoc={true}
        fileLocation={fileLocation}
        onBack={() => navigate("/tmin")}
        onNext={() => navigate("/tmin-model", { state: { eslData } })}
        
      
      
        //  disableNextButton={hasRequestedMissingDocs}
        // ------------------------------------------------------------

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
        <Typography variant="subtitle2" sx={{ color: "text.secondary", fontWeight: 700, mb: 1 }}>
          Documents Collected
        </Typography>

        <Paper variant="outlined" sx={{ borderRadius: 2, overflow: "hidden" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width={50}>
                    <Checkbox
                      size="small"
                      checked={allSelected}
                      indeterminate={!allSelected && selectedIds.length > 0}
                      onChange={toggleAll}
                    />
                  </TableCell>

                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      {column.sortable ? (
                        <TableSortLabel
                          active={orderBy === column.id}
                          direction={orderBy === column.id ? order : "asc"}
                          onClick={() => handleSort(column.id)}
                          IconComponent={renderSortIcons}
                        >
                          {column.label}
                        </TableSortLabel>
                      ) : (
                        column.label
                      )}
                    </TableCell>
                  ))}

                  <TableCell sx={{ textAlign: "center", position: "sticky", right: 0 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredRows.map((r: any) => {
                  const checked = selectedIds.includes(r.documentCollectionId)

                  const isMissingMandatory =
                    r?.availableStatusName?.toLowerCase() === "no" &&
                    r?.documentMandatory?.toLowerCase() === "yes"

                  return (
                    <TableRow key={r.documentCollectionId} hover>
                      <TableCell width={50}>
                        <Checkbox
                          disabled={!isMissingMandatory}
                          checked={checked && isMissingMandatory}
                          onChange={() => toggleOne(r.documentCollectionId)}
                        />
                      </TableCell>

                      <TableCell>{r.documentName}</TableCell>

                      <TableCell>
                        <MUILink sx={{ textDecoration: "none", pointerEvents: "none" }}>
                          {r.documentLink}
                        </MUILink>
                      </TableCell>

                      <TableCell>
                        <Typography
                          color={r.availableStatusName === "Yes" ? "success.main" : "error.main"}
                          fontWeight={600}
                        >
                          {r.availableStatusName}
                        </Typography>
                      </TableCell>

                      <TableCell>{r.toolName}</TableCell>

                      <TableCell>
                        <Typography fontWeight={600}>
                          {r.documentMandatory
                            ?.toLowerCase()
                            .replace(/\b\w/g, (char: string) => char.toUpperCase())}
                        </Typography>
                      </TableCell>

                      <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                        <IconButton>
                          <VisibilityOutlinedIcon fontSize="small" />
                        </IconButton>

                        <IconButton onClick={onClickDowload}>
                          <DownloadOutlinedIcon fontSize="small" />
                        </IconButton>

                        <IconButton>
                          <DeleteOutlineOutlinedIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
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

        // ------------------------------------------------------------
        // 🔥 CHANGE #6 — AFTER MAIL SENT → ENABLE NEXT + CLOSE POPUP
        // ------------------------------------------------------------
        onMailSent={() => {
          setHasRequestedMissingDocs(true) // enable NEXT
          setMailOpen(false)              // close dialog
        }}
      />
    </MainLayout>
  )
}

export default TMinDocs
